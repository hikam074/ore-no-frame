import { DashboardStatisticSummaryData } from "@/types";

export default function StatisticSummary({ data, className }: { data: DashboardStatisticSummaryData, className?: string }) {
    return (
        <div className={className}>
            {/* TOTAL ARTIKEL AKTIF */}
            <div className="border border-tersier p-4 rounded-lg flex flex-col">
                <span className="font-semibold text-primer">Total Artikel Aktif</span>
                <span className="font-light text-sekunder">{data?.total_active_article} pages</span>
            </div>
            {/* TOTAL SEMUA ARTIKEL */}
            <div className="border border-tersier p-4 rounded-lg flex flex-col">
                <span className="font-semibold text-primer">Total Semua Artikel</span>
                <span className="font-light text-sekunder">{data?.total_all_article} pages</span>
            </div>
            {/* TOTAL ARTIKEL DIUPLOAD BULAN INI */}
            <div className="border border-tersier p-4 rounded-lg flex flex-col">
                <span className="font-semibold text-primer">Artikel Diunggah Bulan Ini</span>
                <span className="font-light text-sekunder">{data?.this_month_created} pages</span>
            </div>
            {/* TOTAL ARTIKEL DIUPDATE BULAN INI */}
            <div className="border border-tersier p-4 rounded-lg flex flex-col">
                <span className="font-semibold text-primer">Artikel Di-update Bulan Ini</span>
                <span className="font-light text-sekunder">{data?.this_month_updated} pages</span>
            </div>
        </div>
    )
}