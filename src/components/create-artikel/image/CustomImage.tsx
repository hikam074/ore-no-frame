import Image from "@tiptap/extension-image"
import { ReactNodeViewRenderer } from "@tiptap/react"
import ResizableImage from "./ResizableImage"

export const CustomImage = Image.extend({
    inline: false,
    group: "block",
    draggable: true,
    selectable: true,

    addAttributes() {
        return {
            ...this.parent?.(),
            width: { default: 200 },
            textAlign: {
                default: 'left',
                parseHTML: element => element.style.textAlign || 'left',
                renderHTML: attributes => {
                    if (!attributes.textAlign) return {}
                    return { style: `text-align: ${attributes.textAlign}` }
                },
            },
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(ResizableImage)
    },

    renderHTML({ HTMLAttributes }) {
        const { width, ...rest } = HTMLAttributes

        return [
            "img",
            {
                ...rest,
                style: width ? `width:${width}px` : undefined,
            },
        ]
    }
})