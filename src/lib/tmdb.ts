import { Movie, TVShow } from './types';

class TMDBClient {
  private readonly API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  async getTrending() {
    const response = await fetch(`${this.BASE_URL}/trending/all/day?api_key=${this.API_KEY}`);
    const data = await response.json();
    return data.results;
  }

  async searchMedia(query: string, type: string = 'all', year?: string) {
    console.log('Searching media:', { query, type, year });
    
    let endpoint = '';
    const params = new URLSearchParams({
      api_key: this.API_KEY,
      query,
      include_adult: 'false',
      language: 'en-US',
    });

    if (year) {
      params.append('year', year);
    }

    switch (type) {
      case 'movie':
        endpoint = '/search/movie';
        break;
      case 'tv':
        endpoint = '/search/tv';
        break;
      default:
        endpoint = '/search/multi';
    }

    try {
        const response = await fetch(`${this.BASE_URL}${endpoint}?${params}`);
        const data = await response.json();
        if (!data.results) {
            throw new Error('No results found');
        }
        return data.results;
    } catch (error) {
        console.error('Error fetching media:', error);
        return []; // Return an empty array on error
    }
  }

  async getTvShows() {
    const response = await fetch(`${this.BASE_URL}/tv/popular?api_key=${this.API_KEY}`);
    const data = await response.json();
    return data.results;
  }

  async getMovies() {
    const response = await fetch(`${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}`);
    const data = await response.json();
    return data.results;
  }
}

export const tmdbClient = new TMDBClient();
