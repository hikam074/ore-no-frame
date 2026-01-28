'use client'

import { MarkdownEditor } from "@/components/admin/MarkdownEditor"

export default function AdminPage() {
    return (
        <article className='m-4 rounded text-accent'>
            {/* HEADER */}
            <header className='text-center p-4'>
                <h1 className="text-xl font-bold">Create New Review</h1>
            </header>
            {/* ANIME FINDING */}
            <section>
                <input type="text" name="anime_text" />
            </section>
            {/* REVIEWS INPUT */}
            <section className='bg-highlight p-2'>
                <h2 className="text-lg font-semibold">Your Review</h2>
                < MarkdownEditor />
            </section>
            {/* SUBMIT */}
            <section className="flex justify-center">
                <button className="text-surface text-md font-medium rounded bg-accent px-2 py-1">Submit</button>
            </section>
        </article>
    )
}
