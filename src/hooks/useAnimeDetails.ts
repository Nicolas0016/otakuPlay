import { useCallback, useEffect, useState } from "react";
import { TAnimeDetails } from "../types/animesTypes";

export default function useAnimeDetails(idAnime: string | undefined) {
  const [anime, setAnime] = useState<TAnimeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAnimeDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:5000/anime/${idAnime}`);
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      setAnime(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [idAnime]);

  useEffect(() => {
    fetchAnimeDetails();
  }, [fetchAnimeDetails]);

  return { anime, loading, error, retry: fetchAnimeDetails };
}
