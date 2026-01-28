import { AnimePageData } from "@/types/anime-page"
import { apiFetch } from "../api/fetcher"

export function fetchAnimeDetailPageData(malId: number) {
  return apiFetch<AnimePageData>(`/api/anime/${malId}`)
}
