import "./globals.css"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { createSupabaseServer } from "@/lib/supabase/server"
// import ClientLayout from "@/components/layout/ClientLayout"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col text-text bg-highlight">
        <AuthProvider user={user}>
          {/* <ClientLayout> */}
            {children}
          {/* </ClientLayout> */}
        </AuthProvider>
      </body>
    </html>
  )
}
