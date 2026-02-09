
import React from 'react';
import { TrendingUp, ArrowUpRight, ShieldCheck, Zap, Database } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 6000 },
  { name: 'Thu', value: 4500 },
  { name: 'Fri', value: 8000 },
  { name: 'Sat', value: 7000 },
  { name: 'Sun', value: 9500 },
];

const CryptoSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="glass-panel p-8 rounded-[2rem] border-white/5 relative group">
            <div className="absolute -top-4 -right-4 bg-blue-600 px-4 py-2 rounded-xl text-xs font-bold shadow-xl shadow-blue-500/20 flex items-center gap-2">
              <Zap size={14} fill="white" /> LIVE TRADING
            </div>
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-gray-400 text-sm font-medium mb-1">HY Token Performance</h4>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">$1.24</span>
                  <span className="text-green-400 text-sm font-bold flex items-center">
                    <ArrowUpRight size={16} /> +12.4%
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-white/5 text-xs font-bold hover:bg-white/10">1D</button>
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-xs font-bold">1W</button>
              </div>
            </div>

            <div className="h-[250px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ background: '#111', border: 'none', borderRadius: '10px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs text-gray-500 block mb-1">Staking APY</span>
                <span className="text-lg font-bold">24.5%</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs text-gray-500 block mb-1">Market Cap</span>
                <span className="text-lg font-bold">$840M</span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Financial Protocol
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Integrated <span className="text-gradient">Crypto Economy</span> for Creators
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Monetize your passion with instant HY token payouts. Swap, stake, and lend directly from your creator dashboard with institutional-grade security.
          </p>

          <div className="space-y-6">
            <div className="flex gap-5 items-start">
              <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 mt-1">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h5 className="font-bold text-lg mb-1">Smart Yield Engine</h5>
                <p className="text-gray-400 text-sm">Automatically distribute ad revenue into high-yield liquidity pools.</p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="p-3 rounded-2xl bg-purple-600/20 text-purple-400 mt-1">
                <Database size={24} />
              </div>
              <div>
                <h5 className="font-bold text-lg mb-1">Zero-Gas Minting</h5>
                <p className="text-gray-400 text-sm">Convert your viral clips into NFTs with our layer-2 scaling solution.</p>
              </div>
            </div>
          </div>
          
          <button className="mt-12 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/20 transition-all">
            Explore Ecosystem
          </button>
        </div>
      </div>
    </section>
  );
};

export default CryptoSection;
