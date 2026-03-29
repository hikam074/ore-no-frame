// submit artikel ke BE
import { apiFetch } from "@/lib/api/fetcher"
import { CreateArtikelPayload, CreateArtikelResponse } from "@/types"

export async function createArtikel(payload: CreateArtikelPayload, token: string): Promise<CreateArtikelResponse> {
    const res = await apiFetch(`/artikel`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
    })
    return res as CreateArtikelResponse
}
