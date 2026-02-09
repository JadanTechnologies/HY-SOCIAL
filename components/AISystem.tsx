
import React, { useState } from 'react';
import { 
  Brain, ShieldCheck, Zap, Languages, FileSearch, 
  Eye, EyeOff, AlertTriangle, CheckCircle2, 
  ArrowRight, BarChart3, Fingerprint, Activity,
  Sparkles, MessageSquare, Info, ShieldAlert
} from 'lucide-react';
import { User } from '../App';

const MODERATION_LOGS = [
  { id: 'log-1', action: 'BLOCKED', reason: 'Harmful Content Detected', target: '@troll_bot', time: '5m ago' },
  { id: 'log-2', action: 'FLAGGED', reason: 'Potential Misinformation', target: '@news_node_3', time: '12m ago' },
  { id: 'log-3', action: 'CLEARED', reason: 'False Positive Override', target: '@creativ_hub', time: '1h ago' },
];

const AISystem: React.FC<{ user: User }> = ({ user }) => {
  const [activeTool, setActiveTool] = useState<'MODERATION' | 'RANKING' | 'ORACLE'>('MODERATION');

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-space">AI Neural Hub</h1>
          <p className="text-gray-400">The central nervous system of HYPER SPACE. Real-time moderation & neural ranking.</p>
        </div>
        
        <div className="flex p-1 rounded-2xl glass-panel border-white/10 w-fit">
          <button 
            onClick={() => setActiveTool('MODERATION')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTool === 'MODERATION' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <ShieldCheck size={14} className="inline mr-2" /> Content Guardian
          </button>
          <button 
            onClick={() => setActiveTool('RANKING')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTool === 'RANKING' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <Zap size={14} className="inline mr-2" /> Neural Feed
          </button>
          <button 
            onClick={() => setActiveTool('ORACLE')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTool === 'ORACLE' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <Brain size={14} className="inline mr-2" /> Oracle Engine
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {activeTool === 'MODERATION' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="glass-panel p-8 rounded-[2.5rem] border-red-500/20 bg-red-500/5">
                    <div className="flex justify-between items-start mb-6">
                       <ShieldAlert className="text-red-400" size={32} />
                       <div className="text-right">
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Auto-Blocked</p>
                          <p className="text-2xl font-bold">1,420</p>
                       </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">The AI Sentinel has successfully neutralized 1,420 instances of harmful content across your feed today.</p>
                 </div>
                 <div className="glass-panel p-8 rounded-[2.5rem] border-green-500/20 bg-green-500/5">
                    <div className="flex justify-between items-start mb-6">
                       <CheckCircle2 className="text-green-400" size={32} />
                       <div className="text-right">
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Safe Posts</p>
                          <p className="text-2xl font-bold">84,200</p>
                       </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">Total verified secure transmissions processed by the neural network in the last 24 hours.</p>
                 </div>
              </div>

              <div className="glass-panel rounded-[2.5rem] border-white/10 overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <Activity className="text-indigo-400" size={20} /> Real-time Security Log
                  </h3>
                  <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                     <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Monitoring Grid</span>
                  </div>
                </div>
                
                <div className="divide-y divide-white/5">
                  {MODERATION_LOGS.map(log => (
                    <div key={log.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                       <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-xl ${log.action === 'BLOCKED' ? 'bg-red-500/10 text-red-400' : log.action === 'FLAGGED' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>
                             {log.action === 'BLOCKED' ? <EyeOff size={16} /> : log.action === 'FLAGGED' ? <AlertTriangle size={16} /> : <Eye size={16} />}
                          </div>
                          <div>
                             <p className="text-sm font-bold">{log.reason}</p>
                             <p className="text-xs text-gray-500">Target: <span className="text-indigo-400">{log.target}</span></p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${log.action === 'BLOCKED' ? 'text-red-400' : log.action === 'FLAGGED' ? 'text-yellow-400' : 'text-green-400'}`}>{log.action}</p>
                          <p className="text-[10px] text-gray-600 font-bold">{log.time}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTool === 'RANKING' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
               <div className="glass-panel p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden group">
                  <div className="absolute -right-4 -top-4 text-indigo-500/5 group-hover:scale-110 transition-transform">
                    <BarChart3 size={150} />
                  </div>
                  <div className="relative z-10">
                     <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">Neural Feed Algorithm</h3>
                     <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg">Your feed is curated by a privacy-preserving AI that ranks content based on neural resonance rather than engagement traps.</p>
                     
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                           <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Affinity</p>
                           <p className="text-lg font-bold">94%</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                           <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Relevance</p>
                           <p className="text-lg font-bold">82%</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                           <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Recency</p>
                           <p className="text-lg font-bold">100%</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                           <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Trust</p>
                           <p className="text-lg font-bold">AAA</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-8 rounded-[2.5rem] bg-indigo-600/10 border border-indigo-500/20 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-20 h-20 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                     <Fingerprint className="text-indigo-400" size={40} />
                  </div>
                  <div>
                     <h4 className="text-xl font-bold mb-2">Proof of Human Integration</h4>
                     <p className="text-gray-400 text-sm leading-relaxed">The ranking engine cross-references social signals with blockchain verification to ensure your feed is 100% free from bot interference.</p>
                  </div>
                  <button className="px-6 py-3 bg-indigo-600 rounded-xl font-bold text-sm whitespace-nowrap shadow-xl shadow-indigo-600/20">Verify Identity</button>
               </div>
            </div>
          )}

          {activeTool === 'ORACLE' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95">
               <div className="glass-panel p-10 rounded-[2.5rem] border-white/10 text-center flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 mb-8 animate-pulse">
                     <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                        <Brain size={48} className="text-indigo-400" />
                     </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Oracle Assistant Engine</h3>
                  <p className="text-gray-400 max-w-md mx-auto mb-10 leading-relaxed">Access the multi-modal power of the HY Oracle for complex reasoning, content generation, and multiverse navigation.</p>
                  
                  <div className="w-full grid md:grid-cols-2 gap-4 text-left">
                     <button className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group">
                        <Sparkles className="text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                        <h5 className="font-bold text-sm mb-1">Content Summarizer</h5>
                        <p className="text-[10px] text-gray-500">Condense 1-hour streams into 30-second neural insights.</p>
                     </button>
                     <button className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group">
                        <Languages className="text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                        <h5 className="font-bold text-sm mb-1">Multiversal Translator</h5>
                        <p className="text-[10px] text-gray-500">Communicate across the multiverse in 120+ languages.</p>
                     </button>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <div className="glass-panel p-8 rounded-[3rem] border-white/10 flex flex-col items-center text-center">
              <div className="relative mb-6">
                 <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center rotate-45">
                    <Zap size={32} className="text-indigo-400 -rotate-45" />
                 </div>
                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#030014] flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-white" />
                 </div>
              </div>
              <h4 className="font-bold mb-2">Neural Link Status</h4>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-4">Operational</p>
              
              <div className="w-full space-y-4">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Sync Rate</span>
                    <span className="font-bold">99.98%</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: '99%' }}></div>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Moderation Latency</span>
                    <span className="font-bold">0.4ms</span>
                 </div>
              </div>
           </div>

           <div className="glass-panel p-8 rounded-[3rem] border-white/10 space-y-6">
              <h4 className="font-bold flex items-center gap-2">
                 <Info size={16} className="text-indigo-400" /> AI Features Brief
              </h4>
              
              <div className="space-y-4">
                 <div className="flex gap-4">
                    <div className="p-2 h-fit bg-white/5 rounded-lg text-indigo-400"><FileSearch size={14} /></div>
                    <div>
                       <p className="text-xs font-bold">Deep Scan Pro</p>
                       <p className="text-[10px] text-gray-500 leading-relaxed">Auto-moderate images and videos for compliance.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="p-2 h-fit bg-white/5 rounded-lg text-indigo-400"><Languages size={14} /></div>
                    <div>
                       <p className="text-xs font-bold">Auto-Translate</p>
                       <p className="text-[10px] text-gray-500 leading-relaxed">Instant global reach for every broadcast.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="p-2 h-fit bg-white/5 rounded-lg text-indigo-400"><MessageSquare size={14} /></div>
                    <div>
                       <p className="text-xs font-bold">Oracle Chat</p>
                       <p className="text-[10px] text-gray-500 leading-relaxed">Intelligent 24/7 creator support system.</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-center">
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-2">Neural Rewards</p>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">Participate in AI model training to earn bonus $HY tokens.</p>
              <button className="w-full py-3 bg-white text-black rounded-xl font-bold text-xs hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                 Stake for AI <ArrowRight size={14} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AISystem;
