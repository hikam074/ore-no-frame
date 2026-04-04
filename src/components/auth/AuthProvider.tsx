'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { createSupabaseBrowser } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { AuthUser, UserProfile } from "@/types"

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
            supabase.auth.onAuthStateChange(async (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setAuthUser(null)
                    router.refresh()
                    router.replace('/login')
                }

                if (event === 'SIGNED_IN' && session?.user) {
                    const u = session.user

                    // fetch profile langsung dari supabase browser client
                    const { data: profileData } = await supabase
                        .from('profiles')
                        .select('name, role')
                        .eq('id', u.id)
                        .single()

                    setAuthUser({
                        id: u.id,
                        email: u.email ?? '',
                        name: profileData?.name ?? '',
                        role: profileData?.role ?? '',
                    })

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