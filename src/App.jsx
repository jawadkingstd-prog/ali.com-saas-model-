import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { 
  LayoutGrid, Users, Settings, Menu, X, 
  CreditCard, Shield, Terminal, LogOut, Bell, UserCircle 
} from 'lucide-react';

import logoCyan from './assets/Logo_Cyan1.png';
import LoginScreen from './components/LoginScreen';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import ProfilePage from './pages/ProfilePage';
import PublicWebsiteView from './components/PublicWebsiteView';
import { ROLE_PERMISSIONS } from './constants/permissions';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get User Role from localStorage (No more bottom-right dropdown!)
  const [userRole, setUserRole] = useState('ADMIN');
  const [userName, setUserName] = useState('Admin User');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    const storedName = localStorage.getItem('userName');
    
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      if (storedRole) setUserRole(storedRole);
      if (storedName) setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    toast.success('Logged out successfully.');
  };

  const handleNavigate = (menuName) => {
    setActiveMenu(menuName);
    setSidebarOpen(false);
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

  const allowedMenu = menuItems.filter(item => ROLE_PERMISSIONS[userRole]?.includes(item.name));
  const allowedGeneral = generalItems.filter(item => ROLE_PERMISSIONS[userRole]?.includes(item.name));

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => {
      setIsAuthenticated(true);
      setUserRole(localStorage.getItem('userRole') || 'ADMIN');
      setUserName(localStorage.getItem('userName') || 'User');
    }} />;
  }

  // If user role is VIEWER, render the dedicated public website portal
  if (userRole === 'VIEWER') {
    return (
      <>
        <Toaster position="top-right" />
        <PublicWebsiteView onLogout={handleLogout} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#090E17] text-white flex antialiased">
      <Toaster position="top-right" />

      {/* Sidebar Component */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#111C2E] border-r border-[#28415F] p-6 flex flex-col z-50 transition-transform lg:static lg:h-screen ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="space-y-8 flex-1">
          
          <div className="flex items-center gap-3">
            <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-2 shadow-lg inline-flex items-center justify-center">
              <img src={logoCyan} alt="Logo" className="h-8 w-8 object-contain" />
            </div>
            <span className="font-extrabold text-lg text-white">Ali.com Pro</span>
          </div>

          <nav className="space-y-6">
            <div className="space-y-1">
              {allowedMenu.map((item) => (
                <button key={item.name} onClick={() => handleNavigate(item.name)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${activeMenu === item.name ? 'bg-[#4EA5FF]/10 text-[#4EA5FF]' : 'text-[#9FB6D4] hover:bg-[#17263C] hover:text-white'}`}>
                  {item.icon} {item.name}
                </button>
              ))}
            </div>
            <div className="space-y-1">
              {allowedGeneral.map((item) => (
                <button key={item.name} onClick={() => handleNavigate(item.name)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${activeMenu === item.name ? 'bg-[#4EA5FF]/10 text-[#4EA5FF]' : 'text-[#9FB6D4] hover:bg-[#17263C] hover:text-white'}`}>
                  {item.icon} {item.name}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="pt-4 border-t border-[#28415F] flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <UserCircle size={24} className="text-[#4EA5FF]" />
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{userName}</p>
              <p className="text-[10px] text-[#4EA5FF] uppercase font-mono">{userRole}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-[#9FB6D4] hover:text-white p-1.5 cursor-pointer" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Wrapper with Unified Header */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#111C2E] border-b border-[#28415F] px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-[#9FB6D4] hover:text-white cursor-pointer">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-sm font-black uppercase tracking-wider text-white">{activeMenu} Portal</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-[#4EA5FF]/10 border border-[#4EA5FF]/20 text-[#4EA5FF] font-bold">
              Role: {userRole}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
           {activeMenu === 'Dashboard' && (
             <DashboardPage 
               activeMenu={activeMenu} 
               onNavigate={handleNavigate} 
               onLogout={handleLogout} 
               userRole={userRole}
             />
           )}
           {activeMenu === 'Analytics' && <DashboardPage activeMenu="Analytics" userRole={userRole} />}
           {activeMenu === 'Ledgers' && <DashboardPage activeMenu="Ledgers" userRole={userRole} />}
           {activeMenu === 'Rider Fleet' && <CustomersPage userRole={userRole} />}
           {activeMenu === 'Profile' && <ProfilePage userRole={userRole} />}
           {activeMenu === 'Settings' && <ProfilePage userRole={userRole} />}
        </main>
      </div>
    </div>
  );
}