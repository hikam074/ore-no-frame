// import { fetchSourceSearch } from "@/lib/consumers/admin.consumer"
import { capitalize } from "@/utils/modules/capitalize"
import { useEffect, useState } from "react"
import Image from "next/image"
import { SOURCE_TYPE, SourceSearchResult, SourceType } from "@/types"
import { getSourceSearch } from "@/lib/consumers/artikel.consumer"

type SourceFinderProps = {
    onSourceSelect: (selected: SourceSearchResult) => void
    onTypeSelect: (selected: SourceType) => void
    initialSource?: SourceSearchResult | null
    initialType?: SourceType
}
const SourceFinder = ({ onSourceSelect, onTypeSelect, initialSource, initialType }: SourceFinderProps) => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SourceSearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [typeSelected, setTypeSelected] = useState<SourceType>(initialType ?? SOURCE_TYPE.UNKNOWN)
    const [sourceSelected, setSourceSelected] = useState<SourceSearchResult | null>(initialSource ?? null)

    const handleSourceSelect = (source: SourceSearchResult) => {
        onSourceSelect(source)
    }
    const handleTypeSelect = (type: SourceType) => {
        onTypeSelect(type)
    }

    useEffect(() => {
        if (initialType) setTypeSelected(initialType)
    }, [initialType])

    useEffect(() => {
        if (initialSource) setSourceSelected(initialSource)
    }, [initialSource])

    useEffect(() => {
        if (query.trim().length < 1 || typeSelected == SOURCE_TYPE.UNKNOWN) {
            setResults([])
            return
        }
        const timer = setTimeout(async () => {
            setLoading(true)
            try {
                const res = await getSourceSearch(typeSelected, query)
                setResults(res)
            } finally {
                setLoading(false)
            }
        }, 1000)
        return () => clearTimeout(timer)
    }, [query, typeSelected])
    return (

        <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
            {/* finder */}
            <section className="flex flex-col border border-white p-2 rounded-md">
                <label className="font-semibold " htmlFor="anime_text">Cari Source dari MyAnimeList</label>
                <div className="flex gap-2 mb-2 flex-col md:flex-row">
                    <select className="border border-tersier px-2 py-1 rounded-md focus:shadow-lg" value={typeSelected}
                        onChange={(e) => {
                            const value = e.target.value as SourceType
                            setTypeSelected(value)
                            handleTypeSelect(value)
                        }}>
                        <option value={SOURCE_TYPE.UNKNOWN}>Pilih Type...</option>
                        <option value={SOURCE_TYPE.ANIME}>{capitalize(SOURCE_TYPE.ANIME)}</option>
                        <option value={SOURCE_TYPE.MANGA}>{capitalize(SOURCE_TYPE.MANGA)}</option>
                    </select>
                    <input type="text" value={query}
                        placeholder="Masukkan title anime/manga..."
                        disabled={typeSelected == SOURCE_TYPE.UNKNOWN}
                        onChange={e => { setQuery(e.target.value) }}
                        className={`
                            py-1 px-2 rounded-md w-full border border-tersier shadow
                            ${typeSelected != SOURCE_TYPE.UNKNOWN ?
                                'focus:shadow-lg hover:border-primer'
                                : ''}
                        `}
                    />
                    <button className={
                        `px-4 py-1 bg-tersier text-white font-semibold rounded-md border border-tersier transition-all
                        ${typeSelected != SOURCE_TYPE.UNKNOWN ? 'hover:bg-white hover:text-tersier hover:scale-105' : ''}`
                    }
                        disabled={typeSelected == SOURCE_TYPE.UNKNOWN}
                        onClick={() => { setQuery("") }}
                    >Clear</button>
                </div>
                <div className="flex-1 border rounded bg-white overflow-y-auto">
                    {(!loading && results.length < 1) && <div className="p-4 text-center text-tersier">Source tersedia akan muncul disini...</div>}
                    {loading && <p className="p-2">Searching...</p>}
                    <ul>
                        {results.map(result => (
                            <li key={result.mal_id}
                                onClick={() => { setSourceSelected(result); handleSourceSelect(result) }}
                                className="
                                    p-2 border border-b border-x-transparent border-t-transparent flex justify-between gap-2 cursor-pointer transition-all
                                    hover:border-tersier hover:border-2
                                "
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold">{result.title}</span>
                                    {result.title_en && <span className="font-light text-sm">{result.title_en}</span>}
                                    <span className="text-sm mt-auto">{capitalize(result.media_type.replace(/_/g, " "))} ({result.year})</span>
                                </div>
                                <Image
                                    src={result.image_url}
                                    width={50}
                                    height={75}
                                    alt={result.title ?? 'placeholder-title'}>
                                </Image>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* selected */}
            <section className="flex-1 border border-white p-2 rounded-md">
                <div className="flex justify-between">
                    <h3 className="font-semibold">Dipilih</h3>
                    <button className="font-light text-tersier underline text-sm" onClick={() => { setSourceSelected(null) }}>Batalkan pilihan ini</button>
                </div>
                {!sourceSelected &&
                    <div className="bg-white p-3 rounded-md text-center text-tersier border-2 border-tersier">
                        Pilih anime/manga...
                    </div>
                }
                {sourceSelected &&
                    <div className="
                        bg-white p-3 rounded-md flex justify-between gap-2 shadow transition-all
                        hover:scale-[1.01] hover:shadow-lg border-2 border-green-600
                        "
                    >
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold">{sourceSelected.title}</span>
                            {sourceSelected.title_en && <span className="font-light text-sm">{sourceSelected.title_en}</span>}
                            <span className="text-sm mt-auto">{capitalize(sourceSelected.media_type.replace(/_/g, " "))} ({sourceSelected.year})</span>
                        </div>
                        <Image
                            src={sourceSelected.image_url}
                            width={60}
                            height={90}
                            alt={sourceSelected.title ?? 'anime-title'}>
                        </Image>
                    </div>
                }
            </section>
        </div>

    )
}
export default SourceFinder