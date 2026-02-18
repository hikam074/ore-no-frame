'use client'

import { useState } from "react"
import Navbar from "@/components/Navbar"
import SidebarDashboard from "@/components/dashboard/SidebarDashboard"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <>
            <Navbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

            <div className="flex gap-2">
                {sidebarOpen &&
                    <SidebarDashboard />
                }

                <main className="min-h-screen flex-1">
                    {children}
                </main>
            </div>
        </>
    )
}
