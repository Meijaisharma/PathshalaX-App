
import React, { useState, useRef, useEffect } from 'react';
import { AppScreen } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AIChatProps {
  onNavigate: (screen: AppScreen) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChat: React.FC<AIChatProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I am PathshalaX AI. How can I help you with your studies today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are PathshalaX AI, a friendly and expert educational assistant. Be concise and helpful.',
        }
      });
      const result = await chat.sendMessageStream({ message: currentInput });
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      for await (const chunk of result) {
        fullText += chunk.text;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = fullText;
          return updated;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header with Consistent Back Button */}
      <div className="flex-none px-6 py-6 bg-white border-b flex items-center">
        <button onClick={() => onNavigate(AppScreen.HOME)} className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center active:scale-90 transition-all mr-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="3.5"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-sm">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Assistant" alt="AI" />
          </div>
          <div>
            <h3 className="font-black text-slate-950 text-sm">PathshalaX AI</h3>
            <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest">● Core Intelligence Active</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-[14px] font-bold shadow-sm leading-relaxed ${msg.role === 'user' ? 'bg-slate-950 text-white rounded-tr-none' : 'bg-white text-slate-950 border border-slate-200 rounded-tl-none'}`}>
              {msg.text || 'Thinking...'}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex-none p-4 pb-10 bg-white border-t border-slate-100">
        <div className="flex items-center space-x-2 bg-slate-100 rounded-3xl px-4 py-1.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-950 transition-all border border-transparent">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Ask PathshalaX AI..." className="flex-1 bg-transparent outline-none py-3 text-sm font-black text-slate-950 placeholder:text-slate-500" />
          <button onClick={sendMessage} disabled={!input.trim() || isTyping} className="p-3.5 bg-slate-950 text-white rounded-2xl shadow-lg active:scale-90 disabled:opacity-30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
