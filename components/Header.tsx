
import React, { useState, useEffect } from 'react';
import { AppScreen } from '../types';

interface HeaderProps {
  xp: number;
  notifications: number;
  onNavigate: (screen: AppScreen) => void;
  isHome?: boolean;
  userData?: any;
}

const Header: React.FC<HeaderProps> = ({ xp, notifications, onNavigate, isHome, userData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };
    
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); 
    return () => clearInterval(interval);
  }, []);

  const displayName = userData?.displayName || 'Learner';

  const Icons = {
    Home: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
    Doubts: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7l1.1 1.1"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="16" x2="12" y2="18"/><line x1="12" y1="6" x2="12" y2="8"/></svg>
    ),
    Grader: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
    ),
    Dashboard: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    ),
    Leaderboard: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
    ),
    Library: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    )
  };

  const menuSections = [
    {
      title: 'Academy Hub',
      items: [
        { label: 'Study Home', screen: AppScreen.HOME, icon: <Icons.Home />, color: 'text-[#6D8196]' },
        { label: 'Doubt Solver', screen: AppScreen.DOUBTS, icon: <Icons.Doubts />, color: 'text-amber-500' },
        { label: 'Mains Grader', screen: AppScreen.AI_GRADER, icon: <Icons.Grader />, color: 'text-emerald-600' },
        { label: 'Scholar Stats', screen: AppScreen.DASHBOARD, icon: <Icons.Dashboard />, color: 'text-[#6D8196]' },
      ]
    },
    {
      title: 'Social Circle',
      items: [
        { label: 'Global Rank', screen: AppScreen.HOME, icon: <Icons.Leaderboard />, color: 'text-violet-500' },
        { label: 'Resource Vault', screen: AppScreen.LIBRARY, icon: <Icons.Library />, color: 'text-teal-600' },
      ]
    }
  ];

  return (
    <>
      <header className={`flex flex-col px-6 pt-10 pb-2 z-[60] transition-colors ${isHome ? 'bg-transparent' : 'bg-white border-b border-slate-100 sticky top-0'}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md active:scale-90 transition-all overflow-hidden ${isHome ? 'bg-white/10 border border-white/20 backdrop-blur-sm' : 'bg-white border border-slate-100'}`}
            >
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`} className="w-full h-full" alt="User" />
            </button>
            
            {isHome && (
              <div className="max-w-[150px]">
                <div className="flex items-center space-x-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{greeting}</p>
                </div>
                <h1 className="text-lg font-black text-white tracking-tight leading-none truncate capitalize">
                  {displayName}
                </h1>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onNavigate(AppScreen.SEARCH)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm active:scale-95 transition-all ${isHome ? 'bg-white/5 border border-white/10 backdrop-blur-sm' : 'bg-white border border-slate-100'}`}
            >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isHome ? "white" : "#6D8196"} strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            <button 
              onClick={() => onNavigate(AppScreen.NOTIFICATIONS)} 
              className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm relative active:scale-95 transition-all ${isHome ? 'bg-white/5 border border-white/10 backdrop-blur-sm' : 'bg-white border border-slate-100'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isHome ? "white" : "#6D8196"} strokeWidth="2.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className={`absolute top-3 right-3 w-2 h-2 rounded-full border ${isHome ? 'bg-rose-400 border-slate-900' : 'bg-[#F2C7C7] border-white'}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER MENU */}
      <div className={`fixed inset-0 z-[1000] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-all duration-700" onClick={() => setIsMenuOpen(false)}></div>
        
        <div className={`absolute left-0 top-0 h-full w-[88%] max-w-[420px] bg-white shadow-[60px_0_120px_rgba(0,0,0,0.15)] transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1) flex flex-col overflow-hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#D5F3D8]/40 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative px-8 pt-16 pb-12 border-b border-slate-100/60 overflow-hidden">
            {/* Header info without the toggle button to keep UI clean */}
            <div className="relative z-10 flex items-center space-x-6 mb-10">
              <div className="relative">
                <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-tr from-[#6D8196] to-[#A0AFC0] p-1 shadow-xl relative z-10">
                  <div className="w-full h-full rounded-[2.3rem] bg-white p-1 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`} className="w-full h-full scale-110" alt={displayName} />
                  </div>
                </div>
                <svg className="absolute -inset-2 w-28 h-28 -rotate-90 animate-[spin_10s_linear_infinite] opacity-20" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#6D8196" strokeWidth="2" strokeDasharray="150 150" />
                </svg>
              </div>
              <div className="max-w-[180px]">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2 truncate capitalize">{displayName}</h2>
                <div className="flex items-center bg-[#D5F3D8] border border-[#BDEBC4] px-3 py-1.5 rounded-full shadow-sm">
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Master Scholar</span>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full ml-2 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="relative h-48 bg-[#F8FAFC] rounded-[2.8rem] border border-slate-100 p-6 overflow-hidden shadow-inner group">
               <div className="absolute top-4 right-6 text-[9px] font-black text-slate-300 uppercase tracking-widest">Competency Map</div>
               <div className="flex items-center justify-center h-full">
                 <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-[0_10px_20px_rgba(109,129,150,0.2)]">
                   <path d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                   <path d="M50 20 L80 35 L75 75 L30 80 L25 40 Z" fill="rgba(109,129,150,0.1)" stroke="#6D8196" strokeWidth="2.5" strokeLinejoin="round" className="animate-pulse" />
                   <circle cx="50" cy="20" r="2" fill="#6D8196" /><circle cx="80" cy="35" r="2" fill="#6D8196" /><circle cx="75" cy="75" r="2" fill="#6D8196" /><circle cx="30" cy="80" r="2" fill="#6D8196" /><circle cx="25" cy="40" r="2" fill="#6D8196" />
                 </svg>
               </div>
            </div>
          </div>

          <div className="relative flex-1 overflow-y-auto p-8 scrollbar-hide space-y-12 pb-48">
            {menuSections.map((section, sIdx) => (
              <div key={sIdx} className="animate-slide-in-left" style={{ animationDelay: `${sIdx * 0.15}s` }}>
                <div className="flex items-center space-x-4 mb-6 px-1">
                  <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em]">{section.title}</h3>
                  <div className="flex-1 h-[1px] bg-slate-50"></div>
                </div>
                <div className="space-y-3">
                  {section.items.map((item, iIdx) => (
                    <button
                      key={iIdx}
                      onClick={() => { onNavigate(item.screen); setIsMenuOpen(false); }}
                      className="w-full flex items-center space-x-5 p-4 rounded-[2.2rem] transition-all text-left group active:scale-[0.98] border border-transparent hover:bg-[#F8FAFC] hover:border-slate-50"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-white ${item.color} flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.03)] group-hover:bg-[#6D8196] group-hover:text-white transition-all duration-300 border border-slate-50`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <span className="block text-16px font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item.label}</span>
                        <div className="w-0 h-[2px] bg-[#D5F3D8] group-hover:w-full transition-all duration-700 mt-1"></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 border-t border-slate-50 bg-[#FBFBFC] relative z-20">
             <button 
              onClick={() => { onNavigate(AppScreen.LOGIN); setIsMenuOpen(false); }}
              className="w-full flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[2.5rem] group transition-all active:scale-95 shadow-sm hover:border-[#F2C7C7]/50"
             >
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 rounded-2xl bg-[#F2C7C7]/20 flex items-center justify-center text-[#F2C7C7] group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                   </div>
                   <div className="text-left">
                     <span className="block text-[15px] font-black text-slate-800">Disconnect</span>
                     <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Exit Portal</span>
                   </div>
                </div>
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
