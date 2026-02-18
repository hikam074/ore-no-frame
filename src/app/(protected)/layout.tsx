import { createSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServer()

  // Gunakan getUser() untuk keamanan lebih baik di server
  const { data: { user }, error } = await supabase.auth.getUser()

  // Jika tidak ada user atau error, lempar ke login
  if (error || !user) {
    redirect("/auth/login")
  }

  // Jika aman, render halaman
  return (
    <>
      {children}
    </>
  )
}