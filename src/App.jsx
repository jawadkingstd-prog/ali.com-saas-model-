import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  LayoutGrid, Users, Settings, Bell, ChevronDown, 
  Menu, X, CreditCard, Shield, Terminal 
} from 'lucide-react';
import logoCyan from './assets/Logo_Cyan1.png';

import LoginScreen from './components/LoginScreen';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import ProfilePage from './pages/ProfilePage';

// Views that are rendered by the shared DashboardPage component.
// Rider Fleet and Profile have their own dedicated page components below.
const DASHBOARD_VIEWS = ['Dashboard', 'Analytics', 'Ledgers', 'Settings'];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  // Central navigation handler — every nav trigger (sidebar, header dropdown,
  // in-page buttons) goes through this so activeMenu is always in sync.
  const handleNavigate = (menuName) => {
    setActiveMenu(menuName);
    setSidebarOpen(false); // auto-close mobile sidebar on navigation
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutGrid size={16} /> },
    { name: 'Analytics', icon: <CreditCard size={16} /> },
    { name: 'Ledgers', icon: <Terminal size={16} /> },
    { name: 'Rider Fleet', icon: <Users size={16} /> },
  ];

  const generalItems = [
    { name: 'Profile', icon: <Shield size={16} /> },
    { name: 'Settings', icon: <Settings size={16} /> },
  ];

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#090E17] text-white flex antialiased">
      <Toaster position="top-right" />

      {/* Mobile menu toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] h-10 w-10 flex items-center justify-center bg-[#111C2E] border border-[#28415F] rounded-xl text-white"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay behind the sidebar on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- SIRF EK SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#111C2E] border-r border-[#28415F] p-6 flex flex-col z-50 transition-transform lg:static lg:h-screen ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="space-y-8 flex-1">
          <div className="flex items-center gap-3">
            <img
              src={logoCyan}
              alt="Ali.com Pro Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-extrabold text-lg text-white">Ali.com Pro</span>
          </div>

          <nav className="space-y-6">
             <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeMenu === item.name ? 'bg-[#4EA5FF]/10 text-[#4EA5FF]' : 'text-[#9FB6D4] hover:bg-[#17263C] hover:text-white'}`}
                  >
                    {item.icon} {item.name}
                  </button>
                ))}
             </div>
             <div className="space-y-1">
                {generalItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeMenu === item.name ? 'bg-[#4EA5FF]/10 text-[#4EA5FF]' : 'text-[#9FB6D4] hover:bg-[#17263C] hover:text-white'}`}
                  >
                    {item.icon} {item.name}
                  </button>
                ))}
             </div>
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
         {DASHBOARD_VIEWS.includes(activeMenu) && (
           <DashboardPage
             activeMenu={activeMenu}
             onNavigate={handleNavigate}
             onLogout={handleLogout}
           />
         )}
         {activeMenu === 'Rider Fleet' && <CustomersPage />}
         {activeMenu === 'Profile' && <ProfilePage />}
      </main>
    </div>
  );
}