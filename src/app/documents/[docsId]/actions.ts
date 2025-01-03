"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getUsers() {
    const { sessionClaims } = await auth()
    const clerk = await clerkClient()

    const response = await clerk.users.getUserList({
        organizationId: [sessionClaims?.org_id!],
    })

    if (!response) return [];

    console.log(response.data)

    const users = response.data.map((user) => {
        const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
        return {
            id: user.id,
            name,
            avatar: user.imageUrl,
        }
    });


    return users;
}
export async function getDocument(docsId: string) {
    return await convex.query(api.documents.getById, { id: docsId as Id<"documents"> });
}