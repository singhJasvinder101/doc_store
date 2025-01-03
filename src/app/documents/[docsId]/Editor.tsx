'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import { useEditorStore } from '../../../store/useEditorStore'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { LineHeightExtension } from '../../../extensions/lineHeight'
import { FontSizeExtension } from '../../../extensions/fontSize'
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from './threads'


interface EditorProps {
    initialContent?: string | undefined;
};


const Editor = ({ initialContent }: EditorProps) => {
    const liveblocks = useLiveblocksExtension({
        initialContent,
        offlineSupport_experimental: true,
    });
    const { setEditor } = useEditorStore()

    const editor = useEditor({
        immediatelyRender: false, // This is important for SSR
        onCreate: ({ editor }) => {
            setEditor(editor)
        },
        onDestroy: () => {
            setEditor(null)
        },
        onUpdate: ({ editor }) => {
            setEditor(editor)
        },
        onSelectionUpdate: ({ editor }) => {
            setEditor(editor)
        },
        onTransaction: ({ editor }) => {
            setEditor(editor)
        },
        onFocus: ({ editor }) => {
            setEditor(editor)
        },
        onBlur: ({ editor }) => {
            setEditor(editor)
        },
        onContentError: ({ editor }) => {
            setEditor(editor)
        },
        editorProps: {
            attributes: {
                style: "padding-left: 56px; padding-right:56px",
                class: "focus:outline-none border print:border-[#C7C7C7] flex flex-col min-h-[1054] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            }
        },
        extensions: [
            FontFamily,
            TextStyle,
            liveblocks,
            StarterKit.configure({
                history: false,
            }),
            Table,
            TableCell,
            TableHeader,
            TableRow,
            Color,
            LineHeightExtension,
            FontSizeExtension,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'], 
            }),
            TaskList,
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https"
            }),
            Image,
            Underline,
            Heading,
            ImageResize,
            Highlight.configure({ multicolor: true }),
            TaskItem.configure({
                nested: true
            })
        ],
        content: `


      `,
    })

    return (
        <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
                <EditorContent editor={editor} />
                <Threads editor={editor} />
            </div>
        </div>  
    )
}

export default Editor
