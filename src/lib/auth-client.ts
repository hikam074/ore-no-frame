// // untuk get token auth

// import { createSupabaseBrowser } from "./supabase/client";

// export async function getAccessToken() {
//     const supabase = createSupabaseBrowser()
//     const { data: { session } } = await supabase.auth.getSession()
//     return session?.access_token
// }

import { createSupabaseBrowser } from "./supabase/client"

const GET_TOKEN_TIMEOUT_MS = 8_000

/**
 * Bungkus promise dengan timeout.
 * Kalau promise tidak resolve dalam `ms` milidetik, reject dengan pesan timeout.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(
                () => reject(new Error(`[auth] ${label} timeout setelah ${ms}ms`)),
                ms
            )
        ),
    ])
}

export async function getAccessToken(): Promise<string | null> {
    const supabase = createSupabaseBrowser()

    try {
        // Bungkus getSession() dengan timeout agar tidak hang selamanya
        const { data: { session } } = await withTimeout(
            supabase.auth.getSession(),
            GET_TOKEN_TIMEOUT_MS,
            "getSession()"
        )

        if (session?.access_token) {
            return session.access_token
        }

        // Session null/expired → coba refresh secara eksplisit
        const { data: { session: refreshed }, error } = await withTimeout(
            supabase.auth.refreshSession(),
            GET_TOKEN_TIMEOUT_MS,
            "refreshSession()"
        )

        if (error || !refreshed) {
            console.warn("[auth-client] Gagal refresh session:", error?.message)
            return null
        }

        return refreshed.access_token

    } catch (err) {
        // Termasuk timeout error — jangan diam-diam hang
        console.error("[auth-client] getAccessToken error:", (err as Error).message)
        throw err
    }
}