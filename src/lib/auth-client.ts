// untuk get token auth

import { createSupabaseBrowser } from "./supabase/client";

export async function getAccessToken() {
    const supabase = createSupabaseBrowser()
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token
}