import { fetchAnimeSearch } from "@/lib/consumers/admin.consumer"
import { AnimeSearchResult } from "@/types/admin-page"
import { capitalize } from "@/utils/capitalize"
import { useEffect, useState } from "react"
import Image from "next/image"

const AnimeFinder = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<AnimeSearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState<AnimeSearchResult | null>(null)

    useEffect(() => {
        if (query.trim().length < 3) {
            setResults([])
            return
        }
        const timer = setTimeout(async () => {
            setLoading(true)
            try {
                const res = await fetchAnimeSearch(query)
                setResults(res)
            } finally {
                setLoading(false)
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [query])
    return (

        <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
            {/* finder */}
            <section className="flex flex-col border border-white p-2 rounded-md">
                <label className="font-semibold " htmlFor="anime_text">Search Anime</label>
                <div className="flex gap-2 mb-2">
                    <input type="text" value={query}
                        placeholder="Enter at least 3 letters of the title"
                        onChange={e => { setQuery(e.target.value) }}
                        className="
                            py-1 px-2 rounded-md w-full border border-accent shadow
                            focus:shadow-lg
                            hover:border-accent2
                        "
                    />
                    <button className="
                        px-4 py-1 bg-accent text-surface font-semibold rounded-md border border-accent transition-all
                        hover:bg-surface hover:text-accent hover:scale-105
                        "
                        onClick={() => { setQuery("") }}
                    >Clear</button>
                </div>
                <div className="flex-1 border rounded bg-white overflow-y-auto">
                    {(!loading && results.length < 1) && <div className="p-4 text-center text-accent2">Enter an anime title...</div>}
                    {loading && <p className="p-2">Searchinggggg</p>}
                    <ul>
                        {results.map(anime => (
                            <li key={anime.mal_id}
                                onClick={() => setSelected(anime)}
                                className="
                                    p-2 border border-b border-x-transparent border-t-transparent flex justify-between gap-2 cursor-pointer transition-all
                                    hover:border-accent2 hover:border-2
                                "
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold">{anime.title}</span>
                                    {anime.title_en && <span className="font-light text-sm">{anime.title_en}</span>}
                                    <span className="text-sm mt-auto">{capitalize(anime.media_type)} ({anime.year})</span>
                                </div>
                                <Image
                                    src={anime.image_url}
                                    width={50}
                                    height={75}
                                    alt={anime.title ?? 'placeholder-title'}>
                                </Image>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* selected */}
            <section className="flex-1 border border-white p-2 rounded-md">
                <div className="flex justify-between">
                    <h3 className="font-semibold">Selected</h3>
                    <button className="font-light text-accent2 underline text-sm" onClick={() => { setSelected(null) }}>Cancel selected</button>
                </div>
                {!selected &&
                    <div className="bg-surface p-3 rounded-md text-center text-accent2 border-2 border-border">
                        Select an anime...
                    </div>
                }
                {selected &&
                    <div className="
                        bg-surface p-3 rounded-md flex justify-between gap-2 shadow transition-all
                        hover:scale-[1.01] hover:shadow-lg border-2 border-green-600
                        "
                    >
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold">{selected.title}</span>
                            {selected.title_en && <span className="font-light text-sm">{selected.title_en}</span>}
                            <span className="text-sm mt-auto">{capitalize(selected.media_type)} ({selected.year})</span>
                        </div>
                        <Image
                            src={selected.image_url}
                            width={60}
                            height={90}
                            alt={selected.title ?? 'anime-title'}>
                        </Image>
                    </div>
                }
            </section>
        </div>

    )
}
export default AnimeFinder