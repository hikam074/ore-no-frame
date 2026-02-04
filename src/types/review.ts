export type Review = {
  id: string
  mal_id: number
  content: string
  personal_score: number | null
  published: boolean
  reviewer: string
  created_at: string
  updated_at: string
}
