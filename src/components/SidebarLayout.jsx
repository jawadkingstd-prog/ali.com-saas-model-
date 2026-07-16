import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function SidebarLayout({ activeTab, onTabChange, children }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success('Logged out securely.', { style: { borderLeft: '4px solid #10b981' } });
    setTimeout(() => window.location.reload(), 1000);
  };

  const notifications = [
    { id: 1, text: "New payment received from Amir Khan", time: "5m ago" },
    { id: 2, text: "Invoice generated for Bilal Ahmed", time: "2h ago" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex antialiased memory-layout">
      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-30">
        
        {/* Sidebar Brand Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-850 space-x-3">
          <div className="h-8 w-8 rounded-lg bg-slate-950 border border-slate-800 p-1 flex items-center justify-center overflow-hidden">
            {!logoFailed ? (
              <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" onError={() => setLogoFailed(true)} />
            ) : (
              <div className="h-full w-full rounded bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
                <span className="text-slate-950 font-black text-xs">L</span>
              </div>
            )}
          </div>
          <span className="text-sm font-bold tracking-wider text-slate-50 uppercase">
            Ledger<span className="text-emerald-400 font-medium">Base</span>
          </span>
        </div>

        {/* Navigation Routes System */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 select-none">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Main Menu</div>
          
          {/* Clients Tab */}
          <button
            onClick={() => onTabChange('customers')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'customers'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
            }`}
          >
            <span>👥</span>
            <span>Client Database</span>
          </button>

          {/* Ledgers Tab */}
          <button
            onClick={() => onTabChange('ledgers')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'ledgers'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
            }`}
          >
            <span>📖</span>
            <span>Ledger Books</span>
          </button>

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 pt-6 mb-2">Management</div>

          {/* Account Settings Tab */}
          <button
            onClick={() => onTabChange('settings')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
            }`}
          >
            <span>⚙️</span>
            <span>Account Settings</span>
          </button>
        </nav>

        {/* Exit/Logout Footer */}
        <div className="p-4 border-t border-slate-850">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 text-xs font-medium text-rose-400 bg-rose-950/10 hover:bg-rose-950/30 border border-rose-900/30 rounded-xl transition-all"
          >
            <span>🚪</span>
            <span>Exit System</span>
          </button>
        </div>
      </aside>

      {/* ================= RIGHT MAIN WRAPPER ================= */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        
        {/* Top App Header Dashboard Controls */}
        <header className="h-16 border-b border-slate-850 bg-slate-900/40 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              System Console / <span className="text-slate-200 capitalize">{activeTab}</span>
            </h2>
          </div>

          {/* Account Elements (Notifications & Avatar) */}
          <div className="flex items-center space-x-4 relative">
            
            {/* Notifications Toggle Panel */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-400 hover:text-slate-100 bg-slate-900 border border-slate-800 rounded-xl relative transition-all"
            >
              <span>🔔</span>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            </button>

            {/* Notification Dropdown UI View */}
            {showNotifications && (
              <div className="absolute right-12 top-12 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2 mb-2">Live Logs</h4>
                <div className="space-y-2">
                  {notifications.map(n => (
                    <div key={n.id} className="text-xs p-2 bg-slate-950 border border-slate-850 rounded-lg">
                      <p className="text-slate-300">{n.text}</p>
                      <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Avatar Profile Settings Trigger */}
            <div 
              onClick={() => onTabChange('settings')} 
              className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-all shadow-inner"
            >
              <span className="text-xs font-bold text-emerald-400">AD</span>
            </div>

          </div>
        </header>

        {/* Dynamic Main App Content Body Injector */}
        <main className="p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}