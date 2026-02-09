
import React, { useState, useEffect } from 'react';
import { 
  Gift, Trophy, Users, Play, Database, RefreshCw, 
  CheckCircle2, Share2, ArrowRight, Loader2, Sparkles, 
  Coins, Zap, Milestone, Plus, Copy, Info, AlertCircle
} from 'lucide-react';
import { User, RewardHistory } from '../App';

const MILESTONES = [
  { count: 100, reward: 50, type: 'HY', label: '100 Followers' },
  { count: 500, reward: 250, type: 'HY', label: '500 Followers' },
  { count: 1000, reward: 500, type: 'MB', label: '1K Followers' },
  { count: 5000, reward: 2000, type: 'HY', label: '5K Followers' },
];

const RewardSystem: React.FC<{ user: User; setUser: (u: User) => void }> = ({ user, setUser }) => {
  const [claiming, setClaiming] = useState<string | null>(null);
  const [adTimer, setAdTimer] = useState(0);
  const [convertAmount, setConvertAmount] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const addReward = (type: string, amount: string, mb?: number, hy?: number) => {
    const newHistory: RewardHistory = {
      id: `rew-${Date.now()}`,
      type,
      amount,
      timestamp: 'Just now'
    };
    
    const newBalances = { ...user.balances };
    if (hy) newBalances.HY += hy;

    setUser({
      ...user,
      balances: newBalances,
      dataBalanceMB: user.dataBalanceMB + (mb || 0),
      rewardHistory: [newHistory, ...user.rewardHistory.slice(0, 14)]
    });
  };

  const handleDailyClaim = () => {
    const now = new Date();
    const lastClaim = user.lastDailyClaim ? new Date(user.lastDailyClaim) : null;
    
    if (lastClaim && now.toDateString() === lastClaim.toDateString()) {
      setErrorMsg('Already claimed today. Come back tomorrow!');
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    setClaiming('daily');
    setTimeout(() => {
      const rewardMB = 25;
      addReward('Daily Login', `+${rewardMB}MB Data`, rewardMB);
      setUser({ ...user, lastDailyClaim: now.toISOString(), dataBalanceMB: user.dataBalanceMB + rewardMB });
      setClaiming(null);
      setSuccessMsg('Successfully claimed your daily data bonus!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 1500);
  };

  const handleWatchAd = () => {
    setAdTimer(15);
    const interval = setInterval(() => {
      setAdTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          addReward('Ad Watch', '+5 $HY', 0, 5);
          setSuccessMsg('Reward received for watching ad!');
          setTimeout(() => setSuccessMsg(''), 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClaimMilestone = (m: typeof MILESTONES[0]) => {
    if (user.followers < m.count) return;
    if (user.milestonesClaimed.includes(m.count)) return;

    setClaiming(`milestone-${m.count}`);
    setTimeout(() => {
      if (m.type === 'HY') addReward('Milestone', `+${m.reward} $HY`, 0, m.reward);
      else addReward('Milestone', `+${m.reward}MB Data`, m.reward);
      
      setUser({
        ...user,
        milestonesClaimed: [...user.milestonesClaimed, m.count],
        dataBalanceMB: user.dataBalanceMB + (m.type === 'MB' ? m.reward : 0),
        balances: { ...user.balances, HY: user.balances.HY + (m.type === 'HY' ? m.reward : 0) }
      });
      setClaiming(null);
    }, 1000);
  };

  const handleConvertData = () => {
    if (convertAmount <= 0) return;
    if (user.dataBalanceMB < convertAmount) return setErrorMsg('Insufficient data balance');

    const hyAmount = Math.floor(convertAmount / 10); // 10MB = 1 $HY
    if (hyAmount <= 0) return setErrorMsg('Minimum conversion is 10MB');

    setClaiming('convert');
    setTimeout(() => {
      setUser({
        ...user,
        dataBalanceMB: user.dataBalanceMB - convertAmount,
        balances: { ...user.balances, HY: user.balances.HY + hyAmount }
      });
      addReward('Data Conversion', `+${hyAmount} $HY`, 0, hyAmount);
      setSuccessMsg(`Converted ${convertAmount}MB to ${hyAmount} $HY!`);
      setConvertAmount(0);
      setClaiming(null);
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 1500);
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://hy.space/join/${user.username}`);
    setSuccessMsg('Referral link copied to clipboard!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-space">Rewards Hub</h1>
          <p className="text-gray-400">Complete tasks, grow your influence, and earn multiverse assets.</p>
        </div>
        
        <div className="glass-panel px-6 py-4 rounded-3xl border-yellow-500/30 bg-yellow-500/5 flex items-center gap-6 shadow-lg shadow-yellow-500/5">
          <div className="flex flex-col items-center">
             <Database className="text-blue-400 mb-1" size={20} />
             <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Data Balance</span>
             <span className="text-xl font-bold">{user.dataBalanceMB} MB</span>
          </div>
          <div className="w-px h-10 bg-white/10"></div>
          <div className="flex flex-col items-center">
             <Zap className="text-yellow-400 mb-1" size={20} />
             <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">HY Balance</span>
             <span className="text-xl font-bold">{user.balances.HY} $HY</span>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-center font-bold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Sparkles size={18} /> {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-center font-bold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-4">
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Earn Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 text-purple-500/5 group-hover:scale-110 transition-transform">
                 <Gift size={120} />
               </div>
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-2 flex items-center gap-2">Daily Login Bonus</h3>
                 <p className="text-xs text-gray-500 mb-6 leading-relaxed">Check in every 24 hours to receive 25MB high-speed multiverse data.</p>
                 <button 
                  onClick={handleDailyClaim}
                  disabled={!!claiming}
                  className="w-full py-4 bg-purple-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-500 transition-all disabled:opacity-50"
                 >
                   {claiming === 'daily' ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={18} />}
                   {claiming === 'daily' ? 'Syncing...' : 'Claim 25MB Bonus'}
                 </button>
               </div>
            </div>

            <div className="glass-panel p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 text-blue-500/5 group-hover:scale-110 transition-transform">
                 <Play size={120} />
               </div>
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-2 flex items-center gap-2">Watch & Earn</h3>
                 <p className="text-xs text-gray-500 mb-6 leading-relaxed">Boost your earnings by watching decentralized ad broadcasts. 15s = 5 $HY.</p>
                 <button 
                  onClick={handleWatchAd}
                  disabled={adTimer > 0}
                  className={`w-full py-4 ${adTimer > 0 ? 'bg-white/5 text-blue-400' : 'bg-blue-600 hover:bg-blue-500'} rounded-2xl font-bold flex items-center justify-center gap-2 transition-all`}
                 >
                   {adTimer > 0 ? <Loader2 className="animate-spin" /> : <Play size={18} />}
                   {adTimer > 0 ? `Transmitting... ${adTimer}s` : 'Watch Advert'}
                 </button>
               </div>
            </div>
          </div>

          {/* Referral Center */}
          <div className="glass-panel p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-yellow-500/10">
                <Users size={200} />
             </div>
             <div className="relative z-10">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Refer & Conquer</h3>
                    <p className="text-gray-400 text-sm max-w-sm">Bring your squad to the HY Multiverse. Earn 100 $HY for every verified creator you refer.</p>
                  </div>
                  <div className="flex flex-col items-center p-6 rounded-3xl bg-white/5 border border-white/5 min-w-[160px]">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Refers</span>
                    <span className="text-3xl font-bold text-yellow-400">{user.referrals}</span>
                  </div>
               </div>
               
               <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input 
                      readOnly 
                      value={`hy.space/join/${user.username}`}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium outline-none"
                    />
                    <button 
                      onClick={copyReferral}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <button className="px-8 py-4 bg-yellow-600 hover:bg-yellow-500 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-600/10">
                    <Share2 size={18} /> Share Invite
                  </button>
               </div>
             </div>
          </div>

          {/* Follower Milestones */}
          <div className="glass-panel rounded-[2.5rem] border-white/10 overflow-hidden">
             <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <Milestone className="text-purple-400" /> Influence Milestones
                </h3>
                <span className="text-xs text-gray-500 font-bold">Current: {user.followers.toLocaleString()} Followers</span>
             </div>
             <div className="p-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {MILESTONES.map((m) => {
                 const isClaimed = user.milestonesClaimed.includes(m.count);
                 const canClaim = user.followers >= m.count && !isClaimed;
                 const progress = Math.min(100, (user.followers / m.count) * 100);

                 return (
                   <div key={m.count} className={`p-5 rounded-3xl border flex flex-col items-center text-center transition-all ${isClaimed ? 'bg-green-500/5 border-green-500/20' : 'bg-white/5 border-white/5'}`}>
                      <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center ${isClaimed ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/10 text-purple-400'}`}>
                         <Trophy size={20} />
                      </div>
                      <h4 className="font-bold text-sm mb-1">{m.label}</h4>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-4">Reward: {m.reward} {m.type}</p>
                      
                      <div className="w-full h-1 bg-white/5 rounded-full mb-6 overflow-hidden">
                         <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                      </div>

                      <button 
                        onClick={() => handleClaimMilestone(m)}
                        disabled={!canClaim || !!claiming}
                        className={`w-full py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          isClaimed ? 'bg-green-500/20 text-green-400 cursor-default' :
                          canClaim ? 'bg-purple-600 text-white hover:bg-purple-500 animate-pulse' :
                          'bg-white/5 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isClaimed ? 'Claimed' : canClaim ? 'Unlock Now' : `${m.count - user.followers} Left`}
                      </button>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Data Conversion */}
          <div className="glass-panel p-8 rounded-[2.5rem] border-white/10 space-y-6">
             <div className="flex items-center gap-3">
               <RefreshCw className="text-blue-400" size={24} />
               <h3 className="text-xl font-bold">Data Converter</h3>
             </div>
             <p className="text-xs text-gray-400 leading-relaxed">Convert your spare data balance into liquid $HY tokens. Every 10MB = 1 $HY.</p>
             
             <div className="space-y-4">
               <div className="relative">
                 <input 
                  type="number" 
                  step="10"
                  placeholder="MB to convert..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:border-blue-500 outline-none transition-all"
                  value={convertAmount || ''}
                  onChange={(e) => setConvertAmount(Number(e.target.value))}
                 />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 uppercase">MB</span>
               </div>
               
               <div className="flex items-center justify-center p-2">
                 <ArrowRight className="text-gray-700 rotate-90 lg:rotate-0" />
               </div>

               <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Estimated Output</p>
                  <p className="text-2xl font-bold text-yellow-400">{Math.floor(convertAmount / 10)} $HY</p>
               </div>

               <button 
                onClick={handleConvertData}
                disabled={convertAmount < 10 || !!claiming}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50"
               >
                 {claiming === 'convert' ? <Loader2 className="animate-spin" /> : <RefreshCw size={18} />}
                 {claiming === 'convert' ? 'Processing...' : 'Authorize Conversion'}
               </button>
             </div>
          </div>

          {/* Reward History */}
          <div className="glass-panel p-8 rounded-[2.5rem] border-white/10">
             <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
               <History className="text-gray-500" size={20} /> Reward Logs
             </h3>
             <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
               {user.rewardHistory.length > 0 ? (
                 user.rewardHistory.map((h) => (
                   <div key={h.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5">
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded-xl bg-green-500/10 text-green-400">
                            <Plus size={16} />
                         </div>
                         <div>
                            <p className="text-xs font-bold">{h.type}</p>
                            <p className="text-[10px] text-gray-500">{h.timestamp}</p>
                         </div>
                      </div>
                      <span className="text-xs font-bold text-green-400">{h.amount}</span>
                   </div>
                 ))
               ) : (
                 <div className="py-10 text-center text-gray-600 text-sm italic">
                    No rewards logged yet. Start earning!
                 </div>
               )}
             </div>
          </div>

          {/* Protocol Info */}
          <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex gap-4">
             <div className="mt-1 text-blue-400"><Info size={20} /></div>
             <div>
                <p className="text-xs font-bold mb-1">Oracle Fair-Play System</p>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  All rewards are subject to anti-fraud verification. Multi-accounting will result in session termination and asset forfeiture.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const History: React.FC<{ className?: string, size?: number }> = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="m12 7v5l4 2" />
  </svg>
);

export default RewardSystem;
