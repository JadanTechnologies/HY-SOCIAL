
import React from 'react';
import { Github, Twitter, Instagram, Youtube, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2">
            <div className="mb-6">
              <Logo size={40} showText={true} />
            </div>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-xs">
              Building the next generation of social and financial infrastructure for the creator economy. Powered by decentralization.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"><Github size={18} /></a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">Ecosystem</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Streaming</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Creators</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Staking</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Governance</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">Resources</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">Company</h5>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Press Kit</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
             <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">Join Newsletter</h5>
             <div className="flex gap-2">
               <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-500/50"
               />
               <button className="p-2 bg-white text-black rounded-lg">
                 <ArrowUpRight size={16} />
               </button>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500">
            © 2024 HYPER SPACE PROTOCOL. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
