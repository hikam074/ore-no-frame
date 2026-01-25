import { Anime } from "@/types/anime";
import { supabase } from "../supabase";

export async function getAllAnimes(): Promise<Anime[] | null> {
    const { data, error } = await supabase
        .from("v_anime_and_reviews_count")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.log(error);
        return []
    }

    return data
}