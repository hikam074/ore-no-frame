'use client'

import Link from "next/link"
import { House, Search, CircleUser } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"

const ProfilePopup = dynamic(
    () => import("./navbar/ProfilePopup"),
    { ssr: false }
)

const Navbar = () => {
    const [open, setOpen] = useState(false)

    return (
        <nav className="p-2 bg-accent top-0 right-0 left-0 fixed z-[999]">
            <ul className="flex justify-between text-text_darkmode font-bold text-sm sm:text-base">
                <li>
                    <Link href="/" className="flex gap-2">
                        <House className="" />
                        <span className="my-auto">俺のフレーム</span>
                    </Link>
                </li>
                <li>
                    <Link href="/" className="hidden my-auto sm:inline">ORENOFRAME</Link>
                </li>
                <li>
                    <ul className="flex gap-4">
                        <li className="my-auto font-semibold transition-all border-b-2 border-accent hover:scale-105 hover:border-b-2 hover:border-surface">
                            <Link href="/" className="">Anime</Link>
                        </li>
                        <li className="my-auto font-semibold transition-all border-b-2 border-accent hover:scale-105 hover:border-b-2 hover:border-surface">
                            <Link href="/" className="">Manga</Link>
                        </li>
                        <li className="my-auto transition-all hover:scale-105">
                            <Search className="" />
                        </li>

                        <li className="my-auto transition-all hover:scale-105">
                            <CircleUser className="" onClick={() => setOpen(v => !v)} />
                        </li>
                    </ul>
                </li>
            </ul>
            <ProfilePopup open={open} onClose={() => setOpen(false)} />
        </nav>
    )
}

export default Navbar