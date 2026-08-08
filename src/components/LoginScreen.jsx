import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff, User, Globe } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default function LoginScreen({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', 'VIEWER');
    localStorage.setItem('userName', 'Guest Visitor');
    toast.success('Switched to Live Platform Preview Mode!');
    if (onLoginSuccess) onLoginSuccess();
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      toast.error('Please enter a valid email.');
      return;
    }

    if (authMode !== 'forgot' && !cleanPassword) {
      toast.error('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      if (authMode === 'forgot') {
        await sendPasswordResetEmail(auth, cleanEmail);
        toast.success('Password reset link sent to your email!');
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

        // Firebase Sign Up
        await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);

        let assignedRole = 'CUSTOMER';
        if (cleanEmail.includes('admin')) assignedRole = 'ADMIN';
        else if (cleanEmail.includes('employee')) assignedRole = 'EMPLOYEE';
        else if (cleanEmail.includes('delivery') || cleanEmail.includes('rider')) assignedRole = 'DELIVERY';

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', cleanEmail);
        localStorage.setItem('userName', name);
        localStorage.setItem('userRole', assignedRole);

        toast.success(`Account created! Welcome, ${assignedRole}`);
        if (onLoginSuccess) onLoginSuccess();
        setLoading(false);
        return;
      }

      // Firebase Sign In
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
      const user = userCredential.user;

      let assignedRole = 'CUSTOMER';
      let displayName = user.email.split('@')[0].toUpperCase();

      if (cleanEmail.includes('admin')) {
        assignedRole = 'ADMIN';
        displayName = 'Admin User';
      } else if (cleanEmail.includes('employee')) {
        assignedRole = 'EMPLOYEE';
        displayName = 'Staff Member';
      } else if (cleanEmail.includes('delivery') || cleanEmail.includes('rider')) {
        assignedRole = 'DELIVERY';
        displayName = 'Delivery Rider';
      }

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', displayName);
      localStorage.setItem('userRole', assignedRole);

      toast.success(`Logged in successfully as ${assignedRole}!`);
      if (onLoginSuccess) onLoginSuccess();
      setLoading(false);

    } catch (err) {
      toast.error(err.message.replace('Firebase: ', ''));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090E17] flex items-center justify-center p-4 antialiased selection:bg-[#4EA5FF]/30">
      <div className="w-full max-w-md bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl p-8 space-y-6 relative overflow-hidden">
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4EA5FF]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-xl overflow-hidden flex items-center justify-center mb-1">
            <img src="/Logo_Blue.png" alt="AliLedger Logo" className="h-full w-full object-cover" />
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase">
            Ali<span className="text-[#4EA5FF]">Ledger</span>
          </h2>
          <p className="text-xs text-[#9FB6D4]">
            {authMode === 'login' && 'Sign in to access your logistical console'}
            {authMode === 'signup' && 'Create a new account'}
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
              placeholder="syedjawadahmedj@gmail.com"
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

        {/* Explore Platform as Guest Button */}
        {authMode === 'login' && (
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full bg-[#17263C] hover:bg-[#1e324f] border border-[#4EA5FF]/30 text-[#4EA5FF] font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Globe size={15} />
            <span>Explore Live Platform (Viewer Mode)</span>
          </button>
        )}

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
          <div className="bg-[#090E17]/60 border border-[#28415F] rounded-xl p-3 space-y-1.5 text-center">
            <p className="text-[10px] text-[#9FB6D4] font-semibold">💡 Firebase Auth Note:</p>
            <p className="text-[9px] text-[#4EA5FF] font-mono leading-relaxed">
              Use the admin account created in Firebase Console (`syedjawadahmedj@gmail.com`) to sign in successfully.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}