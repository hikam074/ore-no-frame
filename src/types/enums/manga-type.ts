export const MANGA_TYPE = {
  UNKNOWN: "unknown",
  MANGA: "manga",
  NOVEL: "novel",
  ONE_SHOT: "one_shot",
  DOUJINSHI: "doujinshi",
  MANHWA: "manhwa",
  MANHUA: "manhua",
  OEL: "oel",
} as const

export type MangaType = typeof MANGA_TYPE[keyof typeof MANGA_TYPE]