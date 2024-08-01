export interface TAnimeDetails {
  animeid: string;
  banner: string;
  debut: string;
  episodes: Episode[];
  genres: string[];
  poster: string;
  rating: string;
  synopsis: string;
  title: string;
  type: string;
}

export interface Episode {
  anime: string;

  id: number;

  image_preview: string;
}
export interface TLatestAnimes {
  anime: string;
  id: string;
  image_preview: string;
}
export type Links = Link[];

export interface Link {
  ads: number;
  allow_mobile: boolean;
  code: string;
  server: string;
  title: string;
  url: string;
}
