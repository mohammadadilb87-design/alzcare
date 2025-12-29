
import React, { useState } from 'react';
import { HeartPulse, Lock, User, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserRole, User as UserType } from '../types';

interface LoginProps {
  onLogin: (user: UserType) => void;
  onNavigateToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigateToRegister }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('CLINICIAN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate auth logic
    setTimeout(() => {
      const user: UserType = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role: email.includes('admin') ? 'ADMIN' : role,
        name: email.split('@')[0]
      };
      
      // Save login log for admin
      const logs = JSON.parse(localStorage.getItem('alzcare_login_logs') || '[]');
      logs.unshift({
        id: Math.random().toString(36).substr(2, 9),
        email: user.email,
        timestamp: new Date().toISOString(),
        role: user.role,
        ip: '192.168.1.' + Math.floor(Math.random() * 255)
      });
      localStorage.setItem('alzcare_login_logs', JSON.stringify(logs.slice(0, 50)));
      
      setLoading(false);
      onLogin(user);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#e0e5ec]">
      <div className="w-full max-w-md neu-flat p-10 rounded-[3rem] relative z-10 transition-all border border-white/20">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 animate-pulse">
            <HeartPulse className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">ALZCARE</h1>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase tracking-widest">
            <ShieldCheck size={14} className="text-blue-500" />
            Portal Access
          </div>
        </div>

        <div className="flex gap-4 mb-8 p-1 neu-inset rounded-2xl">
          <button 
            type="button"
            onClick={() => setRole('CLINICIAN')}
            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${role === 'CLINICIAN' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
          >
            CLINICIAN
          </button>
          <button 
            type="button"
            onClick={() => setRole('ADMIN')}
            className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${role === 'ADMIN' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
          >
            ADMIN
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Identifier</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="clinician@alzcare.ai"
                className="w-full neu-inset border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Secret Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full neu-inset border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full neu-accent text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg group mt-8"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                AUTHENTICATE
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200/50 text-center flex flex-col gap-3">
          <button 
            onClick={onNavigateToRegister}
            className="text-blue-600 text-xs font-black uppercase tracking-wider hover:underline"
          >
            Register New Account
          </button>
          <p className="text-slate-400 text-[10px] font-medium leading-relaxed uppercase tracking-tighter">
            Authorized Personnel Only.<br/>Standard HIPAA Compliance Active.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
