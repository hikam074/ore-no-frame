'use client'

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api/fetcher"
import { ArtikelKard } from "@/types"
import DashboardTabs, { SourceType, TABS } from "@/components/dashboard/artikel-anda/DashboardTabs"
import ArtikelTabel from "@/components/dashboard/artikel-anda/ArtikelTabel"

export default function Page() {
    // data ditampilkan
    const [artikels, setArtikels] = useState<ArtikelKard[]>([])
    // tab mana yg aktif
    const [activeTab, setActiveTab] = useState(0)
    // lagi loading fetch tidak
    const [loading, setLoading] = useState(false)
    // ambil artikel dr BE
    const fetchArtikel = async (type: SourceType) => {
        try {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 3000))
            const data = await apiFetch<ArtikelKard[]>(`/artikel?source_type=${type}`)
            setArtikels(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    // setiap activeTab berubah maka fetch data untuk tab itu
    useEffect(() => {
        fetchArtikel(TABS[activeTab] as SourceType)
    }, [activeTab])

    return (
        <section className="flex-1 p-6">
            {/* JUDUL */}
            <header>
                <h1 className="text-4xl font-bold text-primer">Artikel Anda</h1>
                <p className="text-sekunder">Artikel, review, jurnal, pembahasan yang telah anda tuliskan.</p>
            </header>
            
            <section className="mt-6">
                {/* TAB NAVIGATION */}
                <DashboardTabs activeTab={activeTab} onChange={setActiveTab} />
                {/* DATA TABEL */}
                <section className="border-t-4 border border-tersier overflow-auto">
                    <ArtikelTabel artikels={artikels} loading={loading} />
                </section>
            </section>
        </section>
    )
}