import { Link, useParams } from "react-router-dom";
import SkeletonEpisode from "../components/SkeletonEpisode";
import { formatName } from "../hooks/formatName";
import useEpisodeLinks from "../hooks/useEpisodeLinks";
import NotFound from "./Error";

export default function EpisodeAnime() {
  const { idEpisode, idAnime } = useParams();
  const {
    episodeLinks,
    selectedPlatform,
    setSelectedPlatform,
    loading,
    error,
  } = useEpisodeLinks(idAnime, idEpisode);
  if (loading) return <SkeletonEpisode />;
  if (error) return <NotFound></NotFound>;
  if (idAnime == undefined || idEpisode == undefined) return <></>;
  return (
    <section className="px-5 max-w-[700px] py-9 text-white flex flex-col gap-4 items-center mx-auto">
      <nav className="list-none flex items-center gap-8">
        <li>
          <Link to={`/animes/${idAnime}/${parseInt(idEpisode) - 1}`}>
            {"<-"}
          </Link>
        </li>
        <li>
          <h1 className="text-3xl">
            {formatName(idAnime, 25, false) + " " + idEpisode}
          </h1>
        </li>
        <li>
          <Link to={`/animes/${idAnime}/${parseInt(idEpisode) + 1}`}>
            {"->"}
          </Link>
        </li>
      </nav>
      <nav className="w-full overflow-x-auto">
        <ul className="flex justify-center py-2 first:rounded-l-lg last:rounded-r-lg">
          {episodeLinks.map((link, index) => (
            <li
              key={index}
              className={`px-4 ${
                selectedPlatform === link.code ? "bg-blue-500" : "bg-gray-700"
              }`}
            >
              <button onClick={() => setSelectedPlatform(link.code)}>
                {link.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-4 aspect-video">
        {selectedPlatform && (
          <iframe
            src={selectedPlatform}
            title="Selected Video"
            className="w-full h-64"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  );
}
