
import React, { useState, useEffect } from 'react';
import { 
  X, Image as ImageIcon, Video as VideoIcon, Type, 
  Globe, Users, Lock, Tag, Users as MentionsIcon, 
  Rocket, DollarSign, Sparkles, Loader2, AlertCircle,
  // Fix: Added missing icon Send
  Send
} from 'lucide-react';

export interface PostDraft {
  type: 'PHOTO' | 'VIDEO' | 'TEXT';
  caption: string;
  tags: string[];
  mentions: string[];
  privacy: 'PUBLIC' | 'FOLLOWERS' | 'PRIVATE';
  mediaUrl?: string;
  isBoosted?: boolean;
}

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (draft: PostDraft) => void;
  editData?: PostDraft;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit, editData }) => {
  const [type, setType] = useState<'PHOTO' | 'VIDEO' | 'TEXT'>(editData?.type || 'TEXT');
  const [caption, setCaption] = useState(editData?.caption || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(editData?.tags || []);
  const [privacy, setPrivacy] = useState<'PUBLIC' | 'FOLLOWERS' | 'PRIVATE'>(editData?.privacy || 'PUBLIC');
  const [isBoosted, setIsBoosted] = useState(editData?.isBoosted || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setType(editData.type);
      setCaption(editData.caption);
      setTags(editData.tags);
      setPrivacy(editData.privacy);
      setIsBoosted(editData.isBoosted || false);
    } else {
      setType('TEXT');
      setCaption('');
      setTags([]);
      setPrivacy('PUBLIC');
      setIsBoosted(false);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/#/g, '');
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    if (type === 'TEXT' && !caption.trim()) {
      return setError('Please enter some text for your post.');
    }
    setLoading(true);
    // Simulate upload delay
    setTimeout(() => {
      onSubmit({
        type,
        caption,
        tags,
        mentions: [], // Basic implementation doesn't parse mentions yet
        privacy,
        mediaUrl: type !== 'TEXT' ? 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800' : undefined,
        isBoosted
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-xl glass-panel border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="text-purple-400" size={20} />
            {editData ? 'Revise Broadcast' : 'Initialize Broadcast'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* Content Type Selector */}
          <div className="flex p-1 rounded-2xl bg-white/5 border border-white/5">
            <button 
              onClick={() => setType('TEXT')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${type === 'TEXT' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              <Type size={16} /> Status
            </button>
            <button 
              onClick={() => setType('PHOTO')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${type === 'PHOTO' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              <ImageIcon size={16} /> Photo
            </button>
            <button 
              onClick={() => setType('VIDEO')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${type === 'VIDEO' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              <VideoIcon size={16} /> Video
            </button>
          </div>

          {/* Media Placeholder (if not text) */}
          {type !== 'TEXT' && (
            <div className="aspect-video rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {type === 'PHOTO' ? <ImageIcon className="text-purple-400" size={32} /> : <VideoIcon className="text-blue-400" size={32} />}
              </div>
              <p className="font-bold text-sm">Upload {type === 'PHOTO' ? 'Image' : 'Video'}</p>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">DRAG & DROP OR CLICK</p>
            </div>
          )}

          {/* Caption Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Multiverse Message</label>
            <textarea 
              autoFocus
              rows={4}
              placeholder="Tell the creators what's on your mind..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500/50 resize-none transition-all placeholder:text-gray-600"
              value={caption}
              onChange={(e) => {setCaption(e.target.value); setError('');}}
            />
          </div>

          {/* Tags & Mentions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Tag size={12} /> Keywords
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Add tags..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 outline-none"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <button key={tag} onClick={() => removeTag(tag)} className="px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold flex items-center gap-1 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                    #{tag} <X size={10} />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <MentionsIcon size={12} /> Mention Creators
              </label>
              <input 
                type="text" 
                placeholder="@username..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Privacy & Boost */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Broadcasting Scope</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setPrivacy('PUBLIC')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${privacy === 'PUBLIC' ? 'bg-white/10 border-blue-500 text-blue-400' : 'bg-white/5 border-white/5 text-gray-500'}`}
                >
                  <Globe size={16} />
                  <span className="text-[10px] font-bold">Public</span>
                </button>
                <button 
                  onClick={() => setPrivacy('FOLLOWERS')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${privacy === 'FOLLOWERS' ? 'bg-white/10 border-purple-500 text-purple-400' : 'bg-white/5 border-white/5 text-gray-500'}`}
                >
                  <Users size={16} />
                  <span className="text-[10px] font-bold">Followers</span>
                </button>
                <button 
                  onClick={() => setPrivacy('PRIVATE')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${privacy === 'PRIVATE' ? 'bg-white/10 border-pink-500 text-pink-400' : 'bg-white/5 border-white/5 text-gray-500'}`}
                >
                  <Lock size={16} />
                  <span className="text-[10px] font-bold">Private</span>
                </button>
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center justify-between">
                Multiverse Reach 
                <span className="text-[10px] text-purple-400 font-bold bg-purple-400/10 px-1 rounded">Paid Option</span>
              </label>
              <button 
                onClick={() => setIsBoosted(!isBoosted)}
                className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group ${isBoosted ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/10' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${isBoosted ? 'bg-purple-600 text-white' : 'bg-white/10 group-hover:bg-purple-600/20'}`}>
                    <Rocket size={18} className={isBoosted ? 'animate-bounce' : ''} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${isBoosted ? 'text-white' : ''}`}>Boost Broadcast</p>
                    <p className="text-[10px] text-gray-500">Target 10K+ Creators</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-xs font-bold ${isBoosted ? 'text-green-400' : ''}`}>50 $HY</span>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${isBoosted ? 'bg-purple-600' : 'bg-gray-700'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${isBoosted ? 'left-4.5' : 'left-0.5'}`}></div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={14} /> {error}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-white/5 bg-white/5 flex gap-4">
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (editData ? 'Apply Updates' : 'Launch Broadcast')}
            {!loading && <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
