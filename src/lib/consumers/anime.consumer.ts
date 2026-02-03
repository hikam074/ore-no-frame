import { AnimeDetailPageData } from "@/types/anime-page"
import { apiFetch } from "../api/fetcher"

export function fetchAnimeDetailPageData(malId: number) {
  return apiFetch<AnimeDetailPageData>(`/api/anime/${malId}`)
}
