'use client'

import { User } from "@/types"
import { formatTanggalIndo } from "@/utils"
import { CalendarArrowUpIcon, UserIcon } from "lucide-react"

interface ArtikelMetadataProps {
    reviewer: User
    created_at: string
    tags: string[]
}

export default function ArtikelMetadata({ reviewer, created_at, tags }: ArtikelMetadataProps) {
    return (
        <section className="flex flex-col md:flex-row gap-4 py-4">
            {/* REVIEWER & PUBLISHED AT */}
            <div className="flex text-tersier text-sm gap-4">
                <span className="flex items-center">
                    <UserIcon className="mr-1" /> {reviewer.name}
                </span>
                <span className="flex items-center">
                    <CalendarArrowUpIcon className="mr-1" /> {formatTanggalIndo(created_at)}
                </span>
            </div>

            {/* TAGS */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 ">
                    {tags.map(tag => (
                        <div key={tag} className="px-2 py-1 bg-tersier text-xs text-white rounded">
                            <span>{tag}</span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}