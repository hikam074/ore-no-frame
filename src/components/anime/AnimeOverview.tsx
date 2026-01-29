import { MALAnime } from "@/types/mal";
import Image from "next/image";

type AnimeOverviewProps = {
    anime: MALAnime
}

const AnimeOverview = ({ anime }: AnimeOverviewProps) => {
    return (
        <section className="w-48 sm:w-1/5 border-r">
            <div className="p-1 border border-r-0 border-border sm:gap-1 flex flex-col items-center">

                {/* image */}
                <Image
                    src={anime.main_picture?.large ?? 'https://placehold.co/100x300'}
                    width={600}
                    height={900}
                    alt={anime.title ?? 'placeholder-title'}>
                </Image>
                {/* image end */}

                {/* button href */}
                <a href={`https://myanimelist.net/anime/${anime.id}/`} target="_blank"
                    className="w-full text-xs text-center text-text_darkmode py-1 sm:rounded-md bg-accent"
                >
                    More Information
                </a>
                {/* button href end */}

            </div>
        </section>
    )
}

export default AnimeOverview