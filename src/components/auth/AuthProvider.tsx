'use client'

import { createContext, useContext } from "react"
import type { User } from "@supabase/supabase-js"

const authContext = createContext<User | null>(null)

export function AuthProvider({user, children}: {user: User | null, children: React.ReactNode}) {
    return (
        <authContext.Provider value={user}>
            {children}
        </authContext.Provider>
    )
}
export function useUser() {
    return useContext(authContext)
}