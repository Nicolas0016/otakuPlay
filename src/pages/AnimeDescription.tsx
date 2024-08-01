import { Link, useParams } from "react-router-dom";
import { TvIcon } from "../components/icos";
import SkeletonAnimeDetails from "../components/SkeletonAnimeDetails";
import { formatName } from "../hooks/formatName";
import useAnimeDetails from "../hooks/useAnimeDetails";
export default function AnimeDescription() {
  const { idAnime } = useParams();

  const { anime, error, loading, retry } = useAnimeDetails(idAnime);
  if (error) retry();
  if (loading) return <SkeletonAnimeDetails></SkeletonAnimeDetails>;
  if (anime) {
    return (
      <div className="p-4 dark:bg-[#080f25] bg-white">
        <header className="flex flex-col lg:flex-row lg:items-start mb-6">
          <img
            src={anime.poster}
            alt={anime.title}
            className="w-full max-w-xs  lg:ml-6 rounded-lg mx-auto mb-2  shadow-lg mt-6 lg:mt-0"
          />
          <div className="flex flex-col lg:w-2/3 lg:pr-6 gap-3">
            <h1 className="flex gap-5 text-3xl font-bold mx-auto md:mx-0 text-pretty">
              <span className="dark:text-white">{anime.title}</span>
              <span className="text-lg text-white px-3 py-1 bg-cyan-500 rounded-full">
                {anime.type}
              </span>
            </h1>
            <div className="mb-4 bg-green-500 w-full text-white px-2 py-1 rounded-lg text-center">
              <span className="flex items-center justify-center gap-2">
                <TvIcon />
                {anime.debut}
              </span>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-[#1e293b] rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2 dark:text-white">
                Sinopsis
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {anime.synopsis}
              </p>
            </div>
          </div>
        </header>

        <section className="px-5">
          <h4 className="text-xl font-semibold mb-4 dark:text-white">
            Episodios
          </h4>
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {anime.episodes.map((episode, index) => (
              <li
                key={episode.id}
                className="bg-white dark:bg-[#1e293b] shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link
                  to={`/animes/${anime.animeid}/${
                    anime.episodes.length - index
                  }`}
                >
                  <div className="p-4">
                    <div className="text-center">
                      <span className="block font-medium text-lg text-gray-800 dark:text-gray-200">
                        {formatName(episode.anime)}
                      </span>
                      <span className="block text-sm text-gray-600 dark:text-gray-400">
                        Episodio {anime.episodes.length - index}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
