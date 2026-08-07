import React, { useState, useEffect } from 'react';
import { Users, Zap, Package, Truck, Wallet, ShieldCheck, ArrowRight, CheckCircle2, Globe, LogIn, MapPin, TrendingUp, Activity, Clock, BarChart3, Eye } from 'lucide-react';
import logoCyan from '../assets/Logo_Cyan1.png';

export default function PublicWebsiteView({ onLogout }) {
  const [visitorCount, setVisitorCount] = useState(15420);
  const [activeTab, setActiveTab] = useState('orders');
  const [liveOrders, setLiveOrders] = useState([
    { id: 'ORD#8847', status: 'Delivering', progress: 75, rider: 'Ali Hassan', destination: 'DHA Phase 6', time: '12 mins' },
    { id: 'ORD#8846', status: 'Picked Up', progress: 45, rider: 'Sara Khan', destination: 'Gulberg III', time: '8 mins' },
    { id: 'ORD#8845', status: 'Confirmed', progress: 10, rider: 'Ahmed Ali', destination: 'Mall Road', time: '2 mins' },
  ]);
  const [liveRiders, setLiveRiders] = useState([
    { id: 'RDR#001', name: 'Ali Hassan', status: 'Active', zone: 'Zone A', orders: 5, earnings: 'PKR 3,240' },
    { id: 'RDR#002', name: 'Sara Khan', status: 'Active', zone: 'Zone B', orders: 3, earnings: 'PKR 2,160' },
    { id: 'RDR#003', name: 'Ahmed Ali', status: 'Busy', zone: 'Zone A', orders: 7, earnings: 'PKR 4,820' },
  ]);
  const [transactions, setTransactions] = useState([
    { id: 'TXN#5847', type: 'Wallet Credit', amount: 'PKR +5,000', user: 'customer_123', time: '2 min ago', status: 'Success' },
    { id: 'TXN#5846', type: 'Order Payment', amount: 'PKR -1,850', user: 'customer_456', time: '5 min ago', status: 'Success' },
    { id: 'TXN#5845', type: 'Commission Payout', amount: 'PKR +2,340', user: 'rider_789', time: '8 min ago', status: 'Pending' },
  ]);
  const [stats] = useState({
    ordersToday: 1247,
    activeRiders: 43,
    totalTransactions: 5420,
    platformRevenue: 'PKR 2.34M'
  });

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedPlatform');
    if (!hasVisited) {
      setVisitorCount(prev => prev + 1);
      sessionStorage.setItem('hasVisitedPlatform', 'true');
    }

    // Simulate live updates
    const interval = setInterval(() => {
      setLiveOrders(prev => {
        const updated = [...prev];
        updated[0].progress = Math.min(100, updated[0].progress + Math.random() * 5);
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBackToLogin = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1b] via-[#0d1425] to-[#050810] text-white flex flex-col justify-between selection:bg-[#00D4FF] selection:text-black">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Top Header - Enhanced */}
      <header className="relative z-50 border-b border-[#1a2847] bg-[#0d1425]/70 backdrop-blur-xl sticky top-0 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#1a2847] to-[#0d1425] border border-[#00D4FF]/30 rounded-2xl p-2.5 shadow-lg inline-flex items-center justify-center hover:border-[#00D4FF]/60 transition">
              <img src={logoCyan} alt="Logo" className="h-7 w-7 object-contain" />
            </div>
            <div>
              <span className="font-black text-xl bg-gradient-to-r from-[#00D4FF] to-cyan-300 bg-clip-text text-transparent">Ali.com Pro</span>
              <span className="text-[9px] font-mono block text-[#00D4FF] opacity-70">LIVE PLATFORM DEMO</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-[#0f1a2e]/80 border border-[#1a3a5a] px-4 py-2.5 rounded-xl text-xs text-slate-300 shadow-inner hover:border-[#00D4FF]/30 transition">
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D4FF]"></span>
                </span>
                <span className="text-white font-mono font-bold text-sm">{visitorCount.toLocaleString()}</span>
              </div>
              <span className="text-slate-400">live visitors</span>
            </div>

            <button 
              onClick={handleBackToLogin}
              className="bg-gradient-to-r from-[#00D4FF] to-cyan-400 hover:from-[#00E5FF] hover:to-cyan-300 text-black font-bold px-6 py-2.5 rounded-xl text-xs transition duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <LogIn size={14} /> Admin Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1">

        {/* Hero Section - Redesigned */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32 text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/40 text-[#00D4FF] text-xs font-bold shadow-lg hover:bg-[#00D4FF]/20 transition cursor-default">
            <Activity size={15} className="animate-pulse" /> Live Operations Dashboard
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter text-white leading-tight max-w-5xl mx-auto">
              Enterprise Logistics 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-cyan-400 to-blue-400 mt-2">Built for Speed</span>
            </h1>

            <p className="text-slate-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Real-time order management, intelligent fleet tracking, and blockchain-grade financial systems—powering Pakistan's fastest logistics network.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            <div className="bg-[#0f1a2e]/60 border border-[#1a3a5a] rounded-xl p-4 hover:border-[#00D4FF]/40 transition group cursor-default">
              <div className="text-3xl lg:text-4xl font-black text-[#00D4FF]">{stats.ordersToday.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-1">Orders Today</div>
            </div>
            <div className="bg-[#0f1a2e]/60 border border-[#1a3a5a] rounded-xl p-4 hover:border-[#00D4FF]/40 transition group cursor-default">
              <div className="text-3xl lg:text-4xl font-black text-cyan-400">{stats.activeRiders}</div>
              <div className="text-xs text-slate-400 mt-1">Active Riders</div>
            </div>
            <div className="bg-[#0f1a2e]/60 border border-[#1a3a5a] rounded-xl p-4 hover:border-[#00D4FF]/40 transition group cursor-default">
              <div className="text-3xl lg:text-4xl font-black text-blue-400">{stats.totalTransactions.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-1">Transactions</div>
            </div>
            <div className="bg-[#0f1a2e]/60 border border-[#1a3a5a] rounded-xl p-4 hover:border-[#00D4FF]/40 transition group cursor-default">
              <div className="text-3xl lg:text-4xl font-black text-emerald-400">{stats.platformRevenue}</div>
              <div className="text-xs text-slate-400 mt-1">Platform Revenue</div>
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 space-y-8">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-white">Watch It Live</h2>
            <p className="text-slate-400 text-sm">Real-time data from our production environment</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-3 border-b border-[#1a3a5a] overflow-x-auto pb-0">
            {[
              { id: 'orders', label: 'Live Orders', icon: Package },
              { id: 'riders', label: 'Fleet Status', icon: Truck },
              { id: 'transactions', label: 'Transactions', icon: Wallet }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap transition border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[#00D4FF] text-[#00D4FF]'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Live Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-3 animate-fade-in">
              {liveOrders.map((order, idx) => (
                <div key={idx} className="bg-[#0f1a2e]/60 border border-[#1a3a5a] rounded-xl p-5 hover:border-[#00D4FF]/40 transition group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
                        <Package size={20} className="text-blue-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white">{order.id}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          <MapPin size={12} className="inline mr-1" />
                          {order.destination} • Rider: {order.rider}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-bold px-3 py-1 rounded-full ${
                        order.status === 'Delivering' ? 'bg-orange-500/20 text-orange-400' :
                        order.status === 'Picked Up' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {order.status}
                      </div>
                      <div className="text-xs text-slate-400 mt-2">{order.time}</div>
                    </div>
                  </div>
                  <div className="bg-[#0a0f1b]/60 rounded-lg p-2 overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-400">Progress</span>
                      <span className="text-xs font-bold text-[#00D4FF]">{Math.round(order.progress)}%</span>
                    </div>
                    <div className="w-full bg-[#1a3a5a] rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00D4FF] to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live Riders Tab */}
          {activeTab === 'riders' && (
            <div className="space-y-3 animate-fade-in">
              {liveRiders.map((rider, idx) => (
                <div key={idx} className="bg-[#0f1a2e]/60 border border-[#1a3a5a] rounded-xl p-5 hover:border-[#00D4FF]/40 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
                        <Truck size={20} className="text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white">{rider.name}</div>
                        <div className="text-xs text-slate-400 mt-1">{rider.id} • {rider.zone}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end mb-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          rider.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {rider.status === 'Active' && <span className="inline-block h-2 w-2 bg-emerald-400 rounded-full mr-1"></span>}
                          {rider.status}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-[#00D4FF]">{rider.earnings}</div>
                      <div className="text-xs text-slate-400 mt-1">{rider.orders} deliveries</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-3 animate-fade-in">
              {transactions.map((txn, idx) => (
                <div key={idx} className="bg-[#0f1a2e]/60 border border-[#1a3a5a] rounded-xl p-5 hover:border-[#00D4FF]/40 transition flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-600/20 p-3 rounded-lg border border-emerald-500/30">
                      <Wallet size={20} className={txn.amount.includes('-') ? 'text-red-400' : 'text-emerald-400'} />
                    </div>
                    <div>
                      <div className="font-bold text-white">{txn.type}</div>
                      <div className="text-xs text-slate-400 mt-1">{txn.id} • {txn.user}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-lg ${txn.amount.includes('-') ? 'text-red-400' : 'text-emerald-400'}`}>
                      {txn.amount}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        txn.status === 'Success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {txn.status}
                      </span>
                      <span className="text-xs text-slate-400">{txn.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Feature Cards - Redesigned */}
        <section className="max-w-7xl mx-auto px-6 py-16 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl lg:text-4xl font-black text-white">Core Capabilities</h2>
            <p className="text-slate-400">Production-grade systems handling millions in daily transactions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: 'Order Management',
                desc: 'Dispatch 1000+ orders/hour with real-time tracking and automated zone allocation.',
                features: ['Smart Dispatch', 'COD & Online', 'Zone Balancing'],
                color: 'blue'
              },
              {
                icon: Truck,
                title: 'Fleet Operations',
                desc: 'Manage 100+ riders with live GPS tracking, performance metrics, and commission engine.',
                features: ['Live Tracking', 'Performance Stats', 'Auto Commission'],
                color: 'purple'
              },
              {
                icon: Wallet,
                title: 'Financial Engine',
                desc: 'Double-entry accounting with wallet system, subscriptions, and real-time audit trail.',
                features: ['Secure Wallets', 'Compliance Ready', 'Instant Settle'],
                color: 'emerald'
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              const colorMap = {
                blue: { bg: 'from-blue-600/20 to-blue-500/10', border: 'border-blue-500/30', icon: 'text-blue-400', accent: 'bg-blue-600/20' },
                purple: { bg: 'from-purple-600/20 to-purple-500/10', border: 'border-purple-500/30', icon: 'text-purple-400', accent: 'bg-purple-600/20' },
                emerald: { bg: 'from-emerald-600/20 to-emerald-500/10', border: 'border-emerald-500/30', icon: 'text-emerald-400', accent: 'bg-emerald-600/20' }
              }[feature.color];

              return (
                <div key={idx} className={`bg-gradient-to-br ${colorMap.bg} border ${colorMap.border} rounded-2xl p-8 hover:border-[#00D4FF]/40 transition group cursor-default`}>
                  <div className={`h-14 w-14 rounded-xl ${colorMap.accent} border ${colorMap.border} flex items-center justify-center ${colorMap.icon} mb-6 group-hover:scale-110 transition transform`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{feature.desc}</p>
                  <div className="space-y-2 pt-6 border-t border-white/10">
                    {feature.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={14} className={colorMap.icon} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-r from-[#0f1a2e] via-[#0a1a2e] to-[#050f1e] border border-[#00D4FF]/40 rounded-2xl p-12 text-center space-y-6 hover:border-[#00D4FF]/60 transition">
            <h2 className="text-3xl font-black text-white">Ready to Transform Your Logistics?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Join hundreds of businesses already using Ali.com Pro to scale operations and maximize profitability.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button 
                onClick={handleBackToLogin}
                className="bg-gradient-to-r from-[#00D4FF] to-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] active:scale-95"
              >
                Get Started <ArrowRight size={16} className="inline ml-2" />
              </button>
              <button className="border border-[#00D4FF]/60 text-[#00D4FF] font-bold px-8 py-3 rounded-xl hover:bg-[#00D4FF]/10 transition">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1a3a5a] bg-[#0a0f1b]/50 backdrop-blur-sm py-8 px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Ali.com Pro • Enterprise Logistics Platform</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-[#00D4FF] transition">Privacy</button>
            <button className="hover:text-[#00D4FF] transition">Terms</button>
            <button className="hover:text-[#00D4FF] transition">Security</button>
            <span className="text-[#00D4FF]">•</span>
            <div className="flex items-center gap-1 text-slate-400">
              <Globe size={12} className="text-[#00D4FF]" /> Global Network
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
      `}</style>
    </div>
  );
}