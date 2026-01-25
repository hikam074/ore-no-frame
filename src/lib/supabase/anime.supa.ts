import { supabase } from "../supabase";
import { Anime } from "@/types/anime";

export async function fetchAnimeByMalId(malId: number): Promise<Anime | null> {
    const { data, error } = await supabase
    .from("animes")
    .select("*")
    .eq("mal_id", malId)
    .single()

    if (error) return null
    return data
}