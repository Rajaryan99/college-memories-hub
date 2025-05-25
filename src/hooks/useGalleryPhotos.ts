
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const DEFAULT_IMAGES = {
  "vyom2025": [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  ],
  "college-days": [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  ],
  "college-hangout": [
    "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
  ],
  "hidden-places": [
    "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22"
  ],
  "hero-background": [],
  "friend-rajaryan": [],
  "friend-satish": [],
  "friend-nikhil": [],
  "friend-arnav": [],
  "friend-misti": [],
  "friend-sandhya": [],
  "friend-anugya": []
};

interface GalleryPhoto {
  id: string;
  category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export const useGalleryPhotos = () => {
  const [photos, setPhotos] = useState<Record<string, string[]>>(DEFAULT_IMAGES);
  const [isLoading, setIsLoading] = useState(true);

  // Load photos from database on mount
  useEffect(() => {
    loadPhotosFromDatabase();
  }, []);

  const loadPhotosFromDatabase = async () => {
    try {
      console.log('Loading photos from database...');
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading photos:', error);
        setIsLoading(false);
        return;
      }

      console.log('Loaded photos from database:', data);

      // Group photos by category
      const groupedPhotos: Record<string, string[]> = { ...DEFAULT_IMAGES };
      
      if (data && data.length > 0) {
        (data as GalleryPhoto[]).forEach((photo) => {
          if (!groupedPhotos[photo.category]) {
            groupedPhotos[photo.category] = [];
          }
          groupedPhotos[photo.category].push(photo.image_url);
        });
      }

      setPhotos(groupedPhotos);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading photos from database:', error);
      setIsLoading(false);
    }
  };

  const addPhoto = async (category: string, url: string) => {
    try {
      console.log('Adding photo to database:', { category, url });
      
      // Add to database
      const { error } = await supabase
        .from('gallery_photos')
        .insert([
          {
            category: category,
            image_url: url
          }
        ]);

      if (error) {
        console.error('Error adding photo to database:', error);
        return;
      }

      // Update local state
      setPhotos(prev => {
        const updated = {
          ...prev,
          [category]: [...(prev[category] || []), url]
        };
        console.log('Updated photos state:', updated);
        return updated;
      });
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const removePhoto = async (category: string, index: number) => {
    try {
      const photoUrl = photos[category]?.[index];
      if (!photoUrl) return;

      console.log('Removing photo from database:', { category, photoUrl });

      // Remove from database
      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('category', category)
        .eq('image_url', photoUrl);

      if (error) {
        console.error('Error removing photo from database:', error);
        return;
      }

      // Update local state
      setPhotos(prev => {
        const updated = {
          ...prev,
          [category]: prev[category]?.filter((_, i) => i !== index) || []
        };
        console.log('Updated photos state after removal:', updated);
        return updated;
      });
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  return {
    photos,
    addPhoto,
    removePhoto,
    isLoading,
    refreshPhotos: loadPhotosFromDatabase
  };
};
