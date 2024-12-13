export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string;
  vote_average: number;
}
