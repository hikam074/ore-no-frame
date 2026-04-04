import ArtikelDetailPage from "@/components/artikel/ArtikelDetailPage"

type Props = { params: { slug: string } }

export default async function Page({ params }: Props) {
    const { slug } = await params
    return (
        <ArtikelDetailPage
            source_type="anime"
            slug={slug}
        />
    )
}