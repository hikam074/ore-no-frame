import { getArtikelDetail } from "@/lib/consumers/artikel.consumer"
import ArtikelMetadata from "./ArtikelMetadata"
import SourceMetadata from "./SourceMetadata"
import { notFound } from "next/navigation"
import RatingMetadata from "./RatingMetadata"


type Props = {
    source_type: string
    slug: string
}

export default async function ArtikelDetailPage({ source_type, slug }: Props) {
    if (!source_type || !slug) return notFound()

    const data = await getArtikelDetail(source_type, slug)
    if (!data) return notFound()

    return (
        <div className="p-4">
            <header>
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-primer">
                    {data.title}
                </h1>
            </header>

            {/* REVIEWER */}
            <ArtikelMetadata
                reviewer={data.reviewer}
                created_at={data.created_at}
                tags={data.tags}
            />

            {/* IMAGE & INFORMASI KARYAW */}
            <SourceMetadata source={data.source} rating={data.rating_breakdown} />

            {/* RATING BREAKDOWN < SM */}
            {data.rating_breakdown.length > 0 && (
                <section className="flex sm:hidden justify-center mb-4">
                    <RatingMetadata
                        rating={data.rating_breakdown}
                        className="border border-tersier p-2 rounded text-center
                        text-primer text-xs
                    " />
                </section>
            )}

            {/* CONTENT */}
            <section className="w-full px-4 article-content">
                <div dangerouslySetInnerHTML={{ __html: data.content_html }} />
            </section>
        </div>
    )
}