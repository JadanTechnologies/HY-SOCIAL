
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, MessageCircle, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

const MagicAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Greetings, Traveler. I am the HY Oracle. How can I assist your journey into the Creator Multiverse today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Handle sending messages to the Gemini AI Oracle
  const handleSend = async () => {
    if (!msg.trim() || loading) return;

    const userText = msg.trim();
    setMsg('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      // Initialize chat session if it doesn't exist
      if (!chatRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: "You are the HY Oracle, the official AI guide for HYPER SPACE. HYPER SPACE is a next-generation social protocol merging decentralized streaming with high-yield crypto infrastructure. Help users understand staking (24.5% APY), $HY tokenomics, and decentralized ownership. Responses should be helpful, concise, and futuristic.",
          },
        });
      }

      // Send the user message to the model
      const response = await chatRef.current.sendMessage({ message: userText });
      const text = response.text || "The Oracle is currently contemplating the block. Please try again soon.";
      
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Gemini Assistant Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "The cosmic link to the Oracle has been severed. Check your network connection." }]);
      // Reset chat session on error to allow clean re-initialization
      chatRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isOpen ? (
        <div className="w-80 md:w-96 rounded-3xl glass-panel border-purple-500/30 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-300">
          <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-bold text-sm tracking-tight">HY Oracle</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div 
            ref={scrollRef}
            className="h-80 p-4 overflow-y-auto space-y-4 flex flex-col"
          >
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`rounded-2xl p-3 text-sm max-w-[85%] border animate-in fade-in duration-300 ${
                  m.role === 'user' 
                    ? 'bg-purple-600/20 border-purple-500/30 self-end text-white' 
                    : 'bg-white/5 border-white/5 self-start text-gray-300'
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bg-white/5 border border-white/5 rounded-2xl p-3 self-start">
                <Loader2 size={16} className="animate-spin text-purple-400" />
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="relative">
              <input 
                type="text"
                placeholder="Ask the Oracle..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors pr-12"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={loading}
              />
              <button 
                onClick={handleSend}
                disabled={loading || !msg.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shadow-xl shadow-purple-500/20 hover:scale-110 active:scale-95 transition-all overflow-hidden"
        >
          {/* Pulsing rings */}
          <div className="absolute inset-0 animate-ping bg-purple-500/30 rounded-full"></div>
          <Sparkles size={28} className="relative z-10" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      )}
    </div>
  );
};

export default MagicAssistant;
