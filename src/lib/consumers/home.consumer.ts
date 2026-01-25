import { getAllAnimes } from "../supabase/home.supa";
import { Anime } from "@/types/anime";

export async function fetchHomePageData(): Promise<Anime[] | null> {
    const animes = await getAllAnimes()
    if (!animes) return null

    return animes
}