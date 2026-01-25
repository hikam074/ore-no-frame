import Link from "next/link"
import { House, Search } from "lucide-react"

export function Navbar() {
    return (
        <nav className="p-2 bg-accent">
            <ul className="flex justify-between text-surface font-bold text-sm sm:text-base">
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
                    <div className="flex gap-4">
                        <Link href="/" className="my-auto">Anime</Link>
                        <Link href="/" className="my-auto">Manga</Link>
                        <Search className="" />
                    </div>
                </li>
            </ul>
        </nav>
    )
}