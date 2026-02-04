import "./globals.css"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { createSupabaseServer } from "@/lib/supabase/server"
import { UserProfile } from "@/types/auth"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  let profile: UserProfile | null = null

  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col text-text bg-highlight">
        <AuthProvider user={user} profile={profile}>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
