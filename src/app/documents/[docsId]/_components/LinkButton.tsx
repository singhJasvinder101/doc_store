import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "../../../../store/useEditorStore";
import { useState } from "react";
import { Link2Icon } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState("");

    const onChange = (href: string) => {
        if (href.trim()) {
            editor?.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run();
            setValue("");
        }
    };

    return (
        <DropdownMenu
            onOpenChange={(open) => {
                if (open) {
                    const linkHref = editor?.getAttributes("link")?.href || "";
                    setValue(linkHref);
                }
            }}
        >
            <DropdownMenuTrigger asChild>
                <button
                    aria-label="Add Link"
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <Link2Icon className="w-4 h-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input
                    placeholder="https://example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LinkButton;
