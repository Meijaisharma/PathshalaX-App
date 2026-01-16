
import React from 'react';
import { AppScreen } from '../types';

interface BottomNavProps {
  activeTab: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onNavigate }) => {
  const tabs = [
    { id: AppScreen.HOME, label: 'Home', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "white" : "none"} stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
    )},
    { id: AppScreen.SUBJECTS, label: 'Learn', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "white" : "none"} stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    )},
    { id: AppScreen.DASHBOARD, label: 'Stats', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
    )},
    { id: AppScreen.SEARCH, label: 'Store', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    )},
    { id: AppScreen.PROFILE, label: 'Profile', icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "white" : "none"} stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )},
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-[100] px-4 pointer-events-none bg-gradient-to-t from-white via-white/80 to-transparent" 
         style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
      <nav className="w-full max-w-[440px] bg-slate-950 rounded-[2.5rem] p-1.5 flex items-center justify-between shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/5 backdrop-blur-xl pointer-events-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id || (tab.id === AppScreen.SUBJECTS && [AppScreen.LECTURES, AppScreen.CHAPTERS].includes(activeTab));
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center h-12 rounded-[2rem] transition-all duration-300 relative ${isActive ? 'bg-[#E67E5F] text-white shadow-[0_0_20px_rgba(230,126,95,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                {tab.icon(isActive)}
              </div>
              {isActive && (
                <span className="absolute bottom-1.5 text-[6px] font-black text-white/50 animate-pulse">
                  ●
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
