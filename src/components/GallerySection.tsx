
interface GallerySectionProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  index: number;
}

export const GallerySection = ({ id, title, description, images, index }: GallerySectionProps) => {
  const isEven = index % 2 === 0;

  return (
    <section id={id} className="py-20">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
          
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
              <span className="text-gray-500 font-medium">{images.length} memories</span>
            </div>
          </div>

          {/* Image Grid */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`relative group overflow-hidden rounded-2xl ${
                    imgIndex === 0 ? 'col-span-2 h-64' : 'h-48'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${title} memory ${imgIndex + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">+</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
