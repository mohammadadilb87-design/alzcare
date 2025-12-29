
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Legend
} from 'recharts';
import { getStoredRecords } from '../services/mlService';
import { downloadReport, downloadGlobalReport } from '../services/reportService';
import { AlzheimerStage } from '../types';
import { STAGE_COLORS } from '../constants';
import { Clock, Calendar, ChevronRight, Activity, TrendingDown, Info, Download } from 'lucide-react';

const Dashboard: React.FC = () => {
  const history = getStoredRecords();

  const stageMap: Record<AlzheimerStage, number> = {
    [AlzheimerStage.NON_DEMENTED]: 0,
    [AlzheimerStage.VERY_MILD]: 1,
    [AlzheimerStage.MILD]: 2,
    [AlzheimerStage.MODERATE]: 3,
  };

  const chartData = [...history].reverse().map(h => ({
    date: new Date(h.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: stageMap[h.stage],
    confidence: h.confidence * 100,
    stage: h.stage
  }));

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
        <div className="neu-flat p-10 rounded-[3rem] shadow-xl shadow-slate-200/50">
           <Activity size={80} className="text-slate-300" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">Zero Patient Records</h2>
        <p className="text-slate-500 max-w-sm font-medium">Perform an MRI analysis to begin generating longitudinal tracking data.</p>
      </div>
    );
  }

  const latest = history[0];
  const previous = history[1] || null;
  const isWorsening = previous && stageMap[latest.stage] > stageMap[previous.stage];

  const handleGlobalExport = () => {
    downloadGlobalReport(history);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Clinical Insights</h2>
          <p className="text-slate-500 font-medium">Tracking Archive for Patient: <span className="font-mono bg-blue-600 text-white px-3 py-0.5 rounded-full text-sm">ALZ-9921-X</span></p>
        </div>
        <div className="flex gap-3">
           <button className="neu-button px-5 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all">
             <Calendar size={18} className="text-blue-500" /> 30 Day Window
           </button>
           <button 
             onClick={handleGlobalExport}
             className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-black hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all flex items-center gap-2"
           >
             <Download size={18} />
             Global Export
           </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Current State', val: latest.stage, color: STAGE_COLORS[latest.stage] },
          { label: 'Trend Profile', val: isWorsening ? 'Decline' : 'Stable', color: isWorsening ? '#ef4444' : '#10b981', icon: isWorsening ? <TrendingDown size={18}/> : <Activity size={18}/> },
          { label: 'Inferences', val: history.length, color: '#334155' },
          { label: 'Last Sync', val: new Date(latest.timestamp).toLocaleDateString(), color: '#334155' }
        ].map((card, i) => (
          <div key={i} className="neu-flat p-6 rounded-[2rem] border border-white/20 group hover:translate-y-[-4px] transition-all">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">{card.label}</p>
            <div className="flex items-center gap-2">
              {card.icon && <div style={{ color: card.color }}>{card.icon}</div>}
              <span className="text-xl font-black" style={{ color: card.color }}>{card.val}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 neu-flat p-8 rounded-[2.5rem] border border-white/20 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Cognitive Trajectory</h3>
            <div className="text-[10px] text-slate-400 font-black uppercase flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div> Neural Markers
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d5db" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} domain={[0, 3]} ticks={[0, 1, 2, 3]} />
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '9px 9px 16px rgb(163,177,198,0.6)', padding: '16px'}}
                  formatter={(value: any, name: any, props: any) => [props.payload.stage, "State"]}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Breakdown */}
        <div className="neu-flat p-8 rounded-[2.5rem] border border-white/20 space-y-6">
          <h3 className="text-xl font-black text-slate-900">Inference Fidelity</h3>
          <div className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d5db" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <YAxis unit="%" domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '24px'}} />
                  <Bar dataKey="confidence" fill="#10b981" radius={[8, 8, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="neu-flat rounded-[2.5rem] border border-white/20 overflow-hidden">
        <div className="p-8 border-b border-slate-200/50 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Historical Data Assets</h3>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{history.length} Logged Entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Analysis Timestamp</th>
                <th className="px-8 py-5">Classification</th>
                <th className="px-8 py-5">Fidelity Metric</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-white/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                      <Clock size={16} className="text-blue-400" />
                      {new Date(h.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span 
                      className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm"
                      style={{ color: 'white', backgroundColor: STAGE_COLORS[h.stage] }}
                    >
                      {h.stage}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2.5 neu-inset rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 shadow-sm" style={{ width: `${h.confidence * 100}%` }}></div>
                      </div>
                      <span className="text-xs font-black text-slate-900">{(h.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => downloadReport(h)}
                        className="p-2.5 neu-button text-blue-600 rounded-xl transition-all"
                        title="Download Report"
                      >
                        <Download size={18} />
                      </button>
                      <button className="p-2.5 neu-button text-slate-400 rounded-xl transition-all">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
