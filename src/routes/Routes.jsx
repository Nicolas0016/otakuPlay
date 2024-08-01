import { Route, Routes } from "react-router-dom";
import AnimeDescription from "../pages/AnimeDescription";
import EpisodeAnime from "../pages/EpisodeAnime";
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/animes/:idAnime" element={<AnimeDescription />}></Route>
        <Route
          path="/animes/:idAnime/:idEpisode"
          element={<EpisodeAnime />}
        ></Route>
        <Route path="/search" element={<SearchResults />}></Route>
      </Routes>
    </>
  );
}
