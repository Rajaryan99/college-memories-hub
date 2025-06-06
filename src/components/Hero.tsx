import { useState } from 'react';
import { PhotoUpload } from './PhotoUpload';
import { useGalleryPhotos } from '../hooks/useGalleryPhotos';
import { Button } from './ui/button';
import { Camera, Edit } from 'lucide-react';

export const Hero = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { photos, addPhoto, isLoading } = useGalleryPhotos();
  
  // Get hero background image from photos or use default
  const heroBackgroundImage = photos['hero-background']?.[0] || "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07";

  const handlePhotoUploaded = (url: string) => {
    addPhoto('hero-background', url);
    setShowUpload(false);
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-lg text-purple-600">Loading memories...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background Image with Animation */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackgroundImage} 
          alt="College friends" 
          className="w-full h-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-indigo-50/60 backdrop-blur-sm"></div>
        
        {/* Animated Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-amber-300/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-teal-300/20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-rose-300/20 animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Photo Upload Controls */}
      <div className="absolute top-20 right-4 z-20 flex gap-2">
        <Button
          onClick={() => setEditMode(!editMode)}
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm border-purple-300 text-purple-600 hover:bg-purple-50"
        >
          <Edit className="w-4 h-4 mr-2" />
          {editMode ? 'Done' : 'Edit Background'}
        </Button>
        {editMode && (
          <Button
            onClick={() => setShowUpload(!showUpload)}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Camera className="w-4 h-4 mr-2" />
            Change Photo
          </Button>
        )}
      </div>

      {/* Upload Component */}
      {showUpload && editMode && (
        <div className="absolute top-32 right-4 z-20 w-80">
          <PhotoUpload 
            category="hero-background" 
            onPhotoUploaded={handlePhotoUploaded}
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
            Welcome to My
            <br />
            College Journey
          </h1>
          
          <p className="text-xl md:text-2xl text-indigo-700 mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            A digital collection of memories, friendships, and adventures from the best years of my life
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#vyom2025"
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-indigo-200 hover:scale-105 transition-all duration-300"
            >
              Explore Memories
            </a>
            <a
              href="#friends"
              className="px-8 py-3 border-2 border-purple-300 text-purple-600 rounded-full font-semibold hover:bg-purple-50 hover:shadow-lg hover:shadow-purple-100 hover:scale-105 transition-all duration-300"
            >
              Meet My Squad
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 border border-indigo-100/50 hover:-translate-y-1">
              <div className="text-3xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Photo Memories</h3>
              <p className="text-indigo-600/80">Capturing moments that defined our college experience</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 border border-indigo-100/50 hover:-translate-y-1">
              <div className="text-3xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Video Stories</h3>
              <p className="text-indigo-600/80">Reliving adventures through moving pictures</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 border border-indigo-100/50 hover:-translate-y-1">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Amazing Friends</h3>
              <p className="text-indigo-600/80">The people who made every moment special</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
