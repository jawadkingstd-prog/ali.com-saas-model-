import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  LayoutGrid, Users, Settings, LogOut, Bell, ChevronDown, 
  Menu, X, Shield, Terminal, AppWindow, CreditCard 
} from 'lucide-react';

// Import our functional views
import LoginScreen from './components/LoginScreen';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'customers', 'profile'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Dropdown States for Header as requested
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setShowProfileDropdown(false);
  };

  // Beautiful Mock Notifications Data for Card Style Requirement
  const notifications = [
    { id: 1, type: 'critical', title: 'Payment Overdue Alert', desc: 'Faiza Malik ledger contains un-reconciled amount', time: '10m ago' },
    { id: 2, type: 'success', title: 'Rider Fleet Dispatched', desc: 'Rider Sajid is currently out on scheduled delivery run', time: '1h ago' },
    { id: 3, type: 'info', title: 'Database Re-indexing Complete', desc: 'System optimized at Lahore Central Cloud', time: '4h ago' }
  ];

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#090E17] text-white flex antialiased selection:bg-[#4EA5FF]/30 select-none">
      <Toaster position="top-right" />

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-[#090E17]/80 backdrop-blur-sm z-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* --- SIDEBAR PANEL --- */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#111C2E] border-r border-[#28415F] flex flex-col z-50 transition-transform duration-300 transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:h-screen`}>
        
        {/* App Logo & Identity section */}
        <div className="p-6 border-b border-[#28415F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#4EA5FF]/10 border border-[#28415F] flex items-center justify-center text-[#4EA5FF]">
              <AppWindow size={20} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-wider uppercase">AliLedger</h2>
              <p className="text-[10px] text-[#9FB6D4]/60 tracking-widest font-mono">CONSOLE v2.4</p>
            </div>
          </div>
          <button className="lg:hidden text-[#9FB6D4] hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-[#4EA5FF]/15 border border-[#4EA5FF]/30 text-[#4EA5FF]' 
                : 'text-[#9FB6D4] hover:bg-[#17263C] hover:text-white border border-transparent'
            }`}
          >
            <LayoutGrid size={16} />
            Executive Dashboard
          </button>

          <button
            onClick={() => { setActiveTab('customers'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === 'customers' 
                ? 'bg-[#4EA5FF]/15 border border-[#4EA5FF]/30 text-[#4EA5FF]' 
                : 'text-[#9FB6D4] hover:bg-[#17263C] hover:text-white border border-transparent'
            }`}
          >
            <Users size={16} />
            Directory Hub
          </button>

          <button
            onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === 'profile' 
                ? 'bg-[#4EA5FF]/15 border border-[#4EA5FF]/30 text-[#4EA5FF]' 
                : 'text-[#9FB6D4] hover:bg-[#17263C] hover:text-white border border-transparent'
            }`}
          >
            <Settings size={16} />
            System Profile
          </button>
        </nav>

        {/* Sidebar bottom section */}
        <div className="p-4 border-t border-[#28415F]/60">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FF5C5C] hover:bg-[#FF5C5C]/10 rounded-xl transition-all"
          >
            <LogOut size={16} />
            Exit Terminal
          </button>
        </div>
      </aside>

      {/* --- MAIN INTERFACE STACK --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* --- HEADER CONTROL DESK --- */}
        <header className="h-16 border-b border-[#28415F] bg-[#111C2E]/80 backdrop-blur-md px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-[#9FB6D4] hover:text-white cursor-pointer" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#36D399] animate-pulse"></span>
              <p className="text-[10px] text-[#36D399] uppercase font-bold tracking-widest font-mono">Primary Core Node: Secure Connection</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            
            {/* 🔔 1. Upgraded Card-Style Notification Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotificationDropdown(!showNotificationDropdown);
                  setShowProfileDropdown(false);
                }}
                className={`relative p-2 rounded-xl bg-[#090E17] border border-[#28415F] hover:border-[#4EA5FF] text-[#9FB6D4] hover:text-white cursor-pointer transition-all ${
                  showNotificationDropdown ? 'border-[#4EA5FF] text-white' : ''
                }`}
              >
                <Bell size={16} />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[#FF5C5C]"></span>
              </button>

              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2.5 w-80 bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="p-4 border-b border-[#28415F] flex items-center justify-between">
                    <span className="text-xs font-black text-white uppercase tracking-wider">Live System Logs</span>
                    <span className="text-[10px] text-[#4EA5FF] font-semibold cursor-pointer">Mark All</span>
                  </div>
                  
                  {/* Cards container matching standard Dribbble design pattern */}
                  <div className="p-2 space-y-1.5 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 bg-[#090E17]/60 border border-[#28415F]/40 hover:border-[#4EA5FF]/40 rounded-xl space-y-1 hover:bg-[#17263C]/30 transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] uppercase font-extrabold tracking-wider ${
                            n.type === 'critical' ? 'text-[#FF5C5C]' : n.type === 'success' ? 'text-[#36D399]' : 'text-[#33D1FF]'
                          }`}>
                            {n.type}
                          </span>
                          <span className="text-[9px] text-[#9FB6D4]/60 font-mono">{n.time}</span>
                        </div>
                        <h5 className="text-[11px] font-bold text-white">{n.title}</h5>
                        <p className="text-[10px] text-[#9FB6D4] leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 👤 2. User Settings Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotificationDropdown(false);
                }}
                className={`flex items-center gap-2 p-1.5 pr-3 bg-[#090E17] border border-[#28415F] rounded-xl hover:border-[#4EA5FF] transition-all cursor-pointer ${
                  showProfileDropdown ? 'border-[#4EA5FF]' : ''
                }`}
              >
                <div className="h-7 w-7 rounded-lg bg-[#4EA5FF]/10 flex items-center justify-center font-black text-xs text-[#4EA5FF]">
                  SA
                </div>
                <ChevronDown size={14} className="text-[#9FB6D4]" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2.5 w-52 bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#28415F]/60 mb-1">
                    <p className="text-xs font-bold text-white">Syed Ali</p>
                    <p className="text-[9px] text-[#33D1FF] font-mono tracking-widest uppercase">Developer Admin</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('profile'); setShowProfileDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-[#9FB6D4] hover:text-white hover:bg-[#17263C] transition-colors"
                  >
                    Console Account
                  </button>
                  <button 
                    onClick={() => { setActiveTab('dashboard'); setShowProfileDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-[#9FB6D4] hover:text-white hover:bg-[#17263C] transition-colors"
                  >
                    Main Dashboard
                  </button>
                  <div className="border-t border-[#28415F]/60 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs text-[#FF5C5C] hover:bg-[#FF5C5C]/10 transition-colors"
                  >
                    Disconnect Session
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* --- VIEW ROUTER HUB --- */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && <DashboardPage />}
          {activeTab === 'customers' && <CustomersPage />}
          {activeTab === 'profile' && <ProfilePage />}
        </div>
      </main>
    </div>
  );
}