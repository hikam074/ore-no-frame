'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useConfirm } from "@/components/layout/ConfirmContext";
import { dismissGlobalLoading, showError, showGlobalLoading } from "@/lib/toast"
import { setFlash } from "@/lib/flash"
import { getAccessToken } from "@/lib/auth-client"
import { createArtikel } from "./services/create-artikel.service"
import SourceFinder from "@/components/create-artikel/SourceFinder"
import { SOURCE_TYPE, SourceSearchResult, SourceType } from "@/types"
import ContentEditor from "@/components/create-artikel/ContentEditor"
import { capitalize, sanitizeArtikelPayload } from "@/utils";
import ToggleButton from "@/components/ToggleButton";
import { JSONContent } from "@tiptap/react";

const EMPTY_DOC: JSONContent = {
    type: "doc",
    content: [
        {
            type: "paragraph"
        }
    ]
}

export default function Page() {
    // state
    const [title, setTitle] = useState('')
    const [artikelHtml, setArtikelHtml] = useState("")
    const [artikelJson, setArtikelJson] = useState<JSONContent>(EMPTY_DOC)
    const [shortDescription, setShortDescription] = useState('')
    const [isPublished, setIsPublished] = useState(false)
    const [tags, setTags] = useState<string[]>([])
    const [type, setType] = useState<SourceType>(SOURCE_TYPE.UNKNOWN)
    const [inputTag, setInputTag] = useState('')
    const [slug, setSlug] = useState('')
    const [ratingBreakdowns, setRatingBreakdowns] = useState<{ name: string; value: string }[]>([])
    const [breakdownNameInput, setBreakdownNameInput] = useState("")
    const [breakdownValueInput, setBreakdownValueInput] = useState("")
    const [source, setSource] = useState<SourceSearchResult>({
        mal_id: 0,
        title: '',
        title_en: '',
        image_url: '',
        media_type: '',
        year: 0,
    })
    const [submitting, setSubmitting] = useState(false)
    // use
    const { confirm } = useConfirm();
    // use
    const router = useRouter()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()

            const value = inputTag.trim().toLowerCase()

            if (!value) return

            // prevent duplicate
            if (tags.includes(value)) {
                setInputTag("")
                return
            }

            setTags(prev => [...prev, value])
            setInputTag("")
        }
    }
    const removeTag = (tag: string) => {
        setTags(prev => prev.filter(t => t !== tag))
    }
    const addRatingItem = () => {
        const name = breakdownNameInput.trim()
        const value = breakdownValueInput.trim()

        if (!name || !value) return

        // prevent duplicate name
        if (ratingBreakdowns.some(r => r.name === name)) {
            setBreakdownNameInput("")
            setBreakdownValueInput("")
            return
        }

        setRatingBreakdowns(prev => [...prev, { name, value }])
        setBreakdownNameInput("")
        setBreakdownValueInput("")
    }
    const removeRatingItem = (name: string) => {
        setRatingBreakdowns(prev => prev.filter(r => r.name !== name))
    }

    // handler submit
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (submitting) return

        setSubmitting(true)

        try {
            const ok = await confirm({
                type: 'create',
                title: "Simpan artikel ini?",
                message: "Pastikan semua benar sebelum menyimpan"
            });

            if (!ok) return;

            showGlobalLoading("Menyimpan artikel...")

            const token = await getAccessToken()
            if (!token) throw new Error("Token is null")
            console.log(token);

            const payload = sanitizeArtikelPayload({
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
            })

            console.log(payload)

            const submitted = await createArtikel(payload, token)

            console.log("submitted:", submitted)

            if (!submitted?.slug) {
                showError("Gagal mengunggah artikel")
                return
            }

            setFlash("success", "Artikel berhasil diunggah!")
            router.push(`/${type}/${submitted.slug}`)

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

    return (
        <article className='m-4 rounded text-primer space-y-6'>
            {/* HEADER */}
            <header className='text-center pt-2'>
                <h1 className="text-xl font-bold">Buat Artikel Baru</h1>
            </header>

            {/* SOURCE FINDING */}
            <section className="p-2 border border-primer rounded-lg">
                <h2 className="absolute px-1 bg-white -translate-y-6 text-lg font-semibold">Source <span className="text-red-500">*</span></h2>
                <SourceFinder onSourceSelect={setSource} onTypeSelect={setType} />
            </section>

            {/* ARTIKEL CONTENT INPUT */}
            <section className='border border-primer p-2 rounded-md pt-3 z-0'>
                <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">Konten Artikel <span className="text-red-500">*</span></h2>
                <div className="article-content" >
                    <ContentEditor initialContent={artikelJson || "<p>Tulis konten di sini...</p>"} onChange={({ html, json }) => { setArtikelHtml(html); setArtikelJson(json) }} />
                </div>
            </section>

            {/* TITLE INPUT */}
            <section className='border border-primer p-2 rounded-md pt-3 z-0'>
                <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">Judul Artikel <span className="text-red-500">*</span></h2>
                <span className="text-tersier text-sm">Paling optimal dibawah 100 karakter.</span>
                <input type="text" value={title}
                    onChange={e => { setTitle(e.target.value) }}
                    placeholder="Masukkan judul artikel ini..."
                    className="w-full px-2 py-1 border rounded text-black" />
            </section>
            {/* SHORT DESCRIPTION INPUT */}
            <section className='border border-primer p-2 rounded-md pt-3 z-0'>
                <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">Deskripsi Singkat <span className="text-red-500">*</span></h2>
                <span className="text-tersier text-sm">Akan digunakan sebagai subheadline & hook, paling optimal dibawah 200 karakter.</span>
                <input type="text" value={shortDescription}
                    onChange={e => { setShortDescription(e.target.value) }}
                    placeholder="Masukkan hook artikel ini..."
                    className="w-full px-2 py-1 border rounded text-black" />
            </section>
            <div className="flex flex-col md:flex-row gap-4">

                {/* IS PUBLISHED INPUT */}
                <section className='border border-primer p-2 rounded-md pt-3 z-0 min-w-64'>
                    <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">Publish Publik <span className="text-red-500">*</span></h2>
                    <div className="flex items-center gap-3 h-full py-2">
                        <ToggleButton value={isPublished} onChange={setIsPublished} className="" />
                        {!isPublished
                            ? <span className="text-sekunder text-sm">Disimpan sebagai draft</span>
                            : <span className="text-sekunder text-sm">Terlihat secara publik</span>
                        }
                    </div>
                </section>

                {/* SLUG INPUT */}
                <section className='border border-primer p-2 rounded-md pt-3 z-0 w-full'>
                    <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">URL Slug <span className="text-red-500">*</span></h2>
                    <span className="text-tersier text-sm">Tautan unik akses artikel ini. Cukup masukkan &quot;slug&quot;nya.</span>
                    <div className="flex gap-1 items-center text-black">
                        <span className="border-b border-transparent">{process.env.NEXT_PUBLIC_FRONTEND_URL}/{type}/</span>
                        <input type="text" value={slug}
                            onChange={e => { setSlug(e.target.value) }}
                            placeholder="Enter Slug (ex: gimai-seikatsu)"
                            className="w-full px- py-1 border-b rounded text-primer" />
                    </div>
                </section>
            </div>


            {/* RATING BREAKDOWN INPUT */}
            <section className='border border-primer p-2 rounded-md pt-3 z-0'>
                <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">
                    Rating Breakdown
                </h2>
                <span className="text-tersier text-sm">
                    Berikan breakdown dari penilaian karya ini.
                </span>

                {/* INPUT */}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <input
                        type="text"
                        value={breakdownNameInput}
                        onChange={(e) => setBreakdownNameInput(e.target.value)}
                        placeholder="Aspek (Ex: sound design)"
                        className="flex-1 px-2 py-1 border rounded text-black"
                    />

                    <input
                        type="text"
                        value={breakdownValueInput}
                        onChange={(e) => setBreakdownValueInput(e.target.value)}
                        placeholder="Nilai (Ex: 10/10)"
                        className="flex-1 px-2 py-1 border rounded text-black"
                    />

                    <button
                        onClick={addRatingItem}
                        className="bg-primer text-white px-3 py-1 rounded"
                    >
                        Tambah
                    </button>
                </div>

                {/* LIST */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {ratingBreakdowns.map(r => (
                        <div
                            key={r.name}
                            className="flex items-center gap-2 px-2 py-1 bg-primer text-white text-sm rounded"
                        >
                            <span className="font-medium">{capitalize(r.name)} :</span>
                            <span>{r.value}</span>

                            <button
                                onClick={() => removeRatingItem(r.name)}
                                className="ml-1 text-xs hover:text-red-300"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* TAGS INPUT */}
            <section className='border border-primer p-2 rounded-md pt-3 z-0'>
                <h2 className="absolute px-1 bg-white -translate-y-7 text-lg font-semibold">Tags</h2>

                <span className="text-tersier text-sm">
                    Enter untuk menambahkan tag baru.
                </span>

                {/* INPUT */}
                <input
                    type="text"
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Masukkan tag terkait artikel ini..."
                    className="w-full px-2 py-1 border rounded text-black mt-2"
                />

                {/* TAG LIST */}
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <div
                            key={tag}
                            className="flex items-center gap-1 px-2 py-1 bg-primer text-white text-sm rounded mt-2"
                        >
                            <span>{capitalize(tag)}</span>
                            <button
                                onClick={() => removeTag(tag)}
                                className="ml-1 text-xs hover:text-red-300"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

            </section>

            {/* SIMPAN */}
            <section className="flex justify-center">
                <button disabled={submitting} onClick={handleSubmit} className="text-white text-md font-medium rounded bg-primer px-2 py-1">Simpan</button>
            </section>

        </article>
    )
}