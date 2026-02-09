
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CryptoSection from './components/CryptoSection';
import VideoServiceSection from './components/VideoServiceSection';
import Footer from './components/Footer';
import MagicAssistant from './components/MagicAssistant';
import AuthModal from './components/AuthModal';
import ProfileDashboard from './components/ProfileDashboard';
import HomeFeed from './components/HomeFeed';
import ChatSystem from './components/ChatSystem';
import ShortVideoFeed from './components/ShortVideoFeed';
import LiveSystem from './components/LiveSystem';
import WalletSystem from './components/WalletSystem';
import RewardSystem from './components/RewardSystem';
import DataTopupSystem from './components/DataTopupSystem';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  publishedAt: string;
}

export interface UserStats {
  earningsHY: string;
  streamingHours: number;
  totalViews: string;
}

export interface SocialLinks {
  youtube?: string;
  instagram?: string;
  tiktok?: string;
}

export interface WalletBalances {
  NGN: number;
  USD: number;
  HY: number;
}

export interface RewardHistory {
  id: string;
  type: string;
  amount: string;
  timestamp: string;
}

export interface User {
  username: string;
  email?: string;
  phone?: string;
  referralCode: string;
  isAuthenticated: boolean;
  bio?: string;
  location?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  followers: number;
  following: number;
  referrals: number;
  socialLinks: SocialLinks;
  stats: UserStats;
  // YouTube Integration Data
  youtubeLinked?: boolean;
  youtubeChannelName?: string;
  youtubeSubscribers?: string;
  youtubeRecentVideos?: YouTubeVideo[];
  // Wallet Data
  balances: WalletBalances;
  // Rewards Data
  dataBalanceMB: number;
  lastDailyClaim?: string;
  milestonesClaimed: number[]; // e.g. [100, 500, 1000]
  referralEarningsHY: number;
  rewardHistory: RewardHistory[];
  // Reseller Data
  isReseller?: boolean;
  resellerMarkup: number; // Percentage
  resellerProfitNGN: number;
}

export type AppState = 'LANDING' | 'FEED' | 'DASHBOARD' | 'CHAT' | 'VIDEO_FEED' | 'LIVE' | 'WALLET' | 'REWARDS' | 'DATA_TOPUP';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [appState, setAppState] = useState<AppState>('LANDING');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setIsAuthModalOpen(false);
    setAppState('FEED');
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('LANDING');
  };

  const renderContent = () => {
    if (!user && appState !== 'LANDING') {
      return (
        <div className="pt-48 pb-32 text-center px-6">
          <h2 className="text-4xl font-bold mb-6 text-space">Unauthorized Transmission</h2>
          <p className="text-gray-400 mb-8">You must connect your identity to the multiverse to access this sector.</p>
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="px-8 py-4 bg-purple-600 rounded-xl font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20"
          >
            Connect Identity
          </button>
        </div>
      );
    }

    switch (appState) {
      case 'DASHBOARD': return <ProfileDashboard user={user!} setUser={setUser} onClose={() => setAppState('FEED')} />;
      case 'FEED': return <HomeFeed user={user!} />;
      case 'CHAT': return <ChatSystem user={user!} />;
      case 'VIDEO_FEED': return <ShortVideoFeed />;
      case 'LIVE': return <LiveSystem user={user!} />;
      case 'WALLET': return <WalletSystem user={user!} setUser={setUser} />;
      case 'REWARDS': return <RewardSystem user={user!} setUser={setUser} />;
      case 'DATA_TOPUP': return <DataTopupSystem user={user!} setUser={setUser} />;
      default:
        return (
          <>
            <Hero />
            <VideoServiceSection />
            <CryptoSection />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      </div>

      <Navbar 
        scrolled={scrollY > 50} 
        user={user} 
        appState={appState}
        onNavigate={(state) => setAppState(state)}
        onAuthClick={() => user ? setAppState('DASHBOARD') : setIsAuthModalOpen(true)} 
        onLogout={handleLogout}
      />
      
      <main className={`relative z-10 ${appState === 'VIDEO_FEED' ? 'h-screen overflow-hidden' : ''}`}>
        {renderContent()}
      </main>

      {appState !== 'VIDEO_FEED' && appState !== 'LIVE' && <Footer />}

      <MagicAssistant />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleLogin} 
      />
    </div>
  );
};

export default App;
