
import React, { useState } from 'react';
import { AppScreen } from '../types';

interface AIGraderProps {
  onNavigate: (screen: AppScreen) => void;
}

const AIGrader: React.FC<AIGraderProps> = ({ onNavigate }) => {
  const [isGrading, setIsGrading] = useState(false);

  if (isGrading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white text-center h-screen">
        <div className="w-24 h-24 mb-8 relative flex items-center justify-center bg-indigo-50 rounded-full border-4 border-indigo-100 shadow-xl">
           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5" className="animate-pulse"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-2 uppercase">Analyzing...</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Our AI is evaluating your structure and depth.</p>
        <button onClick={() => setIsGrading(false)} className="mt-10 px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Cancel</button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      <div className="flex-none flex items-center px-4 py-6 bg-white border-b border-slate-50 z-50" style={{ paddingTop: 'calc(var(--sat) + 1.5rem)' }}>
        <button onClick={() => onNavigate(AppScreen.HOME)} className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center active:scale-90 transition-all">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-xl font-black text-slate-900 ml-4 tracking-tight">AI Grader</h1>
      </div>

      <div className="flex-1 overflow-y-auto scroll-container p-6 space-y-6">
        <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 flex flex-col items-center text-center">
           <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm border border-slate-100 mb-6">📝</div>
           <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Upload Your Answer</h3>
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-8">Submit your handwritten or typed Mains answer for instant evaluation and feedback.</p>
           <button 
             onClick={() => setIsGrading(true)}
             className="w-full py-4 bg-slate-900 text-white rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all"
           >
              Open Camera
           </button>
        </div>
        
        <div className="p-4 bg-indigo-50/50 rounded-3xl border border-indigo-100 flex items-center space-x-4">
           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg">💡</div>
           <p className="text-[10px] font-bold text-indigo-900 leading-relaxed uppercase tracking-wider">Tip: Use blank A4 sheets and good lighting for 99% accuracy in AI grading results.</p>
        </div>

        {/* Example recent submissions to allow scrolling */}
        <div className="pt-4">
           <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 px-2">Recent Evaluations</h3>
           <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-5 bg-white border border-slate-100 rounded-3xl flex justify-between items-center opacity-40">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg"></div>
                      <div className="w-24 h-2 bg-slate-100 rounded-full"></div>
                   </div>
                   <div className="w-10 h-4 bg-slate-50 rounded-full"></div>
                </div>
              ))}
           </div>
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default AIGrader;
