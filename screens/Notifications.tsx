
import React from 'react';
import { AppScreen } from '../types';

interface NotificationsProps {
  onNavigate: (screen: AppScreen) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onNavigate }) => {
  const notifications = [
    { 
      type: 'Announcement', 
      title: 'New Course Launch!', 
      desc: 'Sambhav 2.0 is now live in the store. Explore new syllabus updates.', 
      date: '08 Jan 2026', 
      icon: '📢', 
      unread: true,
      color: 'bg-blue-50'
    },
    { 
      type: 'Test Alert', 
      title: 'One Day To Go!!', 
      desc: 'Mock Test 04 starts tomorrow at 9:30 AM. Don\'t miss your rank.', 
      date: '07 Jan 2026', 
      icon: '📝', 
      unread: true,
      color: 'bg-pink-50'
    },
    { 
      type: 'Resource', 
      title: 'Dec PDF Updated', 
      desc: 'Current Affairs PDF for December is now available for download.', 
      date: '05 Jan 2026', 
      icon: '📚', 
      unread: false,
      color: 'bg-gray-50'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      <div className="flex items-center px-4 py-5 bg-white sticky top-0 z-50 border-b border-gray-100">
          <button onClick={() => onNavigate(AppScreen.HOME)} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-black ml-2 tracking-tighter">Activity</h1>
      </div>

      <div className="p-4 space-y-4">
          {notifications.map((n, i) => (
              <div key={i} className={`p-5 rounded-3xl flex items-start space-x-4 border transition-all ${n.unread ? 'bg-indigo-50/20 border-indigo-100 shadow-sm' : 'bg-white border-gray-100'}`}>
                  <div className={`${n.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner flex-shrink-0`}>
                      {n.icon}
                  </div>
                  <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                          <span className={`text-[9px] font-black uppercase tracking-widest ${n.unread ? 'text-[#6D8196]' : 'text-gray-400'}`}>{n.type}</span>
                          <span className="text-[9px] text-gray-400 font-bold">{n.date}</span>
                      </div>
                      <h3 className={`text-sm font-bold mb-1 tracking-tight ${n.unread ? 'text-gray-900' : 'text-gray-600'}`}>{n.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed font-medium">{n.desc}</p>
                      {n.unread && (
                        <div className="mt-3 flex items-center">
                          <div className="w-1.5 h-1.5 bg-[#F2C7C7] rounded-full mr-2"></div>
                          <span className="text-[10px] font-bold text-[#6D8196]">New Activity</span>
                        </div>
                      )}
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default Notifications;
