// import { redirect } from "next/navigation"
// import { createSupabaseServer } from "@/lib/supabase/server"
import ClientProtectedLayout from "@/components/layout/ClientProtectedLayout"

export default async function ProtectedShellLayout({ children }: { children: React.ReactNode }) {
  // const supabase = await createSupabaseServer()
  // const { data: { user } } = await supabase.auth.getUser()

  // if (!user) redirect("/auth/login")

  return <ClientProtectedLayout>{children}</ClientProtectedLayout>
}
