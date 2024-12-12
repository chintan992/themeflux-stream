import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import MediaCard from '@/components/MediaCard';

const Saved = () => {
  const { user } = useAuth();
  
  const { data: savedMedia, isLoading } = useQuery({
    queryKey: ['saved', user?.uid],
    queryFn: async () => {
      if (!user) return [];
      const docRef = doc(db, 'savedMedia', user.uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().items : [];
    },
    enabled: !!user,
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
      <h2 className="text-2xl font-bold mb-6">Saved Items</h2>
      {savedMedia?.length === 0 ? (
        <p className="text-center text-muted-foreground">No saved items yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {savedMedia?.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;