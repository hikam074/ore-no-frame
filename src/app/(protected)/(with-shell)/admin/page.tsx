'use client'

import MarkdownEditor from "@/components/admin/MarkdownEditor"
import AnimeFinder from "@/components/admin/AnimeFinder"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimeSearchResult } from "@/types/admin-page"
import { createSupabaseBrowser } from "@/lib/supabase/client"
import { useConfirm } from "@/components/layout/ConfirmContext";
import { showError, showGlobalLoading } from "@/lib/toast"
import { setFlash } from "@/lib/flash"

export default function AdminPage() {
    const [review, setReview] = useState('')
    const [anime, setAnime] = useState<AnimeSearchResult>({
        mal_id: 0,
        title: '',
        title_en: '',
        image_url: '',
        media_type: '',
        year: 0,
    })
    const { confirm } = useConfirm();
    const router = useRouter()
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // konfirmasi
        const ok = await confirm({
            type: 'create',
            title: "Post this review?",
            message: "Make sure everything is correct before submitting."
        });
        if (!ok) return;


        try {
            showGlobalLoading("Publishing review...")
            
            const supabase = await createSupabaseBrowser()
            const { data: { session } } = await supabase.auth.getSession()
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/review`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`,
                },
                body: JSON.stringify({
                    mal_id: anime.mal_id,
                    review: review
                })
            })
            if (!res.ok) {
                showError("Failed to create review")
                return;
            }
            
            setFlash("success", "Review created");
            router.push(`/anime/${anime.mal_id}`);
            return
        } catch (err: unknown) {
            if (err instanceof Error) {
                showError(err.message)
            } else {
                showError("Login gagal")
            }
        }
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
