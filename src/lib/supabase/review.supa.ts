import { supabase } from "../supabase";
import { Review } from "@/types/review";

export async function fetchReviewByMalId(malId: number): Promise<Review[]> {
    const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("mal_id", malId)
    .order("created_at", { ascending: false})

    if (error) {
        console.log(error)
        return []
    }

    return data
}