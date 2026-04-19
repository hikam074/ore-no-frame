'use client'

import Image from "next/image"
import { ANIME_TYPE, RatingBreakdown, Source } from "@/types"
import { arrayStringify, capitalize } from "@/utils"
import { FactoryIcon, HashIcon, RssIcon, StarIcon, TagsIcon, TvMinimalPlayIcon, TypeIcon, UserRoundPenIcon } from "lucide-react"
import RatingMetadata from "./RatingMetadata"

interface SourceMetadataProps {
    source: Source
    rating?: RatingBreakdown[]
}

export default function SourceMetadata({ source, rating }: SourceMetadataProps) {
    return (
        <section className="flex justify-center gap-4 mb-4">
            {/* POSTER */}
            <Image
                src={source.image_url}
                alt={source.title}
                width={250}
                height={375}
                className="rounded object-cover max-w-[50%]"
            />

            {/* INFO BOX */}
            <div className="border border-tersier p-2 rounded text-primer text-xs sm:text-sm flex flex-col gap-2">
                <p className="font-semibold pb-2">Informasi Karya</p>

                {/* TITLE */}
                <span className="flex gap-1 items-start">
                    <TypeIcon size={18} />
                    <div className="flex flex-col">
                        <span className="font-medium">{source.title}</span>
                        {source.title_ja && <span className="text-abu">{source.title_ja}</span>}
                        {source.title_en && <span className="text-abu">{source.title_en}</span>}
                    </div>
                </span>

                {/* TIPE */}
                <span className="flex gap-1">
                    <TvMinimalPlayIcon size={18} />
                    {capitalize(source.media_type) ?? '--'}
                    {source.media_type === ANIME_TYPE.TV && source.source_type ? ` ${capitalize(source.source_type)}` : ''}
                </span>

                {/* AIRING INFO */}
                <span className="flex gap-1">
                    <RssIcon size={18} />
                    {source.season ? `${capitalize(source.season)}, ` : ''}
                    {source.month ? `${capitalize(source.month)} ` : ''}
                    {source.year ?? ''}
                </span>

                {/* GENRES */}
                <span className="flex gap-1">
                    <TagsIcon size={18} />
                    {arrayStringify(source.genres) ?? '--'}
                </span>

                {/* STUDIOS */}
                {source.studios.length > 0 && (
                    <span className="flex gap-1">
                        <FactoryIcon size={18} />
                        {arrayStringify(source.studios)}
                    </span>
                )}

                {/* AUTHOR */}
                {source.author_name.length > 0 && (
                    <span className="flex gap-1">
                        <UserRoundPenIcon size={18} />
                        {arrayStringify(source.author_name)}
                    </span>
                )}

                {/* RANK & SCORE */}
                <div className="flex flex-row gap-2">
                    <span className="flex gap-1">
                        <HashIcon size={18} />
                        {source.mal_rank ?? '--'}
                    </span>
                    <span className="flex gap-1">
                        <StarIcon size={18} />
                        {source.mal_score ?? '--'}
                    </span>
                </div>

                {/* RATING BREAKDOWN > SM */}
                {rating && rating?.length > 0 && (
                    <RatingMetadata 
                    rating={rating} 
                    className="hidden sm:inline rounded mt-4 max-w-xs
                    text-primer text-sm 
                    " />
                )}
            </div>
        </section>
    )
}