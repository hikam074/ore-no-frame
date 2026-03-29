import { apiFetch } from "../api/fetcher"
import { ReviewAndAnimeResult } from "@/types/admin-page"

export function apekmanga(malId: number, opt: RequestInit) {
  return apiFetch<ReviewAndAnimeResult[]>(`/manga/${malId}`, opt)
}
