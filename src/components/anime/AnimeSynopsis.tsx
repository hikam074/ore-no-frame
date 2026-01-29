import { MALAnime } from "@/types/mal";

type AnimeSynopsisProps = {
    anime: MALAnime
}

const AnimeSynopsis = ({ anime }: AnimeSynopsisProps) => {
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

export default AnimeSynopsis