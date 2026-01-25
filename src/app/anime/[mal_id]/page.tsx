import { notFound } from "next/navigation";

import { fetchAnimePageData } from "@/lib/consumers/anime.consumer";

import { AnimeHeader } from "@/components/anime/AnimeHeader";
import { AnimeOverview } from "@/components/anime/AnimeOverview";
import { AnimeGeneralInfo } from "@/components/anime/AnimeGeneralInfo";
import { AnimeSynopsis } from "@/components/anime/AnimeSynopsis";
import { AnimeReviewSection } from "@/components/anime/AnimeReviewSection";

type Props = {
    params: { mal_id: string}
}

export default async function AnimePage({ params }: Props ) {
    const par = await params
    const malId = Number(par.mal_id)

    const data = await fetchAnimePageData(malId)
    if (!data) return notFound()

    const { mal, reviews } = data

    return (
        <article className="text-text border border-border">
            <AnimeHeader anime={mal}></AnimeHeader>

            <section className="flex gap-4 p-2 bg-surface">
                <AnimeOverview anime={mal}></AnimeOverview>

                <section className="w-4/5 flex flex-col gap-4">
                    <AnimeGeneralInfo anime={mal}></AnimeGeneralInfo>
                    <AnimeSynopsis anime={mal}></AnimeSynopsis>
                    <AnimeReviewSection reviews={reviews}></AnimeReviewSection>
                </section>

            </section>
        </article>
    )
}