import ArtikelCard from "@/components/artikel/ArtikelCard";
import { getAllActiveUnknownArtikel } from "@/lib/consumers/artikel.consumer";
import { ArtikelKard } from "@/types";

export const metadata = {
  title: "Unknown",
};

export default async function Page() {
    const artikels: ArtikelKard[] = await getAllActiveUnknownArtikel();
    return (
        <section className="m-2 p-4 border border-kuarter rounded">
            <h2 className="text-2xl font-semibold text-primer">Artikel Unknown</h2>
            <span className="text-sm text-sekunder">Berbagai impresi & opini kurasakan untuk karya selain kategori anime & manga</span>
            <div className="grid lg:grid-cols-2 gap-4 mt-4">
                {artikels?.map(item => (
                    <ArtikelCard data={item} key={item.id} />
                ))}
            </div>
        </section>
    )
}