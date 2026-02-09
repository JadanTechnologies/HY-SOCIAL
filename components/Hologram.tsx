
import React from 'react';

const Hologram: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow Effects */}
      <div className="absolute w-64 h-64 bg-purple-600/30 blur-[100px] rounded-full animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
      
      {/* Floating Elements Animation Container */}
      <div className="relative w-full h-full flex items-center justify-center scale-125 lg:scale-150">
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
          <defs>
            <linearGradient id="holoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
            </linearGradient>
            <filter id="blurFilter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>

          {/* Rotating Outer Ring */}
          <g className="animate-[spin_20s_linear_infinite]">
            <circle cx="200" cy="200" r="140" fill="none" stroke="url(#holoGrad)" strokeWidth="0.5" strokeDasharray="20 10" />
            <circle cx="200" cy="200" r="135" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </g>

          {/* Core Symbol (Hexagon) */}
          <g className="animate-[bounce_4s_ease-in-out_infinite]">
            <path 
              d="M200 100 L286.6 150 L286.6 250 L200 300 L113.4 250 L113.4 150 Z" 
              fill="rgba(139,92,246,0.1)" 
              stroke="url(#holoGrad)" 
              strokeWidth="2"
              className="hologram-glow"
            />
            {/* Inner Geometry */}
            <path d="M200 130 L260 165 L260 235 L200 270 L140 235 L140 165 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <circle cx="200" cy="200" r="40" fill="url(#holoGrad)" className="opacity-20 blur-sm" />
            <text x="200" y="215" textAnchor="middle" fill="white" fontSize="40" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 5px white)' }}>HY</text>
          </g>

          {/* Floating Data Nodes */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const r = 160;
            const x = 200 + r * Math.cos((angle * Math.PI) / 180);
            const y = 200 + r * Math.sin((angle * Math.PI) / 180);
            return (
              <g key={i} className={`animate-[pulse_${2 + i}s_ease-in-out_infinite]`}>
                <circle cx={x} cy={y} r="6" fill="#8b5cf6" />
                <circle cx={x} cy={y} r="10" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />
                <line x1="200" y1="200" x2={x} y2={y} stroke="white" strokeWidth="0.2" opacity="0.2" />
              </g>
            );
          })}
        </svg>

        {/* Scanline Effect */}
        <div className="absolute w-72 h-72 border border-blue-500/20 rounded-xl overflow-hidden pointer-events-none opacity-50">
          <div className="scanline absolute inset-0 w-full h-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Hologram;
