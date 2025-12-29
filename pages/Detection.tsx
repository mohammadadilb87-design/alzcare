
import React, { useState } from 'react';
import { Upload, FileType, CheckCircle2, AlertCircle, Loader2, RefreshCcw, Download } from 'lucide-react';
import { predictAlzheimerStage, savePrediction } from '../services/mlService';
import { downloadReport } from '../services/reportService';
import { AlzheimerStage, PredictionResult } from '../types';
import { STAGE_COLORS, STAGE_DESCRIPTIONS } from '../constants';

const Detection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

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

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-2">MRI Analysis</h2>
        <p className="text-slate-600">Advanced CNN inference for neurological stage identification.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Column */}
        <div className="space-y-6">
          <div className={`
            relative border-2 border-dashed rounded-[2.5rem] p-8 transition-all
            ${preview ? 'border-blue-400 bg-blue-50/50' : 'border-slate-300 bg-white/70 backdrop-blur-sm hover:border-blue-400'}
          `}>
            {preview ? (
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
                <img src={preview} alt="MRI Preview" className="w-full h-full object-contain" />
                <button 
                  onClick={reset}
                  className="absolute top-4 right-4 bg-white/90 p-3 rounded-full text-red-500 hover:bg-white shadow-lg transition-all"
                >
                  <RefreshCcw size={20} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-square cursor-pointer group">
                <div className="w-24 h-24 bg-blue-100 rounded-[2rem] flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
                  <Upload size={36} />
                </div>
                <span className="text-xl font-bold text-slate-900 mb-2">Upload Scan</span>
                <span className="text-sm text-slate-500 text-center leading-relaxed">Drag and drop or click to select<br/><span className="text-xs opacity-70">JPG, PNG or DICOM format</span></span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing || result !== null}
            className={`
              w-full py-5 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all
              ${!file || isAnalyzing || result !== null
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 active:scale-95 shadow-blue-600/20'}
            `}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin" />
                Analyzing Pixels...
              </>
            ) : (
              'Initiate Analysis'
            )}
          </button>
        </div>

        {/* Result Column */}
        <div className="space-y-6">
          {result ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] border shadow-2xl p-8 space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-emerald-600 font-black uppercase tracking-widest text-xs">
                  <CheckCircle2 size={18} />
                  Analysis Ready
                </div>
                <button 
                  onClick={() => downloadReport(result)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl transition-colors"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Classification Stage</p>
                <div 
                  className="text-4xl font-black rounded-3xl p-6 text-center shadow-inner"
                  style={{ color: 'white', backgroundColor: STAGE_COLORS[result.stage] }}
                >
                  {result.stage}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Inference</p>
                  <p className="text-3xl font-black text-blue-600">{(result.confidence * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Trend</p>
                  <p className="text-3xl font-black text-emerald-600 italic">Static</p>
                </div>
              </div>

              <div className="p-5 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                <p className="text-sm text-blue-900 leading-relaxed font-medium italic">
                  "{STAGE_DESCRIPTIONS[result.stage]}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 leading-relaxed flex gap-3">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                Automated screening result. Clinical oversight mandatory for diagnostic finalization.
              </div>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center transition-all">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                <FileType size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-400">Queue Empty</h3>
              <p className="text-sm text-slate-400 max-w-[240px] mt-2 font-medium">Results will be visualized here upon successful CNN inference.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detection;
