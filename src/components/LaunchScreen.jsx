import React, { useEffect, useState } from 'react';

export default function LaunchScreen({ onFinished }) {
  const [logoFailed, setLogoFailed] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinished) onFinished();
    }, 2550);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative select-none antialiased">
      <div className="absolute w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="text-center z-10 flex flex-col items-center space-y-6">
        
        {/* Animated Brand Logo Container */}
        <div className="h-20 w-20 rounded-2xl bg-slate-900 border border-slate-800 p-3.5 flex items-center justify-center shadow-2xl animate-bounce overflow-hidden">
          {!logoFailed ? (
            <img 
              src="/logo.png" 
              alt="App Logo" 
              className="h-full w-full object-contain" 
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <div className="h-full w-full rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
              <span className="text-slate-950 font-black text-2xl tracking-tighter">L</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-xl font-black text-slate-50 tracking-wider uppercase">
            Ledger Base
          </h1>
          <p className="text-xs text-slate-500 font-medium tracking-widest mt-1 uppercase">
            Securing Digital Statements
          </p>
        </div>

        {/* Loading Strip */}
        <div className="w-32 bg-slate-900 h-1 rounded-full overflow-hidden border border-slate-800">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-1/2 rounded-full animate-loading-bar"></div>
        </div>

      </div>

      <div className="absolute bottom-8 text-[10px] text-slate-600 uppercase font-bold tracking-widest">
        v2.0.0 • Production Build
      </div>
    </div>
  );
}