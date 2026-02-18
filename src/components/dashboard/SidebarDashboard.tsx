import Link from "next/link"
import { LayoutDashboardIcon, StarIcon, CircleUser, SquarePen, ExternalLink } from "lucide-react"

export default function SidebarDashboard() {
    return (
        <section className="flex bg-white min-h-screen">
            <ul className="text-text pt-3">
                <li>
                    <Link href={"/"} className="px-5 py-3 flex gap-3 items-center hover:bg-accent2 hover:text-surface">
                        <LayoutDashboardIcon />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href={"/"} className="px-5 py-3 flex gap-3 items-center hover:bg-accent2 hover:text-surface">
                        <StarIcon />
                        <span>Your Reviews</span>
                    </Link>
                </li>
                <li>
                    <Link href={"/"} className="px-5 py-3 flex gap-3 items-center hover:bg-accent2 hover:text-surface">
                        <CircleUser />
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link href={"/admin"} className="px-5 py-3 flex gap-3 items-center hover:bg-accent2 hover:text-surface">
                        <SquarePen />
                        <span>Create Review</span>
                        <ExternalLink className="h-4 opacity-70" />
                    </Link>
                </li>
            </ul>
        </section>
    )
}