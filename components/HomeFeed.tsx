
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, TrendingUp, Users, MapPin, Sparkles, Heart, 
  MessageCircle, Share2, Play, MoreVertical, Loader2 
} from 'lucide-react';
import { User } from '../App';

interface FeedItem {
  id: string;
  type: 'PHOTO' | 'VIDEO' | 'TEXT';
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: {
    text?: string;
    mediaUrl?: string;
    thumbnail?: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
  category: string;
}

const CATEGORIES = ['Trending', 'Friends', 'Nearby', 'New Creators'];

const MOCK_AVATARS = [
  'https://i.pravatar.cc/150?u=1',
  'https://i.pravatar.cc/150?u=2',
  'https://i.pravatar.cc/150?u=3',
  'https://i.pravatar.cc/150?u=4',
];

const MOCK_MEDIA = [
  'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
];

const generateMockItem = (index: number): FeedItem => {
  const types: ('PHOTO' | 'VIDEO' | 'TEXT')[] = ['PHOTO', 'VIDEO', 'TEXT'];
  const type = types[index % 3];
  return {
    id: `item-${index}-${Date.now()}`,
    type,
    author: {
      name: `User ${index}`,
      username: `creator_${index}`,
      avatar: MOCK_AVATARS[index % 4],
    },
    content: {
      text: type === 'TEXT' || Math.random() > 0.5 ? "Exploring the final frontier of the HY Multiverse. This holographic interface is absolutely magic! 🚀 #HyperSpace #Web3" : undefined,
      mediaUrl: type !== 'TEXT' ? MOCK_MEDIA[index % 4] : undefined,
      thumbnail: type === 'VIDEO' ? MOCK_MEDIA[(index + 1) % 4] : undefined,
    },
    stats: {
      likes: Math.floor(Math.random() * 5000),
      comments: Math.floor(Math.random() * 200),
      shares: Math.floor(Math.random() * 100),
    },
    timestamp: `${index + 1}h ago`,
    category: CATEGORIES[index % 4],
  };
};

const HomeFeed: React.FC<{ user: User }> = ({ user }) => {
  const [filter, setFilter] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }, (_, i) => generateMockItem(items.length + i));
      setItems(prev => [...prev, ...newItems]);
      setLoading(false);
      if (items.length > 50) setHasMore(false);
    }, 1000);
  };

  useEffect(() => {
    // Initial load
    loadMore();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesCategory = filter === 'Trending' || item.category === filter;
    const matchesSearch = item.author.username.includes(searchQuery.toLowerCase()) || 
                         (item.content.text?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 px-6 max-w-2xl mx-auto">
      {/* Top Search & Filter Bar */}
      <div className="sticky top-[73px] z-30 bg-[#030014]/80 backdrop-blur-md py-4 -mx-6 px-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Search users, hashtags, posts..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-purple-500 outline-none transition-all shadow-xl shadow-purple-500/5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
             <div className="px-2 py-1 rounded-lg bg-purple-600/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
               <Sparkles size={10} /> AI Enhanced
             </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all border ${
                filter === cat 
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                  : 'glass-panel border-white/5 text-gray-400 hover:text-white hover:border-white/10'
              }`}
            >
              {cat === 'Trending' && <TrendingUp size={14} className="inline mr-2" />}
              {cat === 'Friends' && <Users size={14} className="inline mr-2" />}
              {cat === 'Nearby' && <MapPin size={14} className="inline mr-2" />}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-8 mt-4">
        {filteredItems.map((item, index) => (
          <div 
            key={item.id} 
            ref={index === filteredItems.length - 1 ? lastItemRef : null}
            className="glass-panel rounded-[2.5rem] border-white/10 overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-500"
          >
            {/* Author Header */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 p-0.5">
                  <img src={item.author.avatar} alt={item.author.name} className="w-full h-full rounded-[calc(1rem-0.125rem)] object-cover bg-slate-900" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight hover:text-purple-400 cursor-pointer transition-colors">{item.author.name}</h4>
                  <p className="text-xs text-gray-500">@{item.author.username} • {item.timestamp}</p>
                </div>
              </div>
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Post Content */}
            {item.content.text && (
              <div className="px-6 pb-4">
                <p className="text-gray-200 leading-relaxed text-sm">
                  {item.content.text}
                </p>
              </div>
            )}

            {/* Media */}
            {item.type !== 'TEXT' && item.content.mediaUrl && (
              <div className="relative group/media overflow-hidden cursor-pointer">
                <img 
                  src={item.content.mediaUrl} 
                  alt="Post content" 
                  className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 group-hover/media:scale-105"
                />
                {item.type === 'VIDEO' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/media:bg-black/40 transition-all">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover/media:scale-110 transition-transform border border-white/30">
                      <Play size={32} fill="white" className="ml-1 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  {item.type}
                </div>
              </div>
            )}

            {/* Stats & Actions */}
            <div className="p-6 flex items-center justify-between border-t border-white/5">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors group/btn">
                  <div className="p-2 rounded-xl group-hover/btn:bg-red-500/10 transition-colors">
                    <Heart size={20} className="group-active/btn:scale-125 transition-transform" />
                  </div>
                  <span className="text-xs font-bold">{item.stats.likes.toLocaleString()}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group/btn">
                  <div className="p-2 rounded-xl group-hover/btn:bg-blue-500/10 transition-colors">
                    <MessageCircle size={20} />
                  </div>
                  <span className="text-xs font-bold">{item.stats.comments}</span>
                </button>
              </div>
              <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group/btn">
                <div className="p-2 rounded-xl group-hover/btn:bg-purple-500/10 transition-colors">
                  <Share2 size={20} />
                </div>
                <span className="text-xs font-bold">{item.stats.shares}</span>
              </button>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-center py-10">
            <Loader2 size={32} className="animate-spin text-purple-500" />
          </div>
        )}

        {!hasMore && (
          <div className="text-center py-10 text-gray-500 italic text-sm">
            You've reached the edge of the multiverse. 🌌
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
