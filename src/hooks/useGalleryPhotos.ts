
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

      // Start with default images
      const groupedPhotos: Record<string, string[]> = { ...DEFAULT_IMAGES };
      
      // Replace default images with uploaded ones where they exist
      if (data && data.length > 0) {
        (data as GalleryPhoto[]).forEach((photo) => {
          // For friend categories, replace the default image entirely
          if (photo.category.startsWith('friend-')) {
            groupedPhotos[photo.category] = [photo.image_url];
          } else {
            // For other categories, add to existing images
            if (!groupedPhotos[photo.category]) {
              groupedPhotos[photo.category] = [];
            }
            groupedPhotos[photo.category].push(photo.image_url);
          }
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
      
      // For friend categories, replace existing photo if it exists
      if (category.startsWith('friend-')) {
        // First, delete any existing photo for this friend
        const { error: deleteError } = await supabase
          .from('gallery_photos')
          .delete()
          .eq('category', category);

        if (deleteError) {
          console.error('Error deleting existing photo:', deleteError);
        }
      }
      
      // Add new photo to database
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
        const updated = { ...prev };
        
        if (category.startsWith('friend-')) {
          // For friends, replace the image entirely
          updated[category] = [url];
        } else {
          // For other categories, add to existing images
          updated[category] = [...(prev[category] || []), url];
        }
        
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

      // Only remove from database if it's not a default image
      if (!photoUrl.startsWith('public/image/') && !photoUrl.includes('unsplash.com')) {
        const { error } = await supabase
          .from('gallery_photos')
          .delete()
          .eq('category', category)
          .eq('image_url', photoUrl);

        if (error) {
          console.error('Error removing photo from database:', error);
          return;
        }
      }

      // Update local state
      setPhotos(prev => {
        const updated = { ...prev };
        
        if (category.startsWith('friend-')) {
          // For friends, revert to default image
          updated[category] = DEFAULT_IMAGES[category] || [];
        } else {
          // For other categories, remove the specific image
          updated[category] = prev[category]?.filter((_, i) => i !== index) || [];
        }
        
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
