
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const FriendsSection = () => {
  const friends = [
    {
      name: "Rajaryan",
      caption: "The Storyteller",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop&crop=face",
      color: "from-indigo-400 to-purple-400",
      shadowColor: "shadow-indigo-200"
    },
    {
      name: "Satish",
      caption: "The Comedian",
      avatar: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=300&fit=crop&crop=face",
      color: "from-blue-400 to-cyan-400",
      shadowColor: "shadow-blue-200"
    },
    {
      name: "Nikhil",
      caption: "Study Partner",
      avatar: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop&crop=face",
      color: "from-teal-400 to-emerald-400",
      shadowColor: "shadow-teal-200"
    },
    {
      name: "Arnav",
      caption: "Adventure Seeker",
      avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop&crop=face",
      color: "from-purple-400 to-violet-400",
      shadowColor: "shadow-purple-200"
    },
    {
      name: "Misti",
      caption: "The Organizer",
      avatar: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop&crop=face",
      color: "from-pink-400 to-rose-400",
      shadowColor: "shadow-pink-200"
    },
    {
      name: "Sandhya",
      caption: "The Motivator",
      avatar: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=300&h=300&fit=crop&crop=face",
      color: "from-indigo-400 to-blue-400",
      shadowColor: "shadow-indigo-200"
    },
    {
      name: "Anugya",
      caption: "Canteen Queen",
      avatar: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=300&h=300&fit=crop&crop=face",
      color: "from-teal-400 to-cyan-400", 
      shadowColor: "shadow-teal-200"
    }
  ];

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
                <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 transform group-hover:-translate-y-2 transition-all duration-300 shadow-lg group-hover:shadow-xl ${friend.shadowColor}`}>
                  <div className="text-center">
                    <div className="relative mb-4">
                      <Avatar className="w-20 h-20 mx-auto border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${friend.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
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

