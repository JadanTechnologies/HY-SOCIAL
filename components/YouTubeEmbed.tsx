
import React from 'react';
import { Play, ExternalLink, Youtube, X } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  onClose?: () => void;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title, onClose }) => {
  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel border-white/10 group shadow-2xl">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 backdrop-blur-md rounded-xl hover:bg-red-500 transition-colors border border-white/10"
        >
          <X size={18} />
        </button>
      )}
      
      <iframe
        className="w-full h-full border-0"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Futuristic Overlay Corner */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <Youtube size={16} className="text-red-500" />
          <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
