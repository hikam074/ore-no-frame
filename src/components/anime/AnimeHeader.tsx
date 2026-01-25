import { MALAnime } from "@/types/mal";

export function AnimeHeader({ anime }: { anime: MALAnime }) {
    return (
        <header className="p-3 bg-highlight">
            <h1 className="text-accent font-bold text-xl sm:text-2xl">{anime.title}</h1>
            <span className="flex gap-2 text-muted text-xs sm:text-base">
                <p className="">{anime.alternative_titles?.ja}</p>
                <p className="text-text">|</p>
                <p className="">{anime.alternative_titles?.en}</p>
            </span>
        </header>
    )
}