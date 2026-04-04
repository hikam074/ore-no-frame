export const ANIME_TYPE = {
  UNKNOWN: "unknown",
  TV: "tv",
  OVA: "ova",
  MOVIE: "movie",
  SPECIAL: "special",
  ONA: "ona",
  MUSIC: "music",
} as const

export type AnimeType = typeof ANIME_TYPE[keyof typeof ANIME_TYPE]