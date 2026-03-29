'use client'

import { SOURCE_TYPE } from "@/types"
import { capitalize } from "@/utils"

export const TABS = Object.values(SOURCE_TYPE)
export type SourceType = typeof TABS[number]

interface DashboardTabsProps {
    activeTab: number
    onChange: (index: number) => void
}

export default function DashboardTabs({ activeTab, onChange }: DashboardTabsProps) {
    return (
        <div className="flex gap-1">
            {TABS.map((tab, i) => (
                <button
                    key={tab}
                    onClick={() => onChange(i)}
                    className={`px-4 py-2 rounded-t font-semibold transition-all
                        ${activeTab === i
                            ? 'bg-tersier text-white border-t border-r border-l border-tersier'
                            : 'bg-white text-tersier border-t border-r border-l border-tersier'
                        }`}
                >
                    {capitalize(tab)}
                </button>
            ))}
        </div>
    )
}