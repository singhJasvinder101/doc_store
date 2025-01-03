import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// assumption: members within the organization can only collaborate
export async function POST(req: Request) {
    const { sessionClaims } = await auth()
    if (!sessionClaims) {
        return new Response("Unauthorized", { status: 401 })
    }

    const user = await currentUser();
    if (!user) {
        return new Response("Unauthorized", { status: 401 })
    }

    // send req to this endpoint automatically by liiveblocks
    // when someone joins room
    const { room } = await req.json();
    const document = await convex.query(api.documents.getById, { id: room });

    console.log({user, sessionClaims});

    const isOwner = document.ownerId === user.id;
    const isOrganizationMember = document.organizationId === sessionClaims.org_id;

    console.log({ isOwner, isOrganizationMember });

    if (!isOwner && !isOrganizationMember) {
        return new Response("Unauthorized", { status: 401 })
    }
    
    const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";

    const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = Math.abs(nameToNumber) % 360;
    const color = `hsl(${hue}, 80%, 60%)`;

    const session = liveblocks.prepareSession(user.id, {
        userInfo: {
            name,
            avatar: user.imageUrl,
            color
        },
    });

    session.allow(room, session.FULL_ACCESS);

    const { status, body } = await session.authorize();
    return new Response(body, { status });
}