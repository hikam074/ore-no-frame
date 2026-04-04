import ArtikelDetailPage from "@/components/artikel/ArtikelDetailPage"

export const metadata = {
  title: "Anime Artikel",
};

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