import { MALAnime } from "@/types/mal";
import { supabaseAdmin } from "../supabase";

export async function lazyUpdateAnime(mal: MALAnime) {
    const payload = {
        mal_id: mal.id,
        title: mal.title,
        image_url: mal.main_picture?.large,
        media_type: mal.media_type,
        mal_score: mal.mean,
        season: mal.start_season?.season,
        year: mal.start_season?.year,
        mal_rank: mal.rank,
        updated_at: new Date().toISOString(),
    }
    const res = await supabaseAdmin
        .from("animes")
        .upsert(payload, { onConflict: "mal_id" })
    console.log(`[LOG] LazyUpdateSupa : (${res.status}) ${res.statusText}`)
}