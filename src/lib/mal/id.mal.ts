import { MALAnime } from "@/types/mal";

const MAL_BASE_URL = "https://api.myanimelist.net/v2"
const CLIENT_ID = process.env.MAL_CLIENT_ID!

export async function fetchMALAnime(malId: number) : Promise<MALAnime | null> {
    const res = await fetch(
        `${MAL_BASE_URL}/anime/${malId}?fields=title,main_picture,alternative_titles,synopsis,media_type,mean,rank,start_season,studios,genres`,
        {
            headers: {
                "X-MAL-CLIENT-ID": CLIENT_ID,
            },
            next: {
                revalidate: 60 * 60, // cache 1 jam
            },
        })
    if (!res.ok) return null;
    return res.json()
}