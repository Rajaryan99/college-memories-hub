
import { useState } from 'react';
import { PhotoUpload } from './PhotoUpload';
import { useGalleryPhotos } from '../hooks/useGalleryPhotos';
import { Button } from './ui/button';
import { Plus, X } from 'lucide-react';

interface GallerySectionProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  index: number;
}

export const GallerySection = ({ id, title, description, index }: GallerySectionProps) => {
  const [showUpload, setShowUpload] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { photos, addPhoto, removePhoto, isLoading } = useGalleryPhotos();
  const isEven = index % 2 === 0;

  const categoryPhotos = photos[id] || [];

  const handlePhotoUploaded = (url: string) => {
    addPhoto(id, url);
    setShowUpload(false);
  };

  const handleRemovePhoto = (photoIndex: number) => {
    removePhoto(id, photoIndex);
  };

  if (isLoading) {
    return (
      <section id={id} className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-lg text-purple-600">Loading {title}...</p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/3 w-64 h-64 rounded-full bg-${isEven ? 'indigo' : 'purple'}-100/40 blur-3xl -z-10`}></div>
      
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
          
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
              {title}
            </h2>
            <p className="text-xl text-indigo-600 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              <span className="text-purple-500 font-medium">{categoryPhotos.length} memories</span>
            </div>
            
            {/* Upload Controls */}
            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => setShowUpload(!showUpload)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
              <Button
                onClick={() => setEditMode(!editMode)}
                variant="outline"
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                {editMode ? 'Done' : 'Edit'}
              </Button>
            </div>

            {/* Upload Component */}
            {showUpload && (
              <div className="mt-6">
                <PhotoUpload 
                  category={id} 
                  onPhotoUploaded={handlePhotoUploaded}
                />
              </div>
            )}
          </div>

          {/* Image Grid */}
          <div className="lg:w-1/2">
            {categoryPhotos.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {categoryPhotos.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 ${
                      imgIndex === 0 ? 'col-span-2 h-64' : 'h-48'
                    } border border-indigo-100/50`}
                  >
                    <img
                      src={image}
                      alt={`${title} memory ${imgIndex + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Delete button in edit mode */}
                    {editMode && (
                      <button
                        onClick={() => handleRemovePhoto(imgIndex)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">+</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No photos yet</p>
                <Button
                  onClick={() => setShowUpload(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Photo
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
