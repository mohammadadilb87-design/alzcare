
import React from 'react';
import { Brain, Search, TrendingUp, ShieldCheck, Activity, Users } from 'lucide-react';

const Home: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-blue-900 rounded-[2rem] p-8 md:p-16 text-white overflow-hidden shadow-2xl">
        <div className="relative z-10 md:w-2/3">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Early Detection for a <span className="text-emerald-400">Brighter Future.</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">
            Empowering neurologists and caregivers with AI-driven MRI classification and comprehensive patient progress tracking.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('detection')}
              className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Analyze MRI
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none hidden md:block">
           <Brain size={400} />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
            <Search size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">CNN Inference</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our specialized Convolutional Neural Network classifies MRI scans into four clinical stages with high precision.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Monitor the longitudinal data of patients to detect trends in condition worsening and optimize care plans.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl border shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Secure Records</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            HIPAA-compliant data handling for sensitive medical records and patient imaging history.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white p-8 md:p-12 rounded-[2rem] border shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Impact of Early Detection</h2>
            <p className="text-slate-600 leading-relaxed">
              Early diagnosis of Alzheimer's allows for better management of symptoms, earlier start of treatments, and provides patients and families more time to plan for the future.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Model Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-500 mb-2">2x</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Faster Screening</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-6 rounded-2xl border flex flex-col items-center justify-center">
              <Activity className="text-blue-500 mb-2" size={32} />
              <span className="text-2xl font-bold">12k+</span>
              <span className="text-xs text-slate-500">Analyses Done</span>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border flex flex-col items-center justify-center">
              <Users className="text-emerald-500 mb-2" size={32} />
              <span className="text-2xl font-bold">4.5k+</span>
              <span className="text-xs text-slate-500">Patients Tracked</span>
            </div>
            <div className="col-span-2 bg-blue-600 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
              <div>
                <h4 className="font-bold">Clinical Integration</h4>
                <p className="text-xs opacity-80">Used by 45+ hospitals worldwide</p>
              </div>
              <ShieldCheck size={40} className="opacity-40" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
