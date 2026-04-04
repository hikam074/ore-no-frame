export const SOURCE_TYPE = {
  ANIME: "anime",
  MANGA: "manga",
  UNKNOWN: "unknown",
} as const

export type SourceType = typeof SOURCE_TYPE[keyof typeof SOURCE_TYPE]