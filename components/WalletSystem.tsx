
import React, { useState, useEffect } from 'react';
import { 
  Wallet, Plus, Send, Download, History, CreditCard, Landmark, 
  Coins, Search, CheckCircle2, AlertTriangle, ShieldCheck, 
  ArrowUpRight, ArrowDownLeft, Loader2, X, ChevronRight,
  Globe, User as UserIcon, Phone, Mail, Sparkles, DollarSign,
  Smartphone
} from 'lucide-react';
import { User } from '../App';

interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER_IN' | 'TRANSFER_OUT';
  amount: number;
  currency: 'NGN' | 'USD' | 'HY';
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | 'FLAGGED';
  method?: string;
  counterparty?: string;
  timestamp: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', type: 'DEPOSIT', amount: 50000, currency: 'NGN', status: 'COMPLETED', method: 'Paystack Card', timestamp: '2 hours ago' },
  { id: 'tx-2', type: 'TRANSFER_OUT', amount: 200, currency: 'USD', status: 'COMPLETED', counterparty: '@cyber_queen', timestamp: '5 hours ago' },
  { id: 'tx-3', type: 'WITHDRAW', amount: 15000, currency: 'NGN', status: 'PENDING', method: 'Access Bank', timestamp: 'Yesterday' },
  { id: 'tx-4', type: 'TRANSFER_IN', amount: 120, currency: 'HY', status: 'COMPLETED', counterparty: '@oracle_node', timestamp: '2 days ago' },
  { id: 'tx-5', type: 'TRANSFER_OUT', amount: 5000, currency: 'NGN', status: 'FLAGGED', counterparty: '@unknown_entity', timestamp: '3 days ago' },
];

const WalletSystem: React.FC<{ user: User; setUser: (u: User) => void }> = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'HISTORY'>('OVERVIEW');
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Form States
  const [depositAmount, setDepositAmount] = useState('');
  const [depositCurrency, setDepositCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTarget, setTransferTarget] = useState('');
  const [transferCurrency, setTransferCurrency] = useState<'NGN' | 'USD' | 'HY'>('USD');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawBank, setWithdrawBank] = useState('');

  const handleDeposit = () => {
    if (!depositAmount || isNaN(Number(depositAmount))) return setError('Invalid amount');
    setLoading(true);
    setTimeout(() => {
      const amount = Number(depositAmount);
      const newBalances = { ...user.balances };
      if (depositCurrency === 'NGN') newBalances.NGN += amount;
      else newBalances.USD += amount;

      setUser({ ...user, balances: newBalances });
      setLoading(false);
      setIsDepositOpen(false);
      setSuccess('Funds added successfully via secure payment gateway!');
      setTimeout(() => setSuccess(''), 3000);
      setDepositAmount('');
    }, 2000);
  };

  const handleTransfer = () => {
    if (!transferAmount || !transferTarget) return setError('Missing required fields');
    setLoading(true);
    setTimeout(() => {
      const amount = Number(transferAmount);
      if (user.balances[transferCurrency] < amount) {
        setLoading(false);
        return setError('Insufficient balance');
      }

      const newBalances = { ...user.balances };
      newBalances[transferCurrency] -= amount;

      setUser({ ...user, balances: newBalances });
      setLoading(false);
      setIsTransferOpen(false);
      setSuccess(`Transfer of ${amount} ${transferCurrency} to ${transferTarget} successful!`);
      setTimeout(() => setSuccess(''), 3000);
      setTransferAmount('');
      setTransferTarget('');
    }, 2000);
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || !withdrawBank) return setError('Missing required fields');
    setLoading(true);
    setTimeout(() => {
      const amount = Number(withdrawAmount);
      if (user.balances.NGN < amount) {
        setLoading(false);
        return setError('Insufficient NGN balance for withdrawal');
      }
      // Withdrawal usually doesn't deduct immediately, it's a request
      setLoading(false);
      setIsWithdrawOpen(false);
      setSuccess('Withdrawal request submitted for Admin approval.');
      setTimeout(() => setSuccess(''), 4000);
      setWithdrawAmount('');
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-space">Multiverse Wallet</h1>
          <p className="text-gray-400">Securely manage your earnings, trade currencies, and withdraw locally.</p>
        </div>
        
        {/* Fraud Detection Indicator */}
        <div className="glass-panel px-6 py-3 rounded-2xl border-green-500/30 flex items-center gap-3 bg-green-500/5 shadow-lg shadow-green-500/5">
          <ShieldCheck className="text-green-400" size={20} />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-400/60 leading-none mb-1">Fraud Detection System</p>
            <p className="text-xs font-bold text-white">Secure Protocol Active</p>
          </div>
          <div className="flex gap-1 ml-4">
             <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {success && (
        <div className="mb-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-center font-bold animate-in fade-in slide-in-from-top-4">
          <Sparkles className="inline mr-2" size={16} /> {success}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Balances & Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Balances Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* HY (Crypto) Balance */}
            <div className="glass-panel p-8 rounded-[2.5rem] border-purple-500/20 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-purple-500/5 transition-transform group-hover:scale-110">
                <Coins size={120} />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2">HY Token Balance</p>
                <h2 className="text-4xl font-bold mb-4">{user.balances?.HY || 0} <span className="text-sm font-medium text-purple-400">$HY</span></h2>
                <div className="flex items-center gap-2 text-xs text-purple-400/60 font-medium">
                  <ArrowUpRight size={14} /> +2.4% vs last week
                </div>
              </div>
            </div>

            {/* USD Balance */}
            <div className="glass-panel p-8 rounded-[2.5rem] border-blue-500/20 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-blue-500/5 transition-transform group-hover:scale-110">
                <DollarSign size={120} />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">Fiat Balance (USD)</p>
                <h2 className="text-4xl font-bold mb-4">${user.balances?.USD?.toLocaleString() || 0}</h2>
                <button className="text-[10px] bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full font-bold hover:bg-blue-500/20 transition-all uppercase tracking-widest">Global Payouts</button>
              </div>
            </div>

            {/* NGN Balance */}
            <div className="glass-panel p-8 rounded-[2.5rem] border-emerald-500/20 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-emerald-500/5 transition-transform group-hover:scale-110">
                <Landmark size={120} />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2">Local Balance (NGN)</p>
                <h2 className="text-4xl font-bold mb-4">₦{user.balances?.NGN?.toLocaleString() || 0}</h2>
                <button className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-bold hover:bg-emerald-500/20 transition-all uppercase tracking-widest">Bank Direct</button>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="grid grid-cols-3 gap-6">
            <button 
              onClick={() => setIsDepositOpen(true)}
              className="p-6 glass-panel rounded-3xl border-white/5 flex flex-col items-center gap-3 hover:bg-white/5 hover:border-blue-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <span className="font-bold text-sm">Add Funds</span>
            </button>
            <button 
              onClick={() => setIsTransferOpen(true)}
              className="p-6 glass-panel rounded-3xl border-white/5 flex flex-col items-center gap-3 hover:bg-white/5 hover:border-purple-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Send size={24} />
              </div>
              <span className="font-bold text-sm">Transfer</span>
            </button>
            <button 
              onClick={() => setIsWithdrawOpen(true)}
              className="p-6 glass-panel rounded-3xl border-white/5 flex flex-col items-center gap-3 hover:bg-white/5 hover:border-emerald-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Download size={24} />
              </div>
              <span className="font-bold text-sm">Withdraw</span>
            </button>
          </div>

          {/* Transaction History Section */}
          <div className="glass-panel rounded-[2.5rem] border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <History className="text-gray-500" size={20} /> Transaction Archive
              </h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl bg-white/5 text-[10px] font-bold uppercase tracking-widest">All</button>
                <button className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white">Flagged</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-white/5">
                  <tr>
                    <th className="px-8 py-4">Protocol Event</th>
                    <th className="px-8 py-4">Method/Entity</th>
                    <th className="px-8 py-4">Magnitude</th>
                    <th className="px-8 py-4">Security Status</th>
                    <th className="px-8 py-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_TRANSACTIONS.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            tx.type.includes('IN') || tx.type === 'DEPOSIT' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {tx.type.includes('IN') || tx.type === 'DEPOSIT' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                          </div>
                          <span className="font-bold text-sm">{tx.type.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-300 font-medium">
                        {tx.method || tx.counterparty}
                      </td>
                      <td className="px-8 py-6 font-bold text-sm">
                        {tx.type.includes('OUT') || tx.type === 'WITHDRAW' ? '-' : '+'}
                        {tx.amount.toLocaleString()} {tx.currency}
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                          tx.status === 'COMPLETED' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                          tx.status === 'FLAGGED' ? 'bg-red-500/10 border-red-500/20 text-red-400 animate-pulse' :
                          'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-xs text-gray-500">{tx.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Cards & Security */}
        <div className="space-y-8">
          {/* Virtual HY Card */}
          <div className="aspect-[1.58/1] rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 p-8 shadow-2xl relative overflow-hidden group">
            {/* Holographic Overlays */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-[80px] rounded-full group-hover:translate-x-10 transition-transform duration-1000"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                     <Sparkles size={16} className="text-white" />
                  </div>
                  <span className="font-bold tracking-tighter text-xl">HY PLATINUM</span>
                </div>
                <CreditCard size={32} className="opacity-40" />
              </div>
              
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Protocol Access Key</p>
                <div className="flex gap-4 font-space text-2xl tracking-widest font-bold">
                  <span>****</span>
                  <span>****</span>
                  <span>****</span>
                  <span>{user.referralCode.substring(0,4).toUpperCase()}</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[8px] font-bold uppercase text-white/40 mb-1">Explorer Identity</p>
                  <p className="text-sm font-bold truncate max-w-[150px]">{user.username.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold uppercase text-white/40 mb-1">Expiry</p>
                  <p className="text-sm font-bold">12 / 99</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 space-y-6">
            <h4 className="font-bold flex items-center gap-2">
               <ShieldCheck size={18} className="text-blue-400" /> Guardian Specs
            </h4>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Smartphone size={16} /></div>
                    <span className="text-xs font-bold">2FA Authorization</span>
                 </div>
                 <div className="w-8 h-4 bg-purple-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                 </div>
               </div>
               
               <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><AlertTriangle size={16} /></div>
                    <span className="text-xs font-bold">Risk Alerts</span>
                 </div>
                 <div className="w-8 h-4 bg-blue-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                 </div>
               </div>

               <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                  <p className="text-[10px] text-red-400 font-bold uppercase mb-2">Security Warning</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Attempted access from New IP (142.xx.xx.xx). Transaction flagged as high-risk but protected by Oracle.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {isDepositOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsDepositOpen(false)}></div>
          <div className="relative w-full max-w-md glass-panel border-white/10 rounded-[2.5rem] p-10 overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Plus className="text-blue-400" /> Secure Deposit
               </h3>
               <button onClick={() => setIsDepositOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
             </div>

             <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Deposit Magnitude</label>
                 <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">{depositCurrency === 'NGN' ? '₦' : '$'}</div>
                   <input 
                     type="number" 
                     className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-24 py-4 focus:border-blue-500 outline-none transition-all font-bold text-xl"
                     placeholder="0.00"
                     value={depositAmount}
                     onChange={(e) => {setDepositAmount(e.target.value); setError('');}}
                   />
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                      <button 
                        onClick={() => setDepositCurrency('NGN')}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold ${depositCurrency === 'NGN' ? 'bg-white text-black' : 'text-gray-500'}`}
                      >NGN</button>
                      <button 
                        onClick={() => setDepositCurrency('USD')}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold ${depositCurrency === 'USD' ? 'bg-white text-black' : 'text-gray-500'}`}
                      >USD</button>
                   </div>
                 </div>
               </div>

               <div className="space-y-3">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Authorization Protocol</label>
                 <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all text-left">
                   <div className="flex items-center gap-3">
                      <CreditCard className="text-blue-400" />
                      <div>
                        <p className="text-sm font-bold">Secure Card (Paystack/Flutter)</p>
                        <p className="text-[10px] text-gray-500">Instant Settlement</p>
                      </div>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                 </button>
                 <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all text-left">
                   <div className="flex items-center gap-3">
                      <Landmark className="text-emerald-400" />
                      <div>
                        <p className="text-sm font-bold">Bank Transfer</p>
                        <p className="text-[10px] text-gray-500">10-30 mins sync time</p>
                      </div>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                 </button>
                 <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all text-left">
                   <div className="flex items-center gap-3">
                      <Coins className="text-purple-400" />
                      <div>
                        <p className="text-sm font-bold">Crypto Sync (BTC/ETH/USDT)</p>
                        <p className="text-[10px] text-gray-500">Blockchain Network Speed</p>
                      </div>
                   </div>
                   <ChevronRight size={16} className="text-gray-500" />
                 </button>
               </div>

               {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl">{error}</div>}

               <button 
                 onClick={handleDeposit}
                 disabled={loading}
                 className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
               >
                 {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
                 {loading ? 'Initializing Secure Link...' : 'Execute Protocol'}
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {isTransferOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsTransferOpen(false)}></div>
          <div className="relative w-full max-w-md glass-panel border-white/10 rounded-[2.5rem] p-10 overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Send className="text-purple-400" /> Universe Transfer
               </h3>
               <button onClick={() => setIsTransferOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
             </div>

             <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Destination Creator</label>
                 <div className="relative">
                   <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                   <input 
                     type="text" 
                     className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-purple-500 outline-none transition-all"
                     placeholder="Username, Email or Phone"
                     value={transferTarget}
                     onChange={(e) => {setTransferTarget(e.target.value); setError('');}}
                   />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Transfer Magnitude</label>
                 <div className="relative">
                   <input 
                     type="number" 
                     className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 outline-none transition-all font-bold text-xl"
                     placeholder="0.00"
                     value={transferAmount}
                     onChange={(e) => {setTransferAmount(e.target.value); setError('');}}
                   />
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                      {['NGN', 'USD', 'HY'].map(cur => (
                        <button 
                          key={cur}
                          onClick={() => setTransferCurrency(cur as any)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold ${transferCurrency === cur ? 'bg-white text-black' : 'text-gray-500'}`}
                        >{cur}</button>
                      ))}
                   </div>
                 </div>
                 <p className="text-right text-[10px] text-gray-500 mt-1">
                    Available: {user.balances[transferCurrency].toLocaleString()} {transferCurrency}
                 </p>
               </div>

               {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl">{error}</div>}

               <button 
                 onClick={handleTransfer}
                 disabled={loading}
                 className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
               >
                 {loading ? <Loader2 className="animate-spin" /> : <Send />}
                 {loading ? 'Routing Through Universe...' : 'Authorize Broadcast'}
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsWithdrawOpen(false)}></div>
          <div className="relative w-full max-w-md glass-panel border-white/10 rounded-[2.5rem] p-10 overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Download className="text-emerald-400" /> Local Withdrawal
               </h3>
               <button onClick={() => setIsWithdrawOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
             </div>

             <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Settlement Amount (NGN)</label>
                 <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-emerald-400">₦</div>
                   <input 
                     type="number" 
                     className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-4 focus:border-emerald-500 outline-none transition-all font-bold text-xl"
                     placeholder="0.00"
                     value={withdrawAmount}
                     onChange={(e) => {setWithdrawAmount(e.target.value); setError('');}}
                   />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Destination Account</label>
                 <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-emerald-500 outline-none transition-all appearance-none text-sm font-medium"
                    value={withdrawBank}
                    onChange={(e) => setWithdrawBank(e.target.value)}
                 >
                    <option value="" disabled className="bg-[#030014]">Select Linked Bank</option>
                    <option value="access" className="bg-[#030014]">Access Bank - ****1234</option>
                    <option value="gtb" className="bg-[#030014]">GTBank - ****8892</option>
                    <option value="kuda" className="bg-[#030014]">Kuda Microfinance - ****0012</option>
                 </select>
               </div>

               <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                 <p className="text-[10px] text-emerald-400 font-bold uppercase mb-1">Ecosystem Fee: 0%</p>
                 <p className="text-xs text-gray-500">Admin processing time: 1-4 Hours.</p>
               </div>

               {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl">{error}</div>}

               <button 
                 onClick={handleWithdraw}
                 disabled={loading}
                 className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
               >
                 {loading ? <Loader2 className="animate-spin" /> : <Landmark />}
                 {loading ? 'Syncing with Bank Node...' : 'Request Settlement'}
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletSystem;
