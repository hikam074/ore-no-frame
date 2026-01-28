"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {

    const pathname = usePathname()
    const isAtAdmin = pathname.startsWith("/admin")

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 50)
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    if (!visible) return null
    return (
        <button onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
            className={`
                fixed bottom-6 
                ${isAtAdmin ? "right-6" : "right-6 sm:left-6 sm:right-auto"}
                rounded-full px-4 py-4
                bg-accent text-hightlight shadow-lg hover:opacity-90
            `}
        >
            <ArrowUp className="w-4 h-4" />
        </button>
    )
}