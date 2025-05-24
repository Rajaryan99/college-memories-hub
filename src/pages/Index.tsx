
import { Hero } from "@/components/Hero";
import { GallerySection } from "@/components/GallerySection";
import { FriendsSection } from "@/components/FriendsSection";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const galleryCategories = [
    {
      id: "vyom2025",
      title: "Vyom2025",
      description: "Special moments from our college fest",
      images: []
    },
    {
      id: "college-days",
      title: "College Days",
      description: "Everyday moments that made college special",
      images: []
    },
    {
      id: "college-hangout",
      title: "College Hangout",
      description: "Fun times with friends outside campus",
      images: []
    },
    {
      id: "hidden-places",
      title: "Hidden Places",
      description: "Secret spots we discovered around campus",
      images: []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      <Navigation />
      <Hero />
      
      <main className="relative">
        {galleryCategories.map((category, index) => (
          <GallerySection
            key={category.id}
            {...category}
            index={index}
          />
        ))}
        
        <FriendsSection />
      </main>
      
      <footer className="py-16 text-center text-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-indigo-100/50 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-100/50 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4">
          <p className="text-lg font-light">
            "College years are the best years of life" - Living proof 📚✨
          </p>
          <p className="mt-4 opacity-70">Made with 💜 by Rajaryan</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
