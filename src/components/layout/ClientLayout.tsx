'use client'

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BackToTop from "@/components/BackToTop"
import { useRef } from "react"
import { ConfirmProvider } from "./ConfirmContext"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const footerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Navbar />

      <main className="flex-1 mt-9">
        <ConfirmProvider>
          {children}
        </ConfirmProvider>
      </main>

      <BackToTop footerRef={footerRef} />
      <div ref={footerRef} className="h-px" />
      <Footer />
    </>
  )
}
