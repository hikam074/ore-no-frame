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

    const { user } = useUser()
    const pathname = usePathname()
    const isDashboard = pathname.startsWith("/dashboard")

    return (
        <nav className="px-2 bg-primer top-0 right-0 left-0 fixed z-[999]">
            <ul className="flex justify-between text-text_darkmode font-bold text-sm sm:text-base">
                <li className="flex gap-2">
                    {user && isDashboard &&
                        <button onClick={onToggleSidebar} className={`
                        mt-1 rounded-t-md px-2 border border-b-0 transition-all
                        ${sidebarOpen
                                ? "bg-kuarter text-primer hover:text-white hover:bg-tersier"
                                : "bg-white text-primer hover:bg-kuarter"
                            }
                        `}>
                            <Menu className="" />
                        </button>
                    }
                    <Link href="/" className="flex gap-2 p-2">
                        {!isDashboard &&
                            <House className="" />
                        }
                        <span className="my-auto">サイドフレーム</span>
                    </Link>
                </li>
                <li className="my-auto">
                    <ul className="flex gap-4">
                        <li className="font-semibold transition-all border-b-2 border-white hover:scale-105 hover:border-b-2 hover:border-white">
                            <Link href="/anime" className="">Anime</Link>
                        </li>
                        <li className="font-semibold transition-all border-b-2 border-white hover:scale-105 hover:border-b-2 hover:border-white">
                            <Link href="/manga" className="">Manga</Link>
                        </li>
                        <li className="transition-all hover:scale-105">
                            <Search className="" />
                        </li>

                        <li className={`transition-all hover:scale-105 hidden" ${!user ? 'hidden' : ''}`}>
                            <CircleUser className="" onClick={() => setOpen(v => !v)} />
                        </li>
                    </ul>
                </li>
            </ul>
            <ProfilePopup open={open} onClose={() => setOpen(false)}/>
        </nav>
    )
}

export default Navbar