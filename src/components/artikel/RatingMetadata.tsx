import { RatingBreakdown } from "@/types";
import { capitalize } from "@/utils";

export default function RatingMetadata({ rating, className }: { rating: RatingBreakdown[], className?: string }) {
    return (
        <div className={className}>
            <span className="font-semibold text-center">Rating Reviewer</span>
            <div className="mt-2 w-auto
                flex gap-2 flex-wrap justify-center sm:justify-start
            ">
                {rating.map(r => (
                    <div key={r.id} className="px-2 py-1 bg-tersier text-xs text-white rounded">
                        <span>{capitalize(r.name)} : {capitalize(r.value)}</span>
                    </div>
                ))
                }
            </div>
        </div>
    )
}