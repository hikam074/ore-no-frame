'use client'

import { createContext, useContext, useEffect } from "react"
import { createSupabaseBrowser } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import type { AuthUser, UserProfile } from "@/types/auth"

type AuthProviderProps = {
    user: User | null
    profile: UserProfile | null
    children: React.ReactNode
}

const authContext = createContext<AuthUser | null>(null)

export function AuthProvider({ user, profile, children }: AuthProviderProps) {
    const router = useRouter()
    const supabase = createSupabaseBrowser()

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            // Jika user sign out atau token kedaluwarsa, refresh halaman/redirect
            if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
                router.push('/auth/login')
                router.refresh()
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [router, supabase])

    if (!user) {
        return (
            <authContext.Provider value={null}>
                {children}
            </authContext.Provider>
        )
    }
    const value: AuthUser = {
        id: user.id,
        email: user?.email ?? '',
        name: profile?.name ?? '',
        role: profile?.role ?? '',
    }
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}
export function useUser() {
    return useContext(authContext)
}