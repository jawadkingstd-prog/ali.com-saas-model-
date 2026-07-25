import React from 'react';
import { ShieldCheck, Truck, BarChart3, ArrowRight, Layers, Cpu, Globe } from 'lucide-react';

export default function PublicWebsiteView({ onLogout }) {
  return (
    <div className="min-h-screen bg-[#090E17] text-white p-6 lg:p-12 space-y-12">
      {/* Public Navbar Header */}
      <div className="flex items-center justify-between border-b border-[#28415F] pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-2.5 shadow-lg">
            <Globe className="h-6 w-6 text-[#4EA5FF]" />
          </div>
          <span className="font-black text-xl tracking-wider uppercase">Ali<span className="text-[#4EA5FF]">Ledger</span> Public Portal</span>
        </div>
        <button 
          onClick={onLogout}
          className="px-4 py-2 bg-[#111C2E] border border-[#28415F] hover:bg-[#17263C] text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          Sign Out / Exit
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6 py-10">
        <span className="px-3 py-1 bg-[#4EA5FF]/10 border border-[#4EA5FF]/20 text-[#4EA5FF] text-[10px] font-black uppercase tracking-widest rounded-full">
          Enterprise FinTech & Logistics Platform
        </span>
        <h1 className="text-4xl lg:text-6xl font-black tracking-tight">
          Next-Generation Financial Ledgers & Fleet Logistics
        </h1>
        <p className="text-sm lg:text-base text-[#9FB6D4] max-w-2xl mx-auto">
          We bridge secure institutional finance with high-speed automated delivery networks worldwide. Track our performance, products, and operational reach below.
        </p>
      </div>

      {/* Stats & Sales Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 space-y-2 text-center shadow-xl">
          <BarChart3 className="mx-auto text-[#4EA5FF] mb-2" size={28} />
          <h3 className="text-3xl font-black text-white">$142.8M+</h3>
          <p className="text-xs text-[#9FB6D4] uppercase tracking-wider font-semibold">Total Ledger Volume Covered</p>
        </div>
        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 space-y-2 text-center shadow-xl">
          <Truck className="mx-auto text-[#33D1FF] mb-2" size={28} />
          <h3 className="text-3xl font-black text-white">1.2M+</h3>
          <p className="text-xs text-[#9FB6D4] uppercase tracking-wider font-semibold">Successful Shipments Handled</p>
        </div>
        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 space-y-2 text-center shadow-xl">
          <ShieldCheck className="mx-auto text-[#36D399] mb-2" size={28} />
          <h3 className="text-3xl font-black text-white">99.98%</h3>
          <p className="text-xs text-[#9FB6D4] uppercase tracking-wider font-semibold">Platform Uptime & Security</p>
        </div>
      </div>

      {/* Services & Products */}
      <div className="max-w-5xl mx-auto space-y-6 pt-6">
        <h2 className="text-2xl font-black tracking-wider uppercase text-center">Our Core Services & Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#4EA5FF]/10 flex items-center justify-center text-[#4EA5FF]">
              <Layers size={20} />
            </div>
            <h4 className="text-lg font-bold text-white">Algorithmic Financial Ledgers</h4>
            <p className="text-xs text-[#9FB6D4] leading-relaxed">
              Real-time multi-currency transaction balancing, automated escrow accounting, and instant institutional clearance logs built with enterprise-grade reliability.
            </p>
          </div>
          <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#33D1FF]/10 flex items-center justify-center text-[#33D1FF]">
              <Cpu size={20} />
            </div>
            <h4 className="text-lg font-bold text-white">Smart Rider Fleet Routing</h4>
            <p className="text-xs text-[#9FB6D4] leading-relaxed">
              AI-powered dynamic dispatching and route optimization engine designed to minimize fuel burn, transit delays, and cargo vulnerability.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}