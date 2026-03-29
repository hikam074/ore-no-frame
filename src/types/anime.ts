export type Anime = {
  mal_id: number
  title: string
  image_url: string
  media_type: string
  season: string
  month: string | '-'
  year: number
  genres: string[] | []
  mal_score: number
  mal_rank: number
  reviews_count: number | 0
  created_at: string
  updated_at: string
}
