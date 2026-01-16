
import React, { useState } from 'react';
import { AppScreen } from '../types';

interface BatchContentProps {
  onNavigate: (screen: AppScreen) => void;
  viewMode?: string;
}

const BatchContent: React.FC<BatchContentProps> = ({ onNavigate, viewMode }) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Lectures');
  const [watchingVideo, setWatchingVideo] = useState<any>(null);

  const generateHindiLectures = () => {
    const lectures = [];
    for (let i = 95; i <= 150; i++) {
      lectures.push({
        id: `hs-${i}`,
        title: `Hindi Sahitya | Session Part ${i - 94}`,
        duration: '52:10',
        date: `${(i % 28) + 1} FEB`,
        status: 'Completed',
        videoId: `tg_${i}`, 
        embedUrl: `https://t.me/jaikipathshala/${i}?embed=1`,
        type: 'telegram_direct'
      });
    }
    return lectures;
  };

  const subjects = [
    { 
      id: 'hindi-sahitya', 
      title: 'Hindi Sahitya (Advanced)', 
      instructor: 'Jai Sir', 
      icon: '✍️', 
      lectures: '157 Classes', 
      progress: 22, 
      color: 'text-rose-600', 
      bg: 'bg-rose-50',
      classes: generateHindiLectures()
    },
    { 
      id: 'ancient-history', 
      title: 'Ancient History', 
      instructor: 'Elite Faculty', 
      icon: '🏛️', 
      lectures: '24 Classes', 
      progress: 45, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      classes: [
        { id: 'l1', title: 'The Great Silk Road', duration: '14:22', date: '12 FEB', status: 'Completed', videoId: 'vn3e37VWc0k', type: 'youtube' }
      ]
    }
  ];

  const currentSubjectData = subjects.find(s => s.id === selectedSubject);

  if (watchingVideo) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-[#0A0A0B] animate-fade-in overflow-hidden">
        <div className="p-4 flex items-center bg-black/80 backdrop-blur-xl text-white sticky top-0 z-[100] border-b border-white/5" style={{ paddingTop: 'calc(var(--sat) + 1rem)' }}>
           <button onClick={() => setWatchingVideo(null)} className="mr-4 p-2 bg-white/5 rounded-xl"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg></button>
           <h1 className="text-sm font-black truncate">{watchingVideo.title}</h1>
        </div>
        <div className="w-full aspect-video bg-black">
           <iframe src={watchingVideo.type === 'telegram_direct' ? watchingVideo.embedUrl : `https://www.youtube.com/embed/${watchingVideo.videoId}`} className="w-full h-full" allowFullScreen></iframe>
        </div>
        <div className="p-6 text-white overflow-y-auto">
           <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4">Lecture Notes</h3>
           <textarea className="w-full h-48 bg-white/5 border border-white/10 rounded-3xl p-6 text-sm text-zinc-300 outline-none" placeholder="Notes..."></textarea>
        </div>
      </div>
    );
  }

  if (selectedSubject && currentSubjectData) {
    return (
      <div className="flex-1 flex flex-col bg-[#F8FAFC] h-full overflow-hidden">
        <div className="flex-none px-6 pb-6 bg-white border-b border-slate-100" style={{ paddingTop: 'calc(var(--sat) + 1.5rem)' }}>
           <div className="flex items-center space-x-4 mb-6">
              <button onClick={() => setSelectedSubject(null)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center active:scale-90"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg></button>
              <h1 className="text-xl font-black text-slate-900 truncate">{currentSubjectData.title}</h1>
           </div>
           <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {['Lectures', 'PDF Vault'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-7 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all ${activeTab === tab ? 'bg-slate-900 text-white' : 'bg-white text-slate-400'}`}>{tab}</button>
              ))}
           </div>
        </div>
        <div className="flex-1 overflow-y-auto scroll-container p-6 space-y-4">
           {currentSubjectData.classes.map((cls) => (
             <div key={cls.id} onClick={() => setWatchingVideo(cls)} className="bg-white rounded-3xl p-4 border border-slate-100 flex items-center space-x-4 active:scale-[0.98] transition-all cursor-pointer">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
                <div className="flex-1"><h4 className="text-[13px] font-bold text-slate-800">{cls.title}</h4><p className="text-[9px] text-slate-400 font-black uppercase">{cls.date} • {cls.duration}</p></div>
             </div>
           ))}
           <div className="h-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
      <div className="flex-none px-6 py-6 bg-white border-b border-slate-50 flex items-center justify-between" style={{ paddingTop: 'calc(var(--sat) + 1.5rem)' }}>
        <div className="flex items-center space-x-4">
          <button onClick={() => onNavigate(AppScreen.HOME)} className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg></button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Curriculum</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scroll-container px-6 mt-8 space-y-6 pb-32">
        <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-xl">
           <h2 className="text-3xl font-black tracking-tighter mb-5">Your Batches</h2>
           <div className="w-full h-1.5 bg-white/10 rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{ width: '22%' }}></div></div>
        </div>
        <div className="space-y-4">
          {subjects.map(sub => (
            <div key={sub.id} onClick={() => setSelectedSubject(sub.id)} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer">
              <div className="flex items-center space-x-5">
                <div className={`w-14 h-14 ${sub.bg} rounded-2xl flex items-center justify-center text-2xl`}>{sub.icon}</div>
                <div><h4 className="text-[17px] font-black text-slate-900">{sub.title}</h4><p className="text-[10px] font-bold text-slate-400 uppercase">{sub.instructor}</p></div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BatchContent;
