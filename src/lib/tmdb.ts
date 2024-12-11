const TMDB_API_KEY = '297f1b91919bae59d50ed815f8d2e14c';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
}

export const tmdbClient = {
  async getTrending(): Promise<(Movie | TVShow)[]> {
    const response = await fetch(
      `${BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    return data.results;
  },

  async search(query: string): Promise<(Movie | TVShow)[]> {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.results;
  },
};