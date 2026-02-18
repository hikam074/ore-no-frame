'use client'

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BackToTop from "@/components/BackToTop"
import { useRef } from "react"
import { ConfirmProvider } from "./ConfirmContext"
// import SidebarDashboard from "@/components/dashboard/SidebarDashboard"

export default function ClientProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const footerRef = useRef<HTMLDivElement>(null)

  

  return (
    <>
      <ConfirmProvider>
        <Navbar sidebarOpen={false} onToggleSidebar={() => {}} />

        <div className="flex gap-4 mt-10">
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
