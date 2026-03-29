import { getAccessToken } from '@/lib/auth-client'
import { createSupabaseServer } from '@/lib/supabase/server'

export default async function TestPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  const token = await getAccessToken()

  return (
    <div>
      <h1>USER</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h1>TOKEN</h1>
      <pre>{token}</pre>
    </div>
  )
}
