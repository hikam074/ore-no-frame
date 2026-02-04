import { fetchHomeAnime } from "@/lib/consumers/home.consumer";
import AnimeSuggestion from "@/components/home/AnimeSuggestion";

export default async function HomePage() {
  const animes = await fetchHomeAnime()
  return (
    <>
      <AnimeSuggestion animes={animes}/>
    </>
  );
}
