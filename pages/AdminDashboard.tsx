
import React, { useEffect, useState } from 'react';
import { LoginLog } from '../types';
import { ShieldCheck, Activity, Users, Clock, Globe, Trash2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [logs, setLogs] = useState<LoginLog[]>([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('alzcare_login_logs') || '[]');
    setLogs(storedLogs);
  }, []);

  const clearLogs = () => {
    localStorage.removeItem('alzcare_login_logs');
    setLogs([]);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Administration Control</h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">System Audit & Personnel Logs</p>
        </div>
        <button 
          onClick={clearLogs}
          className="neu-button text-red-500 px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 hover:bg-red-50"
        >
          <Trash2 size={16} /> CLEAR AUDIT TRAIL
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="neu-flat p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/40">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 neu-button">
            <Users size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Personnel</p>
            <p className="text-3xl font-black text-slate-800">12</p>
          </div>
        </div>
        <div className="neu-flat p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/40">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 neu-button">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Sessions</p>
            <p className="text-3xl font-black text-slate-800">03</p>
          </div>
        </div>
        <div className="neu-flat p-8 rounded-[2.5rem] flex items-center gap-6 border border-white/40">
          <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 neu-button">
            <ShieldCheck size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Security Score</p>
            <p className="text-3xl font-black text-slate-800">100%</p>
          </div>
        </div>
      </div>

      <div className="neu-flat rounded-[3rem] border border-white/40 overflow-hidden">
        <div className="p-8 border-b border-slate-200/50 flex items-center justify-between bg-slate-50/20">
          <h3 className="text-xl font-black text-slate-800">Login Audit Logs</h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{logs.length} Total Events</span>
        </div>
        
        {logs.length === 0 ? (
          <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-sm">
            No Security Logs Recorded
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <tr>
                  <th className="px-10 py-5">Personnel Identifier</th>
                  <th className="px-10 py-5">Access Permission</th>
                  <th className="px-10 py-5">Network IP</th>
                  <th className="px-10 py-5 text-right">Access Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="font-bold text-slate-700">{log.email}</div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm ${log.role === 'ADMIN' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                        {log.role}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                        <Globe size={14} /> {log.ip}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 text-slate-400 text-xs font-bold">
                        <Clock size={14} /> {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
