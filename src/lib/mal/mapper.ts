// import { Anime } from "@/types/anime"
// import { AnimeDetailData } from "@/types/anime-page"
// import { MALAnime } from "@/types/mal-anime.dto"

// export function mapMALAnimeTOAnime(mal: MALAnime): Anime {
//   return {
//     mal_id: mal.id,
//     title: mal.title,
//     image_url: mal.main_picture?.large ?? "unknown",
//     media_type: mal.media_type ?? "unknown",
//     season: mal.start_season?.season ?? "unknown",
//     year: mal.start_season?.year ?? 0,
//     mal_score: mal.mean ?? 0,
//     mal_rank: mal.rank ?? 0,
//     reviews_count: 0,
//     created_at: 'unknown',
//     updated_at: 'unknown',
//   }
// }

// export function mapMALAnimeToAnimeDetailData(mal: MALAnime): AnimeDetailData {
//   return {
//     mal_id: mal.id,
//     title: mal.title,
//     title_ja: mal.alternative_titles?.ja ?? '', 
//     title_en: mal.alternative_titles?.en ?? '', 
//     synopsis: mal.synopsis ?? '-',
//     image_url: mal.main_picture?.large ?? "unknown",
//     media_type: mal.media_type ?? "unknown",
//     season: mal.start_season?.season ?? "unknown",
//     year: mal.start_season?.year ?? 0,
//     mal_score: mal.mean ?? 0,
//     mal_rank: mal.rank ?? 0,
//     reviews_count: 0,
//     studios: mal.studios?.map(s => s.name) ?? [],
//     genres: mal.genres?.map(s => s.name) ?? [],
//     reviews; [],
//     created_at: 'unknown',
//     updated_at: 'unknown',
//   }
// }

// export function mapMALAnimeTOAnime(mal: MALAnime): Anime {
//   return {
//     mal_id: mal.id,
//     title: mal.title,
//     image_url: mal.main_picture?.large ?? "unknown",
//     media_type: mal.media_type ?? "unknown",
//     season: mal.start_season?.season ?? "unknown",
//     year: mal.start_season?.year ?? 0,
//     mal_score: mal.mean ?? 0,
//     mal_rank: mal.rank ?? 0,
//     reviews_count: 0,
//     created_at: 'unknown',
//     updated_at: 'unknown',
//   }
// }