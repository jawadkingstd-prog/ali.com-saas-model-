import React, { useState, useMemo } from 'react';
import logoCyan from '../assets/Logo_Cyan1.png';
import { 
  TrendingUp, ArrowUpRight, DollarSign, Users, Award, LayoutGrid, 
  Calendar, Filter, Bell, ChevronDown, User, Settings, LogOut, 
  Compass, Search, Mail, Lock, MapPin, Truck, Activity, Shield, 
  Clock, CheckCircle2, Camera, ShieldAlert, Sliders, Briefcase, 
  RefreshCw, Download, SlidersHorizontal, Layers, Globe
} from 'lucide-react';

export default function DashboardPage() {
  // Page Routing State
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  // Interactive Dropdown States
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  // Table Filter State
  const [statusFilter, setStatusFilter] = useState('all');

  // Settings Mock Toggles States
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [developerMode, setDeveloperMode] = useState(false);

  // Sidebar Menu Layout Items
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutGrid size={18} /> },
    { name: 'Analytics', icon: <Activity size={18} /> },
    { name: 'Ledgers', icon: <Calendar size={18} /> },
    { name: 'Rider Fleet', icon: <Truck size={18} /> },
  ];

  const generalItems = [
    { name: 'Profile', icon: <User size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
  ];

  // Notifications Data Pack
  const notificationsList = [
    { id: 1, type: 'success', title: 'Payment Settled', desc: 'Faiza Malik cleared outstanding ledger.', time: '5 mins ago' },
    { id: 2, type: 'warning', title: 'Pending Alert', desc: 'Zainab Ahmed debit threshold exceeded.', time: '2 hrs ago' },
    { id: 3, type: 'info', title: 'Fleet Update', desc: 'Rider Sajid Khan entered Lahore Route.', time: '4 hrs ago' }
  ];

  // Original Transactions Database
  const transactions = [
    { id: 'TXN-9081', client: 'Faiza Malik', type: 'Credit Received', amount: 12500, date: '2026-07-15', status: 'Completed' },
    { id: 'TXN-9082', client: 'Zainab Ahmed', type: 'Outstanding Debit', amount: 3200, date: '2026-07-14', status: 'Pending' },
    { id: 'TXN-9083', client: 'Sajid Khan', type: 'Rider Allowance', amount: 1500, date: '2026-07-14', status: 'Completed' },
    { id: 'TXN-9084', client: 'Asad Ali', type: 'Settled Ledger', amount: 8000, date: '2026-07-13', status: 'Completed' },
    { id: 'TXN-9085', client: 'Sana Qureshi', type: 'Outstanding Debit', amount: 1500, date: '2026-07-12', status: 'Pending' },
  ];

  // Active Fleet Cards Database
  const activeRoutes = [
    { id: 1, routeName: "Lahore Central Route", hub: "Anarkali to DHA, LHR", driver: "Sajid Khan", vehicle: "Honda CD-70", trips: "142 Trips", status: "On Route", efficiency: "94%", eta: "12 mins", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80" },
    { id: 2, routeName: "Karachi South Express", hub: "Clifton to Korangi, KHI", driver: "Bilal Butt", vehicle: "Carry Dabba", trips: "320 Trips", status: "On Standby", efficiency: "88%", eta: "Delayed", image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=400&q=80" },
    { id: 3, routeName: "Islamabad Sector Run", hub: "G-9 to F-11, ISL", driver: "Kamran Shah", vehicle: "Suzuki Pickup", trips: "89 Trips", status: "On Route", efficiency: "91%", eta: "5 mins", image: "https://images.unsplash.com/photo-1553413719-875871214736?auto=format&fit=crop&w=400&q=80" },
    { id: 4, routeName: "Pindi Commercial Route", hub: "Saddar to Bahria, RWP", driver: "Usman Ghani", vehicle: "Motorcycle", trips: "215 Trips", status: "On Standby", efficiency: "85%", eta: "Standby", image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=400&q=80" }
  ];

  // Functional Filter Implementation
  const filteredTxns = useMemo(() => {
    if (statusFilter === 'all') return transactions;
    return transactions.filter(t => t.status === statusFilter);
  }, [statusFilter]);

  // RENDER CONTROLLER FOR DYNAMIC VIEWS
  const renderPageContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* ENHANCED QUICK STATS CARDS WITH SPARKLINE INTEGRATION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 hover:border-[#4EA5FF] hover:shadow-lg hover:shadow-[#4EA5FF]/5 transition-all duration-300">
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[11px] font-bold text-[#9FB6D4] uppercase tracking-wider">Total Gross Revenue</span>
                  <span className="text-xs font-bold text-[#36D399] bg-[#36D399]/10 px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                    +18.4% <ArrowUpRight size={12} />
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white mt-4 font-mono tracking-tight relative z-10">PKR 482,900</h2>
                
                {/* Embedded Mini-Sparkline Graph Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-10 opacity-30 group-hover:opacity-50 transition-opacity">
                  <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,15 Q20,5 40,12 T80,3 T100,10 L100,20 L0,20 Z" fill="#36D399" />
                  </svg>
                </div>
              </div>

              <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 hover:border-[#4EA5FF] hover:shadow-lg hover:shadow-[#4EA5FF]/5 transition-all duration-300">
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[11px] font-bold text-[#9FB6D4] uppercase tracking-wider">Active Deliveries</span>
                  <span className="text-xs font-bold text-[#4EA5FF] bg-[#4EA5FF]/10 px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                    Secure <TrendingUp size={12} className="animate-pulse" />
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white mt-4 font-mono tracking-tight relative z-10">92 Projects</h2>
                
                {/* Embedded Mini-Sparkline Graph Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-10 opacity-30 group-hover:opacity-50 transition-opacity">
                  <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 Q25,18 50,8 T75,14 T100,5 L100,20 L0,20 Z" fill="#4EA5FF" />
                  </svg>
                </div>
              </div>

              <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 hover:border-[#4EA5FF] hover:shadow-lg hover:shadow-[#4EA5FF]/5 transition-all duration-300">
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[11px] font-bold text-[#9FB6D4] uppercase tracking-wider">Outstanding Liability</span>
                  <span className="text-xs font-bold text-[#FF5C5C] bg-[#FF5C5C]/10 px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm animate-pulse">
                    <ShieldAlert size={12} /> Critical Action
                  </span>
                </div>
                <h2 className="text-3xl font-black text-[#FF5C5C] mt-4 font-mono tracking-tight relative z-10">PKR 14,700</h2>
                
                {/* Embedded Mini-Sparkline Graph Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-10 opacity-20 group-hover:opacity-40 transition-opacity">
                  <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,5 Q30,15 60,4 T100,16 L100,20 L0,20 Z" fill="#FF5C5C" />
                  </svg>
                </div>
              </div>
            </div>

            {/* INTEGRATED SYSTEM RECOGNITION BANNER */}
            <div className="bg-gradient-to-r from-[#111C2E] to-[#16253b] border border-[#28415F] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 justify-center md:justify-start">
                  <Briefcase size={16} className="text-[#4EA5FF]" /> Corporate Control Center
                </h3>
                <p className="text-xs text-[#9FB6D4] max-w-xl leading-relaxed">
                  Welcome to the updated operational matrix. Select options from the side menu stream to track dynamic pipeline allocations, audit transactions logs, or manage security nodes.
                </p>
              </div>
              <button onClick={() => setActiveMenu('Analytics')} className="px-4 py-2.5 bg-[#4EA5FF] text-[#090E17] font-bold text-xs rounded-xl hover:bg-[#69b4ff] active:scale-95 transition-all shrink-0 shadow-md shadow-[#4EA5FF]/15">
                Execute Analytics Wave
              </button>
            </div>
          </div>
        );

      case 'Analytics':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider">Capital Flow Vectors</h3>
                  <p className="text-xs text-[#9FB6D4] mt-0.5">Automated visual curves mapping financial inflow metrics against constraints limits.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#090E17] border border-[#28415F] px-3 py-1.5 rounded-xl text-xs font-bold text-[#4EA5FF]">
                  <RefreshCw size={12} className="animate-spin" /> Stream Synced
                </div>
              </div>

              {/* Glowing SVG Curve Design */}
              <div className="relative h-64 w-full bg-[#090E17]/50 rounded-2xl p-4 border border-[#28415F]/40 overflow-hidden">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4EA5FF" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#4EA5FF" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#28415F" strokeWidth="0.5" strokeDasharray="6 6" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#28415F" strokeWidth="0.5" strokeDasharray="6 6" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#28415F" strokeWidth="0.5" strokeDasharray="6 6" />
                  <path d="M 0,140 Q 60,190 120,100 T 240,75 T 360,50 T 480,95 T 500,80 L 500,200 L 0,200 Z" fill="url(#glowGrad)" />
                  <path d="M 0,140 Q 60,190 120,100 T 240,75 T 360,50 T 480,95 T 500,80" fill="none" stroke="#4EA5FF" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              {/* ENHANCED STATS ROW INSIDE ANALYTICS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-[#28415F]/30 text-center">
                <div className="p-2 space-y-0.5">
                  <p className="text-[10px] text-[#9FB6D4]/50 uppercase tracking-wider font-bold">Peak Inflow</p>
                  <p className="text-sm font-bold text-white font-mono">PKR 82,400</p>
                </div>
                <div className="p-2 space-y-0.5">
                  <p className="text-[10px] text-[#9FB6D4]/50 uppercase tracking-wider font-bold">Avg Balance</p>
                  <p className="text-sm font-bold text-[#4EA5FF] font-mono">PKR 34,120</p>
                </div>
                <div className="p-2 space-y-0.5">
                  <p className="text-[10px] text-[#9FB6D4]/50 uppercase tracking-wider font-bold">System Health</p>
                  <p className="text-sm font-bold text-[#36D399]">99.84% Stable</p>
                </div>
                <div className="p-2 space-y-0.5">
                  <p className="text-[10px] text-[#9FB6D4]/50 uppercase tracking-wider font-bold">Active Webhooks</p>
                  <p className="text-sm font-bold text-white font-mono">14 Nodes</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Ledgers':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="text-[#4EA5FF]" size={16} /> Statement Account Ledgers
                  </h3>
                  <p className="text-xs text-[#9FB6D4] mt-0.5">Audit transaction history logs with customizable filter tags.</p>
                </div>
                
                {/* Actions Button Stack + Filter Component */}
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => alert('Downloading CSV...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#090E17] hover:bg-[#17263C] border border-[#28415F] text-xs font-bold rounded-xl text-[#9FB6D4] transition-all">
                    <Download size={12} /> Export CSV
                  </button>

                  <div className="flex items-center gap-2 bg-[#090E17] border border-[#28415F] rounded-xl px-3 py-1.5 focus-within:border-[#4EA5FF] transition-all">
                    <Filter size={12} className="text-[#4EA5FF]" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-bold pr-1"
                    >
                      <option value="all" className="bg-[#111C2E]">All Ledgers Log</option>
                      <option value="Completed" className="bg-[#111C2E]">Completed Only</option>
                      <option value="Pending" className="bg-[#111C2E]">Pending Alerts</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table Platform */}
              <div className="overflow-x-auto rounded-xl border border-[#28415F]/40">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#28415F]/60 text-[10px] text-[#9FB6D4] uppercase tracking-wider bg-[#090E17]/60 font-bold">
                      <th className="p-3.5">Reference ID</th>
                      <th className="p-3.5">Account Party</th>
                      <th className="p-3.5">Transaction Name</th>
                      <th className="p-3.5">Amount Type</th>
                      <th className="p-3.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#28415F]/30 text-xs">
                    {filteredTxns.map((txn) => (
                      <tr key={txn.id} className="hover:bg-[#17263C]/60 transition-colors">
                        <td className="p-3.5 font-mono text-[#4EA5FF] font-bold">{txn.id}</td>
                        <td className="p-3.5 font-bold text-white">{txn.client}</td>
                        <td className="p-3.5 text-[#9FB6D4] font-medium">{txn.type}</td>
                        <td className="p-3.5 text-white font-mono font-bold">PKR {txn.amount.toLocaleString()}</td>
                        <td className="p-3.5 text-right">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                            txn.status === 'Completed' ? 'text-[#36D399] bg-[#36D399]/10' : 'text-[#FFB020] bg-[#FFB020]/10'
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ENHANCED PAGINATION UI PLATFORM */}
              <div className="flex items-center justify-between pt-3 text-[11px] text-[#9FB6D4]/50 font-bold">
                <span>Showing {filteredTxns.length} of 5 statement logs</span>
                <div className="flex gap-1.5">
                  <button className="px-2.5 py-1 bg-[#090E17] rounded border border-[#28415F] hover:text-white cursor-not-allowed opacity-50">Prev</button>
                  <button className="px-2.5 py-1 bg-[#4EA5FF] text-[#090E17] rounded border border-[#4EA5FF]">1</button>
                  <button className="px-2.5 py-1 bg-[#090E17] rounded border border-[#28415F] hover:text-white">Next</button>
                </div>
              </div>

            </div>
          </div>
        );

      case 'Rider Fleet':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Truck className="text-[#4EA5FF]" size={16} /> Telemetry Transit Fleet
                </h3>
                <p className="text-xs text-[#9FB6D4] mt-0.5">Real-time tracker configurations mapping logistics pipelines.</p>
              </div>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {activeRoutes.map((route) => (
                <div key={route.id} className="bg-[#111C2E] border border-[#28415F] rounded-2xl overflow-hidden group hover:border-[#4EA5FF] hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-md">
                  <div className="relative h-36 overflow-hidden bg-[#090E17]">
                    <img src={route.image} alt={route.routeName} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-500" />
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-black px-2 py-0.5 rounded bg-[#090E17]/90 text-[#36D399] border border-[#36D399]/20 backdrop-blur-sm">{route.status}</span>
                    <span className="absolute bottom-2.5 right-2.5 text-[9px] font-mono text-white bg-[#111C2E]/80 px-1.5 py-0.5 rounded">ETA: {route.eta}</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#111C2E]">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs text-white group-hover:text-[#4EA5FF] transition-colors truncate">{route.routeName}</h4>
                      <p className="text-[11px] text-[#9FB6D4]/60 truncate flex items-center gap-1"><MapPin size={11} className="text-[#4EA5FF]" />{route.hub}</p>
                    </div>

                    {/* Progress tracking path logic indicators */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-mono font-bold text-[#9FB6D4]/50">
                        <span>Path Track Index</span>
                        <span className="text-[#36D399]">{route.efficiency}</span>
                      </div>
                      <div className="h-1 w-full bg-[#090E17] rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#4EA5FF] to-[#36D399] h-full rounded-full" style={{ width: route.efficiency }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#28415F]/30 pt-2 text-[10px] font-mono text-[#9FB6D4]/40">
                      <span className="text-white font-bold">{route.driver}</span>
                      <span className="bg-[#090E17] text-[#9FB6D4]/80 px-1.5 py-0.5 rounded border border-[#28415F]/40">{route.trips}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Profile':
        return (
          <section className="flex justify-center items-center py-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-full max-w-xl bg-[#111C2E] border border-[#28415F] rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-[#28415F]/40">
                <div className="relative group cursor-pointer">
                  <div className="h-20 w-20 rounded-2xl bg-[#4EA5FF]/10 flex items-center justify-center font-black text-2xl text-[#4EA5FF] border-2 border-dashed border-[#4EA5FF]/30 group-hover:border-[#4EA5FF] transition-all">
                    OP
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#4EA5FF] text-[#090E17] p-1.5 rounded-lg shadow-md">
                    <Camera size={12} />
                  </div>
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="text-base font-bold text-white tracking-wide">Ali.com Core System Admin</h3>
                  <p className="text-xs text-[#9FB6D4]/70">Access Status Token Rank: Level 01</p>
                  <span className="inline-block text-[10px] font-bold text-[#36D399] bg-[#36D399]/10 px-2.5 py-0.5 border border-[#36D399]/20 rounded-full mt-1">Operational Token Secure</span>
                </div>
              </div>

              {/* Form Controls Inputs layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4]">Admin Username</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5"><User size={13} className="text-[#9FB6D4]/40" /></span>
                    <input type="text" defaultValue="Ali Admin Pro" className="w-full bg-[#090E17] border border-[#28415F] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white font-semibold focus:outline-none focus:border-[#4EA5FF] transition-all" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4]">System Email Router</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5"><Mail size={13} className="text-[#9FB6D4]/40" /></span>
                    <input type="email" defaultValue="ops@ali.com" className="w-full bg-[#090E17] border border-[#28415F] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white font-semibold focus:outline-none focus:border-[#4EA5FF] transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'Settings':
        return (
          <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 space-y-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="text-[#4EA5FF]" size={16} /> Interactive System Settings
              </h3>
              <p className="text-xs text-[#9FB6D4] mt-0.5">Manage automated cluster sync loops and toggle backend webhooks credentials flags.</p>
            </div>

            <div className="h-px bg-[#28415F]/40" />

            {/* HIGH FIDELITY TOGGLES INTERACTION ROW */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#090E17]/40 border border-[#28415F]/30 rounded-xl hover:border-[#28415F] transition-all">
                <div className="space-y-0.5 pr-4">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5"><Mail size={13} className="text-[#4EA5FF]" /> Automated Email Alerts</p>
                  <p className="text-[11px] text-[#9FB6D4]/60">Dispatch transactional ledger reports instantly to primary systems account party.</p>
                </div>
                <button 
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors relative duration-200 focus:outline-none ${emailAlerts ? 'bg-[#4EA5FF]' : 'bg-[#28415F]'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${emailAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#090E17]/40 border border-[#28415F]/30 rounded-xl hover:border-[#28415F] transition-all">
                <div className="space-y-0.5 pr-4">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5"><Globe size={13} className="text-purple-400" /> Developer Mode Override</p>
                  <p className="text-[11px] text-[#9FB6D4]/60">Expose raw payload telemetry arrays structures and database logs indices flags.</p>
                </div>
                <button 
                  onClick={() => setDeveloperMode(!developerMode)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors relative duration-200 focus:outline-none ${developerMode ? 'bg-purple-500' : 'bg-[#28415F]'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${developerMode ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#090E17] text-white antialiased font-sans">
      
      {/* 1. MASTER SIDEBAR PANEL */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#111C2E] border-r border-[#28415F] p-6 justify-between shrink-0">
        <div className="space-y-8">
          {/* Main Logo component link stack */}
         <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveMenu('Dashboard')}>
  <img 
    src={logoCyan} 
    alt="Ali.com Logo" 
    className="h-10 w-10 object-contain group-hover:scale-105 transition-transform duration-300" 
    onError={(e) => { console.error("Logo failed to load:", e.target.src); }}
  />
  <span className="font-extrabold text-lg text-white tracking-tight group-hover:text-[#4EA5FF] transition-colors">Ali.com Pro</span>
</div>

          {/* Navigation link arrays map blocks */}
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[#9FB6D4]/30 mb-3 pl-2">Menu Controls</p>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => { setActiveMenu(item.name); setShowProfileDropdown(false); setShowNotificationDropdown(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                      activeMenu === item.name 
                        ? 'bg-[#4EA5FF]/10 text-[#4EA5FF] border border-[#4EA5FF]/20' 
                        : 'text-[#9FB6D4] border border-transparent hover:bg-[#17263C] hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[#9FB6D4]/30 mb-3 pl-2">System & Settings</p>
              <nav className="space-y-1">
                {generalItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => { setActiveMenu(item.name); setShowProfileDropdown(false); setShowNotificationDropdown(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                      activeMenu === item.name 
                        ? 'bg-[#4EA5FF]/10 text-[#4EA5FF] border border-[#4EA5FF]/20' 
                        : 'text-[#9FB6D4] border border-transparent hover:bg-[#17263C] hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Sync Telemetry Cluster Node Log Box */}
        <div className="bg-[#090E17]/60 border border-[#28415F] rounded-2xl p-4 space-y-2.5 shadow-md">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#36D399] animate-pulse"></span>
            <p className="text-[11px] font-bold text-white uppercase tracking-wide">Telemetry Node</p>
          </div>
          <p className="text-[10px] text-[#9FB6D4]/50 leading-normal">Cluster gateway server tracking assets logs index secure.</p>
        </div>
      </aside>

      {/* 2. DYNAMIC WORKSPACE PANEL MAIN COMPONENT */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto max-h-screen relative">
        
        {/* GLOBAL HEADER BAR BLOCK WITH INTERACTIVE DROPDOWNS COMPONENTS */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#28415F]/30 pb-4 relative">
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              {activeMenu} Dashboard Matrix
            </h1>
            <p className="text-xs text-[#9FB6D4]">Ali.com corporate automated control platform management gateway.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative">
            {/* Global Context Search logs inputs controls */}
            <div className="relative w-44 sm:w-56">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={14} className="text-[#9FB6D4]/50" />
              </span>
              <input
                type="text"
                placeholder="Global search logs..."
                className="w-full bg-[#111C2E] border border-[#28415F] rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-[#9FB6D4]/30 focus:outline-none focus:border-[#4EA5FF] transition-all"
              />
            </div>

            {/* NOTIFICATIONS CONTROL DROP CONTAINER PANEL WITH PREMIUM STATE ALERT CARDS */}
            <div className="relative">
              <button 
                onClick={() => { setShowNotificationDropdown(!showNotificationDropdown); setShowProfileDropdown(false); }}
                className={`relative h-8 w-8 bg-[#111C2E] border rounded-xl flex items-center justify-center text-white hover:bg-[#17263C] hover:border-[#4EA5FF]/40 active:scale-95 transition-all ${showNotificationDropdown ? 'border-[#4EA5FF] bg-[#4EA5FF]/10 shadow-lg' : 'border-[#28415F]'}`}
              >
                <Bell size={15} />
                <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-[#111C2E] animate-pulse"></span>
              </button>

              {showNotificationDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 pb-2 border-b border-[#28415F]/40 flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Live System Alerts</span>
                    <span className="text-[10px] text-[#4EA5FF] bg-[#4EA5FF]/10 px-2 py-0.5 rounded-full font-black">3 Logs</span>
                  </div>
                  <div className="divide-y divide-[#28415F]/20 max-h-64 overflow-y-auto">
                    {notificationsList.map((notif) => (
                      <div key={notif.id} className="p-3.5 hover:bg-[#17263C]/50 transition-colors flex gap-3">
                        <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${notif.type === 'success' ? 'bg-[#36D399]' : 'bg-orange-400'}`} />
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-white">{notif.title}</p>
                          <p className="text-[11px] text-[#9FB6D4]/80 leading-normal">{notif.desc}</p>
                          <span className="text-[9px] text-[#9FB6D4]/40 block pt-1">{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* USER CONTROL CONFIG PROFILE PILL DROPDOWN SHORTCUTS */}
            <div className="relative">
              <div 
                onClick={() => { setShowProfileDropdown(!showProfileDropdown); setShowNotificationDropdown(false); }}
                className={`flex items-center gap-2 bg-[#111C2E] border rounded-xl p-1 pr-3 shadow-sm cursor-pointer hover:bg-[#17263C] hover:border-[#4EA5FF]/40 active:scale-95 transition-all ${showProfileDropdown ? 'border-[#4EA5FF] bg-[#4EA5FF]/5' : 'border-[#28415F]'}`}
              >
                <div className="h-6 w-6 rounded-lg bg-[#4EA5FF]/20 flex items-center justify-center font-bold text-xs text-[#4EA5FF]">OP</div>
                <ChevronDown size={12} className={`text-[#9FB6D4] transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </div>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button onClick={() => { setActiveMenu('Profile'); setShowProfileDropdown(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#9FB6D4] hover:bg-[#17263C] hover:text-white transition-colors">
                    <User size={14} className="text-[#4EA5FF]" /> Profile Settings
                  </button>
                  <button onClick={() => { setActiveMenu('Settings'); setShowProfileDropdown(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#9FB6D4] hover:bg-[#17263C] hover:text-white transition-colors">
                    <Settings size={14} /> Account Settings
                  </button>
                  <div className="h-px bg-[#28415F]/40 my-1" />
                  <button onClick={() => alert('Sign-Out Complete.')} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#FF5C5C] hover:bg-[#FF5C5C]/10 transition-colors">
                    <LogOut size={14} /> System Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MASTER DYNAMIC VIEW MODULE MOUNT WINDOW TARGET */}
        <div className="min-h-[50vh]">
          {renderPageContent()}
        </div>

      </main>
    </div>
  );
}