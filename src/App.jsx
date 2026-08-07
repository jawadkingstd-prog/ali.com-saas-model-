import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { 
  LayoutGrid, Users, Settings, Menu, X, 
  CreditCard, Shield, Terminal, LogOut, Wallet, Truck, Zap, Package, UserCheck, Sun, Moon, Briefcase, FileText 
} from 'lucide-react';

import LoginScreen from './components/LoginScreen';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import EmployeesPage from './pages/EmployeesPage';
import ProfilePage from './pages/Profilepage';
import CustomerWalletsPage from './pages/CustomerWalletsPage';
import RiderFleetPage from './pages/RiderFleetPage';
import OrderManagementPage from './pages/OrderManagementPage';
import CreditSubscriptionsPage from './pages/CreditSubscriptionsPage';
import InvoicesPage from './pages/InvoicesPage';
import PublicWebsiteView from './components/PublicWebsiteView';
import { ROLE_PERMISSIONS } from './constants/permissions';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  
  const [userRole, setUserRole] = useState('ADMIN');
  const [userName, setUserName] = useState('Admin User');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    const storedTheme = localStorage.getItem('aliLedgerTheme');
    
    if (storedTheme) setTheme(storedTheme);

    if (authStatus === 'true') {
      setIsAuthenticated(true);
      if (storedRole) {
        setUserRole(storedRole);
        if (storedRole === 'DELIVERY') setActiveMenu('Rider Fleet');
        else if (storedRole === 'CUSTOMER') setActiveMenu('My Services');
        else if (storedRole === 'EMPLOYEE') setActiveMenu('Staff Dashboard');
        else setActiveMenu('Dashboard');
      }
      if (storedName) setUserName(storedName);
      if (storedEmail) setUserEmail(storedEmail);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('aliLedgerTheme', nextTheme);
    toast.success(`Switched to ${nextTheme === 'dark' ? 'Night Vision' : 'Day Vision'} mode`);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole('VIEWER');
    setActiveMenu('Dashboard');
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
    { name: 'Customers', icon: <Users size={16} /> },
    { name: 'Employees', icon: <UserCheck size={16} /> },
    { name: 'Customer Wallets', icon: <Wallet size={16} /> },
    { name: 'Invoices', icon: <FileText size={16} /> },
    { name: 'Order Management', icon: <Package size={16} /> },
    { name: 'Rider Fleet', icon: <Truck size={16} /> },
    { name: 'Credit Subscriptions', icon: <Zap size={16} /> },
  ];

  const generalItems = [
    { name: 'Profile', icon: <Shield size={16} /> },
    { name: 'Settings', icon: <Settings size={16} /> },
  ];

  const permissionMap = {
    'Dashboard': 'canViewDashboard',
    'Analytics': 'canViewAnalytics',
    'Ledgers': 'canViewLedgers',
    'Customers': 'canViewCustomers',
    'Employees': 'canViewEmployees',
    'Customer Wallets': 'canViewCustomerWallets',
    'Invoices': 'canViewDashboard',
    'Order Management': 'canViewDashboard', 
    'Rider Fleet': 'canViewRiderFleet',
    'Credit Subscriptions': 'canViewSubscriptions',
    'Profile': null, 
    'Settings': 'canManageSettings'
  };

  const allowedMenu = userRole === 'ADMIN' ? menuItems : menuItems.filter(item => {
    const permKey = permissionMap[item.name];
    if (!permKey) return true;
    return ROLE_PERMISSIONS[userRole]?.[permKey] === true;
  });
  
  const allowedGeneral = generalItems.filter(item => {
    const permKey = permissionMap[item.name];
    if (!permKey) return true;
    return ROLE_PERMISSIONS[userRole]?.[permKey] === true;
  });

  const isDark = theme === 'dark';

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        <LoginScreen onLoginSuccess={() => {
          const role = localStorage.getItem('userRole') || 'ADMIN';
          setIsAuthenticated(true);
          setUserRole(role);
          setUserName(localStorage.getItem('userName') || 'User');
          setUserEmail(localStorage.getItem('userEmail') || '');
          if (role === 'DELIVERY') setActiveMenu('Rider Fleet');
          else if (role === 'CUSTOMER') setActiveMenu('My Services');
          else if (role === 'EMPLOYEE') setActiveMenu('Staff Dashboard');
          else setActiveMenu('Dashboard');
        }} />
      </>
    );
  }

  if (userRole === 'VIEWER') {
    return (
      <>
        <Toaster position="top-right" />
        <PublicWebsiteView onLogout={handleLogout} />
      </>
    );
  }

  // --- CUSTOMER PORTAL ---
  if (userRole === 'CUSTOMER') {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#090E17] text-white' : 'bg-slate-100 text-slate-900'} flex flex-col antialiased transition-colors duration-200`}>
        <Toaster position="top-right" />
        <header className={`h-16 ${isDark ? 'bg-[#111C2E] border-[#28415F]' : 'bg-white border-slate-200'} border-b px-8 flex items-center justify-between sticky top-0 z-40`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 ${isDark ? 'bg-[#17263C] border-[#28415F]' : 'bg-slate-100 border-slate-200'} border rounded-xl overflow-hidden flex items-center justify-center`}>
              <img src="/Logo_Blue.png" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span className="font-black tracking-wider text-sm">AliLedger <span className="text-[#4EA5FF]">Client Portal</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className={`p-2 rounded-xl border ${isDark ? 'bg-[#17263C] border-[#28415F] text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'} cursor-pointer transition`} title="Toggle Day/Night Vision">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="text-right">
              <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{userName}</p>
              <p className="text-[10px] text-[#4EA5FF] font-mono">{userEmail || 'customer@ledger.com'}</p>
            </div>
            <button onClick={handleLogout} className={`${isDark ? 'bg-[#17263C] hover:bg-[#203452] border-[#28415F]' : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600'} border px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition`}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-10 max-w-5xl mx-auto w-full space-y-6">
          <div className={`${isDark ? 'bg-[#111C2E] border-[#28415F]' : 'bg-white border-slate-200 shadow-sm'} border rounded-2xl p-6 space-y-4`}>
            <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Welcome, {userName}!</h2>
            <p className={`text-xs ${isDark ? 'text-[#9FB6D4]' : 'text-slate-500'}`}>Your active customer dashboard.</p>
          </div>
        </main>
      </div>
    );
  }

  // --- EMPLOYEE / STAFF PORTAL ---
  if (userRole === 'EMPLOYEE') {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#090E17] text-white' : 'bg-slate-100 text-slate-900'} flex flex-col antialiased transition-colors duration-200`}>
        <Toaster position="top-right" />
        <header className={`h-16 ${isDark ? 'bg-[#111C2E] border-[#28415F]' : 'bg-white border-slate-200'} border-b px-8 flex items-center justify-between sticky top-0 z-40`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 ${isDark ? 'bg-[#17263C] border-[#28415F]' : 'bg-slate-100 border-slate-200'} border rounded-xl overflow-hidden flex items-center justify-center`}>
              <img src="/Logo_Blue.png" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span className="font-black tracking-wider text-sm">AliLedger <span className="text-[#4EA5FF]">Employee Portal</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className={`p-2 rounded-xl border ${isDark ? 'bg-[#17263C] border-[#28415F] text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'} cursor-pointer transition`} title="Toggle Day/Night Vision">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="text-right">
              <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{userName}</p>
              <p className="text-[10px] text-[#4EA5FF] font-mono">{userEmail || 'employee@ledger.com'}</p>
            </div>
            <button onClick={handleLogout} className={`${isDark ? 'bg-[#17263C] hover:bg-[#203452] border-[#28415F]' : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600'} border px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition`}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 max-w-5xl mx-auto w-full space-y-6">
          <div className={`${isDark ? 'bg-[#111C2E] border-[#28415F]' : 'bg-white border-slate-200 shadow-sm'} border rounded-2xl p-6 space-y-6`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b ${isDark ? 'border-[#28415F]' : 'border-slate-200'} pb-4 gap-4`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#4EA5FF]/10 text-[#4EA5FF] border border-[#4EA5FF]/20">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Welcome Back, {userName}!</h2>
                  <p className={`text-xs ${isDark ? 'text-[#9FB6D4]' : 'text-slate-500'}`}>Your personal staff portal and assigned shift overview.</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold uppercase">
                Status: Active Staff
              </span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- RIDER / DELIVERY PORTAL ---
  if (userRole === 'DELIVERY') {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#090E17] text-white' : 'bg-slate-100 text-slate-900'} flex flex-col antialiased transition-colors duration-200`}>
        <Toaster position="top-right" />
        <header className={`h-16 ${isDark ? 'bg-[#111C2E] border-[#28415F]' : 'bg-white border-slate-200'} border-b px-8 flex items-center justify-between sticky top-0 z-40`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 ${isDark ? 'bg-[#17263C] border-[#28415F]' : 'bg-slate-100 border-slate-200'} border rounded-xl overflow-hidden flex items-center justify-center`}>
              <img src="/Logo_Blue.png" alt="Logo" className="h-full w-full object-cover" />
            </div>
            <span className="font-black tracking-wider text-sm">AliLedger <span className="text-[#4EA5FF]">Rider Portal</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className={`p-2 rounded-xl border ${isDark ? 'bg-[#17263C] border-[#28415F] text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'} cursor-pointer transition`} title="Toggle Day/Night Vision">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="text-right">
              <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{userName}</p>
              <p className="text-[10px] text-[#4EA5FF] font-mono">{userEmail || 'rider@ledger.com'}</p>
            </div>
            <button onClick={handleLogout} className={`${isDark ? 'bg-[#17263C] hover:bg-[#203452] border-[#28415F]' : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600'} border px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition`}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-6">
          <RiderFleetPage />
        </main>
      </div>
    );
  }

  // --- ADMIN PORTAL ---
  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#090E17] text-white' : 'bg-slate-100 text-slate-900'} flex antialiased transition-colors duration-200`}>
      <Toaster position="top-right" />

      {/* Sidebar Full Height Sticky Fix */}
      <aside className={`fixed inset-y-0 left-0 w-64 ${isDark ? 'bg-[#111C2E] border-[#28415F]' : 'bg-white border-slate-200'} border-r p-6 flex flex-col z-50 transition-transform lg:sticky lg:top-0 lg:h-screen ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="space-y-8 flex-1 overflow-y-auto pr-1">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 ${isDark ? 'bg-[#17263C] border-[#28415F]' : 'bg-slate-100 border-slate-200'} border rounded-xl overflow-hidden flex items-center justify-center shadow-sm`}>
              <img src="/Logo_Blue.png" alt="Blue Logo" className="h-full w-full object-cover drop-shadow" />
            </div>
            <span className={`font-black tracking-tight text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ali.com <span className="text-[#4EA5FF]">Pro</span>
            </span>
          </div>

          <nav className="space-y-6">
            <div className="space-y-1">
              {allowedMenu.map((item) => (
                <button key={item.name} onClick={() => handleNavigate(item.name)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${activeMenu === item.name ? 'bg-[#4EA5FF]/10 text-[#4EA5FF]' : isDark ? 'text-[#9FB6D4] hover:bg-[#17263C] hover:text-white' : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'}`}>
                  {item.icon} {item.name}
                </button>
              ))}
            </div>
            <div className="space-y-1">
              {allowedGeneral.map((item) => (
                <button key={item.name} onClick={() => handleNavigate(item.name)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${activeMenu === item.name ? 'bg-[#4EA5FF]/10 text-[#4EA5FF]' : isDark ? 'text-[#9FB6D4] hover:bg-[#17263C] hover:text-white' : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'}`}>
                  {item.icon} {item.name}
                </button>
              ))}
            </div>
          </nav>
        </div>

        <div className={`pt-4 border-t ${isDark ? 'border-[#28415F]' : 'border-slate-200'} flex items-center justify-between`}>
          <div className="flex items-center gap-2 overflow-hidden">
            <Users size={20} className="text-[#4EA5FF]" />
            <div className="truncate">
              <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'} truncate`}>{userName}</p>
              <p className="text-[10px] text-[#4EA5FF] uppercase font-mono">{userRole}</p>
            </div>
          </div>
          <button onClick={handleLogout} className={`${isDark ? 'text-[#9FB6D4] hover:text-white' : 'text-slate-500 hover:text-slate-900'} p-1.5 cursor-pointer`} title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className={`h-16 ${isDark ? 'bg-[#111C2E] border-[#28415F]' : 'bg-white border-slate-200'} border-b px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`lg:hidden ${isDark ? 'text-[#9FB6D4] hover:text-white' : 'text-slate-600 hover:text-slate-900'} cursor-pointer`}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className={`text-sm font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeMenu} Portal</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className={`p-2 rounded-xl border ${isDark ? 'bg-[#17263C] border-[#28415F] text-amber-400 hover:bg-[#203452]' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'} cursor-pointer transition`} title="Toggle Day/Night Vision">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
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
           {activeMenu === 'Customers' && <CustomersPage />}
           {activeMenu === 'Employees' && <EmployeesPage />}
           {activeMenu === 'Customer Wallets' && <CustomerWalletsPage />}
           {activeMenu === 'Invoices' && <InvoicesPage />}
           {activeMenu === 'Order Management' && <OrderManagementPage />}
           {activeMenu === 'Rider Fleet' && <RiderFleetPage />}
           {activeMenu === 'Credit Subscriptions' && <CreditSubscriptionsPage />}
           {activeMenu === 'Profile' && <ProfilePage userRole={userRole} />}
           {activeMenu === 'Settings' && <ProfilePage userRole={userRole} />}
        </main>
      </div>
    </div>
  );
}