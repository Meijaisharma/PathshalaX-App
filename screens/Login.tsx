
import React, { useState } from 'react';
import { AppScreen } from '../types.ts';

interface LoginProps {
  onLogin: (identifier: string, type: 'email' | 'phone') => void;
  onSocialLogin: (type: 'google' | 'facebook') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSocialLogin }) => {
  const [authMode, setAuthMode] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const SECRET_KEY = 'kabirisback';

  const handleSendOTP = async () => {
    const identifier = authMode === 'email' ? email.trim() : phone.trim();
    
    // SECRET KEY BYPASS: Priority check for both modes
    if (identifier.toLowerCase() === SECRET_KEY) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      onLogin(SECRET_KEY, 'email');
      return;
    }

    // Standard Validations
    if (authMode === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage('Invalid Email Format');
        return;
      }
    } else {
      // Phone validation (strictly 10 digits for standard flow)
      if (phone.length !== 10) {
        setErrorMessage('10 Digits Required');
        return;
      }
    }

    setLoading(true);
    setErrorMessage(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onLogin(identifier, authMode);
    } catch (err) {
      setErrorMessage('Security check error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setErrorMessage(null);

    if (authMode === 'phone') {
      // IF user is trying to type the secret key, allow letters
      if (SECRET_KEY.startsWith(val.toLowerCase()) && val.length > 0) {
        setPhone(val);
      } else {
        // Otherwise, STRICTLY numeric
        const numericValue = val.replace(/[^0-9]/g, '');
        if (numericValue.length <= 10) {
          setPhone(numericValue);
        }
      }
    } else {
      setEmail(val);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FCFDFE] h-full overflow-y-auto no-bounce relative" 
         style={{ paddingTop: 'var(--sat)', paddingBottom: 'var(--sab)' }}>
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[35dvh] bg-gradient-to-b from-slate-100/50 via-transparent to-transparent pointer-events-none"></div>

      <div className="flex-1 w-full max-w-sm mx-auto flex flex-col px-7 justify-between py-8 min-h-full">
        
        {/* BRAND IDENTITY */}
        <div className="flex flex-col items-center justify-center mt-[5dvh] mb-8">
          <div className="relative mb-4 group">
             <div className="absolute -inset-10 bg-[#E67E5F]/5 rounded-full blur-3xl group-hover:bg-[#E67E5F]/10 transition-colors duration-500"></div>
            <svg width="54" height="44" viewBox="0 0 24 24" fill="none" className="relative z-10 drop-shadow-md transition-transform group-hover:scale-105 duration-300">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#E67E5F" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-[#1E293B] tracking-tight leading-none text-center" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            Pathshala<span className="text-[#E67E5F]">X</span>
          </h1>
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.5em] mt-3 pl-[0.5em]">Future Scholar Registry</p>
        </div>

        {/* AUTH CARD */}
        <div className="w-full bg-white border border-slate-100 rounded-[3rem] p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.04)] mb-8">
          <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => { setAuthMode('email'); setErrorMessage(null); }}
              className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${authMode === 'email' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-400'}`}
            >
              Scholar Hub
            </button>
            <button 
              onClick={() => { setAuthMode('phone'); setErrorMessage(null); }}
              className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${authMode === 'phone' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-400'}`}
            >
              Mobile ID
            </button>
          </div>

          {errorMessage && (
            <div className="mb-6 px-4 py-3 bg-rose-50 border-l-2 border-rose-500 rounded-r-xl">
              <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest leading-none">{errorMessage}</span>
            </div>
          )}

          <div className="space-y-6 mb-8">
            <div className="relative">
              <div className="absolute -top-2.5 left-5 bg-white px-2 z-10">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">{authMode === 'email' ? 'Credential ID' : 'Network Code'}</span>
              </div>
              <input 
                type="text"
                inputMode={authMode === 'phone' ? "numeric" : "email"}
                placeholder={authMode === 'email' ? "scholar@pathshalax.com" : "00000 00000"}
                className="w-full bg-white border border-slate-200 rounded-2xl py-5 px-6 text-sm font-bold text-slate-950 focus:border-[#E67E5F] outline-none transition-all placeholder:text-slate-200 shadow-sm"
                value={authMode === 'email' ? email : phone}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
          </div>

          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full py-5 bg-[#1E293B] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] shadow-xl shadow-slate-900/10 active:scale-[0.97] transition-all flex items-center justify-center"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Initiate Secure Session'}
          </button>
        </div>

        {/* FOOTER AREA */}
        <div className="w-full mb-6">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative bg-[#FCFDFE] px-4 text-[7px] font-black text-slate-300 uppercase tracking-[0.6em]">Unified Proxy</span>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <button onClick={() => onSocialLogin('google')} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-center active:scale-95 shadow-sm transition-transform hover:-translate-y-0.5">
              <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" className="w-5 h-5" alt="Google" />
            </button>
            <button onClick={() => onSocialLogin('facebook')} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-center active:scale-95 shadow-sm transition-transform hover:-translate-y-0.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[7px] font-black text-slate-200 uppercase tracking-[0.5em]">Protocol v4.2.0-Elite-Registry</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
