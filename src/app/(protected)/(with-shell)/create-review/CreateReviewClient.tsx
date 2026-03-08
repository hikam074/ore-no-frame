'use client'

import MarkdownEditor from "@/components/create-review/MarkdownEditor"
import AnimeFinder from "@/components/create-review/AnimeFinder"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimeSearchResult } from "@/types/admin-page"
import { useConfirm } from "@/components/layout/ConfirmContext";
import { dismissGlobalLoading, showError, showGlobalLoading } from "@/lib/toast"
import { setFlash } from "@/lib/flash"
import { getAccessToken } from "@/lib/auth-client"
import { createReview } from "./services/create-review.service"

export default function CreateReviewClient() {
    // state
    const [review, setReview] = useState('')
    const [anime, setAnime] = useState<AnimeSearchResult>({
        mal_id: 0,
        title: '',
        title_en: '',
        image_url: '',
        media_type: '',
        year: 0,
    })
    // use
    const { confirm } = useConfirm();
    // use
    const router = useRouter()

    // handler submit
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // konfirmasi
        const ok = await confirm({
            type: 'create',
            title: "Post this review?",
            message: "Make sure everything is correct before submitting."
        });
        if (!ok) return;

        // pasang toast loading
        showGlobalLoading("Publishing review...")

        // prepare all data
        const token = await getAccessToken() // token
        if (!token) throw new Error("Token is null")
        const sanitizedReview = review  // review
            .replace(/\r\n/g, "\n")             // normalize windows newline
            .replace(/\n{3,}/g, "\n\n")         // max 2 newline
            .replace(/\n\n(\d+\.)/g, "\n$1")    // hapus blank line sebelum numbered list

        // call service untuk submit
        const submitted = await createReview({
            mal_id: anime.mal_id,
            review: sanitizedReview
        }, token)

        // cek hasil
        console.log(submitted)
        // error kalau gagal
        if (!submitted) {
            dismissGlobalLoading()
            showError("Failed to create review")
            return;
        }

        // pasang toast success kalau berhasil
        setFlash("success", "Review created");
        // push ke halaman detail
        router.push(`/anime/${anime.mal_id}`);
        return
    }

    return (
        <article className='m-4 rounded text-accent space-y-6'>
            {/* HEADER */}
            <header className='text-center pt-2'>
                <h1 className="text-xl font-bold">Create New Review</h1>
            </header>
            {/* ANIME FINDING */}
            <section className="p-2 border border-accent rounded-lg">
                <h2 className="absolute px-1 bg-highlight -translate-y-6 text-lg font-semibold">Anime</h2>
                <AnimeFinder onSelect={setAnime} />
            </section>

            {/* REVIEWS INPUT */}
            <section className='border border-accent p-2 rounded-md pt-3 z-0'>
                <h2 className="absolute px-1 bg-highlight -translate-y-7 text-lg font-semibold">Your Review</h2>
                < MarkdownEditor initValue="" onChange={setReview} />
            </section>

            {/* SUBMIT */}
            <section className="flex justify-center">
                <button onClick={handleSubmit} className="text-text_darkmode text-md font-medium rounded bg-accent px-2 py-1">Submit</button>
            </section>
        </article>
    )
}
