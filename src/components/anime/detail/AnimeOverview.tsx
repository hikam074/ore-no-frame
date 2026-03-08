import { Anime } from "@/types/anime";
import Image from "next/image";

type AnimeOverviewProps = {
    anime: Anime
}

const AnimeOverview = ({ anime }: AnimeOverviewProps) => {
    return (
        <section className="w-48 sm:w-1/5 border-r">
            <div className="p-1 border border-r-0 border-border sm:gap-1 flex flex-col items-center">

                {/* image */}
                <Image
                    src={anime.image_url }
                    width={600}
                    height={900}
                    alt={anime.title ?? 'placeholder-title'}>
                </Image>
                {/* image end */}

                {/* button href */}
                <a href={`https://myanimelist.net/anime/${anime.mal_id}/`} target="_blank"
                    className="w-full text-xs text-center py-1 
                    text-text_darkmode bg-accent 
                    border border-1 border-accent  
                    sm:rounded-md 
                    transition-all hover:bg-surface hover:text-accent hover:sm:scale-[1.01] hover:sm:shadow-lg
                    "
                >
                    More Information
                </a>
                {/* button href end */}

            </div>
        </section>
    )
}

export default AnimeOverview