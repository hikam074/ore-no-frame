import { useState } from "react"

export function useTags(initial: string[] = []) {
    const [tags, setTags] = useState<string[]>(initial)
    const [input, setInput] = useState("")

    const addTag = () => {
        const value = input.trim().toLowerCase()
        if (!value) return

        if (tags.includes(value)) {
            setInput("")
            return
        }

        setTags(prev => [...prev, value])
        setInput("")
    }

    const removeTag = (tag: string) => {
        setTags(prev => prev.filter(t => t !== tag))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTag()
        }
    }

    return {
        tags,
        input,
        setInput,
        handleKeyDown,
        removeTag,
        setTags
    }
}