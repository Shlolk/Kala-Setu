import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArtworkCard } from './ArtworkCard';
import { useArtisan } from '@/hooks/useArtisan';
import { ArtworkSubmission } from '@/types/artisan';
import { Loader2, Package } from 'lucide-react';

interface ArtworkGalleryProps {
  title?: string;
  showTitle?: boolean;
}

export const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ 
  title = "My Artworks", 
  showTitle = true 
}) => {
  const { getArtworkSubmissions, loading } = useArtisan();
  const [artworks, setArtworks] = useState<ArtworkSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setIsLoading(true);
        const submissions = await getArtworkSubmissions();
        setArtworks(submissions);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, [getArtworkSubmissions]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Loading your artworks...</span>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No artworks submitted yet
        </h3>
        <p className="text-gray-600">
          Share your first artwork using the form above to see it displayed here.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">
            {artworks.length} artwork{artworks.length !== 1 ? 's' : ''} submitted
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {artworks.map((artwork, index) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            index={index}
            showActions={true}
          />
        ))}
      </motion.div>
    </div>
  );
};
