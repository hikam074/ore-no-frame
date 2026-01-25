import Link from "next/link"
import { Anime } from "@/types/anime"
import Image from "next/image"
import { Star, Hash, MessageCircleMore } from "lucide-react";

export function AnimeCard({ anime }: { anime: Anime }) {
    return (
        <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
            <article className="
                p-1 flex flex-col items-center text-center
                bg-surface rounded h-full shadow-2xl
                sm:w-48
                "
            >
                <Image
                    src={anime.image_url ?? 'https://placehold.co/100x300'}
                    width={100}
                    height={150}
                    alt={anime.title ?? 'placeholder-title'}
                    className="w-full rounded"
                />

                <div className="p-2 bg-surface w-full h-full flex flex-col justify-between">
                    <div className="mb-2">
                        <h2 className="font-semibold text-sm sm:text-base leading-tight">{anime.title}</h2>
                        <p className="font-thin text-xs sm:text-sm">{anime.year}</p>
                    </div>
                    <div className="font-thin text-xs sm:text-sm flex justify-between">
                        <span className="flex items-center">
                            <Star className="h-3 sm:h-4" />
                            <p>{anime.mal_score}</p>
                        </span>
                        <span className="flex items-center">
                            <Hash className="h-3 sm:h-4" />
                            <p >{anime.mal_rank}</p>
                        </span>
                        <span className="flex items-center">
                            <MessageCircleMore className="h-3 sm:h-4" />
                            <p >{anime.reviews_count}</p>
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}