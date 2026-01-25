import { MALAnime } from "@/types/mal";
import { capitalize } from "@/utils/capitalize";

export function AnimeGeneralInfo({ anime }: { anime: MALAnime }) {
    return (
        <div className="flex gap-10 bg-bg p-2">
            <p className="text-text"><span className="text-muted">Type <br /></span>{capitalize(anime.media_type)}</p>
            <p className="text-text"><span className="text-muted">Season <br /></span>{capitalize(anime.start_season?.season)}</p>
            <p className="text-text"><span className="text-muted">Year <br /></span>{anime.start_season?.year}</p>
            <p className="text-text"><span className="text-muted">Studio(s) <br /></span>{anime.studios?.map(s => (s.name))}</p>
            <p className="text-text"><span className="text-muted">Genre(s) <br /></span>{anime.genres?.map(s => (s.name)).join(", ")}</p>
        </div>
    )
}