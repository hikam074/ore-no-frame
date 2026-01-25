import { MALAnime } from "./mal"
import { Review } from "./review"
import { Anime } from "./anime"

export type AnimePageData = {
  mal: MALAnime
  reviews: Review[]
  dbAnime: Anime | null
}
