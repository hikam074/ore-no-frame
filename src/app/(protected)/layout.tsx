import { createSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServer()

  const { data: { user }, error } = await supabase.auth.getUser()

  // jika tidak ada user atau error, lempar ke login
  if (error || !user) {
    redirect("/auth/login")
  }

  // jika aman, render halaman
  return (
    <>
      {children}
    </>
  )
}