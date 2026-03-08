import { AnimeDetailData } from "@/types/anime-page";
import { capitalize } from "@/utils/capitalize";

type AnimeGeneralInfoProps = {
    anime: AnimeDetailData
}
const AnimeGeneralInfo = ({ anime }: AnimeGeneralInfoProps) => {
    return (
        <div className="bg-bg p-2 w-full
        grid gap-2 
        sm:grid-cols-5">
            <div className="grid grid-cols-3 gap-2 sm:col-span-3 sm:grid-cols-3">
                <AnimeGeneralInfoItem property="Type" value={anime.media_type} />
                <AnimeGeneralInfoItem property="Season" value={anime.season} />
                <AnimeGeneralInfoItem property="Year" value={anime.year.toString()} />
            </div>
            <div className="sm:col-span-1">
                <AnimeGeneralInfoItem property="Studio(s)"
                    value={anime.studios}
                />
            </div>
            <div className="sm:col-span-1">
                <AnimeGeneralInfoItem property="Genre(s)"
                    value={anime.genres}
                />
            </div>
        </div>
    )
}

type AnimeGeneralInfoItemProps = {
    property: string, value?: string[] | string
}

const AnimeGeneralInfoItem = ({ property, value }: AnimeGeneralInfoItemProps) => {
    let text
    if(Array.isArray(value)){
        text = value.join(', ')
    } else {
        text = value?.toString()
    }
    return (
        <p className="text-text text-sm sm:text-base">
            <span className=" block text-text_muted text-xs sm:text-sm">
                {property}
            </span>
            <span className="font-medium">
                {value ? capitalize(String(text)) : "-"}
            </span>
        </p>
    )
}

export default AnimeGeneralInfo