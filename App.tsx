
import React, { useState, useEffect, useCallback } from 'react';
import Splash from './screens/Splash.tsx';
import Login from './screens/Login.tsx';
import OTP from './screens/OTP.tsx';
import Home from './screens/Home.tsx';
import Dashboard from './screens/Dashboard.tsx';
import Tests from './screens/Tests.tsx';
import Notifications from './screens/Notifications.tsx';
import Search from './screens/Search.tsx';
import BatchContent from './screens/BatchContent.tsx';
import Profile from './screens/Profile.tsx';
import AIChat from './screens/AIChat.tsx';
import Doubts from './screens/Doubts.tsx';
import AIGrader from './screens/AIGrader.tsx';
import BottomNav from './components/BottomNav.tsx';
import { AppScreen } from './types.ts';
import { auth, signInWithGoogle, signInWithFacebook } from './services/auth.ts';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.LOGIN);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [authType, setAuthType] = useState<'email' | 'phone'>('email');
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const name = firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Learner');
        setUser({ ...firebaseUser, displayName: name });
      } else {
        setUser(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
    if (user) {
      setCurrentScreen(AppScreen.HOME);
    } else {
      setCurrentScreen(AppScreen.LOGIN);
    }
  };

  if (showSplash) {
    return <Splash onFinish={handleSplashFinish} />;
  }

  if (initializing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white h-screen">
        <div className="flex flex-col items-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E67E5F" strokeWidth="2.5" className="animate-spin-slow">
               <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
               <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <p className="text-[10px] mt-4 font-bold text-slate-400 uppercase tracking-[0.3em] animate-pulse">Syncing Library</p>
        </div>
        <style>{`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const handleLoginSubmit = (identifier: string, type: 'email' | 'phone') => {
    if (identifier.toLowerCase() === 'kabirisback') {
      showNotification('Access Granted: Admin Mode', 'success');
      setUser({ displayName: 'Administrator', email: 'admin@pathshalax.com', isAdmin: true });
      navigateTo(AppScreen.HOME);
      return;
    }
    setLoginIdentifier(identifier);
    setAuthType(type);
    navigateTo(AppScreen.OTP);
  };

  const handleVerifyOTP = () => {
    showNotification('Identity Verified', 'success');
    const name = authType === 'email' ? loginIdentifier.split('@')[0] : 'Learner';
    setUser({ displayName: name, email: authType === 'email' ? loginIdentifier : null });
    navigateTo(AppScreen.HOME);
  };

  const handleSocialLogin = async (type: 'google' | 'facebook') => {
    try {
      if (type === 'google') await signInWithGoogle();
      else await signInWithFacebook();
      showNotification('Scholar Linked Successfully', 'success');
      navigateTo(AppScreen.HOME);
    } catch (e: any) {
      showNotification(e.message || 'Gateway Failure', 'error');
    }
  };

  const showNav = [
    AppScreen.HOME, 
    AppScreen.DASHBOARD, 
    AppScreen.TESTS, 
    AppScreen.SEARCH, 
    AppScreen.LIBRARY,
    AppScreen.PROFILE,
    AppScreen.SUBJECTS,
    AppScreen.CHAPTERS,
    AppScreen.LECTURES
  ].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.LOGIN:
        return <Login onLogin={handleLoginSubmit} onSocialLogin={handleSocialLogin} />;
      case AppScreen.OTP:
        return <OTP 
          phoneNumber={authType === 'phone' ? loginIdentifier : ''} 
          emailAddress={authType === 'email' ? loginIdentifier : ''}
          onVerify={handleVerifyOTP} 
          onBack={() => navigateTo(AppScreen.LOGIN)} 
        />;
      case AppScreen.HOME:
        return <Home onNavigate={navigateTo} userData={user} />;
      case AppScreen.DASHBOARD:
        return <Dashboard onNavigate={navigateTo} userData={user} />;
      case AppScreen.TESTS:
        return <Tests onNavigate={navigateTo} />;
      case AppScreen.NOTIFICATIONS:
        return <Notifications onNavigate={navigateTo} />;
      case AppScreen.SEARCH:
        return <Search onNavigate={navigateTo} />;
      case AppScreen.PROFILE:
        return <Profile onNavigate={navigateTo} userData={user} />;
      case AppScreen.AI_CHAT:
        return <AIChat onNavigate={navigateTo} />;
      case AppScreen.DOUBTS:
        return <Doubts onNavigate={navigateTo} />;
      case AppScreen.AI_GRADER:
        return <AIGrader onNavigate={navigateTo} />;
      case AppScreen.LIBRARY:
        return <BatchContent viewMode="downloads" onNavigate={navigateTo} />;
      case AppScreen.SUBJECTS:
      case AppScreen.CHAPTERS:
      case AppScreen.LECTURES:
        return <BatchContent onNavigate={navigateTo} />;
      default:
        return <Home onNavigate={navigateTo} userData={user} />;
    }
  };

  return (
    <>
      <div className="app-content bg-[#FCFDFE]">
        <div key={currentScreen} className="screen-fade-in h-full">
          {renderScreen()}
        </div>
      </div>

      {toast && (
        <div className="fixed top-12 left-0 right-0 z-[1000] px-6 flex justify-center">
          <div className={`px-6 py-4 rounded-2xl shadow-xl flex items-center space-x-3 backdrop-blur-md animate-fade-in ${toast.type === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'}`}>
             <span className="text-xs font-black uppercase tracking-widest">{toast.message}</span>
          </div>
        </div>
      )}

      {showNav && <BottomNav activeTab={currentScreen} onNavigate={navigateTo} />}
    </>
  );
};

export default App;
