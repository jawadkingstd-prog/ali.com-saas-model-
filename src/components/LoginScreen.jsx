import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowRight, Loader2, KeyRound, Eye, EyeOff, User, ShieldCheck } from 'lucide-react';
import logoCyan from '../assets/Logo_Cyan1.png';

export default function LoginScreen({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper to determine role based on email domain or mock credentials
  const determineRole = (emailInput) => {
    const lower = emailInput.toLowerCase();
    if (lower.includes('admin')) return 'ADMIN';
    if (lower.includes('delivery') || lower.includes('rider')) return 'DELIVERY';
    if (lower.includes('customer')) return 'CUSTOMER';
    return 'VIEWER';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      toast.error('Please enter a valid email.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (authMode === 'forgot') {
        toast.success('Password reset link sent to your email!', {
          style: { background: '#111C2E', color: '#FFFFFF', borderLeft: '4px solid #36D399' }
        });
        setAuthMode('login');
        setLoading(false);
        return;
      }

      if (authMode === 'signup') {
        if (!name.trim()) {
          toast.error('Please enter your full name.');
          setLoading(false);
          return;
        }
        const assignedRole = determineRole(cleanEmail);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', cleanEmail);
        localStorage.setItem('userName', name);
        localStorage.setItem('userRole', assignedRole);

        toast.success(`Account created! Welcome, ${assignedRole}`, {
          style: { background: '#111C2E', color: '#FFFFFF', borderLeft: '4px solid #36D399' }
        });
        onLoginSuccess();
        setLoading(false);
        return;
      }

      // Login Flow
      if (!cleanPassword) {
        toast.error('Please enter your password.');
        setLoading(false);
        return;
      }

      // Default Demo Credentials check or flexible mock login
      const assignedRole = determineRole(cleanEmail);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', cleanEmail);
      localStorage.setItem('userName', cleanEmail.split('@')[0].toUpperCase());
      localStorage.setItem('userRole', assignedRole);

      toast.success(`Logged in successfully as ${assignedRole}!`, {
        style: { background: '#111C2E', color: '#FFFFFF', borderLeft: '4px solid #36D399' }
      });
      onLoginSuccess();
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#090E17] flex items-center justify-center p-4 antialiased selection:bg-[#4EA5FF]/30">
      <div className="w-full max-w-md bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl p-8 space-y-6 relative overflow-hidden">
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4EA5FF]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-2.5 shadow-xl inline-flex items-center justify-center mb-1">
            <img src={logoCyan} alt="AliLedger Logo" className="h-10 w-10 object-contain" />
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase">
            Ali<span className="text-[#4EA5FF]">Ledger</span>
          </h2>
          <p className="text-xs text-[#9FB6D4]">
            {authMode === 'login' && 'Sign in to access your logistical console'}
            {authMode === 'signup' && 'Create a new account (Admin, Delivery, Customer, Viewer)'}
            {authMode === 'forgot' && 'Recover your console account password'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {authMode === 'signup' && (
            <div>
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9FB6D4] mb-1.5">
                <User size={12} className="text-[#4EA5FF]" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#9FB6D4]/30 focus:outline-none focus:border-[#4EA5FF] transition-all"
                required
              />
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9FB6D4] mb-1.5">
              <Mail size={12} className="text-[#4EA5FF]" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ledger.com / delivery@ledger.com"
              className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-3 text-sm text-white placeholder-[#9FB6D4]/30 focus:outline-none focus:border-[#4EA5FF] transition-all"
              required
            />
          </div>

          {authMode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#9FB6D4]">
                  <Lock size={12} className="text-[#4EA5FF]" /> Password
                </label>
                {authMode === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => setAuthMode('forgot')} 
                    className="text-[10px] text-[#4EA5FF] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#090E17] border border-[#28415F] rounded-xl pl-4 pr-10 py-3 text-sm text-white placeholder-[#9FB6D4]/30 focus:outline-none focus:border-[#4EA5FF] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#9FB6D4] hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-bold text-xs uppercase tracking-widest py-4 px-4 rounded-xl transition-all shadow-lg shadow-[#4EA5FF]/10 flex items-center justify-center gap-2 mt-6 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#090E17]" />
            ) : (
              <>
                <span>{authMode === 'login' ? 'Console Access' : authMode === 'signup' ? 'Register Account' : 'Send Reset Link'}</span>
                <ArrowRight size={14} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        {/* Switcher Links */}
        <div className="text-center pt-2 border-t border-[#28415F]/50">
          {authMode === 'login' ? (
            <p className="text-xs text-[#9FB6D4]">
              Don't have an account?{' '}
              <button onClick={() => setAuthMode('signup')} className="text-[#4EA5FF] font-bold hover:underline cursor-pointer">
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-xs text-[#9FB6D4]">
              Already have an account?{' '}
              <button onClick={() => setAuthMode('login')} className="text-[#4EA5FF] font-bold hover:underline cursor-pointer">
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* Demo hints */}
        {authMode === 'login' && (
          <div className="bg-[#090E17]/60 border border-[#28415F] rounded-xl p-3 space-y-1 text-center">
            <p className="text-[10px] text-[#9FB6D4] font-semibold">💡 Quick Role Test Logins:</p>
            <p className="text-[9px] text-[#4EA5FF] font-mono">admin@ledger.com | delivery@ledger.com | customer@ledger.com | viewer@ledger.com</p>
          </div>
        )}

      </div>
    </div>
  );
}