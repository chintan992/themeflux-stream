import { useQuery } from "@tanstack/react-query";
import { tmdbClient } from "@/lib/tmdb";
import MediaCard from "@/components/MediaCard";

const TvShows = () => {
  const { data: shows, isLoading } = useQuery({
    queryKey: ["tvShows"],
    queryFn: () => tmdbClient.getTvShows(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {shows?.map((show) => (
        <MediaCard key={show.id} media={show} />
      ))}
    </div>
  );
};

export default TvShows;