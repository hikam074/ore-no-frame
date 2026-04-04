import { useState } from "react"
import { useRouter } from "next/navigation"
import { useConfirm } from "@/components/layout/ConfirmContext"
import { dismissGlobalLoading, showError, showGlobalLoading } from "@/lib/toast"
import { setFlash } from "@/lib/flash"
import { submitArtikel } from "@/services/artikel.service"
import { CreateArtikelPayload, SourceType } from "@/types"

export function useArtikelSubmit() {
    const [submitting, setSubmitting] = useState(false)

    const { confirm } = useConfirm()
    const router = useRouter()

    const handleSubmit = async ({
        data,
        source_type,
        mode = "create"
    }: { data: CreateArtikelPayload, source_type: SourceType, mode: "create" | "edit" }) => {
        if (submitting) return

        setSubmitting(true)

        try {
            const ok = await confirm({
                type: mode === "edit" ? "warning" : "create",
                title: mode === "edit" ? "Simpan perubahan ini?" : "Simpan artikel ini?",
                message: "Pastikan semua benar sebelum menyimpan"
            })

            if (!ok) return

            showGlobalLoading("Menyimpan artikel...")

            const submitted = await submitArtikel({ data })

            setFlash("success",
                mode === "edit"
                    ? "Artikel berhasil diperbarui!"
                    : "Artikel berhasil diunggah!"
            )

            router.push(`/${source_type}/${submitted.slug}`)

        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "Unknown error"

            setFlash("error", message)
            showError(message)
        } finally {
            dismissGlobalLoading()
            setSubmitting(false)
        }
    }

    return {
        handleSubmit,
        submitting
    }
}