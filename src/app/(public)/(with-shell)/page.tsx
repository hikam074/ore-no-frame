import { getAllArtikelKards } from "@/lib/consumers/artikel.consumer";
import { ArtikelKard } from "@/types/modules/artikel";
import ArtikelCard from "@/components/artikel/ArtikelCard";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  const artikels: ArtikelKard[] = await getAllArtikelKards();

  return (
    <>
      {/* HEADING */}
      <section className="text-center text-white bg-tersier py-12">
        <h1 className="text-7xl sm:text-8xl font-semibold">SisiFrame</h1>
        <span className="text-xs sm:text-base">Esai Review, Pembahasan, atau Sekedar Jurnal Lewat Blog</span>
      </section>

      {/* SECTION KARDS ARTIKEL */}
      <section className="m-2 p-4 border border-kuarter rounded">
        <h2 className="text-2xl font-semibold text-primer">Impresi Terbaru</h2>
        <span className="text-sm text-sekunder">Apa yang kurasakan setelah menonton?</span>
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          {artikels?.map(item => (
            <ArtikelCard data={item} key={item.id} />
          ))}
        </div>
      </section>
    </>
  );
}