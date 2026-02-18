import { createSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  // 1. Inisialisasi client Supabase di sisi server
  const supabase = await createSupabaseServer()

  // 2. Cek user session
  // Hati-hati: getUser() lebih aman daripada getSession() untuk proteksi route di server
  const { data: { user }, error } = await supabase.auth.getUser()

  // 3. Jika error atau user tidak ada, tendang ke login
  if (error || !user) {
    redirect("/auth/login")
  }

  // 4. Jika aman, render halaman di bawahnya
  return (
    <>
      {children}
    </>
  )
}