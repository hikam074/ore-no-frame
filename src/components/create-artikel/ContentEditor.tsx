"use client"

import { useEditor, EditorContent, JSONContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { BoldIcon, Heading2Icon, Heading3Icon, ImageIcon, ItalicIcon, TextAlignCenterIcon, TextAlignEndIcon, TextAlignStartIcon, UnderlineIcon } from "lucide-react"
import { CustomImage } from "./image/CustomImage"
import { ImageRow } from "./image/ImageRow"
import { html as beautify } from "js-beautify"
import TextAlign from '@tiptap/extension-text-align'

type Props = {
    initialContent?: JSONContent | string
    onChange?: (data: { json: JSONContent; html: string }) => void
}

export default function ContentEditor({ initialContent, onChange }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CustomImage,
            ImageRow,

            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: initialContent,
        immediatelyRender: false,
        onUpdate({ editor }) {
        const html = editor.getHTML()
        const json = editor.getJSON()

        onChange?.({ html, json })
    }
    })

    if (!editor) return null

    const addImage = () => {
        const url = prompt("Masukkan URL gambar")
        if (!url) return

        const row = isInsideImageRow(editor)

        if (row) {
            // sudah ada row maka tambah ke dalamnya
            editor
                .chain()
                .focus()
                .insertContentAt(row.pos + row.node.nodeSize - 1, {
                    type: "image",
                    attrs: { src: url },
                })
                .run()
            setTimeout(() => {
                editor.commands.focus("end")
            }, 0)
        } else {
            // belum ada row maka buat baru
            editor
                .chain()
                .focus()
                .insertContent({
                    type: "imageRow",
                    content: [
                        {
                            type: "image",
                            attrs: { src: url },
                        },
                    ],
                })
                .run()
            setTimeout(() => {
                editor.commands.focus("end")
            }, 0)
        }
    }

    const isInsideImageRow = (editor: Editor) => {
        const { $from } = editor.state.selection

        for (let i = $from.depth; i > 0; i--) {
            if ($from.node(i).type.name === "imageRow") {
                return {
                    node: $from.node(i),
                    pos: $from.before(i),
                }
            }
        }

        return null
    }

    const setUniversalAlign = (align: "left" | "center" | "right") => {
        const { state } = editor
        const { $from } = state.selection

        // cek apakah di dalam imageRow
        for (let i = $from.depth; i > 0; i--) {
            const node = $from.node(i)

            if (node.type.name === "imageRow") {
                // mapping left/right ke start/end
                const map = {
                    left: "start",
                    center: "center",
                    right: "end",
                }

                editor
                    .chain()
                    .focus()
                    .updateAttributes("imageRow", { align: map[align] })
                    .run()

                return
            }
            if (node.type.name === "image") {
                editor
                    .chain()
                    .focus()
                    .updateAttributes("image", { textAlign: align })
                    .run()
                return
            }
        }

        // bukan image maka pakai textAlign biasa
        editor.chain().focus().setTextAlign(align).run()
    }

    const formattedHtml = beautify(editor.getHTML(), {
        indent_size: 2,
        wrap_line_length: 0,
        preserve_newlines: false,
        max_preserve_newlines: 0,
        inline: [],
        content_unformatted: [],
    })

    return (
        <div className="border rounded min-h-[200px] outline-none">

            {/* TOOLBAR */}
            <div className="flex flex-wrap gap-2 border-b p-4 py-2 bg-kuarter">

                <button className="border rounded w-9 h-9 flex items-center justify-center bg-white" onClick={() => editor.chain().focus().toggleBold().run()}>
                    <BoldIcon height={26} />
                </button>

                <button className="border rounded w-9 h-9 flex items-center justify-center bg-white" onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <ItalicIcon height={26} />
                </button>

                <button className="border rounded w-9 h-9 flex items-center justify-center bg-white" onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    <UnderlineIcon height={26} />
                </button>

                <button className="border rounded w-9 h-9 flex items-center justify-center bg-white" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2Icon height={26} />
                </button>

                <button className="border rounded w-9 h-9 flex items-center justify-center bg-white" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                    <Heading3Icon height={24} />
                </button>

                <button className="border rounded w-9 h-9 flex items-center justify-center bg-white" onClick={() => setUniversalAlign("left")}>
                    <TextAlignStartIcon height={24} />
                </button>

                <button className="border rounded w-9 h-9 flex items-center justify-center bg-white" onClick={() => setUniversalAlign("center")}>
                    <TextAlignCenterIcon height={24} />
                </button>

                <button className="border rounded w-9 h-9 flex items-center justify-center bg-white" onClick={() => setUniversalAlign("right")}>
                    <TextAlignEndIcon height={24} />
                </button>

                <button className="border rounded w-9 h-9 flex items-center justify-center bg-white" onClick={addImage}>
                    <ImageIcon height={24} />
                </button>

            </div>

            {/* EDITOR */}
            <EditorContent
                editor={editor}
                className="p-4 min-h-[200px] max-h-[80vh] overflow-y-auto article-content"
            />

            {/* OUTPUT PREVIEW */}
            <div className="grid grid-cols-2 gap-4 border-t p-4">
                <div>
                    <p className="font-bold mb-2">HTML Output</p>
                    <pre className="text-xs bg-gray-100 p-2 overflow-y-scroll min-h-8 max-h-96">
                        {formattedHtml}
                    </pre>
                </div>

                <div>
                    <p className="font-bold mb-2">JSON Output</p>
                    <pre className="text-xs bg-gray-100 p-2 overflow-y-scroll min-h-8 max-h-96">
                        {JSON.stringify(editor.getJSON(), null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    )
}