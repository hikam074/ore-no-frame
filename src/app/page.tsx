import { getAllAnimes } from "@/lib/supabase/home.supa";
import { AnimeSuggestion } from "@/components/home/AnimeSuggestion";

export default async function HomePage() {
  const animes = await getAllAnimes()
  return (
    <>
      <AnimeSuggestion animes={animes}/>
    </>
  );
}
