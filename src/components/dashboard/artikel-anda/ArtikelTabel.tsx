'use client'

import Link from "next/link"
import { CheckLine, Eye, OctagonX, SquarePen, Trash2 } from "lucide-react"
import { ArtikelKard, SourceType } from "@/types"
import { formatTanggalIndo } from "@/utils"
import { apiFetch } from "@/lib/api/fetcher"
import { getAccessToken } from "@/lib/auth-client"
import { useState } from "react"
import { useConfirm } from "@/components/layout/ConfirmContext"
import { setFlash } from "@/lib/flash"
import { showError } from "@/lib/toast"
import { SpinnerIcon } from "@/components/icons/modules/SpinnerIcon"

interface ArtikelTabelProps {
    artikels: ArtikelKard[]
    loading: boolean
}

export default function ArtikelTabel({ artikels, loading }: ArtikelTabelProps) {
    const [deletingSlug, setDeletingSlug] = useState<string | null>(null)
    const { confirm } = useConfirm()
    // kalau loading maka kasih buffer Loading...
    if (loading) return <div className="p-4 flex justify-center items-center gap-1 text-tersier"><SpinnerIcon className="h-6 w-6 text-primer" /><span>Loading...</span></div>

    async function handleDelete(sourceType: SourceType, slug: string, judul: string) {
        // hanya bisa 1 delete dalam satu waktu
        if (deletingSlug) return

        const ok = await confirm({
            type: "delete",
            title: "Hapus artikel ini?",
            message: `Data tidak bisa dikembalikan \n(Judul: ${judul})`,
        })

        if (!ok) return

        setDeletingSlug(slug)

        try {
            const token = await getAccessToken()
            if (!token) throw new Error("Unauthorized")

            await apiFetch<void>(`/artikel/${sourceType}/${slug}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })

            setFlash("success", "Artikel berhasil dihapus")

            // reload biar data sinkron
            location.reload()

        } catch (err) {
            const message = err instanceof Error ? err.message : "Gagal menghapus artikel"

            setFlash("error", message)
            showError(message)

        } finally {
            // reset state
            setDeletingSlug(null)
        }
    }

    return (
        <table className="table-fixed bg-white w-full">
            <thead className="border-b-2 border-tersier text-sekunder text-xs sm:text-base text-left">
                <tr>
                    <th className="p-2 sm:w-[40%]">Title</th>
                    <th className="p-2 sm:w-[15%]">Slug</th>
                    <th className="p-2 sm:w-[15%]">Published</th>
                    <th className="p-2 sm:w-[15%]">Created at</th>
                    <th className="p-2 sm:w-[15%]">Action</th>
                </tr>
            </thead>
            <tbody>
                {artikels.length === 0 ? (
                    // KALO TIDAK ADA DATA DARI BE
                    <tr className="bg-white">
                        <td colSpan={5} className="p-4 text-center text-tersier">
                            No data found...
                        </td>
                    </tr>
                ) : (
                    // KALO ADA DATA DARI DB
                    artikels.map((a) => (
                        <tr key={a.id} className="odd:bg-white even:bg-kuarter text-xs sm:text-sm">
                            <td className="whitespace-normal break-words pl-2 pr-2 pb-2 pt-2">{a.title}</td>
                            <td className="text-sekunder px-2">{a.slug}</td>
                            <td className="px-2">
                                {a.is_published
                                    ? <CheckLine className="h-5 text-green-600" />
                                    : <OctagonX className="h-5 text-red-600" />}
                            </td>
                            <td className="px-2">
                                {formatTanggalIndo(new Date(a.created_at).toLocaleString())}
                            </td>
                            <td className="px-2">
                                <div className="flex gap-2 flex-wrap py-2">
                                    <Link href={`/${a.source_type}/${a.slug}`}
                                        className={`p-2 bg-blue-400 text-white border rounded ${deletingSlug ? "opacity-50 pointer-events-none" : ""
                                            }`}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                    <Link href={`/dashboard/artikel-editor/${a.source_type}/${a.slug}`}
                                        className={`p-2 bg-yellow-400 text-white border rounded ${deletingSlug ? "opacity-50 pointer-events-none" : ""
                                            }`}
                                    >
                                        <SquarePen className="h-4 w-4" />
                                    </Link>
                                    <button disabled={!!deletingSlug} onClick={() => handleDelete(a.source_type as SourceType, a.slug, a.title)} className="p-2 bg-red-600 text-white border rounded">
                                        {deletingSlug === a.slug ? (
                                            <SpinnerIcon className="h-4 w-4 text-white" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}