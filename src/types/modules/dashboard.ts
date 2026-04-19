import { ArtikelKard } from "./artikel"

// CORE
export type LabelDictionary = {
    name: string
    value: number
}
export type DashboardSummary = {
    total_active_article: number
    total_all_article: number
    statistic_article_created: LabelDictionary[]
    statistic_article_updated: LabelDictionary[]
    this_month_created: number
    this_month_updated: number
    recent_created_articles: ArtikelKard[]
    recent_updated_articles: ArtikelKard[]
}
export type DashboardStatisticSummaryData = Pick<DashboardSummary,
    'total_active_article' |
    'total_all_article' |
    'this_month_created' |
    'this_month_updated'
>
export type DashboardChartData = Pick<DashboardSummary,
    'statistic_article_created' |
    'statistic_article_updated'
>
export type DashboardRecentTableData = Pick<DashboardSummary,
    'recent_created_articles' |
    'recent_updated_articles'
>