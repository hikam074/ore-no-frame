import { DashboardRecentTableData } from "@/types";
import { capitalize, formatTanggalIndo } from "@/utils";
import Link from "next/link";

export default function RecentTable({ data, className }: { data: DashboardRecentTableData, className?: string }) {
    return (
        <div className={className}>

            {/* TABLE RECENT CREATED */}
            <div>
                <h2 className="md:text-lg font-bold text-primer mb-2">Artikel di-upload terbaru</h2>
                <table className="border-b border-tersier">
                    <thead className="border-b border-tersier text-sekunder text-xs sm:text-base text-left">
                        <tr>
                            <th className="px-2 font-semibold">Title</th>
                            <th className="px-2 font-semibold">Type</th>
                            <th className="px-2 font-semibold">Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.recent_created_articles?.map(c => (
                            <tr key={c.id} className="odd:bg-white even:bg-kuarter text-xs sm:text-sm">
                                <td className="break-words p-2 text-primer">
                                    <Link href={`/${c.source_type}/${c.slug}`}>{c.title}</Link>
                                </td>
                                <td className="p-2">{capitalize(c.source_type)}</td>
                                <td className="p-2">{formatTanggalIndo(c.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* TABLE RECENT UPDATE */}
            <div>
                <h2 className="md:text-lg font-bold text-primer mb-2">Artikel di-update terbaru</h2>
                <table className="border-b border-tersier">
                    <thead className="border-b border-tersier text-sekunder text-xs sm:text-base text-left">
                        <tr>
                            <th className="px-2 font-semibold">Title</th>
                            <th className="px-2 font-semibold">Type</th>
                            <th className="px-2 font-semibold">Updated at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.recent_updated_articles?.map(c => (
                            <tr key={c.id} className="odd:bg-white even:bg-kuarter text-xs sm:text-sm">
                                <td className="break-words p-2 text-primer">
                                    <Link href={`/${c.source_type}/${c.slug}`}>{c.title}</Link>
                                </td>
                                <td className="p-2">{capitalize(c.source_type)}</td>
                                <td className="p-2">{formatTanggalIndo(c.updated_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}