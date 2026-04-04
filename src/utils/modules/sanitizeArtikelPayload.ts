import { JSONContent } from "@tiptap/react";

function sanitizeText(text: string, maxLength: number) {
    return text
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, maxLength)
}
function sanitizeSlug(slug: string) {
    return slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // hapus karakter aneh
        .replace(/\s+/g, "-")         // spasi jadi dash
        .replace(/-+/g, "-")          // no double dash
}
function sanitizeTags(tags: string[]) {
    return [...new Set(
        tags
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag.length > 0)
    )]
}
function sanitizeHtml(html: string) {
    return html
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
}
function sanitizeBreakdown(
    breakdown: { name: string; value: string }[]
) {
    const seen = new Set<string>()

    return breakdown
        .map(item => ({
            name: item.name.trim().toLowerCase(),
            value: item.value.trim(),
        }))
        .filter(item => {
            if (!item.name || !item.value) return false
            if (seen.has(item.name)) return false

            seen.add(item.name)
            return true
        })
}

export function sanitizeArtikelPayload(data: {
    artikel_id?: string
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
}) {
    return {
        artikel_id: data.artikel_id,
        mal_id: Number(data.mal_id),
        source_type: data.source_type?.toLowerCase().trim(),
        title: sanitizeText(data.title, 100),
        slug: sanitizeSlug(data.slug),
        short_description: sanitizeText(data.short_description, 200),
        is_published: Boolean(data.is_published),
        tags: sanitizeTags(data.tags),
        content_html: sanitizeHtml(data.content_html),
        content_json: data.content_json,
        review_breakdown: sanitizeBreakdown(data.review_breakdown),
    }
}