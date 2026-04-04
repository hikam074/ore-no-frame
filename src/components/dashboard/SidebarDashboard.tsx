import Link from "next/link"
import { LayoutDashboardIcon, NotebookTextIcon, CircleUserIcon, SquarePenIcon, ExternalLinkIcon } from "lucide-react"

export default function SidebarDashboard() {
    return (
        <section className="flex bg-kuarter min-h-screen">
            <ul className="text-sm md:text-base text-primer font-semibold">
                <li>
                    <Link href={"/dashboard"} className="px-5 py-3 flex gap-3 items-center hover:bg-tersier hover:text-surface">
                        <LayoutDashboardIcon size={20} />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href={"/dashboard/artikel-anda"} className="px-5 py-3 flex gap-3 items-center hover:bg-tersier hover:text-surface">
                        <NotebookTextIcon size={20} />
                        <span>Artikel Anda</span>
                    </Link>
                </li>
                <li>
                    <Link href={"/create-artikel"} className="px-5 py-3 flex items-center gap-3 hover:bg-tersier hover:text-surface" >
                        <SquarePenIcon size={20} className="flex-shrink-0" />
                        <span className="flex-1">Buat Artikel Baru</span>
                        <ExternalLinkIcon size={20} className="opacity-70 flex-shrink-0" />
                    </Link>
                </li>
                <li>
                    <Link href={"/dashboard/profil"} className="px-5 py-3 flex gap-3 items-center hover:bg-tersier hover:text-surface">
                        <CircleUserIcon size={20} />
                        <span>Profil</span>
                    </Link>
                </li>
            </ul>
        </section>
    )
}