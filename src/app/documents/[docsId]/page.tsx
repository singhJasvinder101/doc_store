import React from 'react'
import Editor from './Editor';
import ToolBar from './toolbar';
import Navbar from './navbar';
import { Room } from './room';
import { getDocument } from './actions';

interface DocsParams {
    params: Promise<{ docsId: string}>;
}

const Page = async ({ params }: DocsParams) => {
    const { docsId } = await params;

    const document = await getDocument(docsId);

    return (
        <Room>
            <div className="min-h-screen bg-[#FAFBFD]">
                <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
                    <Navbar data={document} />
                    <ToolBar />
                </div>
                <div className="pt-[114px] print:pt-0">
                    <Editor initialContent={document.initialContent} />
                </div>
            </div>
        </Room>
    );
};

export default Page;
