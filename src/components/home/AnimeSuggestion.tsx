import { Anime } from "@/types/anime"
import AnimeCard from "./AnimeCard"

type AnimeSuggestionProps = {
    animes: Anime[] | null
}

const AnimeSuggestion = ({ animes }: AnimeSuggestionProps) => {
    return (
        <section className="bg-surface m-4 p-4 pt-2 rounded space-y-2">
            <h1 className="font-semibold text-xl sm:text-2xl text-accent">Anime Suggestion</h1>
            <hr className="border-t-accent2" />

            <div className="gap-2 
                grid grid-cols-2 
                sm:flex sm:flex-wrap
            ">
                {animes?.map(anime => (
                    <AnimeCard anime={anime} key={anime.mal_id} />
                ))}
            </div>

        </section>
    )
}

export default AnimeSuggestion