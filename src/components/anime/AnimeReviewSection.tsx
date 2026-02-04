import { Review } from "@/types/review"
import ReactMarkdown from "react-markdown"

type AnimeReviewSectionProps = {
  reviews: Review[]
}
const AnimeReviewSection = ({ reviews }: AnimeReviewSectionProps) => {
  return (
    <section>
      {reviews.length === 0 && (
        <section>
          <h2 className="text-text text-lg font-medium">Review</h2>
          <hr />
          <p className="text-text_muted italic">No review yet.</p>
        </section>
      )}

      {reviews.map((review) => (
        <section key={review.id}>
          <div className="flex justify-between">
            <h2 className="text-text text-lg font-medium">Review</h2>
            <span className="font-light text-accent italic">By {review.reviewer_name}</span>
          </div>
          <hr />

          <article className="
            prose prose-neutral
            prose-li:my-0 prose-ol:my-0
            prose-h3:mt-2 prose-h3:mb-0 prose-h3:border-b prose-h3:border-border
            prose-h3:text-lg prose-h3:font-normal
            max-w-none leading-relaxed text-text_muted mb-2
          "
          >
            <ReactMarkdown>{review.content}</ReactMarkdown>
          </article>
        </section>
      ))}

      <hr />
    </section>
  )
}
export default AnimeReviewSection