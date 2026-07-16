import React, { useState, useMemo } from 'react';
import { TrendingUp, ArrowUpRight, DollarSign, Users, Award, LayoutGrid, Calendar, Filter } from 'lucide-react';

export default function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const transactions = [
    { id: 'TXN-9081', client: 'Faiza Malik', type: 'Credit Received', amount: 12500, date: '2026-07-15', status: 'Completed' },
    { id: 'TXN-9082', client: 'Zainab Ahmed', type: 'Outstanding Debit', amount: 3200, date: '2026-07-14', status: 'Pending' },
    { id: 'TXN-9083', client: 'Sajid Khan', type: 'Rider Allowance', amount: 1500, date: '2026-07-14', status: 'Completed' },
    { id: 'TXN-9084', client: 'Asad Ali', type: 'Settled Ledger', amount: 8000, date: '2026-07-13', status: 'Completed' },
    { id: 'TXN-9085', client: 'Sana Qureshi', type: 'Outstanding Debit', amount: 1500, date: '2026-07-12', status: 'Pending' },
  ];

  // Functional Filter implementation
  const filteredTxns = useMemo(() => {
    if (statusFilter === 'all') return transactions;
    return transactions.filter(t => t.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className="space-y-6 antialiased">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
          <LayoutGrid className="text-[#33D1FF]" size={24} />
          Executive Analytics
        </h1>
        <p className="text-xs text-[#9FB6D4]">Monitor logs, capital flow, and automated logistics telemetry</p>
      </div>

      {/* Interactive Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-5 relative overflow-hidden group hover:border-[#4EA5FF] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#9FB6D4] uppercase tracking-wider">Total Gross Revenue</span>
            <span className="text-xs font-bold text-[#36D399] bg-[#36D399]/10 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
              +18.4% <ArrowUpRight size={12} />
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-3 font-mono">PKR 482,900</h2>
          <div className="mt-4 text-[10px] text-[#9FB6D4]/60">System online / Syncing database nodes</div>
        </div>

        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-5 relative overflow-hidden group hover:border-[#4EA5FF] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#9FB6D4] uppercase tracking-wider">Active Deliveries</span>
            <span className="text-xs font-bold text-[#4EA5FF] bg-[#4EA5FF]/10 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
              Secure <TrendingUp size={12} className="animate-pulse" />
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-3 font-mono">92 Projects</h2>
          <div className="mt-4 text-[10px] text-[#9FB6D4]/60">Avg transit speed: 42 km/h</div>
        </div>

        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-5 relative overflow-hidden group hover:border-[#4EA5FF] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#9FB6D4] uppercase tracking-wider">Outstanding Liability</span>
            <span className="text-xs font-bold text-[#FF5C5C] bg-[#FF5C5C]/10 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
              Critical
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#FF5C5C] mt-3 font-mono">PKR 14,700</h2>
          <div className="mt-4 text-[10px] text-[#9FB6D4]/60">Overdue payments from 2 clients</div>
        </div>
      </div>

      {/* Transaction Log with functional Filter */}
      <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Calendar className="text-[#33D1FF]" size={16} /> Real-Time Ledgers
          </h3>
          
          {/* Functional Filter selector */}
          <div className="flex items-center gap-2 bg-[#090E17] border border-[#28415F] rounded-xl px-3 py-1.5 self-start sm:self-auto">
            <Filter size={12} className="text-[#9FB6D4]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#111C2E]">All Ledgers</option>
              <option value="Completed" className="bg-[#111C2E]">Completed</option>
              <option value="Pending" className="bg-[#111C2E]">Pending Alerts</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#28415F]/60 text-[10px] text-[#9FB6D4] uppercase tracking-wider bg-[#090E17]/40">
                <th className="p-3">Reference ID</th>
                <th className="p-3">Account Party</th>
                <th className="p-3">Transaction Name</th>
                <th className="p-3">Amount Type</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#28415F]/30 text-xs">
              {filteredTxns.map((txn) => (
                <tr key={txn.id} className="hover:bg-[#17263C] transition-colors">
                  <td className="p-3 font-mono text-[#4EA5FF] font-semibold">{txn.id}</td>
                  <td className="p-3 font-bold text-white">{txn.client}</td>
                  <td className="p-3 text-[#9FB6D4]">{txn.type}</td>
                  <td className="p-3 text-white font-mono font-semibold">PKR {txn.amount.toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      txn.status === 'Completed' 
                        ? 'text-[#36D399] bg-[#36D399]/10' 
                        : 'text-[#FFB020] bg-[#FFB020]/10'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}