
import React, { useState } from 'react';
import { AppScreen } from '../types';
import { logoutUser } from '../services/auth';

interface ProfileProps {
  onNavigate: (screen: AppScreen) => void;
  userData?: any;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate, userData }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleLogout = async () => {
    await logoutUser();
    onNavigate(AppScreen.LOGIN);
  };

  const menuItems = [
    { id: 'details', label: 'Scholar Identity', icon: '👤', desc: 'Digital ID PX-88219-UPSC' },
    { id: 'subscription', label: 'Elite Subscription', icon: '💳', desc: 'UPSC Elite Pro • Active' },
    { id: 'downloads', label: 'Resource Vault', icon: '📚', desc: '4.2GB Offline • 12 Files' },
    { id: 'about', label: 'Academy Dossier', icon: '🏢', desc: 'PathshalaX Mission & Vision' },
    { id: 'contact', label: 'Priority Support', icon: '🎧', desc: '24/7 Scholar Assistance' }
  ];

  const renderModalContent = () => {
    switch(activeModal) {
      case 'details':
        return (
          <div className="space-y-6">
            <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div className="flex items-center space-x-5 mb-10">
                 <div className="w-20 h-20 rounded-[1.8rem] bg-white/10 p-1 border border-white/20">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.displayName || 'Jai'}`} className="w-full h-full rounded-[1.5rem]" alt="User" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black tracking-tight">{userData?.displayName || 'Scholar'}</h4>
                    <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.2em]">ID: PX-88219-UPSC</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
                 <div>
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Scholar Status</p>
                    <p className="text-xs font-bold text-indigo-300">Advanced Tier 4</p>
                 </div>
                 <div>
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Registry Date</p>
                    <p className="text-xs font-bold">Jan 12, 2024</p>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'subscription':
        return (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-6 rounded-[2rem] text-white shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">Active Plan</span>
                <span className="text-2xl">👑</span>
              </div>
              <h4 className="text-xl font-black mb-1">UPSC Elite Pro</h4>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Valid until Dec 2026</p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Unlimited Mock Tests', icon: '📝' },
                { title: 'Personalized Mentorship', icon: '🤝' },
                { title: 'Hardcopy Resource Delivery', icon: '📦' },
                { title: 'Ad-Free High Speed Servers', icon: '⚡' }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-xl">{benefit.icon}</span>
                  <span className="text-sm font-bold text-slate-700">{benefit.title}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'downloads':
        return (
          <div className="space-y-4">
             {[
               { title: 'Ethics Case Studies', size: '1.2 GB', type: 'Video' },
               { title: 'Ancient History Notes', size: '45 MB', type: 'PDF' },
               { title: 'Polity L1-L10', size: '2.8 GB', type: 'Video' }
             ].map((item, idx) => (
               <div key={idx} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm">
                      {item.type === 'Video' ? '📹' : '📄'}
                    </div>
                    <div>
                       <p className="text-[14px] font-bold text-slate-900">{item.title}</p>
                       <p className="text-[9px] text-slate-400 font-black uppercase">{item.size} • {item.type}</p>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
               <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-3">Our Core Mission</h4>
               <p className="text-xs font-medium italic">"Democratizing elite education for every aspirant, regardless of their pin code."</p>
            </div>
            <div className="space-y-4">
               <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">The PathshalaX Legacy</h5>
               <p className="text-sm font-medium">PathshalaX was founded as a digital extension of Jai Sir's vision to simplify the complex UPSC syllabus. We combine AI-driven analytics with traditional teaching values.</p>
               <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-white border border-slate-100 rounded-2xl">
                     <p className="text-lg font-black text-slate-900">50K+</p>
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Scholars</p>
                  </div>
                  <div className="text-center p-4 bg-white border border-slate-100 rounded-2xl">
                     <p className="text-lg font-black text-slate-900">400+</p>
                     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Rankers</p>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 px-1">Choose a channel</p>
            <button className="w-full p-5 bg-white border border-slate-100 rounded-3xl flex items-center space-x-5 shadow-sm active:scale-95 transition-all">
               <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl">💬</div>
               <div className="text-left">
                  <p className="text-sm font-black text-slate-900">Scholar Helpdesk</p>
                  <p className="text-[9px] font-bold text-emerald-600 uppercase">Live Chat • 2 Min Wait</p>
               </div>
            </button>
            <button className="w-full p-5 bg-white border border-slate-100 rounded-3xl flex items-center space-x-5 shadow-sm active:scale-95 transition-all">
               <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-xl">📧</div>
               <div className="text-left">
                  <p className="text-sm font-black text-slate-900">Email Support</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Response in 24 Hours</p>
               </div>
            </button>
            <button className="w-full p-5 bg-white border border-slate-100 rounded-3xl flex items-center space-x-5 shadow-sm active:scale-95 transition-all">
               <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center text-xl">🛠️</div>
               <div className="text-left">
                  <p className="text-sm font-black text-slate-900">Technical Issue</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Report Bug or Video Glitch</p>
               </div>
            </button>
          </div>
        );
      default:
        return <p className="text-slate-500 text-sm font-bold">Content for {activeModal} screen.</p>;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full relative overflow-hidden">
      {/* FIXED HEADER */}
      <div className="flex-none px-6 py-6 flex items-center justify-between bg-white border-b border-slate-50 z-[100]" style={{ paddingTop: 'calc(var(--sat) + 1.5rem)' }}>
        <button onClick={() => onNavigate(AppScreen.HOME)} className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center active:scale-90 transition-all">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="3.5"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-lg font-black text-slate-950 tracking-tight">Portal Gateway</h1>
        <div className="w-11"></div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto scroll-container">
        <div className="px-6 pt-10 flex flex-col items-center">
          <div className="w-32 h-32 rounded-[3rem] bg-indigo-50 p-2 border-4 border-white shadow-xl overflow-hidden mb-6">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.displayName || 'Jai'}`} className="w-full h-full rounded-[2.5rem] scale-110" alt="User" />
          </div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">{userData?.displayName || 'Jai Sharma'}</h2>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Verified Master Scholar</p>

          <div className="w-full space-y-4 mt-12 pb-32">
            {menuItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setActiveModal(item.id)} 
                className="w-full p-6 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-between shadow-sm active:scale-[0.98] transition-all group"
              >
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl group-hover:bg-slate-950 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-[15px] font-black text-slate-900">{item.label}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.desc}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M9 18l6-6-6-6"/></svg>
                </div>
              </button>
            ))}
            <button 
              onClick={handleLogout} 
              className="w-full py-6 bg-rose-50 text-rose-600 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] border border-rose-100 mt-6 active:scale-95 transition-all flex items-center justify-center space-x-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span>Terminate Session</span>
            </button>
          </div>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center px-4 pb-12">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => setActiveModal(null)}></div>
          <div className="relative w-full max-w-[440px] bg-white rounded-[3rem] p-8 shadow-2xl animate-toast-in">
             <div className="w-12 h-1 bg-slate-100 rounded-full mx-auto mb-6"></div>
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-950 tracking-tight">{menuItems.find(i => i.id === activeModal)?.label}</h3>
                <button onClick={() => setActiveModal(null)} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-bold">✕</button>
             </div>
             <div className="max-h-[50vh] overflow-y-auto scrollbar-hide">
               {renderModalContent()}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
