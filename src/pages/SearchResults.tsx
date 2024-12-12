import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbClient } from '@/lib/tmdb';
import MediaCard from '@/components/MediaCard';
import { Loader2 } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';
  const year = searchParams.get('year') || '';

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', query, type, year],
    queryFn: () => tmdbClient.searchMedia(query, type, year),
    enabled: query.length > 0,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!results?.length && query) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">No results found</h2>
        <p className="text-muted-foreground mt-2">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {query && (
        <h2 className="text-2xl font-bold">
          Search results for "{query}"
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {results?.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;