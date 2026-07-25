import React, { useState, useMemo } from 'react';
import {
  TrendingUp, ArrowUpRight, DollarSign, Users, Award, LayoutGrid,
  Calendar, Filter, Bell, ChevronDown, User, Settings, LogOut,
  Compass, Search, Mail, Lock, MapPin, Truck, Activity, Shield,
  Clock, CheckCircle2, Camera, ShieldAlert, Sliders, Briefcase,
  RefreshCw, Download, SlidersHorizontal, Layers, Globe, Zap
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM & THEME TOKENS
// ═══════════════════════════════════════════════════════════════════════════
const THEME = {
  // Primary Colors with Premium Gradients
  colors: {
    bg: {
      primary: '#0a0e1a',      // Deep navy (backgrounds)
      secondary: '#0f1423',    // Slightly lighter
      tertiary: '#151d2f',     // Card backgrounds
      surface: '#1a232f',      // Elevated surfaces
    },
    accent: {
      primary: '#4ea5ff',      // Sky Blue (primary action)
      secondary: '#36d399',    // Emerald (success/positive)
      warning: '#ffb020',      // Amber (pending)
      danger: '#ff5c5c',       // Crimson (errors)
      purple: '#8b5cf6',       // Purple (premium/special)
    },
    text: {
      primary: '#ffffff',      // White text
      secondary: '#b0c4de',    // Steel blue text
      tertiary: '#7a8fa6',     // Muted text
      placeholder: '#546b82',  // Placeholder
    },
    border: {
      light: '#2a3a4f',        // Subtle borders
      medium: '#3a4a5f',       // Standard borders
      accent: '#4ea5ff',       // Accent borders
    }
  },

  // Gradients for Premium Feel
  gradients: {
    blueGlow: 'linear-gradient(135deg, #4ea5ff 0%, #2979d0 100%)',
    emeraldGlow: 'linear-gradient(135deg, #36d399 0%, #1a9d6f 100%)',
    purpleGlow: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    darkCard: 'linear-gradient(180deg, #151d2f 0%, #0f1423 100%)',
    darkOverlay: 'linear-gradient(180deg, rgba(15, 20, 35, 0.8), rgba(10, 14, 26, 0.95))',
  },

  // Shadows for Depth
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
    md: '0 8px 24px rgba(0, 0, 0, 0.4)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(78, 165, 255, 0.15)',
    glowEmerald: '0 0 20px rgba(54, 211, 153, 0.15)',
  },

  // Typography System
  typography: {
    display: 'font-size: 2.5rem; font-weight: 900; letter-spacing: -0.02em; line-height: 1.1;',
    h1: 'font-size: 2rem; font-weight: 800; letter-spacing: -0.01em; line-height: 1.2;',
    h2: 'font-size: 1.5rem; font-weight: 700; letter-spacing: 0; line-height: 1.3;',
    h3: 'font-size: 1.125rem; font-weight: 600; letter-spacing: 0; line-height: 1.4;',
    body: 'font-size: 0.9375rem; font-weight: 400; line-height: 1.6;',
    caption: 'font-size: 0.75rem; font-weight: 500; letter-spacing: 0.02em; text-transform: uppercase;',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ROLE PERMISSIONS MAP
// ═══════════════════════════════════════════════════════════════════════════
const ROLE_PERMISSIONS = {
  ADMIN: ['Dashboard', 'Analytics', 'Ledgers', 'Rider Fleet', 'Profile', 'Settings'],
  VIEWER: ['Dashboard', 'Analytics', 'Ledgers', 'Profile', 'Settings'],
  RIDER: ['Dashboard', 'Rider Fleet', 'Profile', 'Settings'],
};

// ═══════════════════════════════════════════════════════════════════════════
// REUSABLE COMPONENT: PREMIUM CARD
// ═══════════════════════════════════════════════════════════════════════════
function PremiumCard({ children, className = '', variant = 'default', glow = false }) {
  const baseStyles = `
    rounded-3xl p-6 transition-all duration-500 ease-out
    border backdrop-blur-xl
  `;

  const variants = {
    default: `
      bg-gradient-to-br from-[#151d2f]/80 to-[#0f1423]/80
      border-[#2a3a4f] hover:border-[#4ea5ff]/40 hover:shadow-lg
      hover:shadow-[#4ea5ff]/10 hover:-translate-y-0.5
    `,
    glass: `
      bg-[rgba(21,29,47,0.4)] border-[#3a4a5f]
      hover:bg-[rgba(21,29,47,0.6)] hover:border-[#4ea5ff]/50
    `,
    accent: `
      bg-gradient-to-br from-[#4ea5ff]/5 to-[#2979d0]/5
      border-[#4ea5ff]/20 hover:border-[#4ea5ff]/60
      hover:shadow-lg hover:shadow-[#4ea5ff]/20
    `,
    success: `
      bg-gradient-to-br from-[#36d399]/5 to-[#1a9d6f]/5
      border-[#36d399]/20 hover:border-[#36d399]/60
      hover:shadow-lg hover:shadow-[#36d399]/20
    `,
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {glow && <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#4ea5ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />}
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// REUSABLE COMPONENT: STAT CARD
// ═══════════════════════════════════════════════════════════════════════════
function StatCard({ icon: Icon, label, value, trend, color = 'blue', adminOnly = false, userRole = 'ADMIN' }) {
  if (adminOnly && userRole !== 'ADMIN') return null;

  const colorMap = {
    blue: { bg: '#4ea5ff', light: '#4ea5ff/10', icon: '#4ea5ff', trend: '#4ea5ff' },
    green: { bg: '#36d399', light: '#36d399/10', icon: '#36d399', trend: '#36d399' },
    red: { bg: '#ff5c5c', light: '#ff5c5c/10', icon: '#ff5c5c', trend: '#ff5c5c' },
    purple: { bg: '#8b5cf6', light: '#8b5cf6/10', icon: '#8b5cf6', trend: '#8b5cf6' },
  };

  const colorScheme = colorMap[color];

  return (
    <PremiumCard variant={color === 'blue' ? 'default' : color === 'green' ? 'success' : 'default'} className="relative overflow-hidden group">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
           style={{
             background: `radial-gradient(circle at top right, ${colorScheme.bg}/10, transparent)`,
             pointerEvents: 'none'
           }} />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className={`h-10 w-10 rounded-2xl flex items-center justify-center backdrop-blur-sm border`}
               style={{
                 background: colorScheme.light,
                 borderColor: `${colorScheme.bg}40`,
                 color: colorScheme.icon
               }}>
            <Icon size={18} />
          </div>
          <span className="text-xs font-bold text-[#b0c4de] uppercase tracking-widest">{label}</span>
        </div>

        {trend && (
          <span className="text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-sm"
                style={{
                  background: `${colorScheme.bg}15`,
                  color: colorScheme.trend,
                  border: `1px solid ${colorScheme.bg}40`
                }}>
            {trend} <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-white mt-5 font-mono tracking-tight group-hover:text-[#4ea5ff] transition-colors">
        {value}
      </h2>

      {/* Subtle animated underline */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#4ea5ff]/40 to-transparent group-hover:via-[#4ea5ff]/80 transition-all duration-500" />
    </PremiumCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function DashboardPage({
  activeMenu: activeMenuProp,
  onNavigate,
  onLogout,
  userRole = 'ADMIN',
}) {
  const [internalActiveMenu, setActiveMenu] = useState('Dashboard');
  const activeMenu = activeMenuProp || internalActiveMenu;

  const goTo = (menuName) => {
    if (onNavigate) onNavigate(menuName);
    else setActiveMenu(menuName);
  };

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [developerMode, setDeveloperMode] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Ledgers Log' },
    { value: 'Completed', label: 'Completed Only' },
    { value: 'Pending', label: 'Pending Alerts' },
  ];
  const activeFilterLabel = filterOptions.find(f => f.value === statusFilter)?.label ?? 'All Ledgers Log';

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutGrid size={18} /> },
    { name: 'Analytics', icon: <Activity size={18} /> },
    { name: 'Ledgers', icon: <Calendar size={18} /> },
    { name: 'Rider Fleet', icon: <Truck size={18} /> },
  ].filter(item => ROLE_PERMISSIONS[userRole]?.includes(item.name));

  const generalItems = [
    { name: 'Profile', icon: <User size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
  ].filter(item => ROLE_PERMISSIONS[userRole]?.includes(item.name));

  const notificationsList = [
    { id: 1, type: 'success', title: 'Payment Settled', desc: 'Faiza Malik cleared outstanding ledger.', time: '5 mins ago' },
    { id: 2, type: 'warning', title: 'Pending Alert', desc: 'Zainab Ahmed debit threshold exceeded.', time: '2 hrs ago' },
    { id: 3, type: 'info', title: 'Fleet Update', desc: 'Rider Sajid Khan entered Lahore Route.', time: '4 hrs ago' }
  ];

  const transactions = [
    { id: 'TXN-9081', client: 'Faiza Malik', type: 'Credit Received', amount: 12500, date: '2026-07-15', status: 'Completed' },
    { id: 'TXN-9082', client: 'Zainab Ahmed', type: 'Outstanding Debit', amount: 3200, date: '2026-07-14', status: 'Pending' },
    { id: 'TXN-9083', client: 'Sajid Khan', type: 'Rider Allowance', amount: 1500, date: '2026-07-14', status: 'Completed' },
    { id: 'TXN-9084', client: 'Asad Ali', type: 'Settled Ledger', amount: 8000, date: '2026-07-13', status: 'Completed' },
    { id: 'TXN-9085', client: 'Sana Qureshi', type: 'Outstanding Debit', amount: 1500, date: '2026-07-12', status: 'Pending' },
  ];

  const activeRoutes = [
    { id: 1, routeName: "Lahore Central Route", hub: "Anarkali to DHA, LHR", driver: "Sajid Khan", vehicle: "Honda CD-70", trips: "142 Trips", status: "On Route", efficiency: "94%", eta: "12 mins", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80" },
    { id: 2, routeName: "Karachi South Express", hub: "Clifton to Korangi, KHI", driver: "Bilal Butt", vehicle: "Carry Dabba", trips: "320 Trips", status: "On Standby", efficiency: "88%", eta: "Delayed", image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=400&q=80" },
    { id: 3, routeName: "Islamabad Sector Run", hub: "G-9 to F-11, ISL", driver: "Kamran Shah", vehicle: "Suzuki Pickup", trips: "89 Trips", status: "On Route", efficiency: "91%", eta: "5 mins", image: "https://images.unsplash.com/photo-1553413719-875871214736?auto=format&fit=crop&w=400&q=80" },
    { id: 4, routeName: "Pindi Commercial Route", hub: "Saddar to Bahria, RWP", driver: "Usman Ghani", vehicle: "Motorcycle", trips: "215 Trips", status: "On Standby", efficiency: "85%", eta: "Standby", image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=400&q=80" }
  ];

  const filteredTxns = useMemo(() => {
    if (statusFilter === 'all') return transactions;
    return transactions.filter(t => t.status === statusFilter);
  }, [statusFilter]);

  // ───────────────────────────────────────────────────────────
  // PAGE CONTENT RENDERER
  // ───────────────────────────────────────────────────────────
  const renderPageContent = () => {
    const isAllowed = ROLE_PERMISSIONS[userRole]?.includes(activeMenu);
    if (!isAllowed) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <ShieldAlert size={56} className="mb-4 text-[#ff5c5c]/70 animate-pulse" />
          <h2 className="text-2xl font-bold text-white">Access Denied</h2>
          <p className="text-sm text-[#b0c4de] mt-2">You do not have permission to view {activeMenu}.</p>
        </div>
      );
    }

    switch (activeMenu) {
      case 'Dashboard':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* HERO STATS SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRole === 'ADMIN' && (
                <StatCard
                  icon={DollarSign}
                  label="Total Gross Revenue"
                  value="PKR 482,900"
                  trend="+18.4%"
                  color="green"
                  userRole={userRole}
                />
              )}

              <StatCard
                icon={Truck}
                label="Active Deliveries"
                value="92 Projects"
                trend="Secure"
                color="blue"
                userRole={userRole}
              />

              {userRole === 'ADMIN' && (
                <StatCard
                  icon={ShieldAlert}
                  label="Outstanding Liability"
                  value="PKR 14,700"
                  color="red"
                  userRole={userRole}
                />
              )}
            </div>

            {/* REVENUE TREND + ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {(userRole === 'ADMIN' || userRole === 'VIEWER') && (
                <PremiumCard variant="default" className="lg:col-span-2">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Revenue Trend</h3>
                        <p className="text-xs text-[#7a8fa6] mt-2">Last 6 months performance analysis</p>
                      </div>
                      <button onClick={() => goTo('Analytics')} 
                              className="text-xs font-bold text-[#4ea5ff] hover:text-[#6ab3ff] flex items-center gap-1 transition-colors">
                        Full report <ArrowUpRight size={12} />
                      </button>
                    </div>

                    <div className="relative h-48 w-full">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#36d399" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#36d399" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="40" x2="500" y2="40" stroke="#2a3a4f" strokeWidth="0.5" strokeDasharray="6 6" />
                        <line x1="0" y1="80" x2="500" y2="80" stroke="#2a3a4f" strokeWidth="0.5" strokeDasharray="6 6" />
                        <line x1="0" y1="120" x2="500" y2="120" stroke="#2a3a4f" strokeWidth="0.5" strokeDasharray="6 6" />
                        <path d="M 0,110 L 83,95 L 166,100 L 250,60 L 333,70 L 416,35 L 500,45 L 500,160 L 0,160 Z" fill="url(#revGrad)" />
                        <path d="M 0,110 L 83,95 L 166,100 L 250,60 L 333,70 L 416,35 L 500,45" 
                              fill="none" stroke="#36d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        {[110, 95, 100, 60, 70, 35, 45].map((y, i) => (
                          <circle key={i} cx={i * 83.3} cy={y} r="4" fill="#0a0e1a" stroke="#36d399" strokeWidth="2" />
                        ))}
                      </svg>
                    </div>
                  </div>
                </PremiumCard>
              )}

              <PremiumCard variant="default" className={`${(userRole === 'ADMIN' || userRole === 'VIEWER') ? '' : 'lg:col-span-3'} flex flex-col`}>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Recent Activity</h3>
                  <p className="text-xs text-[#7a8fa6] mt-2">Latest events across workspace</p>
                </div>
                <div className="space-y-2 -mx-3 mt-4 flex-1">
                  {notificationsList.map((notif) => (
                    <div key={notif.id} className="flex gap-3 p-3 rounded-xl hover:bg-[#4ea5ff]/5 transition-colors duration-300">
                      <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                        notif.type === 'success' ? 'bg-[#36d399]' : notif.type === 'warning' ? 'bg-[#ffb020]' : 'bg-[#4ea5ff]'
                      }`} />
                      <div className="space-y-0.5 min-w-0">
                        <p className="text-xs font-bold text-white">{notif.title}</p>
                        <p className="text-[11px] text-[#7a8fa6] leading-relaxed">{notif.desc}</p>
                        <span className="text-[9px] text-[#546b82] block">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {ROLE_PERMISSIONS[userRole]?.includes('Ledgers') && (
                  <button onClick={() => goTo('Ledgers')} 
                          className="w-full text-center text-xs font-bold text-[#4ea5ff] hover:text-[#6ab3ff] py-2.5 rounded-xl hover:bg-[#4ea5ff]/5 transition-all duration-300 mt-3 border-t border-[#2a3a4f]">
                    View all activity
                  </button>
                )}
              </PremiumCard>
            </div>

            {/* ADMIN QUICK ACTIONS */}
            {userRole === 'ADMIN' && (
              <PremiumCard variant="accent" className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-base font-bold text-white uppercase tracking-widest flex items-center gap-2 justify-center md:justify-start">
                    <Zap size={18} className="text-[#ffb020]" /> Control Center
                  </h3>
                  <p className="text-sm text-[#7a8fa6] max-w-xl leading-relaxed">
                    Manage operations, audit transactions, and coordinate your fleet from one unified platform.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  <button onClick={() => goTo('Ledgers')} 
                          className="px-4 py-2.5 bg-[#151d2f] border border-[#2a3a4f] text-white font-bold text-xs rounded-2xl hover:border-[#4ea5ff]/60 hover:bg-[#1a232f] active:scale-95 transition-all duration-300">
                    View Ledgers
                  </button>
                  <button onClick={() => goTo('Rider Fleet')} 
                          className="px-4 py-2.5 bg-[#151d2f] border border-[#2a3a4f] text-white font-bold text-xs rounded-2xl hover:border-[#4ea5ff]/60 hover:bg-[#1a232f] active:scale-95 transition-all duration-300">
                    Fleet Tracker
                  </button>
                  <button onClick={() => goTo('Analytics')} 
                          className="px-4 py-2.5 bg-gradient-to-r from-[#4ea5ff] to-[#2979d0] text-white font-bold text-xs rounded-2xl hover:shadow-lg hover:shadow-[#4ea5ff]/30 active:scale-95 transition-all duration-300">
                    Analytics
                  </button>
                </div>
              </PremiumCard>
            )}
          </div>
        );

      case 'Analytics':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PremiumCard variant="default" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white uppercase tracking-widest">Capital Flow Analysis</h3>
                  <p className="text-xs text-[#7a8fa6] mt-2">Financial inflow metrics against system limits</p>
                </div>
                <div className="flex items-center gap-2 bg-[#151d2f] border border-[#2a3a4f] px-3 py-1.5 rounded-xl text-xs font-bold text-[#4ea5ff]">
                  <RefreshCw size={12} className="animate-spin" /> Live Sync
                </div>
              </div>

              <div className="relative h-64 w-full bg-[#0a0e1a]/60 rounded-2xl p-4 border border-[#2a3a4f]/60 overflow-hidden">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ea5ff" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#4ea5ff" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#2a3a4f" strokeWidth="0.5" strokeDasharray="6 6" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#2a3a4f" strokeWidth="0.5" strokeDasharray="6 6" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#2a3a4f" strokeWidth="0.5" strokeDasharray="6 6" />
                  <path d="M 0,140 Q 60,190 120,100 T 240,75 T 360,50 T 480,95 T 500,80 L 500,200 L 0,200 Z" fill="url(#glowGrad)" />
                  <path d="M 0,140 Q 60,190 120,100 T 240,75 T 360,50 T 480,95 T 500,80" 
                        fill="none" stroke="#4ea5ff" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#2a3a4f]/60 text-center">
                <div className="p-3 space-y-1">
                  <p className="text-[10px] text-[#546b82] uppercase tracking-widest font-bold">Peak Inflow</p>
                  <p className="text-lg font-bold text-white font-mono">PKR 82,400</p>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-[10px] text-[#546b82] uppercase tracking-widest font-bold">Avg Balance</p>
                  <p className="text-lg font-bold text-[#36d399] font-mono">PKR 34,120</p>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-[10px] text-[#546b82] uppercase tracking-widest font-bold">System Health</p>
                  <p className="text-lg font-bold text-[#36d399]">99.84%</p>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-[10px] text-[#546b82] uppercase tracking-widest font-bold">Active Nodes</p>
                  <p className="text-lg font-bold text-white font-mono">14</p>
                </div>
              </div>
            </PremiumCard>
          </div>
        );

      case 'Ledgers':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PremiumCard variant="default" className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="text-[#4ea5ff]" size={18} /> Account Ledgers
                  </h3>
                  <p className="text-xs text-[#7a8fa6] mt-2">Transaction history with filters</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => alert('Downloading CSV...')} 
                          className="flex items-center gap-1.5 px-3 py-2 bg-[#151d2f] hover:bg-[#1a232f] border border-[#2a3a4f] text-xs font-bold rounded-xl text-[#b0c4de] transition-all duration-300">
                    <Download size={12} /> Export CSV
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => { setShowFilterDropdown(!showFilterDropdown); }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                        showFilterDropdown 
                          ? 'bg-[#4ea5ff]/15 border border-[#4ea5ff] text-white' 
                          : 'bg-[#151d2f] border border-[#2a3a4f] text-white hover:border-[#4ea5ff]/40'
                      }`}
                    >
                      <Filter size={12} className="text-[#4ea5ff]" />
                      {activeFilterLabel}
                      <ChevronDown size={12} className={`text-[#7a8fa6] transition-transform duration-300 ${showFilterDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showFilterDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-[#151d2f] to-[#0f1423] border border-[#2a3a4f] rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
                        {filterOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => { setStatusFilter(opt.value); setShowFilterDropdown(false); }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-colors duration-200 ${
                              statusFilter === opt.value 
                                ? 'text-[#4ea5ff] bg-[#4ea5ff]/15' 
                                : 'text-[#7a8fa6] hover:bg-[#1a232f] hover:text-white'
                            }`}
                          >
                            {opt.label}
                            {statusFilter === opt.value && <CheckCircle2 size={13} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#2a3a4f]/60">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#2a3a4f]/60 text-[10px] text-[#546b82] uppercase tracking-widest bg-[#0a0e1a]/50 font-bold">
                      <th className="p-4">Reference ID</th>
                      <th className="p-4">Account Party</th>
                      <th className="p-4">Transaction</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a3a4f]/40 text-xs">
                    {filteredTxns.map((txn) => (
                      <tr key={txn.id} className="hover:bg-[#4ea5ff]/5 transition-colors duration-300">
                        <td className="p-4 font-mono text-[#4ea5ff] font-bold">{txn.id}</td>
                        <td className="p-4 font-bold text-white">{txn.client}</td>
                        <td className="p-4 text-[#7a8fa6]">{txn.type}</td>
                        <td className="p-4 text-white font-mono font-bold">PKR {txn.amount.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-lg backdrop-blur-sm border ${
                            txn.status === 'Completed' 
                              ? 'text-[#36d399] bg-[#36d399]/15 border-[#36d399]/30' 
                              : 'text-[#ffb020] bg-[#ffb020]/15 border-[#ffb020]/30'
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PremiumCard>
          </div>
        );

      case 'Rider Fleet':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Truck className="text-[#4ea5ff]" size={18} /> Telemetry Fleet
              </h3>
              <p className="text-xs text-[#7a8fa6] mt-2">Real-time logistics pipeline tracker</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeRoutes.map((route) => (
                <PremiumCard key={route.id} variant="glass" className="overflow-hidden p-0 flex flex-col h-full transition-all duration-500">
                  <div className="relative h-40 overflow-hidden bg-[#0a0e1a]">
                    <img src={route.image} alt={route.routeName} 
                         className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 text-[9px] font-black px-2.5 py-1 rounded-full bg-[#36d399]/20 text-[#36d399] border border-[#36d399]/40 backdrop-blur-sm">
                      {route.status}
                    </span>
                    <span className="absolute bottom-3 right-3 text-[9px] font-mono text-white bg-[#0a0e1a]/60 px-2 py-1 rounded-lg backdrop-blur-sm border border-[#2a3a4f]/60">
                      ETA: {route.eta}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-white truncate hover:text-[#4ea5ff] transition-colors">{route.routeName}</h4>
                      <p className="text-[11px] text-[#546b82] truncate flex items-center gap-1.5">
                        <MapPin size={11} className="text-[#4ea5ff] shrink-0" />{route.hub}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-[10px] font-mono font-bold text-[#546b82]">
                        <span>Efficiency</span>
                        <span className="text-[#36d399]">{route.efficiency}</span>
                      </div>
                      <div className="h-2 w-full bg-[#0a0e1a] rounded-full overflow-hidden border border-[#2a3a4f]/40">
                        <div className="bg-gradient-to-r from-[#4ea5ff] to-[#36d399] h-full rounded-full" 
                             style={{ width: route.efficiency }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#2a3a4f]/40 pt-3 text-[10px] font-mono text-[#546b82]">
                      <span className="text-white font-bold">{route.driver}</span>
                      <span className="bg-[#0a0e1a] text-[#7a8fa6] px-2 py-1 rounded-lg border border-[#2a3a4f]/40">{route.trips}</span>
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        );

      case 'Profile':
        return (
          <section className="flex justify-center items-center py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PremiumCard variant="default" className="w-full max-w-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#2a3a4f]/60">
                <div className="relative cursor-pointer group">
                  <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-[#4ea5ff]/20 to-[#2979d0]/20 flex items-center justify-center font-black text-3xl text-[#4ea5ff] border-2 border-dashed border-[#4ea5ff]/40 group-hover:border-[#4ea5ff] transition-all duration-300">
                    OP
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[#4ea5ff] to-[#2979d0] text-white p-2 rounded-lg shadow-lg">
                    <Camera size={14} />
                  </div>
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">Ali.com System {userRole}</h3>
                  <p className="text-sm text-[#7a8fa6]">Rank Level: {userRole === 'ADMIN' ? '01 — Administrator' : userRole === 'VIEWER' ? '02 — Viewer' : '03 — Rider'}</p>
                  <span className="inline-block text-[10px] font-bold text-[#36d399] bg-[#36d399]/15 px-3 py-1 border border-[#36d399]/30 rounded-full backdrop-blur-sm">
                    ✓ Verified & Secure
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#546b82]">Username</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5"><User size={14} className="text-[#4ea5ff]" /></span>
                    <input type="text" defaultValue="Ali Admin Pro" 
                           className="w-full bg-[#0a0e1a] border border-[#2a3a4f] rounded-2xl pl-10 pr-4 py-3 text-sm text-white font-semibold focus:outline-none focus:border-[#4ea5ff] focus:shadow-lg focus:shadow-[#4ea5ff]/20 transition-all duration-300" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#546b82]">Email Router</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5"><Mail size={14} className="text-[#4ea5ff]" /></span>
                    <input type="email" defaultValue="ops@ali.com" 
                           className="w-full bg-[#0a0e1a] border border-[#2a3a4f] rounded-2xl pl-10 pr-4 py-3 text-sm text-white font-semibold focus:outline-none focus:border-[#4ea5ff] focus:shadow-lg focus:shadow-[#4ea5ff]/20 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </PremiumCard>
          </section>
        );

      case 'Settings':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PremiumCard variant="default" className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Sliders className="text-[#4ea5ff]" size={18} /> System Settings
                </h3>
                <p className="text-xs text-[#7a8fa6] mt-2">Manage alerts, integrations, and preferences</p>
              </div>

              <div className="h-px bg-gradient-to-r from-[#2a3a4f]/40 via-[#2a3a4f]/20 to-transparent" />

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#151d2f]/60 border border-[#2a3a4f]/40 rounded-2xl hover:border-[#2a3a4f] hover:bg-[#151d2f]/80 transition-all duration-300">
                  <div className="space-y-1 pr-4">
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      <Mail size={14} className="text-[#4ea5ff]" /> Email Alerts
                    </p>
                    <p className="text-[12px] text-[#7a8fa6]">Get instant transactional reports</p>
                  </div>
                  <button
                    onClick={() => setEmailAlerts(!emailAlerts)}
                    className={`w-12 h-6 rounded-full p-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4ea5ff]/50 ${
                      emailAlerts ? 'bg-gradient-to-r from-[#4ea5ff] to-[#2979d0]' : 'bg-[#2a3a4f]'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      emailAlerts ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {userRole === 'ADMIN' && (
                  <div className="flex items-center justify-between p-4 bg-[#151d2f]/60 border border-[#2a3a4f]/40 rounded-2xl hover:border-[#2a3a4f] hover:bg-[#151d2f]/80 transition-all duration-300">
                    <div className="space-y-1 pr-4">
                      <p className="text-sm font-bold text-white flex items-center gap-2">
                        <Globe size={14} className="text-[#8b5cf6]" /> Developer Mode
                      </p>
                      <p className="text-[12px] text-[#7a8fa6]">Access raw telemetry and logs</p>
                    </div>
                    <button
                      onClick={() => setDeveloperMode(!developerMode)}
                      className={`w-12 h-6 rounded-full p-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50 ${
                        developerMode ? 'bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9]' : 'bg-[#2a3a4f]'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        developerMode ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                )}
              </div>
            </PremiumCard>
          </div>
        );

      default:
        return <div className="text-[#7a8fa6] text-sm">Select a menu item</div>;
    }
  };

  const pageMeta = {
    Dashboard: { title: 'Dashboard', subtitle: 'Daily performance snapshot.' },
    Analytics: { title: 'Analytics', subtitle: 'Capital flow analysis and metrics.' },
    Ledgers: { title: 'Ledgers', subtitle: 'Transaction audit trail.' },
    'Rider Fleet': { title: 'Fleet Tracker', subtitle: 'Real-time logistics pipeline.' },
    Profile: { title: 'Profile', subtitle: 'Your account identity.' },
    Settings: { title: 'Settings', subtitle: 'System preferences and integrations.' },
  };
  const currentMeta = pageMeta[activeMenu] || { title: activeMenu, subtitle: 'Ali.com Platform.' };

  // ───────────────────────────────────────────────────────────
  // MAIN RENDER
  // ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-8" style={{ background: THEME.colors.bg.primary }}>
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-[#2a3a4f]/40 pb-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3 flex-wrap">
            {currentMeta.title}
            <span className="text-xs font-black px-3 py-1 rounded-full bg-gradient-to-r from-[#4ea5ff]/20 to-[#2979d0]/20 text-[#4ea5ff] border border-[#4ea5ff]/30 uppercase tracking-widest">
              {userRole}
            </span>
          </h1>
          <p className="text-sm text-[#7a8fa6]">{currentMeta.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 relative">
          <div className="relative sm:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search size={16} className="text-[#546b82]" />
            </span>
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full bg-[#151d2f] border border-[#2a3a4f] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#546b82] focus:outline-none focus:border-[#4ea5ff] focus:shadow-lg focus:shadow-[#4ea5ff]/20 transition-all duration-300"
            />
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              className={`relative h-10 w-10 bg-[#151d2f] border rounded-2xl flex items-center justify-center text-white hover:bg-[#1a232f] transition-all duration-300 ${
                showNotificationDropdown ? 'border-[#4ea5ff] bg-[#4ea5ff]/10 shadow-lg shadow-[#4ea5ff]/20' : 'border-[#2a3a4f]'
              }`}
            >
              <Bell size={16} />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#ffb020] to-[#ff8c42] ring-2 ring-[#0a0e1a] animate-pulse"></span>
            </button>

            {showNotificationDropdown && (
              <div className="absolute right-0 mt-4 w-96 bg-gradient-to-br from-[#151d2f]/95 to-[#0f1423]/95 border border-[#2a3a4f] rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
                <div className="px-4 pb-3 border-b border-[#2a3a4f]/40 flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Live Alerts</span>
                  <span className="text-[10px] text-[#4ea5ff] bg-[#4ea5ff]/15 px-2.5 py-1 rounded-full font-black border border-[#4ea5ff]/30">3 New</span>
                </div>
                <div className="divide-y divide-[#2a3a4f]/20 max-h-80 overflow-y-auto">
                  {notificationsList.map((notif) => (
                    <div key={notif.id} className="p-3.5 hover:bg-[#1a232f]/70 transition-colors duration-200 flex gap-3 cursor-pointer">
                      <div className={`h-2.5 w-2.5 rounded-full mt-1 shrink-0 ${
                        notif.type === 'success' ? 'bg-[#36d399]' : notif.type === 'warning' ? 'bg-[#ffb020]' : 'bg-[#4ea5ff]'
                      }`} />
                      <div className="space-y-0.5 flex-1">
                        <p className="text-xs font-bold text-white">{notif.title}</p>
                        <p className="text-[12px] text-[#7a8fa6] leading-relaxed">{notif.desc}</p>
                        <span className="text-[10px] text-[#546b82] block pt-1">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <div className="relative">
            <div
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className={`flex items-center gap-3 bg-[#151d2f] border rounded-2xl p-2 pr-3.5 cursor-pointer hover:bg-[#1a232f] transition-all duration-300 ${
                showProfileDropdown ? 'border-[#4ea5ff] bg-[#4ea5ff]/10 shadow-lg shadow-[#4ea5ff]/20' : 'border-[#2a3a4f]'
              }`}
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#4ea5ff]/20 to-[#2979d0]/20 flex items-center justify-center font-bold text-xs text-[#4ea5ff] border border-[#4ea5ff]/30">
                OP
              </div>
              <ChevronDown size={14} className={`text-[#7a8fa6] transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : ''}`} />
            </div>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-gradient-to-br from-[#151d2f]/95 to-[#0f1423]/95 border border-[#2a3a4f] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
                {ROLE_PERMISSIONS[userRole]?.includes('Profile') && (
                  <button onClick={() => { goTo('Profile'); setShowProfileDropdown(false); }} 
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#7a8fa6] hover:bg-[#1a232f] hover:text-white transition-colors duration-200">
                    <User size={16} className="text-[#4ea5ff]" /> Profile
                  </button>
                )}
                {ROLE_PERMISSIONS[userRole]?.includes('Settings') && (
                  <button onClick={() => { goTo('Settings'); setShowProfileDropdown(false); }} 
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#7a8fa6] hover:bg-[#1a232f] hover:text-white transition-colors duration-200">
                    <Settings size={16} /> Settings
                  </button>
                )}
                <div className="h-px bg-[#2a3a4f]/40 my-1" />
                <button onClick={() => { setShowProfileDropdown(false); onLogout ? onLogout() : alert('Logout'); }} 
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#ff5c5c] hover:bg-[#ff5c5c]/10 transition-colors duration-200">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <div className="min-h-[60vh]">
        {renderPageContent()}
      </div>
    </div>
  );
}