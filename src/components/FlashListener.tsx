'use client'

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { consumeFlash } from "@/lib/flash"
import { showSuccess, showError, dismissGlobalLoading } from "@/lib/toast"
import toast from "react-hot-toast"

export default function FlashListener() {
  const pathname = usePathname()

  useEffect(() => {
    dismissGlobalLoading()
    const flash = consumeFlash()
    if (!flash) return
    if (flash.type === "success") showSuccess(flash.message)
    if (flash.type === "error") showError(flash.message)

  }, [pathname]) // 🔥 jalan setiap pindah halaman

  return null
}
