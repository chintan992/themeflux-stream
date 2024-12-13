import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tmdbClient } from '../lib/tmdb';
import MediaCard from '../components/MediaCard';
import { Movie, TVShow } from '../lib/types';

const Home: React.FC = () => {
    const { data: movies, isLoading: moviesLoading } = useQuery<Movie[]>({
        queryKey: ['movies'],
        queryFn: () => tmdbClient.getMovies(),
    });

    const { data: shows, isLoading: showsLoading } = useQuery<TVShow[]>({
        queryKey: ['tvShows'],
        queryFn: () => tmdbClient.getTvShows(),
    });

    if (moviesLoading || showsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Suggestions for You</h1>
            <h2 className="text-xl font-semibold mb-4">Trending Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies?.map(movie => (
                    <MediaCard key={movie.id} media={movie} />
                ))}
            </div>
            <h2 className="text-xl font-semibold mb-4">Trending TV Shows</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {shows?.map(show => (
                    <MediaCard key={show.id} media={show} />
                ))}
            </div>
        </div>
    );
};

export default Home; // Ensure this line is present
