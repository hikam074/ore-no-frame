"use client"

import { DashboardChartData, LabelDictionary } from "@/types"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const CustomTooltip = ({
    active,
    payload,
    label
}: { active?: boolean, payload?: LabelDictionary[], label?: string }) => {
    if (!active || !payload?.length) return null

    return (
        <div className="p-3 rounded-lg pt-1 bg-tersier text-white"
        >
            <span className="text-sm font-medium">{label}</span>
            {payload.map((entry, i) => (
                <div key={i} className="text-xs font-extralight">
                    {entry.name}: {entry.value}
                </div>
            ))}
        </div>
    )
}

export default function StatisticChart({ data = null, className }: { data: DashboardChartData | null, className?: string }) {
    const chartData = (() => {
        if (!data) return []

        const created = data.statistic_article_created || []
        const updated = data.statistic_article_updated || []

        const updatedMap = Object.fromEntries(
            updated.map(u => [u.name, u.value])
        )
        return created.map(item => ({
            name: item.name,
            created: item.value,
            updated: updatedMap[item.name] ?? 0
        }))
    })()

    return (
        <div className={className}>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart
                    data={chartData}
                    barGap={0}
                    barCategoryGap="20%"
                    tabIndex={-1}
                >
                    <CartesianGrid strokeDasharray="5 5" />

                    <XAxis dataKey="name" />
                    <YAxis width={15} allowDecimals={false} />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend />

                    <Bar
                        dataKey="created"
                        name="Article Created"
                        fill="#09637E"
                        minPointSize={(v) => (v === 0 ? 3 : 0)}
                    />

                    <Bar
                        dataKey="updated"
                        name="Article Updated"
                        fill="#7AB2B2"
                        minPointSize={(v) => (v === 0 ? 3 : 0)}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}