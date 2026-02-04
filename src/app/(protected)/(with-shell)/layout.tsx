import { redirect } from "next/navigation"
import { createSupabaseServer } from "@/lib/supabase/server"
import ClientLayout from "@/components/layout/ClientLayout"

export default async function ProtectedShellLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  return <ClientLayout>{children}</ClientLayout>
}
