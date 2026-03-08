import { fetchReviewsByUser } from "@/lib/consumers/anime.consumer"
import { apekmanga } from "@/lib/consumers/manga.consumer"
import { ReviewAndAnimeResult } from "@/types/admin-page"
import { ReviewFilter } from "@/types/filter"

export async function getReviewsByUser(token: string, payload?: ReviewFilter): Promise<ReviewAndAnimeResult[]> { 
    const reviews = await fetchReviewsByUser({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })

    return reviews
}

export async function jupukmanga(token: string, id: number): Promise<ReviewAndAnimeResult[]> { 
    const reviews = await apekmanga(id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })

    return reviews
}