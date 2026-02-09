
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 48, showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#065f46" /> {/* Deep Green */}
            <stop offset="100%" stopColor="#991b1b" /> {/* Deep Red */}
          </linearGradient>
          <clipPath id="meshClip">
             <circle cx="200" cy="180" r="120" />
          </clipPath>
        </defs>

        {/* The "hy" text with the specific gradient from the image */}
        <text 
          x="200" 
          y="280" 
          textAnchor="middle" 
          fontFamily="Arial, sans-serif" 
          fontWeight="900" 
          fontSize="180" 
          fill="url(#logoGradient)"
          style={{ letterSpacing: '-10px' }}
        >
          hy
        </text>

        {/* The Brain/Network Mesh above the text */}
        <g opacity="0.8">
          {/* Main Mesh Structure */}
          <path 
            d="M200 60 C140 60 90 110 90 170 C90 190 95 210 105 225 L295 225 C305 210 310 190 310 170 C310 110 260 60 200 60Z" 
            stroke="#6b7280" 
            strokeWidth="2" 
            fill="none" 
            opacity="0.3"
          />
          
          {/* Network Lines */}
          <path d="M150 70 L250 70 M120 100 L280 100 M100 140 L300 140 M100 180 L300 180" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.5" />
          <path d="M200 60 L200 220 M150 70 L120 200 M250 70 L280 200" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.5" />

          {/* Connection Nodes */}
          {[
            {x: 200, y: 60}, {x: 150, y: 70}, {x: 250, y: 70}, 
            {x: 120, y: 100}, {x: 280, y: 100}, {x: 100, y: 140}, 
            {x: 300, y: 140}, {x: 105, y: 180}, {x: 295, y: 180}
          ].map((node, i) => (
            <circle key={i} cx={node.x} cy={node.y} r="6" fill="white" stroke="url(#logoGradient)" strokeWidth="2" />
          ))}
        </g>
      </svg>
      {showText && (
        <span className="font-bold text-xl tracking-tight text-white font-space hidden sm:block">
          HYPER SPACE
        </span>
      )}
    </div>
  );
};

export default Logo;
