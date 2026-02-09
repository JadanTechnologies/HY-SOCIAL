
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, TrendingUp, Users, MapPin, Sparkles, Heart, 
  MessageCircle, Share2, Play, MoreVertical, Loader2, Plus, 
  Image as ImageIcon, Video as VideoIcon, Send, Rocket,
  Edit3, X, Youtube, Languages, FileSearch, ShieldCheck
} from 'lucide-react';
import { User, YouTubeVideo } from '../App';
import CreatePostModal, { PostDraft } from './CreatePostModal';
import YouTubeEmbed from './YouTubeEmbed';
import { GoogleGenAI } from "@google/genai";

interface FeedItem {
  id: string;
  type: 'PHOTO' | 'VIDEO' | 'TEXT' | 'YOUTUBE';
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: {
    text?: string;
    mediaUrl?: string;
    thumbnail?: string;
    tags?: string[];
    youtubeId?: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
  category: string;
  privacy: 'PUBLIC' | 'FOLLOWERS' | 'PRIVATE';
  isBoosted?: boolean;
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
  const types: ('PHOTO' | 'VIDEO' | 'TEXT' | 'YOUTUBE')[] = ['PHOTO', 'VIDEO', 'TEXT', 'YOUTUBE'];
  const type = types[index % 4];
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
      mediaUrl: type !== 'TEXT' && type !== 'YOUTUBE' ? MOCK_MEDIA[index % 4] : undefined,
      thumbnail: type === 'VIDEO' ? MOCK_MEDIA[(index + 1) % 4] : undefined,
      tags: ['HyperSpace', 'Web3'],
      youtubeId: type === 'YOUTUBE' ? 'dQw4w9WgXcQ' : undefined,
    },
    stats: {
      likes: Math.floor(Math.random() * 5000),
      comments: Math.floor(Math.random() * 200),
      shares: Math.floor(Math.random() * 100),
    },
    timestamp: `${index + 1}h ago`,
    category: CATEGORIES[index % 4],
    privacy: 'PUBLIC'
  };
};

const HomeFeed: React.FC<{ user: User }> = ({ user }) => {
  const [filter, setFilter] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<FeedItem | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [activeYouTube, setActiveYouTube] = useState<string | null>(null);
  const [aiWorkingId, setAiWorkingId] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<Record<string, { type: 'TRANS' | 'SUM', content: string }>>({});

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
    loadMore();
  }, []);

  const handleAiAction = async (itemId: string, actionType: 'TRANS' | 'SUM', input: string) => {
    if (aiWorkingId) return;
    setAiWorkingId(`${itemId}-${actionType}`);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = actionType === 'TRANS' 
        ? `Translate the following text to Spanish and French. Format simply. Original: ${input}`
        : `Provide a concise 3-point summary of a video titled "${input}". Assume it is about decentralized tech.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setAiResults(prev => ({
        ...prev,
        [`${itemId}-${actionType}`]: { type: actionType, content: response.text || "AI Error" }
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setAiWorkingId(null);
    }
  };

  const handleCreatePost = (draft: PostDraft) => {
    if (editingPost) {
      setItems(prev => prev.map(item => item.id === editingPost.id ? {
        ...item,
        type: draft.type as any,
        content: { ...item.content, text: draft.caption, tags: draft.tags, mediaUrl: draft.mediaUrl },
        privacy: draft.privacy,
        isBoosted: draft.isBoosted
      } : item));
      setEditingPost(null);
    } else {
      const newItem: FeedItem = {
        id: `user-post-${Date.now()}`,
        type: draft.type as any,
        author: {
          name: user.username,
          username: user.username,
          avatar: `https://i.pravatar.cc/150?u=${user.username}`,
        },
        content: {
          text: draft.caption,
          mediaUrl: draft.mediaUrl,
          tags: draft.tags,
        },
        stats: { likes: 0, comments: 0, shares: 0 },
        timestamp: 'Just now',
        category: 'New Creators',
        privacy: draft.privacy,
        isBoosted: draft.isBoosted
      };
      setItems(prev => [newItem, ...prev]);
    }
    setIsPostModalOpen(false);
  };

  const handleDeletePost = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setActiveMenuId(null);
  };

  const handleEditPost = (item: FeedItem) => {
    setEditingPost(item);
    setIsPostModalOpen(true);
    setActiveMenuId(null);
  };

  const handleBoostPost = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isBoosted: true } : item));
    setActiveMenuId(null);
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = filter === 'Trending' || item.category === filter;
    const matchesSearch = item.author.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.content.text?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 px-6 max-w-2xl mx-auto">
      {/* Search & Post Trigger */}
      <div className="sticky top-[73px] z-30 bg-[#030014]/80 backdrop-blur-md py-4 -mx-6 px-6">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search the multiverse..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-purple-500 outline-none transition-all shadow-xl shadow-purple-500/5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                <ShieldCheck size={14} /> AI Content Sentinel Active
             </div>
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <TrendingUp size={14} /> Neural Ranking Sorted
             </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setEditingPost(null); setIsPostModalOpen(true); }}
              className="flex-1 glass-panel border-white/10 rounded-2xl p-4 text-left text-gray-500 hover:text-white hover:bg-white/5 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 p-0.5 group-hover:scale-110 transition-transform">
                <div className="w-full h-full rounded-[calc(0.75rem-0.125rem)] bg-slate-900 flex items-center justify-center text-white">
                  <Plus size={20} />
                </div>
              </div>
              <span className="font-medium">What's happening in your universe?</span>
            </button>
            <div className="flex gap-2">
              <button onClick={() => setIsPostModalOpen(true)} className="p-4 glass-panel border-white/10 rounded-2xl hover:bg-white/5 text-purple-400">
                <ImageIcon size={20} />
              </button>
              <button onClick={() => setIsPostModalOpen(true)} className="p-4 glass-panel border-white/10 rounded-2xl hover:bg-white/5 text-blue-400">
                <VideoIcon size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto mt-6 pb-2 scrollbar-hide no-scrollbar">
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
            className={`glass-panel rounded-[2.5rem] border-white/10 overflow-hidden group animate-in fade-in slide-in-from-bottom-8 duration-500 relative ${item.isBoosted ? 'ring-2 ring-purple-500/50 shadow-2xl shadow-purple-500/10' : ''}`}
          >
            {item.isBoosted && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500"></div>
            )}

            {/* Author Header */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 p-0.5">
                  <img src={item.author.avatar} alt={item.author.name} className="w-full h-full rounded-[calc(1rem-0.125rem)] object-cover bg-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm leading-tight hover:text-purple-400 cursor-pointer transition-colors">{item.author.name}</h4>
                    {item.isBoosted && <Rocket size={12} className="text-purple-400 animate-pulse" />}
                    {item.type === 'YOUTUBE' && <span className="text-[8px] font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 flex items-center gap-1"><Youtube size={8} /> Synced</span>}
                  </div>
                  <p className="text-xs text-gray-500">@{item.author.username} • {item.timestamp} {item.privacy !== 'PUBLIC' && `• ${item.privacy}`}</p>
                </div>
              </div>
              <div className="relative flex items-center gap-2">
                {/* AI Tools */}
                <div className="flex gap-1">
                   {item.content.text && (
                     <button 
                      onClick={() => handleAiAction(item.id, 'TRANS', item.content.text!)}
                      className="p-2 glass-panel border-white/5 rounded-xl hover:text-indigo-400 transition-colors"
                      title="AI Translate"
                     >
                       <Languages size={14} className={aiWorkingId === `${item.id}-TRANS` ? 'animate-spin' : ''} />
                     </button>
                   )}
                   {(item.type === 'VIDEO' || item.type === 'YOUTUBE') && (
                     <button 
                      onClick={() => handleAiAction(item.id, 'SUM', item.content.text || "Untitled Video")}
                      className="p-2 glass-panel border-white/5 rounded-xl hover:text-indigo-400 transition-colors"
                      title="AI Summarize"
                     >
                       <FileSearch size={14} className={aiWorkingId === `${item.id}-SUM` ? 'animate-spin' : ''} />
                     </button>
                   )}
                </div>

                <button 
                  onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  <MoreVertical size={20} />
                </button>
                
                {activeMenuId === item.id && (
                  <div className="absolute right-0 top-10 w-48 glass-panel border-white/10 rounded-2xl py-2 z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <button onClick={() => handleBoostPost(item.id)} className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors flex items-center gap-2 text-purple-400">
                      <Rocket size={14} /> Boost Post
                    </button>
                    {item.author.username === user.username && (
                      <>
                        <button onClick={() => handleEditPost(item)} className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors flex items-center gap-2">
                          <Edit3 size={14} /> Edit Post
                        </button>
                        <button onClick={() => handleDeletePost(item.id)} className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors flex items-center gap-2 text-red-400">
                          <X size={14} /> Delete Post
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* AI Results Panel */}
            {(aiResults[`${item.id}-TRANS`] || aiResults[`${item.id}-SUM`]) && (
              <div className="px-6 pb-4">
                 <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs animate-in slide-in-from-top-2">
                    <div className="flex items-center justify-between mb-2">
                       <span className="font-bold uppercase tracking-widest text-[8px] flex items-center gap-1">
                          <Sparkles size={10} /> {aiResults[`${item.id}-TRANS`]?.type === 'TRANS' ? 'AI Translation' : 'AI Summary'}
                       </span>
                       <button onClick={() => {
                          const newResults = {...aiResults};
                          delete newResults[`${item.id}-TRANS`];
                          delete newResults[`${item.id}-SUM`];
                          setAiResults(newResults);
                       }} className="text-gray-500 hover:text-indigo-400">
                          <X size={10} />
                       </button>
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed">
                       {aiResults[`${item.id}-TRANS`]?.content || aiResults[`${item.id}-SUM`]?.content}
                    </p>
                 </div>
              </div>
            )}

            {/* Post Content */}
            {item.content.text && (
              <div className="px-6 pb-4">
                <p className="text-gray-200 leading-relaxed text-sm">
                  {item.content.text.split(' ').map((word, i) => 
                    word.startsWith('#') || word.startsWith('@') 
                      ? <span key={i} className="text-purple-400 font-bold hover:underline cursor-pointer">{word} </span> 
                      : word + ' '
                  )}
                </p>
                {item.content.tags && item.content.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.content.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded-md font-bold uppercase tracking-widest border border-purple-500/20">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Media / Video Embed */}
            {item.type === 'YOUTUBE' && item.content.youtubeId && (
              <div className="px-4 pb-4">
                {activeYouTube === item.id ? (
                  <YouTubeEmbed 
                    videoId={item.content.youtubeId} 
                    title="Synced Video" 
                    onClose={() => setActiveYouTube(null)} 
                  />
                ) : (
                  <div 
                    onClick={() => setActiveYouTube(item.id)}
                    className="relative aspect-video rounded-3xl overflow-hidden glass-panel border-white/10 cursor-pointer group"
                  >
                     <img src={`https://img.youtube.com/vi/${item.content.youtubeId}/maxresdefault.jpg`} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30">
                          <Play size={32} fill="white" className="ml-1 text-white" />
                        </div>
                     </div>
                     <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-1">
                       <Youtube size={12} /> Sync Library
                     </div>
                  </div>
                )}
              </div>
            )}

            {item.type !== 'TEXT' && item.type !== 'YOUTUBE' && item.content.mediaUrl && (
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

        {!hasMore && filteredItems.length > 0 && (
          <div className="text-center py-10 text-gray-500 italic text-sm">
            You've reached the edge of the multiverse. 🌌
          </div>
        )}
      </div>

      <CreatePostModal 
        isOpen={isPostModalOpen}
        onClose={() => { setIsPostModalOpen(false); setEditingPost(null); }}
        onSubmit={handleCreatePost}
        editData={editingPost ? {
          type: editingPost.type as any,
          caption: editingPost.content.text || '',
          tags: editingPost.content.tags || [],
          privacy: editingPost.privacy,
          mediaUrl: editingPost.content.mediaUrl,
          isBoosted: editingPost.isBoosted
        } : undefined}
      />
    </div>
  );
};

export default HomeFeed;
