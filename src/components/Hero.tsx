
export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent leading-tight">
            Welcome to My
            <br />
            College Journey
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            A digital collection of memories, friendships, and adventures from the best years of my life
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#vyom2025"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Explore Memories
            </a>
            <a
              href="#friends"
              className="px-8 py-3 border-2 border-orange-300 text-orange-600 rounded-full font-semibold hover:bg-orange-50 hover:scale-105 transition-all duration-300"
            >
              Meet My Squad
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Photo Memories</h3>
              <p className="text-gray-600">Capturing moments that defined our college experience</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Video Stories</h3>
              <p className="text-gray-600">Reliving adventures through moving pictures</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Amazing Friends</h3>
              <p className="text-gray-600">The people who made every moment special</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
