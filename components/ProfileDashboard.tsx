
import React, { useState } from 'react';
import { 
  Shield, History, Smartphone, Edit3, Check, X, RefreshCw, MapPin, 
  Users, UserPlus, Youtube, Instagram, Music, LayoutDashboard, 
  Video, TrendingUp, DollarSign, MapPin as MapPinIcon, Info 
} from 'lucide-react';
import { User } from '../App';

interface ProfileDashboardProps {
  user: User;
  setUser: (user: User) => void;
  onClose: () => void;
}

type DashboardTab = 'OVERVIEW' | 'SECURITY';

const loginHistory = [
  { id: 1, device: 'iPhone 15 Pro', location: 'New York, USA', time: '2 mins ago', ip: '192.168.1.1' },
  { id: 2, device: 'MacBook Pro M3', location: 'London, UK', time: '5 hours ago', ip: '45.12.33.102' },
  { id: 3, device: 'Chrome on Windows', location: 'Berlin, Germany', time: '2 days ago', ip: '10.0.0.45' },
];

const activeSessions = [
  { id: 1, name: 'Current Session', device: 'iPhone 15 Pro', status: 'Active Now' },
  { id: 2, name: 'Main Workstation', device: 'MacBook Pro', status: '2 hours ago' },
];

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ user, setUser, onClose }) => {
  const [tab, setTab] = useState<DashboardTab>('OVERVIEW');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ 
    username: user.username, 
    bio: user.bio || '', 
    location: user.location || '' 
  });
  const [success, setSuccess] = useState('');

  const handleUpdateProfile = () => {
    if (editData.username.length < 3) return;
    setUser({ 
      ...user, 
      username: editData.username,
      bio: editData.bio,
      location: editData.location
    });
    setIsEditing(false);
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Cinematic Header Card */}
      <div className="relative glass-panel rounded-[2.5rem] border-white/10 overflow-hidden bg-[#030014]">
        {/* Cover Photo Placeholder */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-pink-900/40 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <button className="absolute top-4 right-4 p-2 rounded-lg glass-panel hover:bg-white/10 transition-colors text-xs font-bold">
            Change Cover
          </button>
        </div>
        
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-end gap-6 -mt-16 md:-mt-20 relative z-10 mb-8">
            {/* Profile Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-tr from-purple-600 to-blue-500 p-1 shadow-2xl shadow-purple-500/30">
                <div className="w-full h-full rounded-[calc(1.5rem-0.25rem)] bg-slate-900 flex items-center justify-center text-4xl font-bold">
                  {user.username.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-white text-black rounded-xl hover:scale-110 transition-transform">
                <Edit3 size={16} />
              </button>
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold">@{user.username}</h2>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">Verified</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <span className="flex items-center gap-1"><MapPinIcon size={14} /> {user.location}</span>
                <span className="flex items-center gap-1 font-medium text-purple-400">Referrer: @{user.referralCode}</span>
              </div>
            </div>

            <div className="flex gap-3 pb-4">
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 rounded-xl glass-panel hover:bg-white/5 transition-all font-bold flex items-center gap-2"
              >
                <Edit3 size={18} /> Edit Profile
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Bio Section */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <Info size={14} /> Creator Bio
                </h4>
                <p className="text-gray-300 leading-relaxed italic">
                  "{user.bio}"
                </p>
              </div>

              {/* Linked Accounts */}
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Linked Accounts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/30 transition-all cursor-pointer">
                    <div className="p-2 rounded-lg bg-red-600/10 text-red-500"><Youtube size={20} /></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase font-bold">YouTube</span>
                      <span className="text-xs font-medium">{user.socialLinks.youtube}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-pink-500/30 transition-all cursor-pointer">
                    <div className="p-2 rounded-lg bg-pink-600/10 text-pink-500"><Instagram size={20} /></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase font-bold">Instagram</span>
                      <span className="text-xs font-medium">{user.socialLinks.instagram}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer">
                    <div className="p-2 rounded-lg bg-cyan-600/10 text-cyan-500"><Music size={20} /></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase font-bold">TikTok</span>
                      <span className="text-xs font-medium">{user.socialLinks.tiktok}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/10 flex flex-col justify-center">
                  <span className="text-xs text-gray-500 mb-1">Followers</span>
                  <span className="text-2xl font-bold">{user.followers.toLocaleString()}</span>
                </div>
                <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/10 flex flex-col justify-center">
                  <span className="text-xs text-gray-500 mb-1">Following</span>
                  <span className="text-2xl font-bold">{user.following.toLocaleString()}</span>
                </div>
                <div className="p-5 rounded-3xl bg-gradient-to-br from-pink-600/10 to-transparent border border-pink-500/10 flex flex-col justify-center">
                   <span className="text-xs text-gray-500 mb-1">Referrals</span>
                   <span className="text-2xl font-bold">{user.referrals}</span>
                </div>
                <div className="p-5 rounded-3xl bg-gradient-to-br from-green-600/10 to-transparent border border-green-500/10 flex flex-col justify-center">
                   <span className="text-xs text-gray-500 mb-1">Rating</span>
                   <span className="text-2xl font-bold">4.9/5</span>
                </div>
              </div>

              {/* Activity Stats Card */}
              <div className="p-6 rounded-3xl glass-panel border-white/10">
                 <h4 className="text-sm font-bold text-gray-400 mb-6 flex items-center gap-2">
                    <LayoutDashboard size={14} /> Activity Metrics
                 </h4>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <DollarSign size={16} className="text-green-400" />
                        <span className="text-xs text-gray-400">Total Earnings</span>
                     </div>
                     <span className="font-bold text-green-400">{user.stats.earningsHY} $HY</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Video size={16} className="text-purple-400" />
                        <span className="text-xs text-gray-400">Stream Time</span>
                     </div>
                     <span className="font-bold">{user.stats.streamingHours} Hrs</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <TrendingUp size={16} className="text-blue-400" />
                        <span className="text-xs text-gray-400">Total Views</span>
                     </div>
                     <span className="font-bold">{user.stats.totalViews}</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="lg:col-span-1 space-y-6">
        <div className="glass-panel p-6 rounded-3xl border-white/5">
           <div className="flex items-center gap-3 mb-4">
             <Shield size={20} className="text-blue-400" />
             <h4 className="font-bold">Protocol Protection</h4>
           </div>
           <p className="text-xs text-gray-500 leading-relaxed">
             Your keys are protected by the Hyper Space Secure Enclave. All transactions are logged on-chain.
           </p>
        </div>
        <div className="glass-panel p-6 rounded-3xl border-white/5">
           <div className="flex items-center gap-3 mb-4">
             <LayoutDashboard size={20} className="text-purple-400" />
             <h4 className="font-bold">Ecosystem Status</h4>
           </div>
           <div className="space-y-3">
             <div className="flex justify-between text-xs">
               <span className="text-gray-500">Node Connectivity</span>
               <span className="text-green-400 font-bold">Stable (99.9%)</span>
             </div>
             <div className="flex justify-between text-xs">
               <span className="text-gray-500">Gas Priority</span>
               <span className="text-blue-400 font-bold">High</span>
             </div>
           </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-8">
        <div className="glass-panel p-8 rounded-[2.5rem] border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Smartphone className="text-purple-400" size={24} />
              <h3 className="text-xl font-bold">Authenticated Devices</h3>
            </div>
            <button className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
              <RefreshCw size={12} /> Sync
            </button>
          </div>
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Smartphone size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">{session.name}</h5>
                    <p className="text-xs text-gray-500">{session.device}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${session.status === 'Active Now' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[2.5rem] border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <History className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold">Access Logs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-widest border-b border-white/5">
                  <th className="pb-4">Timestamp</th>
                  <th className="pb-4">IP Address</th>
                  <th className="pb-4">Location</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loginHistory.map((log) => (
                  <tr key={log.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                    <td className="py-4 text-gray-300">{log.time}</td>
                    <td className="py-4 font-mono text-[10px]">{log.ip}</td>
                    <td className="py-4 text-gray-400">{log.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Multiverse Dashboard</h1>
          <p className="text-gray-400">Control your digital presence and monitor ecosystem metrics.</p>
        </div>
        
        <div className="flex p-1 rounded-2xl glass-panel border-white/10 w-fit">
          <button 
            onClick={() => setTab('OVERVIEW')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'OVERVIEW' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
          >
            Public Profile
          </button>
          <button 
            onClick={() => setTab('SECURITY')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'SECURITY' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
          >
            Security Hub
          </button>
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-center font-bold animate-in fade-in slide-in-from-top-4">
          {success}
        </div>
      )}

      {tab === 'OVERVIEW' ? renderOverview() : renderSecurity()}

      {/* Edit Profile Modal (Simplified) */}
      {isEditing && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsEditing(false)}></div>
          <div className="relative w-full max-w-lg glass-panel border-white/10 rounded-[2.5rem] p-8 md:p-10">
            <h3 className="text-2xl font-bold mb-6">Update Profile</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Username</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                  value={editData.username}
                  onChange={(e) => setEditData({...editData, username: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Location</label>
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                  value={editData.location}
                  onChange={(e) => setEditData({...editData, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Bio</label>
                <textarea 
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 resize-none"
                  value={editData.bio}
                  onChange={(e) => setEditData({...editData, bio: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={handleUpdateProfile}
                className="flex-1 py-4 bg-purple-600 rounded-xl font-bold hover:bg-purple-500 transition-colors"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-8 py-4 glass-panel rounded-xl font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;
