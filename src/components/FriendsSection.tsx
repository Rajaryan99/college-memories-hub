import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhotoUpload } from './PhotoUpload';
import { useGalleryPhotos } from '../hooks/useGalleryPhotos';
import { Button } from './ui/button';
import { Camera, Edit } from 'lucide-react';

export const FriendsSection = () => {
  const [editMode, setEditMode] = useState(false);
  const [showUpload, setShowUpload] = useState<string | null>(null);
  const { photos, addPhoto, isLoading } = useGalleryPhotos();

  const friends = [
    {
      name: "Rajaryan",
      caption: "The Creative Genius",
      avatar: photos['friend-rajaryan']?.[0] || "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop&crop=face",
      color: "from-indigo-400 to-purple-400",
      shadowColor: "shadow-indigo-200",
      id: "friend-rajaryan"
    },
    {
      name: "Satish",
      caption: "Adventure Seeker",
      avatar: photos['friend-satish']?.[0] || "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=300&fit=crop&crop=face",
      color: "from-blue-400 to-cyan-400",
      shadowColor: "shadow-blue-200",
      id: "friend-satish"
    },
    {
      name: "Nikhil",
      caption: "Study Partner",
      avatar: photos['friend-nikhil']?.[0] || "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop&crop=face",
      color: "from-teal-400 to-emerald-400",
      shadowColor: "shadow-teal-200",
      id: "friend-nikhil"
    },
    {
      name: "Arnav",
      caption: "The Organizer",
      avatar: photos['friend-arnav']?.[0] || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop&crop=face",
      color: "from-purple-400 to-violet-400",
      shadowColor: "shadow-purple-200",
      id: "friend-arnav"
    },
    {
      name: "Misti",
      caption: "The Storyteller (OGGY)",
      avatar: photos['friend-misti']?.[0] || "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop&crop=face",
      color: "from-pink-400 to-rose-400",
      shadowColor: "shadow-pink-200",
      id: "friend-misti"
    },
    {
      name: "Sandhya",
      caption: "The Beauty Queen",
      avatar: photos['friend-sandhya']?.[0] || "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=300&h=300&fit=crop&crop=face",
      color: "from-indigo-400 to-blue-400",
      shadowColor: "shadow-indigo-200",
      id: "friend-sandhya"
    },
    {
      name: "Anugya",
      caption: "Canteen Queen",
      avatar: photos['friend-anugya']?.[0] || "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=300&h=300&fit=crop&crop=face",
      color: "from-teal-400 to-cyan-400", 
      shadowColor: "shadow-teal-200",
      id: "friend-anugya"
    }
  ];

  const handlePhotoUploaded = (url: string) => {
    if (showUpload) {
      addPhoto(showUpload, url);
      setShowUpload(null);
    }
  };

  if (isLoading) {
    return (
      <section id="friends" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-lg text-purple-600">Loading friends...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="friends" className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 -z-10"></div>
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-indigo-100/50 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-purple-100/50 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-purple-600 bg-purple-100/50 py-1 px-3 rounded-full mb-3">Our Amazing Squad</span>
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-6 leading-tight">
            My People
          </h2>
          <p className="text-xl text-indigo-600 max-w-2xl mx-auto leading-relaxed">
            The incredible humans who made college unforgettable. Each one brings their own magic to our squad.
          </p>
          
          {/* Edit Mode Toggle */}
          <div className="mt-6">
            <Button
              onClick={() => setEditMode(!editMode)}
              variant="outline"
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              {editMode ? 'Done Editing' : 'Edit Photos'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {friends.map((friend, index) => (
            <div
              key={friend.name}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${friend.color} rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300`}></div>
                <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 transform group-hover:-translate-y-2 transition-all duration-300 shadow-lg group-hover:shadow-xl ${friend.shadowColor}`}>
                  <div className="text-center">
                    <div className="relative mb-6">
                      <Avatar className="w-40 h-40 mx-auto border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300">
                        <AvatarImage src={friend.avatar} alt={friend.name} className="object-cover" />
                        <AvatarFallback className="text-xl">{friend.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${friend.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                      
                      {/* Upload button in edit mode */}
                      {editMode && (
                        <button
                          onClick={() => setShowUpload(friend.id)}
                          className="absolute -bottom-2 -right-2 bg-purple-500 text-white rounded-full p-2 hover:bg-purple-600 transition-colors shadow-lg"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">
                      {friend.name}
                    </h3>
                    <p className="text-indigo-600 font-medium">
                      {friend.caption}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Upload Component */}
              {showUpload === friend.id && (
                <div className="mt-4">
                  <PhotoUpload 
                    category={friend.id} 
                    onPhotoUploaded={handlePhotoUploaded}
                  />
                  <Button
                    onClick={() => setShowUpload(null)}
                    variant="outline"
                    className="mt-2 w-full"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 text-indigo-700 shadow-lg shadow-purple-100/30">
            <span className="text-2xl">💫</span>
            <span className="font-medium">Together we created magic</span>
            <span className="text-2xl">💫</span>
          </div>
        </div>
      </div>
    </section>
  );
};
