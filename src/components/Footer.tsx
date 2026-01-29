
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="bottom-0 left-0 right-0 mt-8 p-4 space-y-4 sm:p-8 bg-accent text-text_darkmode">
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <nav className="">
                    <div className="flex gap-2">
                        <p className="font-bold">俺のフレーム</p>
                        <span className="border border-white"> </span>
                        <p className="">Ore no Frame</p>
                    </div>
                    <div>
                        <p className="font-light text-sm">Anime Reviews Blog</p>
                    </div>
                </nav>
                <nav>
                    <span className="font-bold border-b-2 border-surface">Quick Links</span>
                    <ul className="font-light">
                        <li><Link href="/" className="my-auto">Home</Link></li>
                        <li><Link href="/" className="my-auto">Anime</Link></li>
                        <li><Link href="/" className="my-auto">Manga</Link></li>
                        
                    </ul>
                </nav>
            </div>
            <p className="text-center text-sm">@2026 by Hikam074. Credits for <a href="https://myanimelist.net" target="_blank">myanimelist.net</a>. All rights reserved.</p>
        </footer>
    )
}
export default Footer