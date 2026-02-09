
import React from 'react';
import { PlayCircle, Tv, Users, Heart, Share2, MoreHorizontal } from 'lucide-react';

const VideoServiceSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#05001a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Unleash Your <span className="text-blue-400">Content</span></h2>
            <p className="text-gray-400 text-lg">
              Experience ultra-HD streaming with zero latency and 100% creator ownership. Our decentralized infrastructure ensures your voice is never silenced.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl glass-panel hover:bg-white/5 transition-colors">
            View All Services <PlayCircle size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Showcase Card */}
          <div className="lg:col-span-2 group relative rounded-3xl overflow-hidden glass-panel border-white/10 hover:border-blue-500/50 transition-all p-1">
            <div className="relative h-[300px] md:h-[450px] bg-slate-900 overflow-hidden rounded-[calc(1.5rem-0.25rem)]">
              <img 
                src="https://picsum.photos/seed/hystream/1200/800" 
                alt="Stream Preview" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold uppercase tracking-widest">Live</span>
                    <span className="text-white/60 text-xs">1.2M Watching</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">HY-Metaverse: The Final Frontier</h3>
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/seed/user1/40/40" className="w-8 h-8 rounded-full border border-white/20" />
                    <span className="text-sm text-white/80 font-medium">CyberCreator_X</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 rounded-full bg-white text-black hover:scale-110 transition-all">
                    <PlayCircle size={20} fill="black" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Info Panel */}
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-3xl glass-panel flex-1 flex flex-col justify-center">
              <Tv className="text-purple-500 mb-4" size={32} />
              <h4 className="text-xl font-bold mb-2">Multi-Platform Syringe</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Stream to HY, Twitch, and YouTube simultaneously using our integrated relay nodes. One input, infinite reach.
              </p>
            </div>
            <div className="p-6 rounded-3xl glass-panel flex-1 flex flex-col justify-center border-l-4 border-l-blue-500">
              <Users className="text-blue-500 mb-4" size={32} />
              <h4 className="text-xl font-bold mb-2">Community Governance</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Token holders decide on content policies and algorithmic preferences. A network truly by the people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoServiceSection;
