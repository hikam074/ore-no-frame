import { apiFetch } from "../api/fetcher"
import { AnimeSearchResult } from "@/types/admin-page"

export function fetchAnimeSearch(q: string) {
  return apiFetch<AnimeSearchResult[]>(`/api/mal/search?q=${q}`)
}
