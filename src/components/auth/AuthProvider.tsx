'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { createSupabaseBrowser } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import type { AuthUser, UserProfile } from "@/types/auth"

type AuthContextType = {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
}

const authContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ user, profile, children }: { user: User | null, profile: UserProfile | null, children: React.ReactNode }) {
    const router = useRouter()
    const supabase = createSupabaseBrowser()

    const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
        if (!user) return null
        return {
            id: user.id,
            email: user.email ?? '',
            name: profile?.name ?? '',
            role: profile?.role ?? '',
        }
    })

    useEffect(() => {
        const { data: { subscription } } =
            supabase.auth.onAuthStateChange((event) => {

                if (event === 'SIGNED_OUT') {
                    setAuthUser(null)   // 🔥 RESET STATE CLIENT
                    router.replace('/auth/login')
                    router.refresh()
                }
            })

        return () => subscription.unsubscribe()
    }, [router, supabase])

    return (
        <authContext.Provider value={{ user: authUser, setUser: setAuthUser }}>
            {children}
        </authContext.Provider>
    )
}

export function useUser(): AuthContextType {
    const ctx = useContext(authContext)
    if (!ctx) {
        throw new Error("useUser must be used inside AuthProvider")
    }
    return ctx
}