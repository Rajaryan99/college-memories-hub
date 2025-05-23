
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
      images: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
      ]
    },
    {
      id: "college-days",
      title: "College Days",
      description: "Everyday moments that made college special",
      images: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      ]
    },
    {
      id: "college-hangout",
      title: "College Hangout",
      description: "Fun times with friends outside campus",
      images: [
        "https://images.unsplash.com/photo-1466442929976-97f336a657be",
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
      ]
    },
    {
      id: "hidden-places",
      title: "Hidden Places",
      description: "Secret spots we discovered around campus",
      images: [
        "https://images.unsplash.com/photo-1472396961693-142e6e269027",
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
        "https://images.unsplash.com/photo-1500673922987-e212871fec22"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
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
      
      <footer className="py-16 text-center text-gray-600">
        <div className="container mx-auto px-4">
          <p className="text-lg font-light">
            "College years are the best years of life" - Living proof 📚✨
          </p>
          <p className="mt-4 opacity-70">Made with 💙 by Rajaryan</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
