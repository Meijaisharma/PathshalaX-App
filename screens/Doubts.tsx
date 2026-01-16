
import React, { useState, useRef } from 'react';
import { AppScreen } from '../types';

interface DoubtsProps {
  onNavigate: (screen: AppScreen) => void;
}

const Doubts: React.FC<DoubtsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Ancient History');
  const [pos, setPos] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialBotPos = useRef({ x: 0, y: 0 });
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
  const handleClick = () => { if (!hasMoved.current) onNavigate(AppScreen.AI_CHAT); };

  const subjects = ['Ancient History', 'Medieval History', 'Modern History', 'Polity', 'Geography', 'Economics', 'Ethics'];

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative overflow-hidden" onMouseMove={handleMove} onMouseUp={handleEnd} onTouchMove={handleMove} onTouchEnd={handleEnd}>
      {/* Refined Header */}
      <div className="flex-none flex items-center px-6 py-6 bg-white border-b border-slate-100 z-50" style={{ paddingTop: 'calc(var(--sat) + 1.5rem)' }}>
        <button onClick={() => onNavigate(AppScreen.HOME)} className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center active:scale-90 transition-all mr-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="3.5"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-lg font-black text-slate-950 tracking-tight">Academic Doubts</h1>
      </div>

      <div className="flex-1 overflow-y-auto scroll-container">
        <div className="bg-slate-50 p-3 sticky top-0 z-40">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide py-1">
            {subjects.map((sub) => (
              <button key={sub} onClick={() => setActiveTab(sub)} className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm ${activeTab === sub ? 'bg-slate-950 text-white' : 'bg-white text-slate-500 border border-slate-100'}`}>
                {sub}
              </button>
            ))}
          </div>
        </div>

        <div className="px-10 py-24 text-center animate-fade-in flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-center mb-6 text-4xl shadow-inner">🤔</div>
          <h3 className="text-xl font-black text-slate-950 mb-2 leading-tight">No active queries yet.</h3>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Ask a doubt during your next live lecture or use PX AI Assistant below.</p>
          
          {/* Filler content to demonstrate scrolling */}
          <div className="mt-12 w-full space-y-4">
             <div className="p-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 opacity-50">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Doubt History Empty</p>
             </div>
             <div className="h-64"></div>
          </div>
        </div>
      </div>

      <div className={`fixed z-[100] cursor-grab active:cursor-grabbing transition-transform duration-200 ${isDragging ? 'scale-110' : 'hover:scale-105'}`} style={{ left: `${pos.x}px`, top: `${pos.y}px`, touchAction: 'none' }} onMouseDown={handleStart} onTouchStart={handleStart}>
        <button onClick={handleClick} className="w-16 h-16 rounded-[1.8rem] bg-white border-4 border-indigo-50 shadow-2xl overflow-hidden flex items-center justify-center relative">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Assistant" className="w-full h-full object-cover" alt="AI" />
          <div className="absolute top-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
        </button>
      </div>
    </div>
  );
};

export default Doubts;
