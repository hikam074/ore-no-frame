import ClientLayout from "@/components/layout/ClientLayout"

export default async function WithShellLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClientLayout>
            {children}
        </ClientLayout>
    )
}
