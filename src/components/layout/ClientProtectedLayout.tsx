'use client'

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BackToTop from "@/components/BackToTop"
import { useRef, useState } from "react"
import { ConfirmProvider } from "./ConfirmContext"
import SidebarDashboard from "@/components/dashboard/SidebarDashboard"

export default function ClientProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const footerRef = useRef<HTMLDivElement>(null)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <ConfirmProvider>
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

        <div className="flex gap-4 mt-9">

          <SidebarDashboard />

          <main className="flex-1">
            {children}
          </main>
        </div>

        <BackToTop footerRef={footerRef} />
        <div ref={footerRef} className="h-px" />
        <Footer />
      </ConfirmProvider>
    </>
  )
}
