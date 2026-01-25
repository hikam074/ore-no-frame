'use client'

import { useEffect,useState } from "react"
import { supabase } from "@/lib/supabase"
import { Anime } from "@/types/anime"

export default function AdminPage() {
    const [animes, setAnimes] = useState<Anime[]>([])
    useEffect(() => {
        supabase.from('animes').select('*').then(({ data }) => {
            if (data) setAnimes(data as Anime[])
        })
    }, [])

    return (
        <div>
            <h1>Admin</h1>
            {animes.map( a => (
                <div key={a.id} className="text-center border-1 m-4">{a.title}</div>
            ))}
        </div>
    )
}