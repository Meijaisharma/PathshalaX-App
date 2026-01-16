
import React, { useState, useMemo } from 'react';
import { AppScreen, Course } from '../types';

interface SearchProps {
  onNavigate: (screen: AppScreen) => void;
}

const ALL_COURSES: Course[] = [
  { id: '1', title: 'UPSC Sambhav 2.0', description: 'Comprehensive GS Foundation Batch with 800+ hours of live classes, personalized mentoring, and daily answer writing.', thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80', price: 0, instructor: 'Dr. Jai Pathak', tags: ['upsc', 'gs', 'foundation'] },
  { id: '2', title: 'Ethics Masterclass', description: 'Master GS Paper IV with real-world case studies and integrity frameworks designed for top-tier civil servants.', thumbnail: 'https://images.unsplash.com/photo-1544654803-b69140b285a1?auto=format&fit=crop&w=800&q=80', price: 1499, instructor: 'Prof. Manish Sharma', tags: ['ethics', 'gs4', 'upsc'] },
  { id: '3', title: 'NCERT Foundation (6-12)', description: 'The absolute baseline for every UPSC aspirant. Simplified concepts covering History, Geography, and Civics.', thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80', price: 499, instructor: 'NCERT Expert Team', tags: ['ncert', 'basics', 'foundation'] },
  { id: '4', title: 'Current Affairs Nexus', description: 'Daily analysis of The Hindu & IE, monthly magazines, and weekly quiz sessions for prelims & mains.', thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80', price: 199, instructor: 'News Analyst', tags: ['current-affairs', 'prelims', 'mains'] },
];

const Search: React.FC<SearchProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filteredCourses = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return ALL_COURSES.filter(course => 
      course.title.toLowerCase().includes(lowerQuery) || 
      course.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [query]);

  const handleEnroll = (courseId: string) => {
    setProcessingId(courseId);
    setTimeout(() => {
      setProcessingId(null);
      onNavigate(AppScreen.DASHBOARD);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-hidden">
      {/* STICKY HEADER AREA */}
      <div className="bg-white px-6 pb-6 shadow-sm z-[100] flex-none" style={{ paddingTop: 'calc(var(--sat) + 1.5rem)' }}>
        <div className="flex items-center space-x-4 mb-6">
          <button onClick={() => onNavigate(AppScreen.HOME)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center active:scale-90 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Academic Store</h1>
        </div>
        
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </span>
          <input
            type="text"
            placeholder="Search Courses, Batches, Subjects..."
            className="w-full bg-slate-100 rounded-2xl py-4 pl-12 pr-4 text-xs font-black text-slate-900 focus:bg-white outline-none transition-all shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* SCROLLABLE STORE CONTENT */}
      <div className="flex-1 overflow-y-auto scroll-container p-6 space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
           <div className="relative z-10">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60">Elite Scholarship</span>
              <h2 className="text-2xl font-black tracking-tighter mt-1">Unlock 100% Discount</h2>
              <p className="text-[11px] font-medium opacity-80 mt-2 max-w-[200px]">Attempt the PathshalaX All India Mock Test this Sunday.</p>
           </div>
        </div>

        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm group">
            <div className="h-44 relative">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-slate-900">
                {course.instructor}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight mb-2">{course.title}</h3>
              <p className="text-[11px] text-slate-500 font-medium mb-6 line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-lg font-black text-slate-900">{course.price === 0 ? 'FREE' : `₹${course.price}`}</span>
                <button 
                  onClick={() => handleEnroll(course.id)}
                  disabled={processingId === course.id}
                  className="bg-indigo-600 text-white px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-md"
                >
                  {processingId === course.id ? '...' : 'Secure Slot'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* Safe Area Spacer */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default Search;
