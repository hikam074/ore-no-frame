'use client'

import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import SidebarDashboard from "@/components/dashboard/SidebarDashboard"
import { useWindowSize } from "@/hooks/useWidth"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const width = useWindowSize()
    const isDesktop = width >= 768
    
    const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (isDesktop) {
      function handleDesktop() {
        setSidebarOpen(true)
      }
      handleDesktop()
    }
    else {
      function handleDesktop() {
        setSidebarOpen(false)
      }
      handleDesktop()
    }
  }, [isDesktop])

    return (
        <>
            <Navbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

            <div className="relative flex">
                {/* OVERLAY SIDEBAR, < MD ONLY */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black/40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* SIDEBAR */}
                <aside
                    className={`
                        fixed z-30 top-9 left-0 h-full transition-all duration-300
                        md:static md:z-auto md:h-auto md:translate-x-0 md:top-0
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:hidden"}
                    `}
                >
                    <SidebarDashboard />
                </aside>

                <main className="min-h-screen flex-1">
                    {children}
                </main>
                
            </div>
        </>
    )
}