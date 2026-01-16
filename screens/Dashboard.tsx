
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { AppScreen } from '../types';

interface DashboardProps {
  onNavigate: (screen: AppScreen) => void;
  userData?: any;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, userData }) => {
  const [activeDay, setActiveDay] = useState(6);
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale(s => s === 1 ? 1.05 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const weekData = [
    { day: 'Mon', val: 45, color: 'bg-slate-400' },
    { day: 'Tue', val: 70, color: 'bg-indigo-400' },
    { day: 'Wed', val: 30, color: 'bg-slate-400' },
    { day: 'Thu', val: 85, color: 'bg-indigo-500' },
    { day: 'Fri', val: 60, color: 'bg-indigo-400' },
    { day: 'Sat', val: 95, color: 'bg-emerald-500' },
    { day: 'Sun', val: 80, color: 'bg-indigo-600' },
  ];

  const heatMapData = Array.from({ length: 35 }, (_, i) => Math.floor(Math.random() * 4));

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFC] h-full overflow-hidden">
      {/* STABLE HEADER */}
      <div className="flex-none flex items-center px-6 py-6 bg-white border-b border-slate-100 z-[100]" style={{ paddingTop: 'calc(var(--sat) + 1.5rem)' }}>
        <button onClick={() => onNavigate(AppScreen.HOME)} className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center active:scale-90 transition-all mr-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="3.5"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-lg font-black text-slate-950 tracking-tight">Performance Analytics</h1>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto scroll-container">
        <Header xp={1250} notifications={3} onNavigate={onNavigate} userData={userData} />
        
        <div className="mx-6 mt-4">
          <div className="bg-slate-900 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden border border-white/10">
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
             <div className="flex justify-between items-start mb-10 relative z-10">
                <div>
                   <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.3em] mb-1">Weekly Pulse</p>
                   <h3 className="text-xl font-black text-white tracking-tight">Focus Momentum</h3>
                </div>
             </div>

             <div className="h-32 flex items-end justify-between px-2 mb-4 relative z-10">
                {weekData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => setActiveDay(i)}>
                     <div 
                       className="relative w-6 transition-all duration-700 ease-out"
                       style={{ height: `${d.val}%`, transform: activeDay === i ? `scale(${pulseScale})` : 'scale(1)' }}
                     >
                        <div className={`absolute inset-0 rounded-t-md ${d.color} shadow-lg`}></div>
                     </div>
                     <span className={`text-[7px] mt-4 font-black uppercase tracking-widest ${activeDay === i ? 'text-white' : 'text-slate-500'}`}>{d.day}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="p-6 space-y-8 pb-32">
           <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Preparation Consistency</h3>
              <div className="grid grid-cols-7 gap-1.5">
                 {heatMapData.map((v, i) => (
                   <div key={i} className={`aspect-square rounded-[4px] ${v === 0 ? 'bg-slate-100' : v === 1 ? 'bg-indigo-100' : v === 2 ? 'bg-indigo-300' : 'bg-indigo-600'}`}></div>
                 ))}
              </div>
           </section>

           <section className="space-y-4">
             <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] px-2">Syllabus Coverage</h3>
             {[
               { name: 'General Studies I', progress: 75, color: 'bg-rose-500' },
               { name: 'General Studies II', progress: 42, color: 'bg-emerald-500' },
               { name: 'CSAT / Aptitude', progress: 91, color: 'bg-indigo-500' }
             ].map((item, i) => (
               <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100">
                 <div className="flex justify-between mb-3">
                    <span className="text-xs font-black text-slate-800">{item.name}</span>
                    <span className="text-[10px] font-black text-slate-400">{item.progress}%</span>
                 </div>
                 <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.progress}%` }}></div>
                 </div>
               </div>
             ))}
           </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
