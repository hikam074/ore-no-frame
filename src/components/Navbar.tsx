'use client'

import Link from "next/link"
import { SearchIcon, CircleUserIcon, HouseIcon, MenuIcon, XIcon } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"
import { useUser } from "./auth/AuthProvider"
import { usePathname, useRouter } from "next/navigation"

const ProfilePopup = dynamic(
    () => import("./navbar/ProfilePopup"),
    { ssr: false }
)

const Navbar = ({ sidebarOpen, onToggleSidebar }: { sidebarOpen: boolean, onToggleSidebar: () => void }) => {
    const [open, setOpen] = useState(false)
    const [openSearchBar, setOpenSearchBar] = useState(false)
    const [search, setSearch] = useState("")

    const { user } = useUser()
    const pathname = usePathname()
    const router = useRouter()
    const isDashboard = pathname.startsWith("/dashboard")

    return (
        <nav className="px-2 bg-primer top-0 right-0 left-0 fixed z-[999]">
            <ul className="flex justify-between items-center text-white font-bold text-sm sm:text-base">
                <li className="flex h-full gap-2">
                    {user && isDashboard &&
                        <button onClick={onToggleSidebar} className={`
                        mt-1 rounded-t-md px-2 border border-b-0 transition-all
                        ${sidebarOpen
                                ? "bg-kuarter text-primer hover:text-white hover:bg-tersier"
                                : "bg-white text-primer hover:bg-kuarter"
                            }
                        `}>
                            <MenuIcon className="block" />
                        </button>
                    }
                    <Link href="/" className="flex gap-2 p-2">
                        {!isDashboard &&
                            <HouseIcon className="" />
                        }
                        <span className={`my-auto ${openSearchBar ? "hidden sm:inline" : ""}`}>サイドフレーム</span>
                    </Link>
                </li>
                <li className="my-auto flex items-center">
                    <ul className="flex gap-4 items-center">
                        <li className={`font-semibold transition-all border-b-2 border-white hover:scale-105 hover:border-b-2 hover:border-white ${openSearchBar ? "hidden md:inline" : ""}`}>
                            <Link href="/anime" className="">Anime</Link>
                        </li>
                        <li className={`font-semibold transition-all border-b-2 border-white hover:scale-105 hover:border-b-2 hover:border-white ${openSearchBar ? "hidden md:inline" : ""}`}>
                            <Link href="/manga" className="">Manga</Link>
                        </li>
                        <li className={`flex items-center ${openSearchBar ? "border rounded" : "transition-all hover:scale-105"}`}>
                            <div className={`bg-white text-primer font-normal flex items-center ${openSearchBar ? "" : "hidden"}`}>
                                <input type="text" placeholder="Search anime/manga..." className="text-sm px-1" onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        router.push(`/search?query=${search}`)
                                    }
                                }} />
                                <Link href={`/search?query=${search}`} className="flex items-center">
                                    <SearchIcon className="text-primer p-1" />
                                </Link>
                            </div>
                            <div onClick={() => setOpenSearchBar(v => !v)}>
                                {!openSearchBar && <SearchIcon className="block" />}
                                {openSearchBar && <XIcon className="" />}
                            </div>
                        </li>
                        <li className={`transition-all hover:scale-105 ${!user ? 'hidden' : ''}`}>
                            <CircleUserIcon className="" onClick={() => setOpen(v => !v)} />
                        </li>
                    </ul>
                </li>
            </ul>
            <ProfilePopup open={open} onClose={() => setOpen(false)} />
        </nav>
    )
}

export default Navbar