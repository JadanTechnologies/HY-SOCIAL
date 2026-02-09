
import React, { useState } from 'react';
import { X, Mail, Phone, Globe, Shield, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { User } from '../App';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

type AuthStep = 'SELECT' | 'EMAIL' | 'PHONE' | 'OTP' | 'FORGOT' | 'ONBOARDING';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<AuthStep>('SELECT');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [referral, setReferral] = useState('hermeess');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('ONBOARDING');
    }, 1200);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return setError('Please enter your phone number');
    setError('');
    setStep('OTP');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '1234') return setError('Invalid OTP. Use 1234 for demo.');
    setStep('ONBOARDING');
  };

  const handleOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3) return setError('Username too short');
    setLoading(true);
    setTimeout(() => {
      onSuccess({
        username,
        email: email || undefined,
        phone: phone || undefined,
        referralCode: referral,
        isAuthenticated: true,
        bio: 'Explorer of the HY Multiverse. Content Creator & Crypto Enthusiast.',
        location: 'Neo Tokyo',
        followers: 1240,
        following: 850,
        referrals: 12,
        socialLinks: {
          youtube: '@hyper_creator',
          instagram: 'hyper.life',
          tiktok: 'hy_shorts'
        },
        stats: {
          earningsHY: '2,450.80',
          streamingHours: 142,
          totalViews: '845K'
        }
      });
      setLoading(false);
    }, 1000);
  };

  const renderContent = () => {
    switch (step) {
      case 'SELECT':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-2xl font-bold text-center mb-6">Enter Hyper Space</h3>
            <button 
              onClick={handleGoogleLogin}
              className="w-full py-4 rounded-xl glass-panel border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all font-semibold"
            >
              <Globe size={20} className="text-blue-400" />
              Continue with Google
            </button>
            <button 
              onClick={() => setStep('PHONE')}
              className="w-full py-4 rounded-xl glass-panel border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all font-semibold"
            >
              <Phone size={20} className="text-purple-400" />
              Continue with Phone
            </button>
            <button 
              onClick={() => setStep('EMAIL')}
              className="w-full py-4 rounded-xl glass-panel border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all font-semibold"
            >
              <Mail size={20} className="text-pink-400" />
              Continue with Email
            </button>
            <p className="text-[10px] text-gray-500 text-center mt-6">
              By connecting, you agree to our Protocol Terms and Privacy Policy.
            </p>
          </div>
        );

      case 'PHONE':
        return (
          <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-2xl font-bold text-center">Phone Login</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Mobile Number</label>
              <input 
                autoFocus
                type="tel" 
                placeholder="+1 (555) 000-0000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-purple-500 outline-none transition-all"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {error && <div className="text-red-400 text-xs flex items-center gap-2"><AlertCircle size={14} /> {error}</div>}
            <button className="w-full py-4 bg-purple-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-500 transition-all">
              Send OTP <ArrowRight size={18} />
            </button>
            <button type="button" onClick={() => setStep('SELECT')} className="w-full text-center text-gray-500 text-sm hover:text-white transition-colors">Go Back</button>
          </form>
        );

      case 'OTP':
        return (
          <form onSubmit={handleOtpVerify} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-2xl font-bold text-center">Verify Identity</h3>
            <p className="text-gray-400 text-center text-sm">Enter the 4-digit code sent to your device.</p>
            <input 
              autoFocus
              maxLength={4}
              type="text" 
              placeholder="0 0 0 0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-2xl tracking-[1em] focus:border-purple-500 outline-none transition-all font-bold"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {error && <div className="text-red-400 text-xs flex items-center gap-2 justify-center"><AlertCircle size={14} /> {error}</div>}
            <button className="w-full py-4 bg-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all">
              Verify & Connect <CheckCircle2 size={18} />
            </button>
          </form>
        );

      case 'ONBOARDING':
        return (
          <form onSubmit={handleOnboarding} className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold mb-2">Initialize Profile</h3>
              <p className="text-gray-400 text-sm">Create your unique identifier in the multiverse.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-purple-400">Unique Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                  <input 
                    type="text" 
                    placeholder="cyber_pioneer"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-4 focus:border-purple-500 outline-none transition-all"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-blue-400">Referral Code (Optional)</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-blue-500 outline-none transition-all"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                />
              </div>
            </div>
            {error && <div className="text-red-400 text-xs flex items-center gap-2"><AlertCircle size={14} /> {error}</div>}
            <button 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              {loading ? "Decrypting..." : "Activate Ecosystem Access"} 
              <ArrowRight size={18} />
            </button>
          </form>
        );

      case 'EMAIL':
        return (
          <form onSubmit={(e) => { e.preventDefault(); setStep('ONBOARDING'); }} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-2xl font-bold text-center">Email Access</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-pink-500 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Password</label>
                <input 
                  type="password" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-pink-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <button type="button" onClick={() => setStep('FORGOT')} className="text-pink-400 hover:underline">Forgot Password?</button>
            </div>
            <button className="w-full py-4 bg-pink-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pink-500 transition-all">
              Sign In <ArrowRight size={18} />
            </button>
            <button type="button" onClick={() => setStep('SELECT')} className="w-full text-center text-gray-500 text-sm hover:text-white transition-colors">Go Back</button>
          </form>
        );

      case 'FORGOT':
        return (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
             <h3 className="text-2xl font-bold text-center">Recover Access</h3>
             <p className="text-gray-400 text-center text-sm">Enter your email to receive recovery instructions.</p>
             <input type="email" placeholder="email@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-purple-500 outline-none transition-all" />
             <button onClick={() => setStep('EMAIL')} className="w-full py-4 bg-purple-600 rounded-xl font-bold">Send Reset Link</button>
             <button onClick={() => setStep('EMAIL')} className="w-full text-center text-gray-500 text-sm">Back to Login</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md glass-panel border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/20 blur-[60px] rounded-full"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all"
        >
          <X size={20} />
        </button>

        {renderContent()}
      </div>
    </div>
  );
};

export default AuthModal;
