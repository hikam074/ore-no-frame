import { AnimeDetailPageData } from "@/types/anime-page"
import { Review } from "@/types/review"
import { apiFetch } from "../api/fetcher"
import { ReviewAndAnimeResult } from "@/types/admin-page"

export function fetchAnimeDetailPageData(malId: number) {
  return apiFetch<AnimeDetailPageData>(`/anime/${malId}`)
}

export function fetchReviewsByUser(opt: RequestInit) {
  return apiFetch<ReviewAndAnimeResult[]>(`/review`, opt)
}
