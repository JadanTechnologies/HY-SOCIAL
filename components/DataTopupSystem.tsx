
import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Globe, Zap, Database, ArrowRight, ShieldCheck, 
  ChevronRight, Search, Loader2, CheckCircle2, History, TrendingUp,
  DollarSign, Calculator, AlertTriangle, RefreshCw, BarChart3,
  Server, Layers, PhoneCall, Gift, CreditCard, Wallet, Sparkles
} from 'lucide-react';
import { User } from '../App';

interface Product {
  id: string;
  name: string;
  data: string;
  validity: string;
  costNGN: number;
  costUSD: number;
}

interface Operator {
  id: string;
  name: string;
  logo: string;
  products: Product[];
}

interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  operators: Operator[];
}

const MOCK_CATALOG: Country[] = [
  {
    id: 'c1', name: 'Nigeria', code: 'NG', flag: '🇳🇬',
    operators: [
      { id: 'op1', name: 'MTN Nigeria', logo: 'MTN', products: [
        { id: 'p1', name: 'SME 500MB', data: '500MB', validity: '30 Days', costNGN: 150, costUSD: 0.10 },
        { id: 'p2', name: 'SME 1GB', data: '1GB', validity: '30 Days', costNGN: 280, costUSD: 0.18 },
        { id: 'p3', name: 'SME 5GB', data: '5GB', validity: '30 Days', costNGN: 1350, costUSD: 0.88 },
      ]},
      { id: 'op2', name: 'Airtel Nigeria', logo: 'Airtel', products: [
        { id: 'p4', name: 'Social 2GB', data: '2GB', validity: '7 Days', costNGN: 500, costUSD: 0.32 },
        { id: 'p5', name: 'Big Data 10GB', data: '10GB', validity: '30 Days', costNGN: 2800, costUSD: 1.82 },
      ]}
    ]
  },
  {
    id: 'c2', name: 'United States', code: 'US', flag: '🇺🇸',
    operators: [
      { id: 'op3', name: 'AT&T', logo: 'ATT', products: [
        { id: 'p6', name: 'Intl 1GB', data: '1GB', validity: '30 Days', costNGN: 8000, costUSD: 5.20 },
      ]}
    ]
  }
];

const DataTopupSystem: React.FC<{ user: User; setUser: (u: User) => void }> = ({ user, setUser }) => {
  const [tab, setTab] = useState<'BUY' | 'RESELLER' | 'ACCOUNTING'>('BUY');
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Reseller markup settings
  const [markup, setMarkup] = useState(user.resellerMarkup || 5);
  const [isEditingMarkup, setIsEditingMarkup] = useState(false);

  const calculatePrice = (baseCost: number) => {
    return Math.ceil(baseCost * (1 + markup / 100));
  };

  const handlePurchase = () => {
    if (!phoneNumber) return setError('Enter destination phone number');
    if (!selectedProduct) return;

    const userPrice = calculatePrice(selectedProduct.costNGN);
    if (user.balances.NGN < userPrice) return setError('Insufficient NGN balance');

    setLoading(true);
    // Simulate API call to Reloadly/Ding
    setTimeout(() => {
      const profit = userPrice - selectedProduct.costNGN;
      const newBalances = { ...user.balances };
      newBalances.NGN -= userPrice;

      setUser({ 
        ...user, 
        balances: newBalances,
        resellerProfitNGN: (user.resellerProfitNGN || 0) + profit,
        rewardHistory: [
          { id: `topup-${Date.now()}`, type: 'Data Purchase', amount: `-${userPrice} NGN`, timestamp: 'Just now' },
          ...user.rewardHistory
        ]
      });

      setLoading(false);
      setSuccess(`Data delivered to ${phoneNumber} successfully!`);
      setStep(1);
      setSelectedProduct(null);
      setPhoneNumber('');
      setTimeout(() => setSuccess(''), 5000);
    }, 2500);
  };

  const renderBuyData = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Steps Progress */}
      <div className="flex items-center justify-between px-4">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-3">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= s ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500'}`}>
               {s}
             </div>
             <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s ? 'text-blue-400' : 'text-gray-500'}`}>
               {s === 1 ? 'Country' : s === 2 ? 'Operator' : 'Plan'}
             </span>
             {s < 3 && <div className="w-12 h-px bg-white/10 hidden sm:block"></div>}
          </div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-[2.5rem] border-white/10 relative overflow-hidden">
        {step === 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_CATALOG.map(c => (
              <button 
                key={c.id} 
                onClick={() => { setSelectedCountry(c); setStep(2); }}
                className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{c.flag}</span>
                  <div className="text-left">
                    <p className="font-bold">{c.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{c.operators.length} Operators Available</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        )}

        {step === 2 && selectedCountry && (
          <div className="space-y-6">
            <button onClick={() => setStep(1)} className="text-xs text-blue-400 flex items-center gap-2 font-bold mb-4">
               <ArrowRight size={14} className="rotate-180" /> Back to Countries
            </button>
            <div className="grid md:grid-cols-2 gap-4">
              {selectedCountry.operators.map(op => (
                <button 
                  key={op.id} 
                  onClick={() => { setSelectedOperator(op); setStep(3); }}
                  className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-xs text-blue-400">
                      {op.logo}
                    </div>
                    <div className="text-left">
                      <p className="font-bold">{op.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Global Sync Protocol</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && selectedOperator && (
          <div className="space-y-8">
            <button onClick={() => setStep(2)} className="text-xs text-blue-400 flex items-center gap-2 font-bold">
               <ArrowRight size={14} className="rotate-180" /> Back to Operators
            </button>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
               {selectedOperator.products.map(p => (
                 <button 
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`p-6 rounded-3xl border transition-all text-left flex flex-col justify-between ${selectedProduct?.id === p.id ? 'bg-blue-600/10 border-blue-500 shadow-xl shadow-blue-500/10' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                 >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xl font-bold">{p.data}</span>
                        <div className="bg-white/5 px-2 py-1 rounded text-[10px] text-gray-400 font-bold">{p.validity}</div>
                      </div>
                      <p className="text-xs text-gray-400 mb-6">{p.name}</p>
                    </div>
                    <div className="flex justify-between items-end">
                       <div>
                         <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Price</p>
                         <p className="text-lg font-bold">₦{calculatePrice(p.costNGN)}</p>
                       </div>
                       {selectedProduct?.id === p.id && <CheckCircle2 className="text-blue-400" size={20} />}
                    </div>
                 </button>
               ))}
            </div>

            {selectedProduct && (
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 animate-in slide-in-from-bottom-4">
                <div className="grid md:grid-cols-2 gap-8 items-end">
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Destination Number</label>
                    <div className="relative">
                       <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                       <input 
                        type="tel" 
                        placeholder="e.g. 08012345678"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-blue-500 outline-none transition-all font-bold"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                       />
                    </div>
                  </div>
                  <button 
                    onClick={handlePurchase}
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
                    {loading ? 'Routing to Server...' : 'Authorize Transaction'}
                  </button>
                </div>
                {error && <p className="mt-4 text-xs text-red-400 font-bold flex items-center gap-2"><AlertTriangle size={14} /> {error}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderResellerHub = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 rounded-[2.5rem] border-white/10">
           <div className="flex items-center gap-3 mb-4">
             <BarChart3 className="text-blue-400" size={20} />
             <h4 className="font-bold">Protocol Revenue</h4>
           </div>
           <p className="text-xs text-gray-500 mb-6 leading-relaxed">Your markup generates liquid profit on every successful sync broadcast.</p>
           
           <div className="space-y-4">
             <div>
               <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Total Profits</p>
               <p className="text-3xl font-bold">₦{user.resellerProfitNGN?.toLocaleString() || 0}</p>
             </div>
             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-pulse" style={{ width: '65%' }}></div>
             </div>
           </div>
        </div>

        <div className="glass-panel p-8 rounded-[2.5rem] border-white/10 lg:col-span-2">
           <div className="flex items-center justify-between mb-8">
              <h4 className="font-bold flex items-center gap-3">
                 <Calculator className="text-purple-400" size={20} /> Dynamic Pricing Engine
              </h4>
              <button 
                onClick={() => setIsEditingMarkup(!isEditingMarkup)}
                className="text-xs font-bold text-blue-400 hover:underline"
              >
                {isEditingMarkup ? 'Save Settings' : 'Adjust Markup'}
              </button>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div>
                   <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block">Mark-up Percentage (%)</label>
                   <div className="relative">
                      <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                      <input 
                        type="number" 
                        disabled={!isEditingMarkup}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-xl font-bold focus:border-purple-500 outline-none transition-all disabled:opacity-50"
                        value={markup}
                        onChange={(e) => setMarkup(Number(e.target.value))}
                      />
                   </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                    <p className="text-[10px] text-purple-400 font-bold uppercase mb-1">Recommended markup</p>
                    <p className="text-xs text-gray-400">Industry standard is 3.5% - 7%. Higher markups may reduce volume.</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <h5 className="text-xs font-bold text-gray-500 uppercase">Profit Simulator</h5>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm p-3 rounded-xl bg-white/5">
                       <span className="text-gray-400">Base Cost (MTN 1GB)</span>
                       <span className="font-bold">₦280</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-3 rounded-xl bg-white/5">
                       <span className="text-gray-400">Your Price (Markup)</span>
                       <span className="font-bold text-blue-400">₦{calculatePrice(280)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                       <span className="text-green-400 font-bold">Net Profit</span>
                       <span className="text-green-400 font-bold">₦{calculatePrice(280) - 280}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] border-white/10 overflow-hidden">
         <div className="p-8 border-b border-white/5 flex items-center justify-between">
           <h4 className="font-bold flex items-center gap-3">
             <Server className="text-gray-500" size={20} /> Integration Endpoints (Simulated)
           </h4>
           <div className="bg-green-500/10 px-3 py-1 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-widest border border-green-500/20">Active</div>
         </div>
         <div className="p-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'AUTHENTICATE', method: 'POST', endpoint: '/api/v1/auth' },
              { label: 'FETCH_CATALOG', method: 'GET', endpoint: '/api/v1/products' },
              { label: 'EXECUTE_TOPUP', method: 'POST', endpoint: '/api/v1/topup' },
              { label: 'SYNC_WEBHOOK', method: 'POST', endpoint: '/api/v1/notify' }
            ].map(api => (
              <div key={api.label} className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all cursor-pointer">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest bg-blue-400/10 px-1.5 py-0.5 rounded">{api.method}</span>
                   <Layers size={12} className="text-gray-600" />
                 </div>
                 <p className="text-[10px] font-bold text-white mb-1 uppercase tracking-tighter">{api.label}</p>
                 <p className="text-[10px] text-gray-500 font-mono truncate">{api.endpoint}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  const renderAccounting = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="glass-panel rounded-[2.5rem] border-white/10 overflow-hidden">
         <div className="p-8 border-b border-white/5 flex items-center justify-between">
           <h4 className="font-bold flex items-center gap-3">
             <History className="text-gray-500" size={20} /> Settlement Reconciliation
           </h4>
           <button className="p-2 glass-panel rounded-xl text-gray-400 hover:text-white transition-colors">
              <RefreshCw size={16} />
           </button>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-white/5">
                 <tr>
                   <th className="px-8 py-4">Transaction Reference</th>
                   <th className="px-8 py-4">Reseller Cost (NGN)</th>
                   <th className="px-8 py-4">Selling Price (NGN)</th>
                   <th className="px-8 py-4">Network Fee</th>
                   <th className="px-8 py-4">Net Profit</th>
                   <th className="px-8 py-4">Status</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                 <tr className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6 font-mono text-xs text-gray-400">HY-TX-998240</td>
                    <td className="px-8 py-6 font-medium">₦280.00</td>
                    <td className="px-8 py-6 font-bold text-blue-400">₦294.00</td>
                    <td className="px-8 py-6 text-gray-500">₦0.00</td>
                    <td className="px-8 py-6 text-green-400 font-bold">₦14.00</td>
                    <td className="px-8 py-6">
                       <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-[8px] font-bold uppercase border border-green-500/20">Settled</span>
                    </td>
                 </tr>
                 <tr className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6 font-mono text-xs text-gray-400">HY-TX-998241</td>
                    <td className="px-8 py-6 font-medium">₦150.00</td>
                    <td className="px-8 py-6 font-bold text-blue-400">₦157.50</td>
                    <td className="px-8 py-6 text-gray-500">₦0.00</td>
                    <td className="px-8 py-6 text-green-400 font-bold">₦7.50</td>
                    <td className="px-8 py-6">
                       <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-[8px] font-bold uppercase border border-green-500/20">Settled</span>
                    </td>
                 </tr>
                 <tr className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6 font-mono text-xs text-gray-400">HY-TX-998242</td>
                    <td className="px-8 py-6 font-medium">₦1,350.00</td>
                    <td className="px-8 py-6 font-bold text-blue-400">₦1,417.50</td>
                    <td className="px-8 py-6 text-gray-500">₦0.00</td>
                    <td className="px-8 py-6 text-red-400 font-bold">₦0.00</td>
                    <td className="px-8 py-6">
                       <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-[8px] font-bold uppercase border border-red-500/20">Refunded</span>
                    </td>
                 </tr>
              </tbody>
           </table>
         </div>
      </div>
      
      <div className="p-6 rounded-3xl bg-yellow-600/10 border border-yellow-500/20 flex gap-4">
        <AlertTriangle className="text-yellow-400 shrink-0" size={20} />
        <div>
          <p className="text-xs font-bold text-yellow-400 mb-1">Accounting Notice</p>
          <p className="text-[10px] text-gray-400 leading-relaxed">
             Daily reconciliation completes at 00:00 UTC. Discrepancies should be reported to the Oracle Admin panel for manual override.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-space">Data Multiverse</h1>
          <p className="text-gray-400">Global high-speed data delivery and decentralized reseller protocol.</p>
        </div>
        
        <div className="flex p-1 rounded-2xl glass-panel border-white/10 w-fit">
          <button 
            onClick={() => setTab('BUY')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${tab === 'BUY' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <Smartphone size={14} className="inline mr-2" /> Top-up Data
          </button>
          <button 
            onClick={() => setTab('RESELLER')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${tab === 'RESELLER' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <BarChart3 size={14} className="inline mr-2" /> Reseller Hub
          </button>
          <button 
            onClick={() => setTab('ACCOUNTING')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${tab === 'ACCOUNTING' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <History size={14} className="inline mr-2" /> Accounting
          </button>
        </div>
      </div>

      {success && (
        <div className="mb-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-center font-bold animate-in fade-in slide-in-from-top-4 flex items-center justify-center gap-2">
          <CheckCircle2 size={18} /> {success}
        </div>
      )}

      {tab === 'BUY' ? renderBuyData() : tab === 'RESELLER' ? renderResellerHub() : renderAccounting()}

      {/* Quick Bonus Notification Widget (Sidebar Style) */}
      <div className="fixed right-8 bottom-32 hidden xl:block animate-in slide-in-from-right-10 duration-700">
         <div className="w-64 glass-panel p-6 rounded-3xl border-blue-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
               <Gift size={80} />
            </div>
            <h5 className="font-bold text-sm mb-2 flex items-center gap-2">
               <Sparkles className="text-yellow-400" size={14} /> New User MBs
            </h5>
            <p className="text-[10px] text-gray-500 leading-relaxed mb-4">You have 30MB remaining from your welcome bonus protocol.</p>
            <div className="flex items-center gap-2">
               <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '60%' }}></div>
               </div>
               <span className="text-[8px] font-bold text-gray-500">60%</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DataTopupSystem;
