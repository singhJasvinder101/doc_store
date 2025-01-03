"use client"

import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useEditorStore } from "../../../store/useEditorStore";
import { Separator } from "../../../components/ui/separator";
import FontFamilyButton from "./_components/FontFamilyButton";
import HeadingLevelButton from "./_components/HeadingLevelButton";
import FontSizeButton from "./_components/FontSizeButton";
import HighlightColorButton from "./_components/HighlightColorButton";
import TextColorButton from "./_components/TextColorButton";
import ImageButton from "./_components/ImageButton";
import LinkButton from "./_components/LinkButton";
import AlignButton from "./_components/AlighButton";
import ListButton from "./_components/ListButton";
import LineHeightButton from "./_components/LineHeightButton";



interface ToolBarProps {
    isActive?: boolean;
    icon: LucideIcon;
    onClick: () => void;
}

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon
}: ToolBarProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className="size-4" />
        </button>
    );
};


const ToolBar = () => {
    const { editor } = useEditorStore()
    // console.log("toolbar editor ", { editor })

    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                    },
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                },
            ],
            [
                {
                    label: "Add Comment",
                    icon: MessageSquarePlusIcon,
                    onClick: () => editor?.chain().focus().addPendingComment().run(),
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("taskList"),
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                },
            ]
        ]

    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            <FontFamilyButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <FontSizeButton />

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {sections[1]?.map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
            <TextColorButton />
            <HighlightColorButton />

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            <LinkButton />
            <ImageButton />
            <AlignButton />
            <LineHeightButton />
            <ListButton />
            {sections[2]?.map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    )
}

export default ToolBar
