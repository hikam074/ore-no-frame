export type UserProfile = {
  name: string | null
  role: string | null
}
export type AuthUser = {
  id: string
  email: string
  role: string
  name?: string
}