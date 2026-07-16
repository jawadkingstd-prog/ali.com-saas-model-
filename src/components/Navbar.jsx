import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // 1. AuthContext import kiya

export default function Navbar({ activeTab, onTabChange }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const { logout } = useAuth(); // 2. Context se logout function nikala
  
  const handleLogout = async () => {
    try {
      // 3. Agar auth context mein real logout function hai to use call karein
      if (typeof logout === 'function') {
        await logout();
      }
      
      // 4. Foolproof step: Saare token aur active sessions clear karna
      localStorage.clear();
      sessionStorage.clear();

      // 5. Success Premium Toast
      toast.success('Logged out securely.', {
        style: { borderLeft: '4px solid #10b981' }
      });

      // 6. 1 second ke delay ke baad page reload taaki user wapas LoginScreen par chala jaye
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      toast.error('Logout failed. Please try again.', {
        style: { borderLeft: '4px solid #f43f5e' }
      });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand Section */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-slate-950 border border-slate-800 p-1 flex items-center justify-center shadow-lg overflow-hidden">
              {!logoFailed ? (
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="h-full w-full object-contain"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="h-full w-full rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
                  <span className="text-slate-950 font-black text-xs">L</span>
                </div>
              )}
            </div>
            <span className="text-base font-bold text-slate-50 tracking-tight">
              Ledger<span className="text-emerald-400 font-medium">Base</span>
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-850">
            <button
              onClick={() => onTabChange('customers')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'customers'
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              Clients
            </button>
            <button
              onClick={() => onTabChange('ledgers')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'ledgers'
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              Ledger Books
            </button>
          </div>

          {/* Logout Trigger Button */}
          <div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition-all"
            >
              Exit System
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}