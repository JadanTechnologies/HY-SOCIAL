
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MessageSquare, Users, MoreVertical, Paperclip, 
  Mic, Camera, Send, CheckCheck, Trash2, Smile, Sparkles, 
  Loader2, ArrowLeft, Phone, Video, FileText, Play, X
} from 'lucide-react';
import { User } from '../App';
import { GoogleGenAI } from "@google/genai";

interface ChatSession {
  id: string;
  name: string;
  type: 'DM' | 'GROUP';
  lastMessage: string;
  timestamp: string;
  avatar: string;
  unreadCount: number;
  online?: boolean;
  typing?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  type: 'TEXT' | 'PHOTO' | 'VIDEO' | 'VOICE' | 'DOC' | 'AI';
  content: string;
  mediaUrl?: string;
  timestamp: string;
  status: 'SENDING' | 'DELIVERED' | 'READ';
  isSelf: boolean;
}

const MOCK_SESSIONS: ChatSession[] = [
  { id: '1', name: 'Cyber Creator Alpha', type: 'DM', lastMessage: 'The new stream protocol is live!', timestamp: '2m ago', avatar: 'https://i.pravatar.cc/150?u=1', unreadCount: 2, online: true },
  { id: '2', name: 'HY DAO Governance', type: 'GROUP', lastMessage: 'Proposal #84 passed with 92% support', timestamp: '15m ago', avatar: 'https://i.pravatar.cc/150?u=g1', unreadCount: 0 },
  { id: '3', name: 'Luna Star', type: 'DM', lastMessage: 'Can we collaborate on the next NFT drop?', timestamp: '1h ago', avatar: 'https://i.pravatar.cc/150?u=3', unreadCount: 0, online: false },
  { id: '4', name: 'Hyper Stakers Hub', type: 'GROUP', lastMessage: 'Node rewards have been distributed.', timestamp: '3h ago', avatar: 'https://i.pravatar.cc/150?u=g2', unreadCount: 0 },
];

const ChatSystem: React.FC<{ user: User }> = ({ user }) => {
  const [sessions, setSessions] = useState<ChatSession[]>(MOCK_SESSIONS);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(MOCK_SESSIONS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSession) {
      // Simulate loading messages for session
      setMessages([
        { id: 'm1', senderId: 'other', senderName: activeSession.name, type: 'TEXT', content: 'Welcome to the multiverse chat!', timestamp: '10:00 AM', status: 'READ', isSelf: false },
        { id: 'm2', senderId: user.username, senderName: user.username, type: 'TEXT', content: 'Thanks! The interface looks magical.', timestamp: '10:05 AM', status: 'READ', isSelf: true },
        { id: 'm3', senderId: 'other', senderName: activeSession.name, type: 'PHOTO', content: 'Check out the new node designs.', mediaUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800', timestamp: '10:10 AM', status: 'READ', isSelf: false },
      ]);
    }
  }, [activeSession, user.username]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() && !isAiMode) return;

    const newMessage: Message = {
      id: `m-${Date.now()}`,
      senderId: user.username,
      senderName: user.username,
      type: isAiMode ? 'AI' : 'TEXT',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'SENDING',
      isSelf: true
    };

    setMessages(prev => [...prev, newMessage]);
    const textToSend = inputText;
    setInputText('');

    if (isAiMode) {
      await handleAiResponse(textToSend);
    } else {
      // Simulate delivery
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === newMessage.id ? { ...m, status: 'DELIVERED' } : m));
      }, 1000);
    }
  };

  const handleAiResponse = async (query: string) => {
    setLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: "You are the HY Chat Assistant. Help users with platform features, crypto stats, and general multiverse info. Be concise and use a futuristic tone.",
        },
      });
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        senderId: 'HY_ORACLE',
        senderName: 'HY Oracle',
        type: 'AI',
        content: response.text || "The Oracle is calibrating. Please wait.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'READ',
        isSelf: false
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAi(false);
      setIsAiMode(false);
    }
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="pt-24 pb-8 px-6 max-w-7xl mx-auto h-[calc(100vh-1rem)] flex gap-6 overflow-hidden">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-full md:w-80 flex' : 'hidden md:flex md:w-20'} flex-col glass-panel border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-300`}>
        <div className="p-6 border-b border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>Multiverse Comms</h3>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-xl text-gray-400"
            >
              <ArrowLeft className={`transition-transform duration-300 ${!isSidebarOpen && 'rotate-180'}`} size={20} />
            </button>
          </div>
          <div className={`relative ${!isSidebarOpen && 'hidden'}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              placeholder="Search chats..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-purple-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar py-2">
          {sessions.map(session => (
            <button
              key={session.id}
              onClick={() => {
                setActiveSession(session);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`w-full p-4 flex items-center gap-4 transition-all hover:bg-white/5 relative ${activeSession?.id === session.id ? 'bg-white/5 border-r-2 border-purple-500' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <img src={session.avatar} className="w-12 h-12 rounded-2xl object-cover" />
                {session.online && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#030014] rounded-full"></div>}
              </div>
              <div className={`flex-1 text-left ${!isSidebarOpen && 'hidden'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm truncate">{session.name}</span>
                  <span className="text-[10px] text-gray-500">{session.timestamp}</span>
                </div>
                <p className="text-xs text-gray-400 truncate pr-4">{session.lastMessage}</p>
              </div>
              {session.unreadCount > 0 && isSidebarOpen && (
                <div className="bg-purple-600 text-[10px] font-bold px-2 py-1 rounded-full">{session.unreadCount}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col glass-panel border-white/10 rounded-[2.5rem] overflow-hidden ${isSidebarOpen && window.innerWidth < 768 ? 'hidden' : 'flex'}`}>
        {activeSession ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <button 
                  className="md:hidden p-2 text-gray-400"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 p-0.5">
                  <img src={activeSession.avatar} className="w-full h-full rounded-[calc(0.75rem-0.125rem)] object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{activeSession.name}</h4>
                  <p className="text-[10px] text-gray-400">{activeSession.online ? 'Active in the grid' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-3 hover:bg-white/5 rounded-xl text-gray-400 transition-all"><Phone size={18} /></button>
                <button className="p-3 hover:bg-white/5 rounded-xl text-gray-400 transition-all"><Video size={18} /></button>
                <button className="p-3 hover:bg-white/5 rounded-xl text-gray-400 transition-all"><MoreVertical size={18} /></button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] md:max-w-[60%] relative group ${m.type === 'AI' ? 'w-full max-w-none' : ''}`}>
                    {/* Delete Action */}
                    <button 
                      onClick={() => handleDeleteMessage(m.id)}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-xl z-10"
                    >
                      <Trash2 size={12} />
                    </button>

                    <div className={`rounded-3xl p-4 shadow-xl border ${
                      m.isSelf 
                        ? 'bg-purple-600 text-white border-purple-500' 
                        : m.type === 'AI' 
                          ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30' 
                          : 'bg-white/5 text-gray-200 border-white/10'
                    }`}>
                      {m.type === 'AI' && (
                        <div className="flex items-center gap-2 mb-2 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                          <Sparkles size={12} /> HY Oracle Response
                        </div>
                      )}

                      {m.type === 'PHOTO' && (
                        <div className="rounded-2xl overflow-hidden mb-3">
                          <img src={m.mediaUrl} className="w-full h-auto object-cover max-h-60" />
                        </div>
                      )}

                      {m.type === 'DOC' && (
                        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl mb-2">
                          <FileText size={24} className="text-blue-400" />
                          <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold truncate">multiverse_specs.pdf</p>
                            <p className="text-[10px] text-gray-400">1.2 MB</p>
                          </div>
                        </div>
                      )}

                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                    </div>

                    <div className={`mt-2 flex items-center gap-2 text-[10px] text-gray-500 ${m.isSelf ? 'justify-end' : 'justify-start'}`}>
                      <span>{m.timestamp}</span>
                      {m.isSelf && (
                        <CheckCheck 
                          size={14} 
                          className={m.status === 'READ' ? 'text-blue-400' : 'text-gray-500'} 
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {loadingAi && (
                <div className="flex flex-col items-start w-full">
                  <div className="glass-panel border-blue-500/20 rounded-3xl p-4 animate-pulse flex items-center gap-3">
                    <Loader2 className="animate-spin text-blue-400" size={16} />
                    <span className="text-xs text-gray-400">Consulting the Oracle...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-white/5">
              <div className="flex items-end gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <button className="p-2 text-gray-500 hover:text-purple-400 transition-colors"><Paperclip size={20} /></button>
                  <button className="p-2 text-gray-500 hover:text-purple-400 transition-colors"><Camera size={20} /></button>
                </div>
                
                <div className="flex-1 relative">
                  <textarea 
                    rows={1}
                    placeholder={isAiMode ? "Ask the HY Oracle..." : "Message your universe..."}
                    className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500 transition-all resize-none ${isAiMode ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : ''}`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <button 
                    onClick={() => setIsAiMode(!isAiMode)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${isAiMode ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-blue-400'}`}
                    title="AI Assistant"
                  >
                    <Sparkles size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <button className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 rounded-2xl transition-all"><Mic size={20} /></button>
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() && !isAiMode}
                    className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl shadow-xl shadow-purple-500/20 disabled:opacity-50 transition-all"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500 px-2">
                <span>Press Enter to send, Shift+Enter for new line</span>
                {isAiMode && <span className="text-blue-400 font-bold flex items-center gap-1"><Sparkles size={10} /> ORACLE MODE ACTIVE</span>}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-50">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <MessageSquare size={48} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Select a frequency</h3>
            <p className="max-w-xs text-sm">Initiate a direct link or join a community hub to start broadcasting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSystem;
