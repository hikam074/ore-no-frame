import { JSONContent } from "@tiptap/react"
import { RatingBreakdown } from "./rating-breakdown"
import { Source } from "./source"
import { User } from "./user"

// CORE
export type Artikel = {
  id: string
  title: string
  slug: string
  source_type: string
  short_description: string
  content_html: string
  content_json: string
  rating_breakdown: RatingBreakdown[] | []
  is_published: boolean
  reviewer: User
  source: Source
  tags: string[]
  created_at: string
  updated_at: string
}

// DERIVED - HOMEPAGE
export type ArtikelKard = Pick<Artikel,
  'id' |
  'title' |
  'slug' |
  'source_type' |
  'short_description' |
  'is_published' |
  'created_at' |
  'updated_at' |
  'source' |
  'tags'
>
// INDEPENDEN CREATE-ARTIKEL PAYLOAD (KARENA UNTUK BRIDGE KE BE)
export type CreateArtikelPayload = {
  mal_id: number
  source_type: string
  title: string
  slug: string
  short_description: string
  is_published: boolean
  tags: string[]
  content_html: string
  content_json: JSONContent
  review_breakdown: { name: string; value: string }[]
}
// INDEPENDEN CREATE-ARTIKEL RESPONSE (KARENA UNTUK MENAGKAP BERHASIL TIDAK DARI BE)
export type CreateArtikelResponse = {
    slug: string
}