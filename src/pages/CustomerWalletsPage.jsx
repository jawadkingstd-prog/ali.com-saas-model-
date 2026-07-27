import React, { useState, useMemo } from 'react';
import { Wallet, ShieldAlert, PlusCircle, Search, ArrowUpRight, ArrowDownRight, UserCheck } from 'lucide-react';

export default function CustomerWalletsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock Customer Financial Data (Wallet + Credit Limit)
  const [customers, setCustomers] = useState([
    { id: 'CUST-001', name: 'Faiza Malik', walletBalance: 2500, creditLimit: 15000, outstanding: 4200, status: 'Active' },
    { id: 'CUST-002', name: 'Zainab Ahmed', walletBalance: 0, creditLimit: 10000, outstanding: 9500, status: 'Near Limit' },
    { id: 'CUST-003', name: 'Sajid Khan', walletBalance: 1200, creditLimit: 20000, outstanding: 1500, status: 'Active' },
    { id: 'CUST-004', name: 'Asad Ali', walletBalance: 5000, creditLimit: 5000, outstanding: 5000, status: 'Limit Exceeded' },
    { id: 'CUST-005', name: 'Sana Qureshi', walletBalance: 850, creditLimit: 12000, outstanding: 0, status: 'Active' },
  ]);

  const [topUpModal, setTopUpModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState('');

  // Filter logic based on search
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, customers]);

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    setCustomers(customers.map(c => {
      if (c.id === selectedCustomer.id) {
        const newWallet = c.walletBalance + Number(topUpAmount);
        return { ...c, walletBalance: newWallet, status: newWallet >= 0 ? 'Active' : c.status };
      }
      return c;
    }));

    setTopUpModal(false);
    setTopUpAmount('');
    setSelectedCustomer(null);
    alert('Wallet successfully updated!');
  };

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black tracking-tight text-white">Customer Wallets & Credits</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b] text-[#38bdf8] border border-[#334155]">FINTECH ENGINE</span>
          </div>
          <p className="text-xs text-slate-400">Manage advance balances, credit limits, and automated debt tracking.</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#111C2E] border border-[#1e293b] rounded-2xl shadow-xl overflow-hidden p-6">
        
        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search customer by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#17263C] border border-[#28415F] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#4EA5FF]"
            />
          </div>
        </div>

        {/* Customer Financial Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#17263C]/50 uppercase tracking-wider text-slate-400 border-b border-[#28415F]">
              <tr>
                <th className="px-4 py-3.5 font-semibold">Customer ID</th>
                <th className="px-4 py-3.5 font-semibold">Customer Name</th>
                <th className="px-4 py-3.5 font-semibold">Wallet Balance (Advance)</th>
                <th className="px-4 py-3.5 font-semibold">Credit Limit</th>
                <th className="px-4 py-3.5 font-semibold">Outstanding Debt</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    No customer records found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#17263C]/30 transition-colors">
                    <td className="px-4 py-4 font-mono font-bold text-[#4EA5FF]">{cust.id}</td>
                    <td className="px-4 py-4 font-bold text-white flex items-center gap-2">
                      <UserCheck size={14} className="text-emerald-400" />
                      {cust.name}
                    </td>
                    <td className="px-4 py-4 font-mono font-bold text-emerald-400">
                      PKR {cust.walletBalance.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 font-mono text-slate-300">
                      PKR {cust.creditLimit.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 font-mono font-bold text-amber-400">
                      PKR {cust.outstanding.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                        cust.status === 'Active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : cust.status === 'Near Limit'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedCustomer(cust);
                          setTopUpModal(true);
                        }}
                        className="inline-flex items-center gap-1 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 text-blue-300 hover:text-white px-3 py-1.5 rounded-xl font-bold transition cursor-pointer"
                      >
                        <PlusCircle size={12} /> Top Up Wallet
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Up Wallet Modal */}
      {topUpModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#111C2E] border border-[#1e293b] rounded-2xl shadow-2xl p-6 text-white">
            <h2 className="text-base font-bold mb-2">Top-Up Wallet</h2>
            <p className="text-xs text-slate-400 mb-4">
              Adding advance credit for <span className="text-white font-bold">{selectedCustomer.name}</span>
            </p>

            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Enter Amount (PKR)</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 2000"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full bg-[#17263C] border border-[#28415F] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-[#4EA5FF]"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-[#1e293b]">
                <button
                  type="button"
                  onClick={() => setTopUpModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Confirm Top-Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}