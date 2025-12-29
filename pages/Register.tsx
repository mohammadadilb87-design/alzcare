
import React, { useState } from 'react';
import { HeartPulse, Mail, Lock, User, Loader2, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';

interface RegisterProps {
  onBack: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#e0e5ec]">
        <div className="w-full max-w-md neu-flat p-10 rounded-[3rem] text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="text-white" size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-800">Registration Pending</h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Your credentials have been submitted. An administrator will review your medical license verification before activation.
          </p>
          <button 
            onClick={onBack}
            className="w-full neu-button text-blue-600 font-black py-4 rounded-2xl"
          >
            RETURN TO LOGIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#e0e5ec]">
      <div className="w-full max-w-md neu-flat p-10 rounded-[3rem] border border-white/20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 neu-button">
            <HeartPulse size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">New Enrollment</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Medical Staff Registration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                required
                className="w-full neu-inset border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 outline-none"
                placeholder="Dr. Sarah Connor"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Clinical Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="email" 
                required
                className="w-full neu-inset border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 outline-none"
                placeholder="sarah@hospital.org"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">License ID</label>
            <div className="relative">
              {/* Add missing icon component from lucide-react */}
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                required
                className="w-full neu-inset border-none rounded-2xl py-4 pl-12 pr-4 text-slate-700 outline-none"
                placeholder="MED-8829-22"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full neu-accent text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all mt-6 shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : 'REQUEST ACCESS'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
