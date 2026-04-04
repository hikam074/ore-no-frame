import { Node } from "@tiptap/core"

export const ImageRow = Node.create({
    name: "imageRow",
    group: "block",
    content: "image+",
    isolating: true,

    addAttributes() {
        return {
            align: {
                default: "start",
            },
        }
    },

    parseHTML() {
        return [{ tag: 'div[data-type="image-row"]' }]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            {
                "data-type": "image-row",
                "data-align": HTMLAttributes.align,
                // ← batasi agar tidak overflow keluar editor
                style: "display:flex; flex-wrap:wrap; max-width:100%; overflow:hidden;",
            },
            0,
        ]
    },

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const { $from } = editor.state.selection
                if ($from.parent.type.name === "imageRow") {
                    return editor.chain().insertContent("<p></p>").focus().run()
                }
                return false
            },
        }
    },
})