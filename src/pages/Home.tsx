import { Link } from "react-router-dom";
import SkeletonHome from "../components/SkeletonHome";
import { formatName } from "../hooks/formatName";
import useLatestEpisodes from "../hooks/useLatestEpisodes";

export default function Home() {
  const { episodes, loading, error, fetchEpisodes } = useLatestEpisodes();

  if (loading) return <SkeletonHome />;
  if (error || !episodes || episodes.length === 0) fetchEpisodes();

  return (
    <div className="container p-4">
      <ul
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
        }}
        className="grid justify-items-center items-center"
      >
        {episodes ? (
          episodes.map((episode, index) => (
            <li
              key={index}
              className="bg-white dark:bg-[#1e293b] shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg w-[268px]"
            >
              <Link to={`/animes/${episode.anime}`} className="block p-4">
                <img
                  src={episode.image_preview}
                  width={250}
                  alt={formatName(episode.anime)}
                  className="w-full h-auto mb-2 rounded-lg shadow-md"
                />
                <span className="block text-center font-medium text-lg text-gray-800 dark:text-gray-200">
                  {formatName(episode.anime)}
                </span>
              </Link>
            </li>
          ))
        ) : (
          <SkeletonHome />
        )}
      </ul>
    </div>
  );
}
