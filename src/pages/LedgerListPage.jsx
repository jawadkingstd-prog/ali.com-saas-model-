import React, { useState } from 'react';
import toast from 'react-hot-toast';

// 100% Out-of-the-box chalne ke liye premium mock ledger data
const initialLedgers = [
  { id: 'ORD-9921', customerName: 'Amir Khan', date: '2026-07-01', totalAmount: 45000, paidAmount: 30000, status: 'Partial' },
  { id: 'ORD-9922', customerName: 'Zainab Bibi', date: '2026-07-04', totalAmount: 12000, paidAmount: 12000, status: 'Paid' },
  { id: 'ORD-9923', customerName: 'Bilal Ahmed', date: '2026-07-08', totalAmount: 85000, paidAmount: 0, status: 'Unpaid' },
];

export default function LedgerListPage({ onViewDetails }) {
  const [ledgers, setLedgers] = useState(initialLedgers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter Logic
  const filteredLedgers = ledgers.filter(ledger => {
    const matchesSearch = ledger.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ledger.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ledger.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Partial': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Unpaid': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-50">Ledger Statements</h1>
        <p className="text-sm text-slate-400 mt-1">Track payments, remaining balances, and invoice histories.</p>
      </div>

      {/* Premium Controls (Search & Filters) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 p-4 border border-slate-800 rounded-2xl">
        {/* Search Input */}
        <div className="sm:col-span-2 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID or Customer name..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-4 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all text-sm"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 transition-all text-sm cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Order Reference</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Financial Summary</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLedgers.length > 0 ? (
                filteredLedgers.map((ledger) => {
                  const remaining = ledger.totalAmount - ledger.paidAmount;
                  return (
                    <tr key={ledger.id} className="hover:bg-slate-850/40 transition-colors group">
                      
                      {/* Order ID & Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                          {ledger.id}
                        </span>
                        <div className="text-xs text-slate-500 mt-0.5">{ledger.date}</div>
                      </td>

                      {/* Customer Name */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-300">
                        {ledger.customerName}
                      </td>

                      {/* Financial Calculation */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-200">
                          Total: <span className="font-semibold">Rs. {ledger.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Remaining: <span className={remaining > 0 ? "text-rose-400 font-medium" : "text-emerald-400"}>Rs. {remaining.toLocaleString()}</span>
                        </div>
                      </td>

                      {/* Status Badges */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(ledger.status)}`}>
                          {ledger.status}
                        </span>
                      </td>

                      {/* View Details Call Action */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            toast.success(`Opening statement for ${ledger.id}`, { duration: 1500 });
                            onViewDetails(ledger.id);
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-md shadow-emerald-500/5 transition-all"
                        >
                          Statement →
                        </button>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500 text-sm">
                    No matching ledger statements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}