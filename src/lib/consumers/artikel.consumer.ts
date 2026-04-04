import { Artikel, ArtikelKard, CreateArtikelResponse, SourceSearchResult, SourceType } from "@/types"
import { apiGet } from "../api/method-wrapper"
import { apiGetAuth, apiPostAuth } from "../api/method-wrapper-with-auth"

export function getAllArtikelKards() {
  return apiGet<ArtikelKard[]>(`/artikel`)
}
export function getAllActiveArtikel(query: string) {
  return apiGet<ArtikelKard[]>(`/artikel?search=${query}&active=true`)
}
export function getAllActiveAnimeArtikel() {
  return apiGet<ArtikelKard[]>(`/artikel?source_type=anime&active=true`)
}
export function getAllActiveMangaArtikel() {
  return apiGet<ArtikelKard[]>(`/artikel?source_type=manga&active=true`)
}
export function getAllActiveUnknownArtikel() {
  return apiGet<ArtikelKard[]>(`/artikel?source_type=unknown&active=true`)
}
export function getArtikelDetail(source_type: string, slug: string) {
  return apiGet<Artikel>(`/artikel/${source_type}/${slug}`)
}
export async function getArtikelBySlug(source_type: SourceType, slug_address: string){
  return apiGetAuth<Artikel>(`/artikel/${source_type}/${slug_address}`)
}
export function getSourceSearch(source_type: string, q: string) {
  return apiGetAuth<SourceSearchResult[]>(`/mal/${source_type}/search?q=${q}`)
}
export function postArtikel(payload: unknown) {
  return apiPostAuth<CreateArtikelResponse>(`/artikel`, payload)
}