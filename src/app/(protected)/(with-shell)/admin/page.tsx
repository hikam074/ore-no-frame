'use client'

import MarkdownEditor from "@/components/admin/MarkdownEditor"
import AnimeFinder from "@/components/admin/AnimeFinder"

export default function AdminPage() {
    return (
        <article className='m-4 rounded text-accent space-y-6'>
            {/* HEADER */}
            <header className='text-center pt-2'>
                <h1 className="text-xl font-bold">Create New Review</h1>
            </header>
            {/* ANIME FINDING */}
            <section className="p-2 border border-accent rounded-lg">
                <h2 className="absolute px-1 bg-highlight -translate-y-6 text-lg font-semibold">Anime</h2>
                <AnimeFinder />
            </section>

            {/* REVIEWS INPUT */}
            <section className='border border-accent p-2 rounded-md pt-3 z-0'>
                <h2 className="absolute px-1 bg-highlight -translate-y-7 text-lg font-semibold">Your Review</h2>
                < MarkdownEditor />
            </section>

            {/* SUBMIT */}
            <section className="flex justify-center">
                <button className="text-text_darkmode text-md font-medium rounded bg-accent px-2 py-1">Submit</button>
            </section>
        </article>
    )
}
