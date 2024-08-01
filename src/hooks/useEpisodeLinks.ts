import { useEffect, useState } from "react";

interface Links {
  code: string;
  title: string;
}

export default function useEpisodeLinks(
  idAnime: string | undefined,
  idEpisode: string | undefined
) {
  const [episodeLinks, setEpisodeLinks] = useState<Links[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (idAnime && idEpisode) {
      const fetchEpisodeLinks = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://127.0.0.1:5000/links/${idAnime}/${idEpisode}`
          );
          if (!response.ok) throw new Error("Network response was not ok.");
          const data = await response.json();
          setEpisodeLinks(data);
          setSelectedPlatform(data[0]?.code || "");
        } catch (error) {
          setError("Error fetching episode links. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchEpisodeLinks();
    }
  }, [idAnime, idEpisode]);

  return {
    episodeLinks,
    selectedPlatform,
    setSelectedPlatform,
    loading,
    error,
  };
}
