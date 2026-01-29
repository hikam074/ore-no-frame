import { MALAnime } from "@/types/mal";
import { capitalize } from "@/utils/capitalize";

export function AnimeGeneralInfo({ anime }: { anime: MALAnime }) {
    return (
        <div className="bg-bg p-2 w-full
        grid gap-2 
        sm:grid-cols-5">
            <div className="grid grid-cols-3 gap-2 sm:col-span-3 sm:grid-cols-3">
                <AnimeGeneralInfoItem property="Type" value={anime.media_type} />
                <AnimeGeneralInfoItem property="Season" value={anime.start_season?.season} />
                <AnimeGeneralInfoItem property="Year" value={anime.start_season?.year} />
            </div>
            <div className="sm:col-span-1">
                <AnimeGeneralInfoItem property="Studio(s)"
                    value={anime.studios?.map(s => s.name).join(", ")}
                />
            </div>
            <div className="sm:col-span-1">
                <AnimeGeneralInfoItem property="Genre(s)"
                    value={anime.genres?.map(g => g.name).join(", ")}
                />
            </div>
        </div>
    )
}

export function AnimeGeneralInfoItem({ property, value }: { property: string, value?: string | number | null }) {
    return (
        <p className="text-text text-sm sm:text-base">
            <span className=" block text-text_muted text-xs sm:text-sm">
                {property}
            </span>
            <span className="font-medium">
                {value ? capitalize(String(value)) : "-"}
            </span>
        </p>
    )
}