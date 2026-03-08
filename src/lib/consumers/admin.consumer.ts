import { apiFetch } from "../api/fetcher"
import { AnimeSearchResult } from "@/types/admin-page"

export function fetchAnimeSearch(q: string) {
  return apiFetch<AnimeSearchResult[]>(`/mal/search?q=${q}`)
}
