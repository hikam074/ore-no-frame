'use client'

import { useUser } from "@/components/auth/AuthProvider"
import { capitalize } from "@/utils"
import { AtSignIcon, CaseSensitiveIcon, CircleUserIcon, CodeXmlIcon, ShieldUserIcon } from "lucide-react"
export default function Page() {
    const { user } = useUser()
    return (
        <article className="min-h-screen flex items-center justify-center">
            <section className="text-primer border p-6 rounded-lg shadow-lg flex flex-col gap-4">
                <h2 className="text-center">Profile Information</h2>
                <CircleUserIcon width={100} height={100} className="w-full" />
                <div className="flex gap-2">
                    <CodeXmlIcon />
                    <p className="font-semibold border-b">{user?.id}</p>
                </div>
                <div className="flex gap-2">
                    <CaseSensitiveIcon />
                    <p className="font-semibold border-b">{user?.name}</p>
                </div>
                <div className="flex gap-2">
                    <AtSignIcon />
                    <p className="font-semibold border-b">{user?.email}</p>
                </div>
                <div className="flex gap-2">
                    <ShieldUserIcon />
                    <p className="font-semibold border-b">{capitalize(user?.role)}</p>
                </div>
            </section>
        </article>
    )
}