import Link from "next/link"
import { House, Search } from "lucide-react"

export function Navbar() {
    return (
        <nav className="p-2 bg-accent">
            <ul className="flex justify-between text-surface font-bold">
                <li>
                    <Link href="/" className="flex gap-2"><House className="" />俺のフレーム</Link>
                </li>
                <li>
                    <Link href="/" className="flex gap-2">ORENOFRAME</Link>
                </li>
                <li>
                    <div className="flex gap-4">
                        <Link href="/">Anime</Link>
                        <Link href="/">Manga</Link>
                        <Search className="" />
                    </div>
                </li>
            </ul>
        </nav>
    )
}