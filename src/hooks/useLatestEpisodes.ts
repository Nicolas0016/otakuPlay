import { useEffect, useState } from "react";
import { TLatestAnimes } from "../types/animesTypes";

export default function useLatestEpisodes() {
  const [episodes, setEpisodes] = useState<TLatestAnimes[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEpisodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/latest-episodes");
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      setEpisodes(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  return { episodes, loading, error, fetchEpisodes };
}
