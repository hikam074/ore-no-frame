// import { createBrowserClient } from "@supabase/ssr";

// export function createSupabaseBrowser() {
//     return createBrowserClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
//     )
// }
import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let _client: SupabaseClient | null = null

export function createSupabaseBrowser() {
    if (_client) return _client

    _client = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )

    return _client
}