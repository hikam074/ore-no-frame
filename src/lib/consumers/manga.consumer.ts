import { AnimeDetailPageData } from "@/types/anime-page"
import { Review } from "@/types/review"
import { apiFetch } from "../api/fetcher"
import { ReviewAndAnimeResult } from "@/types/admin-page"

export function apekmanga(malId: number, opt: RequestInit) {
  return apiFetch<ReviewAndAnimeResult[]>(`/manga/${malId}`, opt)
}
