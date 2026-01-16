
import React, { useState, useEffect } from 'react';

interface SplashProps {
  onFinish: () => void;
}

const Splash: React.FC<SplashProps> = ({ onFinish }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimationStep(1), 100);
    const t2 = setTimeout(() => setAnimationStep(2), 800);
    const t3 = setTimeout(() => onFinish(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  const brand = "Pathshala".split("");

  return (
    <div className="fixed inset-0 z-[300] bg-[#FCFDFE] flex flex-col items-center justify-center overflow-hidden no-bounce">
      {/* Cinematic drift background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#E67E5F]/5 blur-[120px] animate-drift"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] animate-drift-reverse"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* LOGO - Elite Magnetic Scale */}
        <div className={`relative mb-12 transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) transform ${animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="absolute -inset-12 bg-gradient-to-tr from-[#E67E5F]/10 to-transparent rounded-full blur-[60px] animate-pulse"></div>
          <svg width="96" height="78" viewBox="0 0 24 24" fill="none" className="drop-shadow-2xl relative z-20">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#E67E5F" strokeWidth="2.4" strokeLinecap="round" className="splash-path" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#1E293B" strokeWidth="2.4" strokeLinejoin="round" className="splash-path-main" />
          </svg>
        </div>
        
        <div className="flex flex-col items-center overflow-hidden">
          <div className="flex items-baseline mb-2">
            {brand.map((char, i) => (
              <span 
                key={i}
                className={`text-4xl sm:text-5xl font-black text-slate-900 transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) transform ${animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ 
                    fontFamily: "'Tiro Devanagari Hindi', serif",
                    transitionDelay: `${i * 50}ms`
                }}
              >
                {char}
              </span>
            ))}
            <span 
              className={`text-4xl sm:text-5xl font-black text-[#E67E5F] transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) transform ${animationStep >= 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-150'}`}
              style={{ 
                  fontFamily: "'Tiro Devanagari Hindi', serif",
                  transitionDelay: `${brand.length * 50 + 150}ms`
              }}
            >
              X
            </span>
          </div>
          
          <div className={`h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent transition-all duration-1000 ${animationStep >= 2 ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}></div>
          
          <p className={`text-[9px] mt-8 font-black text-slate-400 uppercase tracking-[0.6em] transition-all duration-1000 delay-[1.2s] ${animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            The Scholar Registry
          </p>
        </div>
      </div>

      <div className="absolute bottom-[8dvh] flex flex-col items-center w-full px-16">
        <div className="w-full max-w-[220px] h-[1.5px] bg-slate-100 rounded-full overflow-hidden mb-4">
          <div className={`h-full bg-slate-950 transition-all duration-[3000ms] ease-linear ${animationStep >= 1 ? 'w-full' : 'w-0'}`}></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[7px] font-bold text-slate-300 uppercase tracking-[0.4em]">Establishing Secure Context</span>
        </div>
      </div>

      <style>{`
        .splash-path { stroke-dasharray: 100; stroke-dashoffset: 100; animation: drawSplash 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .splash-path-main { stroke-dasharray: 150; stroke-dashoffset: 150; animation: drawSplash 2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s; }
        @keyframes drawSplash { to { stroke-dashoffset: 0; } }
        @keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, 15px); } }
        @keyframes drift-reverse { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-30px, -15px); } }
        .animate-drift { animation: drift 10s ease-in-out infinite; }
        .animate-drift-reverse { animation: drift-reverse 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Splash;
