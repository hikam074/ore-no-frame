import { SourceSearchResult } from "@/types"
import { apiFetch } from "../api/fetcher"
import { AnimeSearchResult } from "@/types/admin-page"

export function fetchAnimeSearch(q: string) {
  return apiFetch<AnimeSearchResult[]>(`/mal/search?q=${q}`)
}
export function fetchSourceSearch(source_type: string, q: string) {
  return apiFetch<SourceSearchResult[]>(`/mal/${source_type}/search?q=${q}`)
}