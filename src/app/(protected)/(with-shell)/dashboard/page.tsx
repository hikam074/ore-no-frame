import { getDashboardData } from "@/lib/consumers/artikel.consumer"
import StatisticChart from "@/components/dashboard/summary/StatisticChart"
import RecentTable from "@/components/dashboard/summary/RecentTable"
import StatisticSummary from "@/components/dashboard/summary/StatisticSummary"

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const data = await getDashboardData()

  return (
    <section className="flex-1 p-6 space-y-4">

      {/* JUDUL */}
      <header>
        <h1 className="text-4xl font-bold text-primer">Selamat Datang</h1>
        <p className="text-sekunder">Dashboard Artikel, review, jurnal, pembahasan yang telah anda tuliskan.</p>
      </header>

      {/* STATISTIC INFO */}
      <StatisticSummary data={{
        total_active_article: data.total_active_article,
        total_all_article: data.total_all_article,
        this_month_created: data.this_month_created,
        this_month_updated: data.this_month_updated
      }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm sm:text-base"
      />

      {/* CHART */}

      <StatisticChart data={data} className="w-full text-xs" />


      {/* RECENT CREATED & UPLOADED TABLE */}
      <RecentTable data={{
        recent_created_articles: data.recent_created_articles,
        recent_updated_articles: data.recent_updated_articles
      }}
        className="w-full grid lg:grid-cols-2 gap-6"
      />

    </section>
  )
}