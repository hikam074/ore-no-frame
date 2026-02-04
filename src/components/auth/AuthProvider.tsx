'use client'

import { createContext, useContext } from "react"
import type { User } from "@supabase/supabase-js"
import type { AuthUser, UserProfile } from "@/types/auth"

type AuthProviderProps = {
    user: User | null
    profile: UserProfile | null
    children: React.ReactNode
}

const authContext = createContext<AuthUser | null>(null)

export function AuthProvider({ user, profile, children }: AuthProviderProps) {
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