'use client'

import { getAccessToken } from "@/lib/auth-client"
import { getReviewsByUser, jupukmanga } from "./services/reviews.service"
import { ReactNode, useEffect, useState } from "react"
import { ReviewFilter } from "@/types/filter"
import { ReviewAndAnimeResult } from "@/types/admin-page"
import { CheckLine, Eye, OctagonX, SquarePen, Trash2 } from "lucide-react"
import Link from "next/link"


const TH = ({ label, className }: { label: string, className?: string }) => {
    return <th className={`${className} p-2 border-b-2 border-b-accent2`}>{label}</th>
}
const TD = ({ child, className }: { child: ReactNode, className?: string }) => {
    return <td className={`${className} p-2 h-full border-b`}>{child}</td>
}
const TabPanelHeader = ({ tabIndex, label, currentActiveTab, onClick }: { tabIndex: number, label: string, currentActiveTab: number, onClick: (tabIndex: number) => void }) => {
    return (
        <button onClick={() => onClick(tabIndex)}
            className={`px-4 py-2 rounded-t font-semibold transition-all
            ${currentActiveTab == tabIndex
                    ? 'bg-accent2 border-2 border-b-accent2 border-accent2 text-surface'
                    : 'bg-surface border-2 border-b-surface border-surface text-accent2'}
                `}
        >{label}</button>
    )
}

export default function Dashboard_ReviewsClient() {
    // use
    const [animeReviews, setAnimeReviews] = useState<ReviewAndAnimeResult[]>([])
    const [mangaReviews, setMangaReviews] = useState<ReviewAndAnimeResult[]>([])
    const [filters, setFilters] = useState<ReviewFilter>({ sort: "latest" })
    const [activeTab, setActiveTab] = useState(0)
    // handle fetch
    const fetchReview = async (filters: ReviewFilter) => {
        // siapkan data
        const token = await getAccessToken()
        if (!token) throw new Error("Token is null")
        // dapatkan data
        /////////////////////////////////// COBA COBA
        let fetched
        if (activeTab == 1) {
            fetched = await jupukmanga(token, 333)
            setMangaReviews(fetched)
        }
        else {
            fetched = await getReviewsByUser(token, filters)
            setAnimeReviews(fetched)
        }
        ///////////////////////////////
        // const fetched = await getReviewsByUser(token, filters)
        console.log(fetched)
        
    }
    // handle tab
    const handleSwitchTab = (idx: number) => {
        setActiveTab(idx)
        // fetchReview(filters)
        // ujicoba data
        if (idx == 1) {

        }
        // coming soon
    }

    // init fetch
    // useEffect(() => {
    //     const loadInit = async () => {
    //         await fetchReview(filters)
    //     }
    //     loadInit()
    // }, [filters, activeTab])

    return (
        <section className="flex-1 p-2">
            <h1>{}</h1>
            <section className="">
                <TabPanelHeader tabIndex={0} label="Anime" currentActiveTab={activeTab} onClick={handleSwitchTab} />
                <TabPanelHeader tabIndex={1} label="Manga" currentActiveTab={activeTab} onClick={handleSwitchTab} />

                {activeTab == 0 && (
                    <section className="pt-2 bg-accent2 border-l- border-accent rounded rounded-s-none overflow-hidden">
                        <table className="table-auto bg-surface w-full rounded ">
                            <thead>
                                <tr>
                                    <TH label={"MAL ID"} className="bg-bg" />
                                    <TH label={"Title"} />
                                    <TH label={"Your score"} className="bg-bg" />
                                    <TH label={"Published"} />
                                    <TH label={"Created at"} className="bg-bg" />
                                    <TH label={"Updated at"} />
                                    <TH label={"Action"} className="bg-bg" />
                                </tr>
                            </thead>
                            <tbody>
                                {animeReviews?.map(r => (
                                    <tr key={r.id}>
                                        <TD child={r.mal_id} className="text-center bg-bg" />
                                        <TD child={r.anime.title} />
                                        <TD child={r.personal_score ?? '-'} className="text-center bg-bg" />
                                        <TD child={r.published ? <CheckLine className="h-5 text-green-600" /> : <OctagonX className="h-5 text-red-600" />} className="place-items-center" />
                                        <TD child={
                                            <span>
                                                <p>
                                                    {Intl.DateTimeFormat('en-GB', {
                                                        weekday: 'long', day: '2-digit', month: 'short', year: 'numeric'
                                                    }).format(new Date(r.created_at))}
                                                </p>
                                                <p>
                                                    {Intl.DateTimeFormat('en-GB', {
                                                        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                                                    }).format(new Date(r.created_at))}
                                                </p>
                                            </span>
                                        } className="text-center bg-bg" />
                                        <TD child={
                                            <span>
                                                <p>
                                                    {Intl.DateTimeFormat('en-GB', {
                                                        weekday: 'long', day: '2-digit', month: 'short', year: 'numeric'
                                                    }).format(new Date(r.updated_at))}
                                                </p>
                                                <p>
                                                    {Intl.DateTimeFormat('en-GB', {
                                                        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                                                    }).format(new Date(r.updated_at))}
                                                </p>
                                            </span>
                                        } className="text-center" />
                                        <TD child={
                                            <div className="flex gap-2 justify-center items-center">
                                                <Link href={`/anime/${r.mal_id}`} className="p-1 bg-blue-400 border rounded"><Eye className="h-4 w-4" /></Link>
                                                <button className="p-1 bg-yellow-400 border rounded"><SquarePen className="h-4 w-4" /></button>
                                                <button className="p-1 bg-red-600 border rounded"><Trash2 className="h-4 w-4" /></button>
                                            </div>
                                        } className="bg-bg" />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
                {activeTab == 1 && (
                    <section className="pt-2 bg-accent2 border-l- border-accent rounded rounded-s-none overflow-hidden">
                        <table className="table-auto bg-surface w-full rounded ">
                            <thead>
                                <tr>
                                    <TH label={"MAL ID"} className="bg-bg" />
                                    <TH label={"Title"} />
                                    <TH label={"Your score"} className="bg-bg" />
                                    <TH label={"Published"} />
                                    <TH label={"Created at"} className="bg-bg" />
                                    <TH label={"Updated at"} />
                                    <TH label={"Action"} className="bg-bg" />
                                </tr>
                            </thead>
                            <tbody>
                                {mangaReviews?.map(r => (
                                    <tr key={r.id}>
                                        <TD child={r.mal_id} className="text-center bg-bg" />
                                        <TD child={r.anime.title} />
                                        <TD child={r.personal_score ?? '-'} className="text-center bg-bg" />
                                        <TD child={r.published ? <CheckLine className="h-5 text-green-600" /> : <OctagonX className="h-5 text-red-600" />} className="place-items-center" />
                                        <TD child={
                                            <span>
                                                <p>
                                                    {Intl.DateTimeFormat('en-GB', {
                                                        weekday: 'long', day: '2-digit', month: 'short', year: 'numeric'
                                                    }).format(new Date(r.created_at))}
                                                </p>
                                                <p>
                                                    {Intl.DateTimeFormat('en-GB', {
                                                        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                                                    }).format(new Date(r.created_at))}
                                                </p>
                                            </span>
                                        } className="text-center bg-bg" />
                                        <TD child={
                                            <span>
                                                <p>
                                                    {Intl.DateTimeFormat('en-GB', {
                                                        weekday: 'long', day: '2-digit', month: 'short', year: 'numeric'
                                                    }).format(new Date(r.updated_at))}
                                                </p>
                                                <p>
                                                    {Intl.DateTimeFormat('en-GB', {
                                                        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                                                    }).format(new Date(r.updated_at))}
                                                </p>
                                            </span>
                                        } className="text-center" />
                                        <TD child={
                                            <div className="flex gap-2 justify-center items-center">
                                                <Link href={`/anime/${r.mal_id}`} className="p-1 bg-blue-400 border rounded"><Eye className="h-4 w-4" /></Link>
                                                <button className="p-1 bg-yellow-400 border rounded"><SquarePen className="h-4 w-4" /></button>
                                                <button className="p-1 bg-red-600 border rounded"><Trash2 className="h-4 w-4" /></button>
                                            </div>
                                        } className="bg-bg" />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </section>
        </section>
    )
}