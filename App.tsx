
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
}

export type AppState = 'LANDING' | 'FEED' | 'DASHBOARD';

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
    setAppState('FEED'); // Go to feed after login
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('LANDING');
  };

  const renderContent = () => {
    if (appState === 'DASHBOARD' && user) {
      return <ProfileDashboard user={user} setUser={setUser} onClose={() => setAppState('FEED')} />;
    }
    if (appState === 'FEED' && user) {
      return <HomeFeed user={user} />;
    }
    return (
      <>
        <Hero />
        <VideoServiceSection />
        <CryptoSection />
        <Features />
      </>
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
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
      
      <main className="relative z-10">
        {renderContent()}
      </main>

      <Footer />

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
