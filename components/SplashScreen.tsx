import React, { useEffect } from 'react';
import { HeartPulse, BrainCircuit } from 'lucide-react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-1000">
        <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-white/20 group relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-blue-500/40 transition-colors duration-500"></div>
          <BrainCircuit size={64} className="text-white relative z-10 animate-pulse" />
          <HeartPulse size={24} className="text-emerald-400 absolute top-4 right-4 z-10" />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black text-white tracking-tighter">AlzCare</h1>
          <p className="text-blue-200/60 font-bold uppercase tracking-[0.3em] text-xs">
            Precision Neurological AI
          </p>
        </div>

        <div className="flex gap-1.5 mt-8">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      <div className="absolute bottom-10 text-white/20 text-[10px] font-bold uppercase tracking-widest">
        Decision Support System v3.0
      </div>
    </div>
  );
};

export default SplashScreen;