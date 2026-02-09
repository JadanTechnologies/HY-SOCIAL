
import React, { useState, useRef, useEffect } from 'react';
import { 
  Radio, X, Users, Heart, MessageSquare, Gift, Share2, 
  Sparkles, Camera, Mic, Layout, Send, Zap, Ghost
} from 'lucide-react';
import { User } from '../App';

interface Comment {
  id: string;
  user: string;
  text: string;
  isGift?: boolean;
}

const LiveSystem: React.FC<{ user: User }> = ({ user }) => {
  const [isLive, setIsLive] = useState(false);
  const [audienceCount, setAudienceCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputText, setInputText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Default');
  const videoRef = useRef<HTMLVideoElement>(null);
  const commentScrollRef = useRef<HTMLDivElement>(null);

  const startLive = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsLive(true);
        setAudienceCount(Math.floor(Math.random() * 500) + 1200);
        // Simulate real-time interaction
        addComment("HY_Oracle", "Broadcasting sequence initialized. Welcome to the multiverse.", false);
      }
    } catch (err) {
      console.error("Failed to access camera:", err);
    }
  };

  const stopLive = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsLive(false);
  };

  const addComment = (username: string, text: string, isGift = false) => {
    const newComment = { id: Date.now().toString(), user: username, text, isGift };
    setComments(prev => [...prev.slice(-15), newComment]);
  };

  const handleSendComment = () => {
    if (!inputText.trim()) return;
    addComment(user.username, inputText);
    setInputText('');
  };

  const sendGift = (giftType: string) => {
    addComment(user.username, `sent a ${giftType}! 🎁`, true);
  };

  useEffect(() => {
    if (commentScrollRef.current) {
      commentScrollRef.current.scrollTop = commentScrollRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div className="pt-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col">
      {!isLive ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full animate-pulse"></div>
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center relative z-10 shadow-2xl shadow-purple-500/20">
              <Radio size={56} className="text-white animate-pulse" />
            </div>
          </div>
          
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-4">Broadcast Your Universe</h2>
            <p className="text-gray-400">Share your digital energy with thousands of creators. Instant HY token monetization for every interaction.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
            <div className="p-4 glass-panel rounded-2xl border-white/5 flex flex-col items-center gap-2">
              <Users className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Target Audience</span>
              <p className="font-bold">12K+ Creators</p>
            </div>
            <div className="p-4 glass-panel rounded-2xl border-white/5 flex flex-col items-center gap-2">
              <Zap className="text-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Latency</span>
              <p className="font-bold">25ms (Edge)</p>
            </div>
            <div className="p-4 glass-panel rounded-2xl border-white/5 flex flex-col items-center gap-2">
               <Ghost className="text-purple-400" />
               <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Privacy</span>
               <p className="font-bold">Encrypted</p>
            </div>
            <div className="p-4 glass-panel rounded-2xl border-white/5 flex flex-col items-center gap-2">
               <Sparkles className="text-pink-400" />
               <span className="text-xs font-bold uppercase tracking-widest text-gray-500">AI Filters</span>
               <p className="font-bold">12 Active</p>
            </div>
          </div>

          <button 
            onClick={startLive}
            className="px-12 py-5 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl font-bold text-xl shadow-xl shadow-red-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            Initialize Transmission <Radio size={24} />
          </button>
        </div>
      ) : (
        <div className="flex-1 grid lg:grid-cols-3 gap-6 pb-6 h-[calc(100vh-8rem)]">
          {/* Main Stream Area */}
          <div className="lg:col-span-2 relative rounded-[2.5rem] bg-black overflow-hidden border border-white/10 group shadow-2xl">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              className={`w-full h-full object-cover transition-all ${activeFilter === 'Neon' ? 'sepia hue-rotate-180 saturate-200' : activeFilter === 'Noir' ? 'grayscale contrast-150' : ''}`}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>

            {/* Overlays */}
            <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
              <div className="bg-red-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest animate-pulse flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div> Live
              </div>
              <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10">
                <Users size={14} className="text-blue-400" /> {audienceCount.toLocaleString()}
              </div>
              <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10 text-yellow-400">
                <Zap size={14} /> 4.2K Earnings
              </div>
            </div>

            <button 
              onClick={stopLive}
              className="absolute top-6 right-6 p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-red-500 transition-colors z-20"
            >
              <X size={20} />
            </button>

            {/* AI Filters Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              {['Default', 'Neon', 'Noir', 'Glitch'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all ${activeFilter === filter ? 'bg-white text-black' : 'hover:bg-white/10 text-gray-400'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Hearts Floating (Simulated) */}
            <div className="absolute bottom-20 right-8 flex flex-col-reverse items-center gap-2 z-10 pointer-events-none">
              {[1, 2, 3].map(i => (
                <div key={i} className={`text-red-500 animate-float-up-${i}`}>
                   <Heart size={32} fill="currentColor" />
                </div>
              ))}
            </div>
          </div>

          {/* Interaction Panel */}
          <div className="flex flex-col gap-6">
            <div className="flex-1 glass-panel rounded-[2.5rem] border-white/10 flex flex-col overflow-hidden bg-white/5 shadow-xl">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h4 className="font-bold flex items-center gap-2">
                   <MessageSquare size={16} className="text-purple-400" /> Multiverse Chat
                </h4>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Real-Time</span>
                </div>
              </div>
              
              <div ref={commentScrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {comments.map(c => (
                  <div key={c.id} className={`animate-in slide-in-from-left-2 duration-300 ${c.isGift ? 'bg-purple-600/20 p-3 rounded-2xl border border-purple-500/30' : ''}`}>
                    <span className={`font-bold text-xs ${c.isGift ? 'text-purple-400' : 'text-gray-400'}`}>@{c.user}: </span>
                    <span className="text-sm text-gray-200">{c.text}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-black/20 border-t border-white/5">
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
                  {['⚡ Zap', '🎁 Box', '💎 Gem', '🚀 Ship'].map(gift => (
                    <button 
                      key={gift}
                      onClick={() => sendGift(gift)}
                      className="whitespace-nowrap px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center gap-1"
                    >
                      {gift}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Broadcast message..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
                  />
                  <button 
                    onClick={handleSendComment}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 rounded-lg"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="p-3 bg-red-600/10 text-red-500 rounded-2xl">
                   <Heart size={20} fill="currentColor" />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500 font-bold uppercase">Total Hearts</p>
                   <p className="text-xl font-bold">142.8K</p>
                 </div>
              </div>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"><Share2 size={20} /></button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes floatUp1 {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
        @keyframes floatUp2 {
          0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-120px) scale(2) translateX(-20px); opacity: 0; }
        }
        @keyframes floatUp3 {
          0% { transform: translateY(0) scale(1) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-140px) scale(1.2) translateX(20px); opacity: 0; }
        }
        .animate-float-up-1 { animation: floatUp1 2s ease-out infinite; }
        .animate-float-up-2 { animation: floatUp2 2.5s ease-out infinite 0.5s; }
        .animate-float-up-3 { animation: floatUp3 1.8s ease-out infinite 1s; }
      `}</style>
    </div>
  );
};

export default LiveSystem;
