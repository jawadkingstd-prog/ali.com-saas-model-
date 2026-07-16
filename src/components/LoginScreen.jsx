import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowRight, Loader2, KeyRound, Radio } from 'lucide-react';

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      toast.error('Please enter credentials.', {
        style: { background: '#111C2E', color: '#FFFFFF', borderLeft: '4px solid #FF5C5C' }
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (cleanEmail === 'admin@ledger.com' && cleanPassword === 'admin123') {
        localStorage.setItem('isAuthenticated', 'true');
        toast.success('Welcome back! Admin Authenticated.', {
          style: { background: '#111C2E', color: '#FFFFFF', borderLeft: '4px solid #36D399' }
        });
        onLoginSuccess();
      } else {
        toast.error('Invalid credentials.', {
          style: { background: '#111C2E', color: '#FFFFFF', borderLeft: '4px solid #FF5C5C' }
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#090E17] flex items-center justify-center p-4 antialiased selection:bg-[#4EA5FF]/30">
      <div className="w-full max-w-md bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl p-8 space-y-6 relative overflow-hidden">
        
        {/* Abstract design element to match dribbble standards */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4EA5FF]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header & Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-[#4EA5FF]/10 border border-[#28415F] items-center justify-center mb-1 shadow-lg shadow-[#4EA5FF]/5">
            {/* Customizable High-Tech SVG Logo */}
            <svg className="w-8 h-8 text-[#4EA5FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V7a3 3 0 013-3h3a3 3 0 013 3v4c0 1.954.57 3.774 1.554 5.304M16.5 16.5L21 21M12 11h.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase">
            Ali<span className="text-[#4EA5FF]">Ledger</span>
          </h2>
          <p className="text-xs text-[#9FB6D4]">FinTech management console & logistical ledger</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9FB6D4] mb-1.5">
              <Mail size={12} className="text-[#4EA5FF]" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ledger.com"
              className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#9FB6D4]/30 focus:outline-none focus:border-[#4EA5FF] transition-all shadow-inner"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9FB6D4] mb-1.5">
              <Lock size={12} className="text-[#4EA5FF]" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#9FB6D4]/30 focus:outline-none focus:border-[#4EA5FF] transition-all shadow-inner"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-bold text-xs uppercase tracking-widest py-4 px-4 rounded-xl transition-all shadow-lg shadow-[#4EA5FF]/10 active:scale-[0.98] flex items-center justify-center gap-2 mt-6 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#090E17]" />
            ) : (
              <>
                <span>Console Access</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="bg-[#090E17]/60 border border-[#28415F] rounded-xl p-3 flex items-center justify-center gap-2">
          <KeyRound size={14} className="text-[#33D1FF]" />
          <p className="text-[10px] text-[#9FB6D4]">
            Demo: <span className="text-white font-mono font-semibold">admin@ledger.com</span> | <span className="text-white font-mono font-semibold">admin123</span>
          </p>
        </div>

      </div>
    </div>
  );
}