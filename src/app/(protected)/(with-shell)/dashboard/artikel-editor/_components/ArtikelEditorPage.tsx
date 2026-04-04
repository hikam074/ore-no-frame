'use client'

import { useTags } from "@/hooks/useTags"
import { useRatingBreakdown } from "@/hooks/useRatingBreakdown"
import { useArtikelSubmit } from "@/hooks/useArtikelSubmit"
import { useEffect, useState } from "react"
import { dismissGlobalLoading, showError, showGlobalLoading } from "@/lib/toast"
import SourceFinder from "@/components/create-artikel/SourceFinder"
import { SOURCE_TYPE, SourceSearchResult, SourceType } from "@/types"
import ContentEditor from "@/components/create-artikel/ContentEditor"
import { capitalize } from "@/utils"
import ToggleButton from "@/components/ToggleButton"
import { JSONContent } from "@tiptap/react"
import { getArtikelBySlug } from "@/lib/consumers/artikel.consumer"

const EMPTY_DOC: JSONContent = {
    type: "doc",
    content: [{ type: "paragraph" }],
}

type Props = {
    // kalau ada = mode edit, kalau tidak ada = mode create
    source_type?: SourceType
    slug_address?: string
}

export default function ArtikelEditorPage({ source_type, slug_address }: Props) {
    // state & hooks
    const isEditMode = !!slug_address && !!source_type
    const {
        tags,
        input: inputTag,
        setInput: setInputTag,
        handleKeyDown,
        setTags,
        removeTag
    } = useTags()
    const {
        items: ratingBreakdowns,
        nameInput: breakdownNameInput,
        valueInput: breakdownValueInput,
        setNameInput: setBreakdownNameInput,
        setValueInput: setBreakdownValueInput,
        addItem: addRatingItem,
        setItems,
        removeItem: removeRatingItem
    } = useRatingBreakdown()
    const { handleSubmit, submitting } = useArtikelSubmit()
    const [ready, setReady] = useState(!isEditMode) // create langsung ready, edit tunggu fetch
    const [title, setTitle] = useState("")
    const [artikelId, setArtikelId] = useState("")
    const [artikelHtml, setArtikelHtml] = useState("")
    const [artikelJson, setArtikelJson] = useState<JSONContent>(EMPTY_DOC)
    const [shortDescription, setShortDescription] = useState("")
    const [isPublished, setIsPublished] = useState(false)
    const [type, setType] = useState<SourceType>(SOURCE_TYPE.UNKNOWN)
    const [slug, setSlug] = useState("")
    const [source, setSource] = useState<SourceSearchResult>({
        mal_id: 0, title: "", title_en: "", image_url: "", media_type: "", year: 0,
    })

    // Pre-fill form kalau mode edit
    useEffect(() => {
        if (!isEditMode) return

        const prefill = async () => {
            showGlobalLoading("Memuat data artikel...")
            try {
                const artikel = await getArtikelBySlug(source_type, slug_address)
                if (!artikel) throw new Error("Artikel tidak ditemukan")

                setArtikelId(artikel.id)
                setTitle(artikel.title)
                setSlug(artikel.slug)
                setShortDescription(artikel.short_description)
                setIsPublished(artikel.is_published)
                setTags(artikel.tags ?? [])
                setItems(artikel.rating_breakdown ?? [])
                setType(artikel.source_type as SourceType)
                setArtikelHtml(artikel.content_html)
                setArtikelJson(
                    typeof artikel.content_json === "string"
                        ? JSON.parse(artikel.content_json)
                        : artikel.content_json ?? EMPTY_DOC
                )
                setSource({
                    mal_id: artikel.source.mal_id,
                    title: artikel.source.title,
                    title_en: artikel.source.title_en,
                    image_url: artikel.source.image_url,
                    media_type: artikel.source.media_type,
                    year: artikel.source.year,
                })
            } catch (err) {
                const message = err instanceof Error ? err.message : "Gagal memuat artikel"
                showError(message)
            } finally {
                dismissGlobalLoading()
                setReady(true)
            }
        }

        prefill()
    }, [source_type, slug_address, isEditMode, setTags, setItems])

    // Tampilkan loading skeleton saat pre-fill belum selesai
    if (!ready) return (
        <div className="m-4 space-y-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded" />
            ))}
        </div>
    )

    return (
        <article className="m-4 rounded text-primer space-y-6">
            <header className="text-center pt-2">
                <h1 className="text-xl font-bold">
                    {isEditMode ? "Edit Artikel" : "Buat Artikel Baru"}
                </h1>
            </header>

            {/* SOURCE FINDING */}
            <section className="p-2 border border-primer rounded-lg">
                <h2 className="absolute px-1 bg-white -translate-y-6 text-lg font-semibold">
                    Source <span className="text-red-500">*</span>
                </h2>
                <SourceFinder initialSource={isEditMode ? source : null} initialType={isEditMode ? type : undefined} onSourceSelect={setSource} onTypeSelect={setType} />
            </section>

            {/* ARTIKEL CONTENT */}
            <section className="border border-primer p-2 rounded-md pt-3 z-0">
                <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">
                    Konten Artikel <span className="text-red-500">*</span>
                </h2>
                <div className="article-content">
                    <ContentEditor
                        initialContent={artikelJson}
                        onChange={({ html, json }) => { setArtikelHtml(html); setArtikelJson(json) }}
                    />
                </div>
            </section>

            {/* TITLE */}
            <section className="border border-primer p-2 rounded-md pt-3 z-0">
                <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">
                    Judul Artikel <span className="text-red-500">*</span>
                </h2>
                <span className="text-tersier text-sm">Paling optimal dibawah 100 karakter.</span>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                    placeholder="Masukkan judul artikel ini..."
                    className="w-full px-2 py-1 border rounded text-black" />
            </section>

            {/* SHORT DESCRIPTION */}
            <section className="border border-primer p-2 rounded-md pt-3 z-0">
                <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">
                    Deskripsi Singkat <span className="text-red-500">*</span>
                </h2>
                <span className="text-tersier text-sm">Paling optimal dibawah 200 karakter.</span>
                <input type="text" value={shortDescription} onChange={e => setShortDescription(e.target.value)}
                    placeholder="Masukkan hook artikel ini..."
                    className="w-full px-2 py-1 border rounded text-black" />
            </section>

            <div className="flex flex-col md:flex-row gap-4">
                {/* IS PUBLISHED */}
                <section className="border border-primer p-2 rounded-md pt-3 z-0 min-w-64">
                    <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">
                        Publish Publik <span className="text-red-500">*</span>
                    </h2>
                    <div className="flex items-center gap-3 h-full py-2">
                        <ToggleButton value={isPublished} onChange={setIsPublished} />
                        <span className="text-sekunder text-sm">
                            {isPublished ? "Terlihat secara publik" : "Disimpan sebagai draft"}
                        </span>
                    </div>
                </section>

                {/* SLUG */}
                <section className="border border-primer p-2 rounded-md pt-3 z-0 w-full">
                    <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">
                        URL Slug <span className="text-red-500">*</span>
                    </h2>
                    <span className="text-tersier text-sm">Tautan unik akses artikel ini.</span>
                    <div className="flex gap-1 items-center text-black">
                        <span className="border-b border-transparent">
                            {process.env.NEXT_PUBLIC_FRONTEND_URL}/{type}/
                        </span>
                        <input type="text" value={slug} onChange={e => setSlug(e.target.value)}
                            placeholder="ex: gimai-seikatsu"
                            className="w-full px-1 py-1 border-b rounded text-primer" />
                    </div>
                </section>
            </div>

            {/* RATING BREAKDOWN */}
            <section className="border border-primer p-2 rounded-md pt-3 z-0">
                <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">Rating Breakdown</h2>
                <span className="text-tersier text-sm">Berikan breakdown dari penilaian karya ini.</span>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <input type="text" value={breakdownNameInput}
                        onChange={e => setBreakdownNameInput(e.target.value)}
                        placeholder="Aspek (Ex: sound design)"
                        className="flex-1 px-2 py-1 border rounded text-black" />
                    <input type="text" value={breakdownValueInput}
                        onChange={e => setBreakdownValueInput(e.target.value)}
                        placeholder="Nilai (Ex: 10/10)"
                        className="flex-1 px-2 py-1 border rounded text-black" />
                    <button onClick={addRatingItem} className="bg-primer text-white px-3 py-1 rounded">
                        Tambah
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {ratingBreakdowns.map(r => (
                        <div key={r.name} className="flex items-center gap-2 px-2 py-1 bg-primer text-white text-sm rounded">
                            <span className="font-medium">{capitalize(r.name)} :</span>
                            <span>{r.value}</span>
                            <button onClick={() => removeRatingItem(r.name)} className="ml-1 text-xs hover:text-red-300">✕</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* TAGS */}
            <section className="border border-primer p-2 rounded-md pt-3 z-0">
                <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">Tags</h2>
                <span className="text-tersier text-sm">Enter untuk menambahkan tag baru.</span>
                <input type="text" value={inputTag}
                    onChange={e => setInputTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Masukkan tag terkait artikel ini..."
                    className="w-full px-2 py-1 border rounded text-black mt-2" />
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <div key={tag} className="flex items-center gap-1 px-2 py-1 bg-primer text-white text-sm rounded mt-2">
                            <span>{capitalize(tag)}</span>
                            <button onClick={() => removeTag(tag)} className="ml-1 text-xs hover:text-red-300">✕</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* SIMPAN */}
            <section className="flex justify-center">
                <button disabled={submitting} onClick={() => handleSubmit({
                    mode: "edit",
                    source_type: type,
                    data: {
                        artikel_id: artikelId,
                        mal_id: source.mal_id,
                        source_type: type,
                        title,
                        slug,
                        short_description: shortDescription,
                        is_published: isPublished,
                        tags,
                        content_html: artikelHtml,
                        content_json: artikelJson,
                        review_breakdown: ratingBreakdowns,
                    }
                })}
                    className="text-white text-md font-medium rounded bg-primer px-2 py-1">
                    {isEditMode ? "Simpan Perubahan" : "Simpan"}
                </button>
            </section>
        </article>
    )
}