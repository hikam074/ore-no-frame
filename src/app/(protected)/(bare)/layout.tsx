import { redirect } from "next/navigation"
import { createSupabaseServer } from "@/lib/supabase/server"

export default async function ProtectedBareLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  return <main>{children}</main>
}
