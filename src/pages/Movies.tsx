import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdbClient } from '@/lib/tmdb';
import MediaCard from '@/components/MediaCard';

const Movies = () => {
  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: () => tmdbClient.getMovies(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies?.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;