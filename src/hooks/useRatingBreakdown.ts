import { useState } from "react"

export function useRatingBreakdown(initial: { name: string; value: string }[] = []) {
    const [items, setItems] = useState(initial)
    const [nameInput, setNameInput] = useState("")
    const [valueInput, setValueInput] = useState("")

    const addItem = () => {
        const name = nameInput.trim()
        const value = valueInput.trim()

        if (!name || !value) return

        if (items.some(i => i.name === name)) {
            setNameInput("")
            setValueInput("")
            return
        }

        setItems(prev => [...prev, { name, value }])
        setNameInput("")
        setValueInput("")
    }

    const removeItem = (name: string) => {
        setItems(prev => prev.filter(i => i.name !== name))
    }

    return {
        items,
        nameInput,
        valueInput,
        setNameInput,
        setValueInput,
        addItem,
        removeItem,
        setItems
    }
}