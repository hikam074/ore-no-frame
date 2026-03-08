import { fetchHomeAnime } from "@/lib/consumers/home.consumer";
import AnimeSuggestion from "@/components/anime/AnimeSuggestion";

export default async function AnimePage() {
  const animes = await fetchHomeAnime()
  return (
    <>
      <AnimeSuggestion title={'Recommendation'} animes={animes}/>
    </>
  );
}
