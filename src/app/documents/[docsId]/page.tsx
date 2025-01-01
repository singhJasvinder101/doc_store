import React from 'react'
import Editor from './Editor';
import ToolBar from './toolbar';
import Navbar from './navbar';

interface DocsParams {
    params: Promise<{ docsId: string }>
}

const page = async ({ params }: DocsParams) => {
    const awaitedParams = await params;
    const { docsId } = awaitedParams;

    return (
        <div className="min-h-screen bg-[#FAFBFD]">
            <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
                <Navbar />
                <ToolBar />
            </div>
            <div className="pt-[114px] print:pt-0">
                <Editor />
            </div>
        </div>
    )
}

export default page