"use client"

import Image from "next/image"
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react"
import { useRef, useState } from "react"

export default function ResizableImage({ node, updateAttributes, selected }: NodeViewProps) {
    const { src, width = 300 } = node.attrs as { src: string; width: number }
    const [aspectRatio, setAspectRatio] = useState(16 / 9)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const parsedWidth = typeof width === "string" ? parseInt(width) : width
    const safeWidth =
        typeof parsedWidth === "number" && !isNaN(parsedWidth)
            ? `${parsedWidth}px`
            : "300px"

    const handles = [
        { dir: "top-left",     style: "top-0 left-0 cursor-nwse-resize" },
        { dir: "top-right",    style: "top-0 right-0 cursor-nesw-resize" },
        { dir: "bottom-left",  style: "bottom-0 left-0 cursor-nesw-resize" },
        { dir: "bottom-right", style: "bottom-0 right-0 cursor-nwse-resize" },
        { dir: "top",          style: "top-0 left-1/2 -translate-x-1/2 cursor-ns-resize" },
        { dir: "bottom",       style: "bottom-0 left-1/2 -translate-x-1/2 cursor-ns-resize" },
        { dir: "left",         style: "left-0 top-1/2 -translate-y-1/2 cursor-ew-resize" },
        { dir: "right",        style: "right-0 top-1/2 -translate-y-1/2 cursor-ew-resize" },
    ]

    const getMaxWidth = (): number => {
        let el: HTMLElement | null = wrapperRef.current
        while (el) {
            if (el.getAttribute?.("data-type") === "image-row") {
                return el.getBoundingClientRect().width
            }
            if (el.classList.contains("ProseMirror")) {
                return el.getBoundingClientRect().width
            }
            el = el.parentElement
        }
        return window.innerWidth
    }

    const startResize = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
        direction: string
    ) => {
        e.preventDefault()
        e.stopPropagation()

        const getCoords = (ev: MouseEvent | TouchEvent): { x: number; y: number } => {
            if ("touches" in ev) return { x: ev.touches[0].clientX, y: ev.touches[0].clientY }
            return { x: ev.clientX, y: ev.clientY }
        }

        const startCoords =
            "touches" in e.nativeEvent
                ? { x: e.nativeEvent.touches[0].clientX, y: e.nativeEvent.touches[0].clientY }
                : { x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY }

        const startWidth = Number(width) || 300
        const maxWidth = getMaxWidth()

        const onMove = (ev: MouseEvent | TouchEvent) => {
            const { x, y } = getCoords(ev)
            const dx = x - startCoords.x
            const dy = y - startCoords.y

            let newWidth = startWidth

            if (direction.includes("right"))  newWidth = startWidth + dx
            if (direction.includes("left"))   newWidth = startWidth - dx
            if (direction.includes("bottom")) newWidth = startWidth + dy * aspectRatio
            if (direction.includes("top"))    newWidth = startWidth - dy * aspectRatio

            newWidth = Math.min(Math.max(100, newWidth), maxWidth)
            if (!isNaN(newWidth)) updateAttributes({ width: newWidth })
        }

        const onEnd = () => {
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseup", onEnd)
            window.removeEventListener("touchmove", onMove)
            window.removeEventListener("touchend", onEnd)
        }

        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", onEnd)
        window.addEventListener("touchmove", onMove, { passive: false })
        window.addEventListener("touchend", onEnd)
    }

    return (
        <NodeViewWrapper className="block cursor-pointer" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div
                ref={wrapperRef}
                className={`relative ${selected ? "outline outline-2 outline-blue-500" : ""}`}
                style={{ width: safeWidth, maxWidth: "100%" }}
            >
                <Image
                    src={src}
                    alt=""
                    width={parsedWidth || 300}
                    height={Math.round((parsedWidth || 300) / aspectRatio)}
                    onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const img = e.currentTarget
                        setAspectRatio(img.naturalWidth / img.naturalHeight)
                    }}
                    style={{ width: "100%", height: "auto" }}
                    draggable={false}
                    unoptimized
                />

                {selected &&
                    handles.map((h) => (
                        <div
                            key={h.dir}
                            onMouseDown={(e) => startResize(e, h.dir)}
                            onTouchStart={(e) => startResize(e, h.dir)}
                            className={`absolute w-5 h-5 bg-blue-500 border-2 border-white rounded-full touch-none ${h.style}`}
                        />
                    ))}
            </div>
        </NodeViewWrapper>
    )
}