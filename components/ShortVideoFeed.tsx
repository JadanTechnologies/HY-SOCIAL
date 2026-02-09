
import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Music, UserPlus, Send, MoreVertical, Sparkles } from 'lucide-react';

interface ShortVideo {
  id: string;
  url: string;
  user: string;
  caption: string;
  music: string;
  likes: string;
  comments: number;
}

const MOCK_VIDEOS: ShortVideo[] = [
  {
    id: '1',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-lighting-sitting-at-a-bar-9021-large.mp4',
    user: 'neon_rider',
    caption: 'Lost in the HY Multiverse. This holographic vibe is magical! 🌌 #Web3 #HyperSpace',
    music: 'Original Audio - CyberWaves',
    likes: '1.2M',
    comments: 420
  },
  {
    id: '2',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-at-night-with-neon-lights-28434-large.mp4',
    user: 'tokyo_drift',
    caption: 'Midnight runs in Neo Tokyo. The grid is alive tonight. 🏎️💨',
    music: 'Night City - HyperPop',
    likes: '840K',
    comments: 112
  },
  {
    id: '3',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-woman-in-a-dark-alley-34293-large.mp4',
    user: 'crypto_queen',
    caption: 'Minting the next legend. Are you ready for the drop? 💎 #NFT #CreatorEconomy',
    music: 'Solana Beats - LP-1',
    likes: '2.5M',
    comments: 1400
  }
];

const ShortVideoFeed: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const index = Math.round(containerRef.current.scrollTop / window.innerHeight);
    if (index !== activeIndex) setActiveIndex(index);
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
    >
      {MOCK_VIDEOS.map((video, i) => (
        <div key={video.id} className="h-screen w-full snap-start relative flex flex-col items-center justify-center">
          {/* Video Player Placeholder */}
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
            <video 
              src={video.url} 
              autoPlay={i === activeIndex} 
              loop 
              muted={i !== activeIndex}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
          </div>

          {/* Right Sidebar Interactions */}
          <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-20">
            <div className="relative mb-2">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 p-0.5 bg-black">
                <img src={`https://i.pravatar.cc/150?u=${video.user}`} className="w-full h-full rounded-full" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-1 text-white">
                <UserPlus size={10} />
              </div>
            </div>

            <button className="flex flex-col items-center gap-1 group">
              <div className="p-3 bg-white/5 backdrop-blur-md rounded-full group-hover:bg-red-500/20 group-hover:text-red-500 transition-all">
                <Heart size={24} fill={i === 0 ? "currentColor" : "none"} className={i === 0 ? "text-red-500" : ""} />
              </div>
              <span className="text-xs font-bold">{video.likes}</span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="p-3 bg-white/5 backdrop-blur-md rounded-full group-hover:bg-blue-500/20 group-hover:text-blue-500 transition-all">
                <MessageCircle size={24} />
              </div>
              <span className="text-xs font-bold">{video.comments}</span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="p-3 bg-white/5 backdrop-blur-md rounded-full group-hover:bg-purple-500/20 group-hover:text-purple-500 transition-all">
                <Share2 size={24} />
              </div>
              <span className="text-xs font-bold">Share</span>
            </button>

            <div className="w-12 h-12 rounded-full bg-slate-800 border-4 border-white/10 flex items-center justify-center animate-spin-slow overflow-hidden">
               <img src={`https://picsum.photos/seed/${video.music}/100/100`} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Bottom Caption Info */}
          <div className="absolute bottom-10 left-6 right-20 z-20">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-bold text-lg">@{video.user}</h4>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold uppercase flex items-center gap-1">
                <Sparkles size={10} className="text-yellow-400" /> AI-Grown
              </span>
            </div>
            <p className="text-sm text-white/90 mb-4 leading-relaxed max-w-sm">
              {video.caption}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Music size={14} className="animate-pulse" />
              <span className="overflow-hidden whitespace-nowrap marquee">
                {video.music} • {video.music} • {video.music}
              </span>
            </div>
          </div>

          {/* Side Scanline Overlay */}
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-pink-500/50 blur-sm opacity-50"></div>
        </div>
      ))}

      <style>{`
        . snap-y { scroll-snap-type: y mandatory; }
        .snap-start { scroll-snap-align: start; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .marquee {
          display: inline-block;
          animation: marquee 10s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ShortVideoFeed;
