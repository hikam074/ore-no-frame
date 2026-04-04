import FlashListener from "@/components/FlashListener";
import "./globals.css"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { createSupabaseServer } from "@/lib/supabase/server"
import { Toaster } from "react-hot-toast";
import { UserProfile } from "@/types";

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
      <body className="min-h-screen flex flex-col text-text bg-bground">
        <AuthProvider key={user?.id ?? 'guest'} user={user} profile={profile}>
          {children}
        </AuthProvider>
        <FlashListener />
        <Toaster position="top-right"
          // containerStyle={{
          //   top: 50,
          //   right: 20,
          // }}
        />
      </body>
    </html>
  )
}
