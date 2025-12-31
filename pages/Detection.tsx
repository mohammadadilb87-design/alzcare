import React, { useState } from 'react';
import { Upload, FileType, CheckCircle2, AlertCircle, Loader2, RefreshCcw, Download, Info, ShieldCheck, Stethoscope, Heart, Activity } from 'lucide-react';
import { predictAlzheimerStage, savePrediction } from '../services/mlService';
import { downloadReport } from '../services/reportService';
import { AlzheimerStage, PredictionResult, ViewMode } from '../types';
import { STAGE_COLORS, STAGE_DESCRIPTIONS, AI_EXPLANATIONS, calculateCognitiveScore } from '../constants';

const Detection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('DOCTOR');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const prediction = await predictAlzheimerStage(file);
      prediction.imageUrl = preview || undefined;
      setResult(prediction);
      savePrediction(prediction);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const cognitiveScore = result ? calculateCognitiveScore(result.stage, result.confidence) : 0;
  const isReliable = result ? result.confidence >= 0.90 : true;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">MRI Diagnostic Suite</h2>
          <p className="text-slate-600 font-medium">Neural classification with integrated AI explainability.</p>
        </div>
        
        <div className="neu-inset p-1 rounded-2xl flex gap-1">
          <button 
            onClick={() => setViewMode('DOCTOR')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${viewMode === 'DOCTOR' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
          >
            <Stethoscope size={14} /> DOCTOR MODE
          </button>
          <button 
            onClick={() => setViewMode('CARETAKER')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${viewMode === 'CARETAKER' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
          >
            <Heart size={14} /> CARETAKER MODE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upload Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`
            relative neu-flat rounded-[3rem] p-10 border border-white/40 transition-all
            ${preview ? 'bg-blue-50/20' : ''}
          `}>
            {preview ? (
              <div className="relative aspect-square w-full neu-inset rounded-[2.5rem] overflow-hidden p-2">
                <img src={preview} alt="MRI Preview" className="w-full h-full object-cover rounded-[2rem]" />
                <button 
                  onClick={reset}
                  className="absolute top-6 right-6 neu-button p-3 rounded-full text-red-500 hover:text-red-700 transition-all"
                >
                  <RefreshCcw size={20} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-square cursor-pointer group">
                <div className="w-24 h-24 neu-button rounded-[2rem] flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <Upload size={36} />
                </div>
                <span className="text-xl font-black text-slate-800 mb-2">Upload MRI Scan</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center">JPG, PNG or DICOM<br/>128x128 Resolution Preferred</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing || result !== null}
            className={`
              w-full py-6 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all
              ${!file || isAnalyzing || result !== null
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'neu-accent text-white hover:scale-[1.02] active:scale-[0.98]'}
            `}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" />
                Processing Voxel Data...
              </>
            ) : (
              'Initiate AI Diagnosis'
            )}
          </button>
        </div>

        {/* Result Column */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-10 duration-700">
              <div className="neu-flat rounded-[3rem] border border-white/40 p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
                    <CheckCircle2 size={16} />
                    Classification Computed
                  </div>
                  <button 
                    onClick={() => downloadReport(result)}
                    className="neu-button px-5 py-2.5 rounded-xl text-xs font-black text-blue-600 flex items-center gap-2"
                  >
                    <Download size={16} />
                    PDF REPORT
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Target Classification</p>
                    <div 
                      className="text-3xl font-black rounded-3xl p-6 text-center shadow-lg text-white"
                      style={{ backgroundColor: STAGE_COLORS[result.stage] }}
                    >
                      {result.stage}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Cognitive Health Score</p>
                    <div className="neu-inset p-5 rounded-3xl flex items-center justify-center relative overflow-hidden">
                      <div className="text-4xl font-black text-slate-800 z-10">{cognitiveScore}</div>
                      <div className="text-[10px] font-black text-slate-400 ml-1 mt-3 z-10">/100</div>
                      <div 
                        className="absolute bottom-0 left-0 h-1 transition-all duration-1000"
                        style={{ 
                          width: `${cognitiveScore}%`, 
                          backgroundColor: cognitiveScore > 70 ? '#10b981' : cognitiveScore > 40 ? '#fbbf24' : '#ef4444' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {!isReliable && viewMode === 'DOCTOR' && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-800 text-xs font-bold animate-pulse">
                    <AlertCircle size={18} />
                    Reliability Alert: Model confidence is below 90%. Manual radiologist verification is strongly suggested.
                  </div>
                )}

                {/* Explainability Section */}
                <div className="space-y-4 pt-4 border-t border-slate-200/50">
                  <div className="flex items-center gap-2 text-slate-800 font-black text-sm">
                    <Info size={18} className="text-blue-500" />
                    AI EXPLAINABILITY MODULE
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="neu-inset p-5 rounded-2xl space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Affected Regions</p>
                      <div className="flex flex-wrap gap-2">
                        {AI_EXPLANATIONS[result.stage].regions.map(r => (
                          <span key={r} className="bg-white px-2 py-1 rounded-md text-[10px] font-bold text-blue-600 shadow-sm">{r}</span>
                        ))}
                      </div>
                    </div>
                    <div className="neu-inset p-5 rounded-2xl space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic Inference</p>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">
                        {viewMode === 'DOCTOR' ? AI_EXPLANATIONS[result.stage].reason : STAGE_DESCRIPTIONS[result.stage]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50 space-y-2">
                     <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Caretaker Guidance</p>
                     <p className="text-xs font-bold text-blue-900 leading-relaxed">
                        {AI_EXPLANATIONS[result.stage].guidance}
                     </p>
                  </div>
                </div>

                <div className="text-[9px] text-slate-400 font-medium italic flex gap-2 pt-2">
                  <ShieldCheck size={12} className="flex-shrink-0" />
                  Indicative analysis based on OASIS-3 voxel mapping. Not a final clinical diagnosis.
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full neu-flat rounded-[3rem] border border-white/40 flex flex-col items-center justify-center p-12 text-center opacity-60">
              <div className="w-24 h-24 neu-inset rounded-full flex items-center justify-center text-slate-300 mb-8">
                <Activity size={48} className="animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-slate-400">Diagnosis Queue Idle</h3>
              <p className="text-sm text-slate-400 max-w-sm mt-3 font-medium leading-relaxed uppercase tracking-tighter">
                Upload a T1-weighted MRI brain scan and initiate analysis to see structural neural classification.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detection;