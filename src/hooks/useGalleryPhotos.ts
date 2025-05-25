
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const DEFAULT_IMAGES = {
  "vyom2025": [
    "public/image/vyom/1.jpg",
    "public/image/vyom/2.jpg",
    "public/image/vyom/3.jpg",
  ],
  "college-days": [
    "public/image/college_days/1.jpg",
    "public/image/college_days/2.jpg",
    "public/image/college_days/3.jpg",
  ],
  "college-hangout": [
    "public/image/college_hangout/1 (1).jpg",
    "public/image/college_hangout/1 (2).jpg",
    "public/image/college_hangout/1 (3).jpg",
  ],
  "hidden-places": [
    "public/image/hidden_places/1.jpg",
    "public/image/hidden_places/2.jpg",
    "public/image/hidden_places/3.jpg",
  ],
  "hero-background": [],
  "friend-rajaryan": ["public/image/my_people/raj.jpeg"],
  "friend-satish": ["public/image/my_people/satish.jpg"],
  "friend-nikhil": ["public/image/my_people/nik.jpg"],
  "friend-arnav": ["public/image/my_people/arnav.jpg"],
  "friend-misti": ["public/image/my_people/misti.jpg"],
  "friend-sandhya": ["public/image/my_people/sandhya.jpg"],
  "friend-anugya": ["public/image/my_people/anugya.jpg"],
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
