import { MALAnime } from "@/types/mal";

export function AnimeSynopsis({ anime }: { anime: MALAnime }) {
    return (
        <div className="text-text_muted leading-relaxed">
            <h2 className="text-text font-medium">Synopsis</h2>
            <hr />
            <p>{anime.synopsis}</p>
            <a href={`https://myanimelist.net/anime/${anime.id}/`} target="_blank"
                className="font-light pt-1 italic text-accent"
            >
                Source: myanimelist.net
            </a>
            <hr />
        </div>
    )
}