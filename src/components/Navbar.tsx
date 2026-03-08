'use client'

import Link from "next/link"
import { House, Search, CircleUser, Menu } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"
import { useUser } from "./auth/AuthProvider"
import { usePathname } from "next/navigation"

const ProfilePopup = dynamic(
    () => import("./navbar/ProfilePopup"),
    { ssr: false }
)

const Navbar = ({ sidebarOpen, onToggleSidebar }: { sidebarOpen: boolean, onToggleSidebar: () => void }) => {
    const [open, setOpen] = useState(false)

    const { user, setUser } = useUser()
    const pathname = usePathname()
    const isDashboard = pathname.startsWith("/dashboard")

    return (
        <nav className="px-2 bg-accent top-0 right-0 left-0 fixed z-[999]">
            <ul className="flex justify-between text-text_darkmode font-bold text-sm sm:text-base">
                <li className="flex gap-2">
                    {user && isDashboard &&
                        <button onClick={onToggleSidebar} className={`
                        mt-1 rounded-t-md px-2 border border-b-0 transition-all
                        ${sidebarOpen
                                ? "bg-white text-accent hover:text-accent2"
                                : "bg-accent text-white hover:bg-highlight hover:text-accent"
                            }
                        `}>
                            <Menu className="" />
                        </button>
                    }
                    <Link href="/" className="flex gap-2 p-2">
                        {!isDashboard &&
                            <House className="" />
                        }
                        <span className="my-auto">俺のフレーム</span>
                    </Link>
                </li>
                <li className="my-auto">
                    <Link href="/" className="hidden sm:inline">ORENOFRAME</Link>
                </li>
                <li className="my-auto">
                    <ul className="flex gap-4">
                        <li className="font-semibold transition-all border-b-2 border-accent hover:scale-105 hover:border-b-2 hover:border-surface">
                            <Link href="/anime" className="">Anime</Link>
                        </li>
                        <li className="font-semibold transition-all border-b-2 border-accent hover:scale-105 hover:border-b-2 hover:border-surface">
                            <Link href="/manga" className="">Manga</Link>
                        </li>
                        <li className="transition-all hover:scale-105">
                            <Search className="" />
                        </li>

                        <li className="transition-all hover:scale-105">
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