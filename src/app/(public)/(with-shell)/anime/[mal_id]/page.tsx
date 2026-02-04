import { notFound } from "next/navigation";

import { fetchAnimeDetailPageData } from "@/lib/consumers/anime.consumer";

import AnimeHeader from "@/components/anime/AnimeHeader";
import AnimeOverview from "@/components/anime/AnimeOverview";
import AnimeGeneralInfo from "@/components/anime/AnimeGeneralInfo";
import AnimeSynopsis from "@/components/anime/AnimeSynopsis";
import AnimeReviewSection from "@/components/anime/AnimeReviewSection";

type Props = {
    params: { mal_id: string }
}

export default async function AnimeDetailPage({ params }: Props) {
    const par = await params
    const malId = Number(par.mal_id)

    const data = await fetchAnimeDetailPageData(malId)

    if (!data) return notFound()

    // const { mal, reviews } = data

    return (
        <article className="text-text border border-border">
            <AnimeHeader anime={data.metadata} />

            <section aria-label="Anime detail mobile" className="flex flex-col gap-4 p-2 bg-surface sm:hidden">

                <section className="w-full flex gap-4">
                    <AnimeOverview anime={data.metadata} />
                    <AnimeGeneralInfo anime={data.metadata} />
                </section>
                <section className="w-full flex flex-col gap-4">
                    <AnimeSynopsis anime={data.metadata} />
                    <AnimeReviewSection reviews={data.reviews} />
                </section>

            </section>

            <section aria-label="Anime detail desktop" className="hidden gap-4 p-2 bg-surface sm:flex">
                <AnimeOverview anime={data.metadata} />

                <section className="w-4/5 flex flex-col gap-4">
                    <AnimeGeneralInfo anime={data.metadata} />
                    <AnimeSynopsis anime={data.metadata} />
                    <AnimeReviewSection reviews={data.reviews} />
                </section>

            </section>
            
        </article>
    )
}