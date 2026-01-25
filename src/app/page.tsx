import { getAllAnimes } from "@/lib/supabase/home.supa";
import Link from "next/link";
import Image from "next/image";
import { Star, Hash, MessageCircleMore } from "lucide-react";

export default async function HomePage() {
  const animes = await getAllAnimes()
  return (
    <>
      <section className="bg-surface m-4 p-4 pt-2 rounded space-y-2">
        <h1 className="font-semibold text-2xl text-accent">Anime Suggestion</h1>
        <hr />
        {/* kards */}
        <div className="flex gap-2 ">
          {animes?.map(anime => (
            <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
              <article
                className="
                p-1 flex flex-col items-center text-center
                bg-surface w-48 rounded h-full shadow-2xl
                "
              >
                <Image
                  src={anime.image_url ?? 'https://placehold.co/100x300'}
                  width={200}
                  height={300}
                  alt={anime.title ?? 'placeholder-title'}
                  className="w-full rounded"
                />

                <div className="p-2 bg-surface w-full h-full flex flex-col justify-between">
                  <div className="mb-2">
                    <h2 className="font-semibold text-base leading-tight">{anime.title}</h2>
                    <p className="font-thin text-sm">{anime.year}</p>
                  </div>
                  <div className="font-thin text-sm flex justify-between">
                    <span className="flex items-center">
                      <Star className="h-4" />
                      <p>{anime.mal_score}</p>
                    </span>
                    <span className="flex items-center">
                      <Hash className="h-4" />
                      <p >{anime.mal_rank}</p>
                    </span>
                    <span className="flex items-center">
                      <MessageCircleMore className="h-4" />
                      <p >{anime.reviews_count}</p>
                    </span>
                  </div>
                </div>

              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
