import { postArtikel } from "@/lib/consumers/artikel.consumer"
import { CreateArtikelPayload } from "@/types"
import { sanitizeArtikelPayload } from "@/utils"

export async function submitArtikel({ data }: {data: CreateArtikelPayload}) {

    const payload = sanitizeArtikelPayload(data)

    const submitted = await postArtikel(payload)

    if (!submitted?.slug) {
        throw new Error("Gagal mengunggah artikel")
    }

    return submitted
}