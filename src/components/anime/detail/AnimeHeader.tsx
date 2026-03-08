import { AnimeDetailData } from "@/types/anime-page";
type AnimeHeaderProps = {
    anime: AnimeDetailData
}

const AnimeHeader = ({ anime }: AnimeHeaderProps) => {
    return (
        <header className="p-3 bg-highlight">
            <h1 className="text-accent font-bold text-xl sm:text-2xl">{anime.title}</h1>
            <span className="flex gap-2 text-text_muted text-xs sm:text-base">
                <p className="">{anime.title_ja}</p>
                <p className="text-text">|</p>
                <p className="">{anime.title_en}</p>
            </span>
        </header>
    )
}

export default AnimeHeader