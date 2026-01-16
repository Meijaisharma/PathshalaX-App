
import React, { useState, useEffect } from 'react';
import { AppScreen } from '../types';

enum TestFlow {
  LIST = 'LIST',
  PREPARING = 'PREPARING',
  INSTRUCTIONS = 'INSTRUCTIONS',
  ATTEMPTING = 'ATTEMPTING'
}

interface TestsProps {
  onNavigate: (screen: AppScreen) => void;
}

const Tests: React.FC<TestsProps> = ({ onNavigate }) => {
  const [flow, setFlow] = useState<TestFlow>(TestFlow.LIST);
  const [instructionTab, setInstructionTab] = useState<'general' | 'test'>('general');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    let timer: any;
    if (flow === TestFlow.ATTEMPTING && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [flow, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startPreparing = () => {
    setFlow(TestFlow.PREPARING);
    setTimeout(() => setFlow(TestFlow.INSTRUCTIONS), 1500);
  };

  if (flow === TestFlow.LIST) {
    return (
      <div className="flex-1 flex flex-col bg-[#F9FAFB] min-h-screen pb-24">
        {/* Header with Back Button */}
        <div className="bg-white px-6 py-6 flex items-center sticky top-0 z-50 border-b border-gray-100">
          <button onClick={() => onNavigate(AppScreen.HOME)} className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center active:scale-90 transition-all mr-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="3.5"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h1 className="text-lg font-black text-slate-950 tracking-tight">Assessment Portal</h1>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-rose-50 text-rose-600 text-[10px] font-black px-3 py-1.5 rounded-full border border-rose-100 uppercase tracking-widest">Missed Session</span>
              </div>
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-950">Grand Mock Test 01</h3>
                  <div className="space-y-2">
                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">📋 50 Questions • 60 Mins</p>
                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">📅 Released: 09 Nov 2025</p>
                  </div>
                </div>
                <button onClick={startPreparing} className="w-16 h-16 bg-slate-950 rounded-[1.8rem] flex items-center justify-center text-white shadow-xl active:scale-90 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (flow === TestFlow.INSTRUCTIONS) {
    return (
      <div className="flex-1 flex flex-col bg-white min-h-screen">
        <div className="bg-white px-6 py-6 flex items-center border-b border-gray-100">
          <button onClick={() => setFlow(TestFlow.LIST)} className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center active:scale-90 transition-all mr-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="3.5"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h1 className="text-lg font-black text-slate-950 tracking-tight">Test Protocol</h1>
        </div>
        <div className="p-6 flex-1">
          <button onClick={() => setFlow(TestFlow.ATTEMPTING)} className="w-full py-5 bg-slate-950 text-white rounded-[2rem] font-black text-lg shadow-xl active:scale-95 mt-8 uppercase tracking-[0.2em]">Initiate Test</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      <div className="bg-white px-6 py-6 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50">
        <button onClick={() => setFlow(TestFlow.LIST)} className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center active:scale-90 transition-all">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="3.5"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-black text-slate-950">{formatTime(timeLeft)}</span>
        </div>
        <button onClick={() => setFlow(TestFlow.LIST)} className="bg-emerald-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg">Submit</button>
      </div>
      <div className="p-6">
          <p className="text-slate-950 font-black text-lg">Question {currentQuestion} will appear here...</p>
      </div>
    </div>
  );
};

export default Tests;
