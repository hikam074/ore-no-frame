import ArtikelCard from "@/components/artikel/ArtikelCard";
import { getAllActiveArtikel } from "@/lib/consumers/artikel.consumer";
import { ArtikelKard } from "@/types";

type Props = {
    searchParams: Promise<{ query: string }>
}
export default async function Page({ searchParams }: Props) {
    const { query = "" } = await searchParams
    console.log(query)

    const artikels: ArtikelKard[] = await getAllActiveArtikel(query);
    return (
        <section className="m-2 p-4 border border-kuarter rounded">
            <h2 className="text-2xl font-semibold text-primer">Hasil Pencarian</h2>
            <span className="text-sm text-sekunder">Hasil penelusuran untuk kata kunci {`'${query}'`}</span>
            <div className="grid lg:grid-cols-2 gap-4 mt-4">
                {artikels?.map(item => (
                    <ArtikelCard data={item} key={item.id} />
                ))}
            </div>
        </section>
    )
}