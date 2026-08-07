import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowRight, Loader2, Eye, EyeOff, User, Globe } from 'lucide-react';
import logoCyan from '../assets/Logo_Cyan1.png';

export default function LoginScreen({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Delivery persons database (4 Riders)
  const deliveryTeamDatabase = [
    { email: 'delivery1@ledger.com', password: 'rider111', name: 'Ali (Rider 1)' },
    { email: 'delivery2@ledger.com', password: 'rider222', name: 'Usman (Rider 2)' },
    { email: 'delivery3@ledger.com', password: 'rider333', name: 'Bilal (Rider 3)' },
    { email: 'delivery4@ledger.com', password: 'rider444', name: 'Hamza (Rider 4)' },
  ];

  // Employee team database (4 Employees)
  const employeeTeamDatabase = [
    { email: 'employee1@ledger.com', password: 'emp111', name: 'Ahmed (Staff 1)' },
    { email: 'employee2@ledger.com', password: 'emp222', name: 'Bilal (Staff 2)' },
    { email: 'employee3@ledger.com', password: 'emp333', name: 'Zain (Staff 3)' },
    { email: 'employee4@ledger.com', password: 'emp444', name: 'Fahad (Staff 4)' },
  ];

  // Customer team database (4 Customers)
  const customerTeamDatabase = [
    { email: 'customer1@ledger.com', password: 'cust111', name: 'Ali Traders (Customer 1)' },
    { email: 'customer2@ledger.com', password: 'cust222', name: 'Zain Enterprises (Customer 2)' },
    { email: 'customer3@ledger.com', password: 'cust333', name: 'Hassan Stores (Customer 3)' },
    { email: 'customer4@ledger.com', password: 'cust444', name: 'Usman Mart (Customer 4)' },
  ];

  const handleGuestLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', 'VIEWER');
    localStorage.setItem('userName', 'Guest Visitor');
    toast.success('Switched to Live Platform Preview Mode!');
    if (onLoginSuccess) onLoginSuccess();
    window.location.reload();
  };

  const handleSubmit = (e) => {
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
    setTimeout(() => {
      if (authMode === 'forgot') {
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

        let assignedRole = 'CUSTOMER';
        if (cleanEmail.includes('admin')) assignedRole = 'ADMIN';
        else if (cleanEmail.includes('employee')) assignedRole = 'EMPLOYEE';
        else if (cleanEmail.includes('delivery') || cleanEmail.includes('rider')) assignedRole = 'DELIVERY';

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', cleanEmail);
        localStorage.setItem('userName', name);
        localStorage.setItem('userRole', assignedRole);

        toast.success(`Account created! Welcome, ${assignedRole}`);
        onLoginSuccess();
        setLoading(false);
        return;
      }

      // 1. Check Delivery Team Login
      const foundRider = deliveryTeamDatabase.find(
        (r) => r.email === cleanEmail && r.password.toLowerCase() === cleanPassword.toLowerCase()
      );

      if (foundRider) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', foundRider.email);
        localStorage.setItem('userName', foundRider.name);
        localStorage.setItem('userRole', 'DELIVERY');
        
        toast.success(`Welcome back, ${foundRider.name}!`);
        onLoginSuccess();
        setLoading(false);
        return;
      }

      // 2. Check Employee Team Login
      const foundEmployee = employeeTeamDatabase.find(
        (emp) => emp.email === cleanEmail && emp.password.toLowerCase() === cleanPassword.toLowerCase()
      );

      if (foundEmployee) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', foundEmployee.email);
        localStorage.setItem('userName', foundEmployee.name);
        localStorage.setItem('userRole', 'EMPLOYEE');
        
        toast.success(`Welcome back, ${foundEmployee.name}!`);
        onLoginSuccess();
        setLoading(false);
        return;
      }

      // 3. Check Customer Team Login
      const foundCustomer = customerTeamDatabase.find(
        (cust) => cust.email === cleanEmail && cust.password.toLowerCase() === cleanPassword.toLowerCase()
      );

      if (foundCustomer) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', foundCustomer.email);
        localStorage.setItem('userName', foundCustomer.name);
        localStorage.setItem('userRole', 'CUSTOMER');
        
        toast.success(`Welcome back, ${foundCustomer.name}!`);
        onLoginSuccess();
        setLoading(false);
        return;
      }

      if (cleanEmail.startsWith('delivery')) {
        toast.error('Invalid password for this delivery rider.');
        setLoading(false);
        return;
      }

      if (cleanEmail.startsWith('employee')) {
        toast.error('Invalid password for this employee account.');
        setLoading(false);
        return;
      }

      if (cleanEmail.startsWith('customer')) {
        toast.error('Invalid password for this customer account.');
        setLoading(false);
        return;
      }

      // 4. Admin Fallback & Generic Customer Logic
      let assignedRole = 'CUSTOMER';
      let displayName = cleanEmail.split('@')[0].toUpperCase();

      if (cleanEmail.includes('admin')) {
        assignedRole = 'ADMIN';
        displayName = 'Admin User';
      }

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', cleanEmail);
      localStorage.setItem('userName', displayName);
      localStorage.setItem('userRole', assignedRole);

      toast.success(`Logged in successfully as ${assignedRole}!`);
      onLoginSuccess();
      setLoading(false);
    }, 500);
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
              placeholder="admin@ledger.com / customer1@ledger.com"
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

        {/* Demo hints including all 4 Customers, Employees, and Riders */}
        {authMode === 'login' && (
          <div className="bg-[#090E17]/60 border border-[#28415F] rounded-xl p-3 space-y-1.5 text-center">
            <p className="text-[10px] text-[#9FB6D4] font-semibold">💡 Quick Logins:</p>
            <p className="text-[9px] text-[#4EA5FF] font-mono leading-relaxed">
              Admin: admin@ledger.com<br/>
              Customers: customer1@ledger.com (cust111) to customer4@ledger.com (cust444)<br/>
              Employees: employee1@ledger.com (emp111) to employee4@ledger.com (emp444)<br/>
              Riders: delivery1@ledger.com (rider111) to delivery4@ledger.com (rider444)
            </p>
          </div>
        )}

      </div>
    </div>
  );
}