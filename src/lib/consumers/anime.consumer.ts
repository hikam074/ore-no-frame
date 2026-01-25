import { fetchMALAnime } from "../mal/id.mal";
import { fetchReviewByMalId } from "../supabase/review.supa";
import { AnimePageData } from "@/types/anime-page";
import { fetchAnimeByMalId } from "../supabase/anime.supa";
import { shouldUpdateAnime } from "../lazy/shouldUpdateAnime";
import { lazyUpdateAnime } from "../supabase/anime.lazy";

export async function fetchAnimePageData(malId: number): Promise<AnimePageData | null> {
    const [mal, dbAnime, reviews] = await Promise.all([
        fetchMALAnime(malId),
        fetchAnimeByMalId(malId),
        fetchReviewByMalId(malId)
    ])

    if (!mal) return null

    if (shouldUpdateAnime(dbAnime)) {
        lazyUpdateAnime(mal)
    } else {
        console.log(`[INFO] LazyUpdateSupa : data is up to date`)
    }

    return {
        mal,
        dbAnime,
        reviews
    }
}