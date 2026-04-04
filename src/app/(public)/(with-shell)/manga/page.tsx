import ArtikelCard from "@/components/artikel/ArtikelCard";
import { getAllActiveMangaArtikel } from "@/lib/consumers/artikel.consumer";
import { ArtikelKard } from "@/types";

export default async function Page() {
    const artikels: ArtikelKard[] = await getAllActiveMangaArtikel();
    return (
        <section className="m-2 p-4 border border-kuarter rounded">
            <h2 className="text-2xl font-semibold text-primer">Artikel Manga</h2>
            <span className="text-sm text-sekunder">Berbagai impresi & opini kurasakan setelah membaca manga</span>
            <div className="grid lg:grid-cols-2 gap-4 mt-4">
                {artikels?.map(item => (
                    <ArtikelCard data={item} key={item.id} />
                ))}
            </div>
        </section>
    )
}