
import React, { useRef, useEffect } from 'react';
import { ChevronRight, Zap, Globe, Shield } from 'lucide-react';
import Hologram from './Hologram';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-16">
        
        <div className="relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={14} />
            Next Generation Social Protocol
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8">
            Own the <span className="text-gradient">Experience</span>. <br />
            Share the <span className="text-blue-400">Value</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            HY is the world's first hybrid ecosystem combining decentralized streaming with high-yield crypto infrastructure. Join the creator revolution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden flex items-center justify-center gap-2 transition-transform hover:-translate-y-1">
              Start Streaming
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 glass-panel font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all border border-white/20">
              Whitepaper
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
             <div className="flex flex-col gap-1">
               <span className="text-2xl font-bold">4.2M</span>
               <span className="text-xs text-gray-500 uppercase">Users</span>
             </div>
             <div className="flex flex-col gap-1">
               <span className="text-2xl font-bold">$120M</span>
               <span className="text-xs text-gray-500 uppercase">Total Value</span>
             </div>
             <div className="flex flex-col gap-1">
               <span className="text-2xl font-bold">250K</span>
               <span className="text-xs text-gray-500 uppercase">Nodes</span>
             </div>
          </div>
        </div>

        {/* The Magic Hologram Container */}
        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent z-10"></div>
          <Hologram />
        </div>
      </div>
    </section>
  );
};

export default Hero;
