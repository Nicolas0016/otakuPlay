import { Link, useSearchParams } from "react-router-dom";
import SkeletonSearchResults from "../components/SkeletonSearchResults";
import useSearchAnimes from "../hooks/useSearchAnimes";
//import animes from "../mocks/searchAnimes.json";
import NotFound from "./Error";
export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const handleTypeColor = (type: string) => {
    switch (type) {
      case "Anime":
        return "bg-blue-500";
      case "OVA":
        return "bg-orange-500";
      case "Película":
        return "bg-[#fd3246]";
      default:
        return "bg-gray-500";
    }
  };
  function categories() {
    const categoriesAnime: Array<string> = [];
    if (animes) {
      animes.map((anime) => {
        if (!categoriesAnime.includes(anime.type)) {
          categoriesAnime.push(anime.type);
        }
      });

      return categoriesAnime;
    }
  }
  const { animes, error, loading, fetchAnimeDetails } = useSearchAnimes(
    query || ""
  );

  if (query == null) return <NotFound />;

  if (error || animes?.length === 0) fetchAnimeDetails();
  if (loading) return <SkeletonSearchResults />;

  if (!animes) return <div>No se encontraron resultados</div>;

  return (
    <div className="container mx-auto py-4 lg:px-[200px] sm:px-12">
      <nav>
        <select name="" id="">
          <option value="all">Por defecto</option>
          {categories()}
        </select>
      </nav>
      <ul
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
        }}
        className="grid gap-5"
      >
        {animes.map((anime) => (
          <li key={anime.animeid} className="flex flex-col items-center group">
            <Link to={`/animes/${anime.animeid}`}>
              <article className="shadow-md rounded-lg hover:scale-105 overflow-hidden w-[180px]">
                <header className="relative w-full h-[250px]">
                  <picture>
                    <source
                      srcSet={`${anime.poster} 2x`}
                      media="(min-width: 600px)"
                    />
                    <img
                      src={anime.poster}
                      className="h-full w-full object-cover"
                      alt={anime.title}
                    />
                  </picture>
                  <span
                    className={`absolute bottom-2 left-2 px-2 py-1 text-xs font-bold text-white rounded ${handleTypeColor(
                      anime.type
                    )}`}
                  >
                    {anime.type}
                  </span>
                </header>
                <footer className="px-2 py-1 text-center">
                  <span className="font-medium group-hover:text-cyan-500 dark:text-white text-black">
                    {anime.title}
                  </span>
                </footer>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
