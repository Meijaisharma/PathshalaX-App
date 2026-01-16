
import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import { AppScreen } from '../types';

interface HomeProps {
  onNavigate: (screen: AppScreen) => void;
  userData?: any;
}

const Home: React.FC<HomeProps> = ({ onNavigate, userData }) => {
  const [pos, setPos] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialBotPos = useRef({ x: pos.x, y: pos.y });
  const hasMoved = useRef(false);

  const handleStart = (e: any) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    hasMoved.current = false;
    dragStartPos.current = { x: clientX, y: clientY };
    initialBotPos.current = { x: pos.x, y: pos.y };
  };

  const handleMove = (e: any) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStartPos.current.x;
    const deltaY = clientY - dragStartPos.current.y;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) hasMoved.current = true;

    let newX = initialBotPos.current.x + deltaX;
    let newY = initialBotPos.current.y + deltaY;

    newX = Math.max(10, Math.min(window.innerWidth - 74, newX));
    newY = Math.max(10, Math.min(window.innerHeight - 150, newY));
    setPos({ x: newX, y: newY });
  };

  const handleEnd = () => setIsDragging(false);

  const navItems = [
    { label: 'Lectures', screen: AppScreen.SUBJECTS, icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> },
    { label: 'Tests', screen: AppScreen.TESTS, icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" /> },
    { label: 'Doubts', screen: AppScreen.DOUBTS, icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10zM12 7v4M12 13h.01" /> },
    { label: 'Grader', screen: AppScreen.AI_GRADER, icon: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01 9 11.01" /> }
  ];

  return (
    <div 
      className="flex-1 flex flex-col bg-white overflow-hidden no-bounce h-full relative"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="fixed top-0 left-0 right-0 z-[100] bg-slate-900 shadow-xl" style={{ paddingBottom: '0.5rem' }}>
         <Header xp={1250} notifications={1} onNavigate={onNavigate} isHome={true} userData={userData} />
      </div>

      <div className="scroll-container pt-[90px]">
        <div className="bg-slate-900 rounded-b-[4.5rem] shadow-2xl pb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden">
            <img 
              src="https://img.freepik.com/free-vector/digital-learning-concept-illustration_114360-2646.jpg" 
              className="w-full h-full object-cover scale-150 translate-x-12 mix-blend-screen grayscale brightness-125"
              alt=""
            />
          </div>

          <div className="relative px-8 z-10 space-y-5 animate-fade-in mt-6">
            <div className="inline-flex items-center bg-slate-800/60 border border-amber-500/20 rounded-full px-4 py-1.5 space-x-2 backdrop-blur-md">
              <span className="text-amber-400 text-[10px] drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">★</span>
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">#LetsCrackIt</span>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-[36px] sm:text-[44px] leading-[1.05] tracking-tighter text-white">
                <span className="font-light italic opacity-90" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>Prepare for</span><br/>
                <span className="text-[#E67E5F] font-black uppercase">UPSC CSE</span>
              </h2>
              <p className="text-[14px] sm:text-[16px] font-medium text-slate-400 leading-relaxed max-w-[320px]">
                Crack UPSC CSE with top educators and best classroom experience on India's most trusted learning platform.
              </p>
            </div>
          </div>
        </div>

        <div className="px-7 space-y-10 py-10">
          <div className="bg-[#F8FAFC] rounded-[3rem] p-8 shadow-sm relative overflow-hidden border border-slate-100 group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform text-slate-900">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
             </div>
             <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                   <div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1.5 block">Scholar Phase</span>
                     <h2 className="text-2xl font-black text-slate-950 tracking-tighter">Elite Tier</h2>
                   </div>
                   <div className="w-16 h-16 rounded-[1.8rem] bg-white shadow-md flex items-center justify-center text-3xl border border-slate-50">🏆</div>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full p-1">
                   <div className="h-full bg-slate-950 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-1000" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between mt-4 text-[11px] font-bold text-slate-400">
                   <span className="text-slate-950">12,500 XP</span>
                   <span className="uppercase tracking-widest">Mastery: 65%</span>
                </div>
             </div>
          </div>

          <div className="animate-slide-up">
            <div className="flex items-center space-x-4 mb-8 px-2">
              <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.5em] whitespace-nowrap">Core Registry</h3>
              <div className="flex-1 h-[1.5px] bg-slate-50"></div>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {navItems.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => onNavigate(item.screen)}
                  className="flex flex-col items-center group active:scale-90 transition-transform"
                >
                  <div className="w-full aspect-square bg-white rounded-[2.2rem] flex items-center justify-center mb-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] border border-slate-100 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white text-slate-700">
                       {item.icon}
                     </svg>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* MOTTO SECTION */}
          <div className="flex flex-col items-center text-center py-12 px-4 space-y-3">
             <span className="text-[10px] font-black text-[#A0AFC0] uppercase tracking-[0.5em]">SCHOLAR'S MOTTO</span>
             <div className="space-y-0 relative">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  Padhlo Kahin Se Bhi,
                </h3>
                <h3 className="text-2xl font-black italic text-[#E67E5F] tracking-tight leading-tight">
                  Selection Hoga PathshalaX Se!
                </h3>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <span className="text-rose-500 animate-pulse text-lg">♥️</span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] font-medium">By Jai Sharma</span>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-orange-100/20 blur-xl rounded-full"></div>
             </div>
          </div>
          
          <div className="h-10"></div>
        </div>
      </div>

      <div 
        className={`fixed z-[120] cursor-grab active:cursor-grabbing ${isDragging ? 'scale-110' : 'hover:scale-105'} transition-transform duration-200`}
        style={{ 
          left: `${pos.x}px`, 
          top: `${pos.y}px`,
          touchAction: 'none'
        }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <button 
          onClick={() => !hasMoved.current && onNavigate(AppScreen.AI_CHAT)}
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-[2rem] bg-white shadow-2xl border-4 border-slate-50 overflow-hidden relative group"
        >
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Assistant" className="w-full h-full" alt="AI" />
          <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></div>
        </button>
      </div>

      <style>{`
        .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Home;
