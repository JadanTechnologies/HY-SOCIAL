
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
            <linearGradient id="hyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" /> {/* Green */}
              <stop offset="100%" stopColor="#dc2626" /> {/* Red */}
            </linearGradient>
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
            
            {/* The "hy" logo integrated directly into the SVG as requested */}
            <g transform="translate(100, 100) scale(0.5)">
               {/* Lowercase "hy" with brand gradient */}
               <text 
                x="200" 
                y="300" 
                textAnchor="middle" 
                fontFamily="Arial, sans-serif" 
                fontWeight="900" 
                fontSize="240" 
                fill="url(#hyGradient)"
                style={{ letterSpacing: '-15px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' }}
              >
                hy
              </text>
              {/* Brain Network Mesh */}
              <g transform="translate(0, -20)" opacity="0.9">
                <path d="M200 60 C140 60 90 110 90 170 C90 190 95 210 105 225 L295 225 C305 210 310 190 310 170 C310 110 260 60 200 60Z" stroke="white" strokeWidth="4" fill="none" opacity="0.2" />
                <path d="M150 70 L250 70 M120 100 L280 100 M100 140 L300 140 M100 180 L300 180" stroke="white" strokeWidth="2" opacity="0.4" />
                <path d="M200 60 L200 220 M150 70 L120 200 M250 70 L280 200" stroke="white" strokeWidth="2" opacity="0.4" />
                {[
                  {x: 200, y: 60}, {x: 150, y: 70}, {x: 250, y: 70}, 
                  {x: 120, y: 100}, {x: 280, y: 100}, {x: 100, y: 140}, 
                  {x: 300, y: 140}, {x: 105, y: 180}, {x: 295, y: 180}
                ].map((node, i) => (
                  <circle key={i} cx={node.x} cy={node.y} r="10" fill="white" stroke="url(#hyGradient)" strokeWidth="4" />
                ))}
              </g>
            </g>
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
