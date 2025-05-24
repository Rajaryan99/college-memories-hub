
import { useState, useEffect } from 'react';

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

export const useGalleryPhotos = () => {
  const [photos, setPhotos] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('gallery-photos');
    return saved ? JSON.parse(saved) : DEFAULT_IMAGES;
  });

  const addPhoto = (category: string, url: string) => {
    setPhotos(prev => {
      const updated = {
        ...prev,
        [category]: [...(prev[category] || []), url]
      };
      localStorage.setItem('gallery-photos', JSON.stringify(updated));
      return updated;
    });
  };

  const removePhoto = (category: string, index: number) => {
    setPhotos(prev => {
      const updated = {
        ...prev,
        [category]: prev[category]?.filter((_, i) => i !== index) || []
      };
      localStorage.setItem('gallery-photos', JSON.stringify(updated));
      return updated;
    });
  };

  return {
    photos,
    addPhoto,
    removePhoto
  };
};
