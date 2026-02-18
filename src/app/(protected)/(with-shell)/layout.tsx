import ClientProtectedLayout from "@/components/layout/ClientProtectedLayout"

export default async function ProtectedShellLayout({ children }: { children: React.ReactNode }) {
  return <ClientProtectedLayout>{children}</ClientProtectedLayout>
}
