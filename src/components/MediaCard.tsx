import React from 'react';
import { Movie, TVShow } from '@/lib/tmdb';
import { Star } from 'lucide-react';

interface MediaCardProps {
  media: Movie | TVShow;
}

const MediaCard = ({ media }: MediaCardProps) => {
  const title = 'title' in media ? media.title : media.name;
  const releaseDate = 'release_date' in media ? media.release_date : media.first_air_date;

  return (
    <div className="group relative overflow-hidden rounded-lg transition-transform hover:scale-105">
      <img
        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
        alt={title}
        className="w-full h-[300px] object-cover"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
        <h3 className="text-white font-semibold">{title}</h3>
        
        <div className="flex items-center mt-2 text-sm text-white/80">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span>{media.vote_average.toFixed(1)}</span>
          <span className="mx-2">•</span>
          <span>{new Date(releaseDate).getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;