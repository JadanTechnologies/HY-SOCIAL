
import React from 'react';
import { Menu, Wallet, LogOut, LayoutDashboard, Home, Search, MessageSquare, PlaySquare, Radio } from 'lucide-react';
import { User, AppState } from '../App';

interface NavbarProps {
  scrolled: boolean;
  user: User | null;
  appState: AppState;
  onNavigate: (state: AppState) => void;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, user, appState, onNavigate, onAuthClick, onLogout }) => {
  const isImmersive = appState === 'VIDEO_FEED' || appState === 'LIVE';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || appState !== 'LANDING' ? (isImmersive ? 'bg-black/20 backdrop-blur-md border-b border-white/5 py-2' : 'bg-[#030014]/80 backdrop-blur-lg border-b border-white/10 py-3') : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('LANDING')}>
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-bold text-2xl tracking-tighter shadow-lg shadow-purple-500/20">
            HY
          </div>
          <span className="text-xl font-bold tracking-tight hidden md:block">HYPER SPACE</span>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button 
            onClick={() => onNavigate('LANDING')} 
            className={`transition-colors ${appState === 'LANDING' ? 'text-white' : 'hover:text-white'}`}
          >
            Ecosystem
          </button>
          {user && (
            <>
              <button 
                onClick={() => onNavigate('FEED')} 
                className={`transition-colors flex items-center gap-2 ${appState === 'FEED' ? 'text-white' : 'hover:text-white'}`}
              >
                <Home size={16} /> Feed
              </button>
              <button 
                onClick={() => onNavigate('VIDEO_FEED')} 
                className={`transition-colors flex items-center gap-2 ${appState === 'VIDEO_FEED' ? 'text-white' : 'hover:text-white'}`}
              >
                <PlaySquare size={16} /> Shorts
              </button>
              <button 
                onClick={() => onNavigate('LIVE')} 
                className={`transition-colors flex items-center gap-2 ${appState === 'LIVE' ? 'text-white' : 'hover:text-white'}`}
              >
                <Radio size={16} className="text-red-500" /> Live
              </button>
              <button 
                onClick={() => onNavigate('CHAT')} 
                className={`transition-colors flex items-center gap-2 ${appState === 'CHAT' ? 'text-white' : 'hover:text-white'}`}
              >
                <MessageSquare size={16} /> Chat
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigate('DASHBOARD')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full glass-panel transition-all text-sm font-semibold border-purple-500/30 ${appState === 'DASHBOARD' ? 'bg-white/10' : 'hover:bg-white/10'}`}
              >
                <LayoutDashboard size={16} className="text-purple-400" />
                <span className="max-w-[100px] truncate hidden sm:block">{user.username}</span>
              </button>
              <button 
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={onAuthClick}
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full glass-panel hover:bg-white/10 transition-all text-sm font-semibold"
              >
                <Wallet size={16} />
                Connect
              </button>
              <button 
                onClick={onAuthClick}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-sm shadow-lg shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                Get Started
              </button>
            </>
          )}
          <button className="lg:hidden p-2 text-gray-400">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
