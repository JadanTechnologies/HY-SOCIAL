
import React from 'react';
import { Camera, Shield, MessageSquare, Zap, Globe, Cpu } from 'lucide-react';

const featureList = [
  {
    icon: <Camera className="text-purple-500" />,
    title: "4K Decen-Stream",
    desc: "Broadcast in peerless quality using our distributed node network."
  },
  {
    icon: <Shield className="text-blue-500" />,
    title: "On-Chain ID",
    desc: "Your identity is yours. No shadowbanning, no data harvesting."
  },
  {
    icon: <MessageSquare className="text-pink-500" />,
    title: "Social Synergy",
    desc: "Interact with fans through integrated tipping and token-gated chats."
  },
  {
    icon: <Zap className="text-yellow-500" />,
    title: "Lightning Swap",
    desc: "Exchange tokens instantly with near-zero slippage directly in-app."
  },
  {
    icon: <Globe className="text-green-500" />,
    title: "Edge Nodes",
    desc: "Global distribution with under 50ms latency anywhere in the world."
  },
  {
    icon: <Cpu className="text-red-500" />,
    title: "Smart Contracts",
    desc: "Automated copyright management and instant royalty distributions."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Powerful Core Features</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Everything you need to build a massive audience and a profitable business in the new internet.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((f, i) => (
          <div key={i} className="group p-8 rounded-3xl glass-panel border-white/5 hover:border-white/20 transition-all hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {React.cloneElement(f.icon as React.ReactElement, { size: 28 })}
            </div>
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
