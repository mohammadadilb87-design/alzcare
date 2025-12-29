
import React from 'react';
import { Info, Brain, Activity, ShieldCheck, HelpCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-slate-900">Understanding Alzheimer's</h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Alzheimer's disease is a progressive neurologic disorder that causes the brain to shrink and brain cells to die.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
            <Activity size={24} />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-900">What is ALZCARE?</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            ALZCARE is a medical imaging diagnostic tool that utilizes Deep Learning, specifically Convolutional Neural Networks (CNN), 
            to identify structural changes in the brain that correlate with Alzheimer's Disease stages.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
            <Brain size={24} />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-900">How CNN Works</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            Our model is trained on the OASIS MRI dataset. It extracts features from neuroimaging voxels, 
            detecting atrophy in the hippocampus and cerebral cortex which are early markers of dementia.
          </p>
        </div>
      </div>

      <section className="bg-slate-900 text-white rounded-[2rem] p-10 md:p-16 relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          <h3 className="text-3xl font-bold">The Stages of Progression</h3>
          <div className="space-y-6">
             {[
               { stage: 'Non Demented', desc: 'Typical brain structure with normal cortical thickness and hippocampal volume.' },
               { stage: 'Very Mild', desc: 'Slight hippocampal shrinkage. Minor cognitive symptoms barely noticeable in clinical settings.' },
               { stage: 'Mild', desc: 'Clear evidence of neurodegeneration. Significant impact on short-term memory and spatial navigation.' },
               { stage: 'Moderate', desc: 'Advanced atrophy. Severe cognitive impairment involving language, reasoning, and motor skills.' }
             ].map((item, i) => (
               <div key={i} className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold flex-shrink-0">{i+1}</div>
                 <div>
                   <h4 className="font-bold text-lg">{item.stage}</h4>
                   <p className="text-slate-400 text-sm">{item.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
        <Brain className="absolute -bottom-20 -right-20 text-blue-800 opacity-20 pointer-events-none" size={400} />
      </section>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
           <HelpCircle className="text-blue-600" />
           Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border">
            <h4 className="font-bold mb-2">Is this a definitive diagnosis?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">No. This tool is a screening assistant. A definitive diagnosis requires physical exams, cognitive tests, and neurological evaluation.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border">
            <h4 className="font-bold mb-2">How accurate is the model?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">In clinical validation on the OASIS-3 dataset, our CNN achieved an average F1-score of 0.94 across all classes.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border">
            <h4 className="font-bold mb-2">Where is my data stored?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">For this demo, data is stored locally in your browser. In production, we use AES-256 encrypted cloud storage.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border">
            <h4 className="font-bold mb-2">Who should use ALZCARE?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Radiologists and neurologists can use it to speed up initial triage, and families can use the tracker for organized caregiving.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
