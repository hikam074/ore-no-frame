import { fetchArtikelDetail } from "@/lib/consumers/artikel.consumer"
import { notFound } from "next/navigation"
import SourceMetadata from "@/components/artikel/SourceMetadata"
import ArtikelMetadata from "@/components/artikel/ArtikelMetadata"

type Props = { params: { source_type: string; slug: string } }

export default async function Page({ params }: Props) {
    const { source_type, slug } = await params
    if (!source_type || !slug) return notFound()

    const data = await fetchArtikelDetail(source_type, slug)
    if (!data) return notFound()

    return (
        <div className="p-4">
            {/* HEADER */}
            <header className="">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-primer">{data.title}</h1>
            </header>

            {/* METADATA ARTIKEL */}
            <ArtikelMetadata reviewer={data.reviewer} created_at={data.created_at} tags={data.tags} />

            {/* METADATA SOURCE */}
            <SourceMetadata source={data.source} />

            {/* CONTENT */}
            <section className="w-full px-4 article-content">
                <div dangerouslySetInnerHTML={{ __html: data.content_html }} />
            </section>
        </div>
    )
}