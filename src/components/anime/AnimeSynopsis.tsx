import { AnimeDetailData } from "@/types/anime-page"

type AnimeSynopsisProps = {
    anime: AnimeDetailData
}

const AnimeSynopsis = ({ anime }: AnimeSynopsisProps) => {
    return (
        <div className="text-text_muted leading-relaxed">
            <h2 className="text-text font-medium">Synopsis</h2>
            <hr />
            <p>{anime.synopsis}</p>
            <a href={`https://myanimelist.net/anime/${anime.mal_id}/`} target="_blank"
                className="font-light pt-1 italic text-accent hover:text-accent2"
            >
                Source: myanimelist.net
            </a>
            <hr />
        </div>
    )
}

export default AnimeSynopsis