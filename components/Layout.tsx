
import React, { useState } from 'react';
import { Home, Brain, LayoutDashboard, Info, Menu, X, HeartPulse, LogOut, ShieldAlert } from 'lucide-react';
import { UserRole, NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  role: UserRole;
  userName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout, role, userName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavItems = (): NavItem[] => {
    if (role === 'ADMIN') {
      return [
        { id: 'admin_dashboard', label: 'Admin Logs', icon: <ShieldAlert size={20} /> },
        { id: 'home', label: 'Home', icon: <Home size={20} /> },
        { id: 'detection', label: 'Analysis', icon: <Brain size={20} /> },
        { id: 'dashboard', label: 'Clinical Stats', icon: <LayoutDashboard size={20} /> },
        { id: 'about', label: 'Library', icon: <Info size={20} /> },
      ];
    }
    // Clinicians only get access to Detection (as per user request "access only the analyzing page")
    return [
      { id: 'detection', label: 'MRI Analysis', icon: <Brain size={20} /> },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#e0e5ec] relative overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-6 bg-white/50 backdrop-blur-md border-b border-white sticky top-0 z-50">
        <div className="flex items-center gap-3 text-blue-700 font-black text-2xl tracking-tighter">
          <HeartPulse className="text-blue-500" />
          <span>ALZCARE</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="neu-button p-2 rounded-xl">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 transition duration-500 ease-in-out z-40
        w-72 flex flex-col h-screen p-6
      `}>
        <div className="neu-flat h-full rounded-[3rem] flex flex-col border border-white/20">
          <div className="hidden md:flex items-center gap-3 p-8 text-blue-700 font-black text-3xl tracking-tighter">
            <HeartPulse size={40} className="text-blue-500" />
            <span>ALZCARE</span>
          </div>

          <div className="px-6 mb-4">
             <div className="neu-inset p-5 rounded-2xl">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated As</p>
               <p className="text-sm font-black text-slate-800 truncate">{userName || 'Medical Staff'}</p>
               <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mt-2 inline-block ${role === 'ADMIN' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                 {role} Access
               </span>
             </div>
          </div>

          <nav className="flex-1 p-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-widest
                  ${activeTab === item.id 
                    ? 'neu-inset text-blue-600 translate-x-1' 
                    : 'text-slate-500 hover:text-blue-500'}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-6 space-y-4">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-xs uppercase tracking-widest neu-button"
            >
              <LogOut size={20} />
              <span>Terminate</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
