import { apiFetch } from "@/lib/api/fetcher"
import { Artikel, CreateArtikelPayload, CreateArtikelResponse, SourceType } from "@/types"

type ArtikelEditorPayload = CreateArtikelPayload & {
    artikel_id?: string
}

export async function submitArtikel(
    payload: ArtikelEditorPayload,
    token: string
): Promise<CreateArtikelResponse> {
    const res = await apiFetch(`/artikel`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    })
    return res as CreateArtikelResponse
}

// Fetch artikel by id untuk pre-fill form saat mode edit
export async function getArtikelBySlug(source_type: SourceType, slug_address: string, token: string): Promise<Artikel | null> {
    try {
        const res = await apiFetch(`/artikel/${source_type}/${slug_address}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return res as Artikel
    } catch {
        return null
    }
}