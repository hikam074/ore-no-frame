import { Artikel, ArtikelKard } from "@/types"
import { apiFetch } from "../api/fetcher"

export function fetchAllArtikelKards() {
  return apiFetch<ArtikelKard[]>(`/artikel`)
}

export function fetchArtikelDetail(source_type: string, slug: string) {
  return apiFetch<Artikel>(`/artikel/${source_type}/${slug}`)
}
