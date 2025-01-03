import { ClientSideSuspense, useThreads } from "@liveblocks/react/suspense";
import {
    AnchoredThreads,
    FloatingComposer,
    FloatingThreads,
} from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";


// loading cost reduces by 50% when using ClientSideSuspense
// suspense allow the data to be fetch of threads asynchronously and
// then render <EditorContent editor={editor} /> it will render fastly
// <Threads editor={editor} /> then this
export const Threads = ({ editor }: { editor: Editor | null }) => {
    return (
        <ClientSideSuspense fallback={null}>
            <ThreadsList editor={editor} />
        </ClientSideSuspense>
    )
}

function ThreadsList({ editor }: { editor: Editor | null }) {
    const { threads } = useThreads({ query: { resolved: false } });

    return (
        <>
            <div className="anchored-threads">
                <AnchoredThreads editor={editor} threads={threads} />
            </div>
            <FloatingThreads
                editor={editor}
                threads={threads}
                className="floating-threads"
            />
            <FloatingComposer editor={editor} className="floating-composer" />
        </>
    );
}