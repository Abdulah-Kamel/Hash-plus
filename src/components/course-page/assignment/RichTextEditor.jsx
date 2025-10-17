"use client"
import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Text from '@tiptap/extension-text'
import { TextStyleKit } from '@tiptap/extension-text-style'
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import ListItem from "@tiptap/extension-list-item"
import LinkExtension from "@tiptap/extension-link"

import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    List,
    ListOrdered,
    Link,
    Palette,
    Highlighter,
    Quote,
    Code,
    Minus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RichTextEditor() {
    const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
    const [linkUrl, setLinkUrl] = useState("")
    const [linkText, setLinkText] = useState("")

    const editor = useEditor({
        extensions: [
            StarterKit,
            Text,
            TextStyleKit,
            Color,
            Underline,
            Highlight.configure({ multicolor: true }),
            ListItem,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            LinkExtension.configure({
                openOnClick: false,
            }),
        ],
        content: "<p>اكتب المطلوب هنا</p>",
        editorProps: {
            attributes: {
                class:
                    "min-h-[200px] border-0 rounded-b-lg p-4 focus:outline-none text-right prose prose-sm max-w-none",
                dir: "rtl",
            },
        },
        immediatelyRender: false,
    })

    if (!editor) return null

    const openLinkDialog = () => {
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to
        )
        setLinkText(selectedText)
        setLinkUrl("")
        setIsLinkDialogOpen(true)
    }

    const handleAddLink = () => {
        if (linkUrl) {
            if (linkText && !editor.state.selection.empty) {
                // Replace selected text with link
                editor.chain().focus().setLink({ href: linkUrl }).run()
            } else if (linkText) {
                // Insert new text with link
                editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run()
            } else {
                // Just add link to selected text or insert URL as text
                editor.chain().focus().setLink({ href: linkUrl }).run()
            }
        }
        setIsLinkDialogOpen(false)
        setLinkUrl("")
        setLinkText("")
    }

    const setTextColor = (color) => {
        editor.chain().focus().setColor(color).run()
    }

    const setHighlight = (color) => {
        editor.chain().focus().toggleHighlight({ color }).run()
    }

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="flex items-center justify-end gap-1 p-3 bg-gray-50 border-b flex-wrap">
                {/* Text Formatting */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive("bold") ? "bg-primary/10 text-primary" : ""}
                    >
                        <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive("italic") ? "bg-primary/10 text-primary" : ""}
                    >
                        <Italic className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive("underline") ? "bg-primary/10 text-primary" : ""}
                    >
                        <UnderlineIcon className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive("strike") ? "bg-primary/10 text-primary" : ""}
                    >
                        <Strikethrough className="w-4 h-4" />
                    </Button>
                </div>

                {/* Alignment */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    >
                        <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    >
                        <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    >
                        <AlignRight className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    >
                        <AlignJustify className="w-4 h-4" />
                    </Button>
                </div>

                {/* Colors */}
                <div className="relative">
                    <input
                        type="color"
                        onChange={(e) => setTextColor(e.target.value)}
                        className="absolute inset-0 w-8 h-8 opacity-0 cursor-pointer"
                        title="اختر لون النص"
                    />
                    <Button variant="ghost" size="sm" className="pointer-events-none">
                        <Palette className="w-4 h-4" />
                    </Button>
                </div>

                <div className="relative">
                    <input
                        type="color"
                        onChange={(e) => setHighlight(e.target.value)}
                        className="absolute inset-0 w-8 h-8 opacity-0 cursor-pointer"
                        title="اختر لون التمييز"
                    />
                    <Button variant="ghost" size="sm" className="pointer-events-none">
                        <Highlighter className="w-4 h-4" />
                    </Button>
                </div>

                <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={openLinkDialog}>
                            <Link className="w-4 h-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>إضافة رابط</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="link-text">نص الرابط</Label>
                                <Input
                                    id="link-text"
                                    placeholder="أدخل نص الرابط"
                                    value={linkText}
                                    onChange={(e) => setLinkText(e.target.value)}
                                    dir="rtl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="link-url">عنوان الرابط</Label>
                                <Input
                                    id="link-url"
                                    placeholder="https://example.com"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    dir="ltr"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsLinkDialogOpen(false)}
                                >
                                    إلغاء
                                </Button>
                                <Button onClick={handleAddLink}>
                                    إضافة الرابط
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <EditorContent editor={editor} className="prose prose-sm max-w-none" />
        </div>
    )
}
