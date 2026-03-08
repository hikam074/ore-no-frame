import { Anime } from "@/types/anime"
import { apiFetch } from "../api/fetcher"

export function fetchHomeAnime() {
  return apiFetch<Anime[]>(`/anime/suggestion`)
}
