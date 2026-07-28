import React, { useState, useMemo } from 'react';
import { 
  Wallet, ShieldAlert, PlusCircle, Search, Edit3, UserCheck, TrendingUp, 
  TrendingDown, DollarSign, AlertCircle, Filter, ArrowUpDown, Eye, 
  CreditCard, Zap, BarChart3, Clock, CheckCircle2, ArrowRight, Smartphone,
  Mail, MapPin, Activity
} from 'lucide-react';

export default function CustomerWalletsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  
  // Mock Customer Financial Data
  const [customers, setCustomers] = useState([
    { 
      id: 'CUST-001', 
      name: 'Faiza Malik', 
      walletBalance: 2500, 
      creditLimit: 15000, 
      outstanding: 4200, 
      status: 'Active',
      email: 'faiza@email.com',
      phone: '+92 300 1234567',
      joinDate: '2023-01-15',
      totalSpent: 45000,
      transactions: 12,
      lastTransaction: '2 hours ago'
    },
    { 
      id: 'CUST-002', 
      name: 'Zainab Ahmed', 
      walletBalance: 0, 
      creditLimit: 10000, 
      outstanding: 9500, 
      status: 'Near Limit',
      email: 'zainab@email.com',
      phone: '+92 321 9876543',
      joinDate: '2023-03-20',
      totalSpent: 38000,
      transactions: 8,
      lastTransaction: '5 hours ago'
    },
    { 
      id: 'CUST-003', 
      name: 'Sajid Khan', 
      walletBalance: 1200, 
      creditLimit: 20000, 
      outstanding: 1500, 
      status: 'Active',
      email: 'sajid@email.com',
      phone: '+92 333 4567890',
      joinDate: '2023-02-10',
      totalSpent: 52000,
      transactions: 15,
      lastTransaction: '1 hour ago'
    },
    { 
      id: 'CUST-004', 
      name: 'Asad Ali', 
      walletBalance: 5000, 
      creditLimit: 5000, 
      outstanding: 5000, 
      status: 'Limit Exceeded',
      email: 'asad@email.com',
      phone: '+92 312 5554433',
      joinDate: '2023-04-05',
      totalSpent: 28000,
      transactions: 6,
      lastTransaction: '12 hours ago'
    },
    { 
      id: 'CUST-005', 
      name: 'Sana Qureshi', 
      walletBalance: 850, 
      creditLimit: 12000, 
      outstanding: 0, 
      status: 'Active',
      email: 'sana@email.com',
      phone: '+92 344 8765432',
      joinDate: '2023-05-12',
      totalSpent: 35000,
      transactions: 10,
      lastTransaction: '3 hours ago'
    },
  ]);

  const [topUpModal, setTopUpModal] = useState(false);
  const [creditModal, setCreditModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [creditLimitAmount, setCreditLimitAmount] = useState('');

  // Calculate dynamic status
  const getStatus = (outstanding, limit) => {
    if (outstanding >= limit) return 'Limit Exceeded';
    if (outstanding >= limit * 0.8) return 'Near Limit';
    return 'Active';
  };

  // Calculate credit utilization percentage
  const getCreditUtilization = (outstanding, limit) => {
    return Math.round((outstanding / limit) * 100);
  };

  // Calculate Summary Metrics
  const totalCustomers = customers.length;
  const totalWalletBalance = customers.reduce((acc, c) => acc + c.walletBalance, 0);
  const totalOutstanding = customers.reduce((acc, c) => acc + c.outstanding, 0);
  const totalCreditLimit = customers.reduce((acc, c) => acc + c.creditLimit, 0);
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const riskCustomers = customers.filter(c => c.status === 'Limit Exceeded').length;

  // Filter and Sort
  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter(c => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'balance') {
      filtered.sort((a, b) => b.walletBalance - a.walletBalance);
    } else if (sortBy === 'outstanding') {
      filtered.sort((a, b) => b.outstanding - a.outstanding);
    } else if (sortBy === 'utilization') {
      filtered.sort((a, b) => 
        getCreditUtilization(b.outstanding, b.creditLimit) - 
        getCreditUtilization(a.outstanding, a.creditLimit)
      );
    }

    return filtered;
  }, [searchQuery, customers, statusFilter, sortBy]);

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer || !topUpAmount) return;

    setCustomers(customers.map(c => {
      if (c.id === selectedCustomer.id) {
        const newWallet = c.walletBalance + Number(topUpAmount);
        return { 
          ...c, 
          walletBalance: newWallet, 
          status: getStatus(c.outstanding, c.creditLimit),
          lastTransaction: 'Just now'
        };
      }
      return c;
    }));

    setTopUpModal(false);
    setTopUpAmount('');
    setSelectedCustomer(null);
    alert('✅ Wallet topped up successfully!');
  };

  const handleCreditSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer || !creditLimitAmount) return;

    const newLimit = Number(creditLimitAmount);
    setCustomers(customers.map(c => {
      if (c.id === selectedCustomer.id) {
        return { 
          ...c, 
          creditLimit: newLimit, 
          status: getStatus(c.outstanding, newLimit)
        };
      }
      return c;
    }));

    setCreditModal(false);
    setCreditLimitAmount('');
    setSelectedCustomer(null);
    alert('✅ Credit limit updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0f1419] to-slate-950 text-white px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Premium Header */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <Wallet size={24} className="text-white" />
                </div>
                <h1 className="text-4xl font-black tracking-tight">Customer Wallets</h1>
              </div>
              <p className="text-slate-400 flex items-center gap-2">
                <Activity size={14} /> Advance balances, credit limits & debt tracking
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                FINTECH LIVE
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Summary Stats - 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Card 1: Total Customers */}
          <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-blue-600/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">Total Customers</p>
              <UserCheck className="text-blue-400" size={18} />
            </div>
            <h3 className="text-2xl font-black text-white mb-1">{totalCustomers}</h3>
            <p className="text-xs text-blue-300/60">{activeCustomers} active</p>
          </div>

          {/* Card 2: Wallet Balance */}
          <div className="bg-gradient-to-br from-emerald-600/10 to-green-600/10 border border-emerald-500/20 rounded-2xl p-5 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-emerald-600/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">Total Wallet</p>
              <Wallet className="text-emerald-400" size={18} />
            </div>
            <h3 className="text-2xl font-black text-emerald-400 mb-1">PKR {(totalWalletBalance/1000).toFixed(1)}K</h3>
            <p className="text-xs text-emerald-300/60">Advance balance</p>
          </div>

          {/* Card 3: Outstanding Debt */}
          <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-amber-600/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">Outstanding</p>
              <TrendingDown className="text-amber-400" size={18} />
            </div>
            <h3 className="text-2xl font-black text-amber-400 mb-1">PKR {(totalOutstanding/1000).toFixed(1)}K</h3>
            <p className="text-xs text-amber-300/60">Pending recovery</p>
          </div>

          {/* Card 4: Total Credit Limit */}
          <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-2xl p-5 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-purple-600/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">Credit Limit</p>
              <CreditCard className="text-purple-400" size={18} />
            </div>
            <h3 className="text-2xl font-black text-purple-400 mb-1">PKR {(totalCreditLimit/1000).toFixed(1)}K</h3>
            <p className="text-xs text-purple-300/60">Total available</p>
          </div>

          {/* Card 5: Utilization Rate */}
          <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-blue-600/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">Utilization</p>
              <BarChart3 className="text-blue-400" size={18} />
            </div>
            <h3 className="text-2xl font-black text-blue-400 mb-1">{Math.round((totalOutstanding/totalCreditLimit)*100)}%</h3>
            <p className="text-xs text-blue-300/60">Avg credit used</p>
          </div>

          {/* Card 6: Risk Customers */}
          <div className="bg-gradient-to-br from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-2xl p-5 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-rose-600/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-400 uppercase">At Risk</p>
              <AlertCircle className="text-rose-400" size={18} />
            </div>
            <h3 className="text-2xl font-black text-rose-400 mb-1">{riskCustomers}</h3>
            <p className="text-xs text-rose-300/60">Limit issues</p>
          </div>
        </div>

        {/* Advanced Controls Section */}
        <div className="bg-gradient-to-br from-[#111C2E] to-[#0f1419] border border-[#28415F] rounded-2xl p-6 backdrop-blur-sm shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-2">Search Customer</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text"
                  placeholder="Search by name or customer ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#17263C] border border-[#28415F] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4EA5FF] focus:ring-1 focus:ring-[#4EA5FF]/30 transition-all"
                />
              </div>
            </div>

            {/* Filters Grid */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Status Filter</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-[#17263C] border border-[#28415F] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4EA5FF] focus:ring-1 focus:ring-[#4EA5FF]/30 cursor-pointer transition-all"
              >
                <option value="All">All Status</option>
                <option value="Active">Active Only</option>
                <option value="Near Limit">Near Limit</option>
                <option value="Limit Exceeded">Limit Exceeded</option>
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 pt-4 border-t border-[#28415F] flex flex-wrap gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-2">
              <ArrowUpDown size={14} /> Sort by:
            </span>
            {[
              { value: 'name', label: 'Name' },
              { value: 'balance', label: 'Balance' },
              { value: 'outstanding', label: 'Outstanding' },
              { value: 'utilization', label: 'Utilization' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  sortBy === option.value
                    ? 'bg-blue-600/40 text-blue-200 border border-blue-500/50'
                    : 'bg-[#17263C] text-slate-400 border border-[#28415F] hover:border-[#4EA5FF]/50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Results Counter */}
          <p className="text-xs text-slate-400 mt-4">
            Showing <span className="text-white font-bold">{filteredCustomers.length}</span> of <span className="text-white font-bold">{totalCustomers}</span> customers
          </p>
        </div>

        {/* Main Customer Table */}
        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-[#17263C]/80 to-[#1a2a3a]/80 text-slate-300 border-b border-[#28415F] uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left font-semibold">Wallet Balance</th>
                  <th className="px-6 py-4 text-left font-semibold">Credit Limit</th>
                  <th className="px-6 py-4 text-left font-semibold">Outstanding</th>
                  <th className="px-6 py-4 text-left font-semibold">Utilization</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b]">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <AlertCircle className="mx-auto mb-3 text-slate-500" size={32} />
                      <p className="text-slate-400">No customers found</p>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((cust) => {
                    const utilization = getCreditUtilization(cust.outstanding, cust.creditLimit);
                    return (
                      <tr 
                        key={cust.id} 
                        className="hover:bg-[#17263C]/60 transition-all border-l-4 border-transparent hover:border-l-blue-500"
                      >
                        {/* Customer Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {cust.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-white">{cust.name}</p>
                              <p className="text-xs text-slate-500 font-mono">{cust.id}</p>
                            </div>
                          </div>
                        </td>

                        {/* Wallet Balance */}
                        <td className="px-6 py-4">
                          <div className="font-bold text-emerald-400 font-mono">PKR {cust.walletBalance.toLocaleString()}</div>
                          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <TrendingUp size={12} /> Advance credit
                          </p>
                        </td>

                        {/* Credit Limit */}
                        <td className="px-6 py-4">
                          <div className="font-bold text-purple-400 font-mono">PKR {cust.creditLimit.toLocaleString()}</div>
                          <p className="text-xs text-slate-500 mt-1">Max allowed</p>
                        </td>

                        {/* Outstanding */}
                        <td className="px-6 py-4">
                          <div className="font-bold text-amber-400 font-mono">PKR {cust.outstanding.toLocaleString()}</div>
                          <p className="text-xs text-slate-500 mt-1">Pending</p>
                        </td>

                        {/* Utilization Bar */}
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <div className="h-2 w-32 bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  utilization >= 100 ? 'bg-rose-500' :
                                  utilization >= 80 ? 'bg-amber-500' :
                                  utilization >= 50 ? 'bg-blue-500' :
                                  'bg-emerald-500'
                                }`}
                                style={{width: `${Math.min(utilization, 100)}%`}}
                              ></div>
                            </div>
                            <span className={`text-xs font-bold ${
                              utilization >= 100 ? 'text-rose-400' :
                              utilization >= 80 ? 'text-amber-400' :
                              'text-emerald-400'
                            }`}>
                              {utilization}%
                            </span>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                            cust.status === 'Active' 
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                              : cust.status === 'Near Limit'
                              ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                              : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                          }`}>
                            {cust.status === 'Limit Exceeded' ? (
                              <ShieldAlert size={13} />
                            ) : cust.status === 'Near Limit' ? (
                              <AlertCircle size={13} />
                            ) : (
                              <CheckCircle2 size={13} />
                            )}
                            {cust.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedCustomer(cust);
                                setDetailsModal(true);
                              }}
                              className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/40 hover:text-blue-200 transition-all"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedCustomer(cust);
                                setTopUpAmount('');
                                setTopUpModal(true);
                              }}
                              className="px-3 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/40 text-xs font-bold transition-all flex items-center gap-1"
                              title="Top Up Wallet"
                            >
                              <PlusCircle size={14} /> Top Up
                            </button>
                            <button
                              onClick={() => {
                                setSelectedCustomer(cust);
                                setCreditLimitAmount(cust.creditLimit);
                                setCreditModal(true);
                              }}
                              className="px-3 py-2 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/40 text-xs font-bold transition-all flex items-center gap-1"
                              title="Edit Credit Limit"
                            >
                              <Edit3 size={14} /> Limit
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* TOP UP WALLET MODAL */}
      {topUpModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg">
          <div className="w-full max-w-md bg-gradient-to-br from-[#111C2E] to-[#0f1419] border border-[#28415F] rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600/20 to-green-600/20 border-b border-[#28415F] p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/30 border border-emerald-500/50 flex items-center justify-center">
                    <Wallet className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Top-Up Wallet</h2>
                    <p className="text-xs text-slate-400">Add advance balance</p>
                  </div>
                </div>
                <button
                  onClick={() => setTopUpModal(false)}
                  className="text-slate-400 hover:text-white transition text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Customer Info Card */}
              <div className="bg-[#17263C] border border-[#28415F] rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Customer</p>
                  <p className="text-sm font-bold text-white">{selectedCustomer.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Current Balance</p>
                  <p className="text-sm font-bold text-emerald-400">PKR {selectedCustomer.walletBalance.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleTopUpSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Enter Amount (PKR)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="number"
                      required
                      min="1"
                      step="100"
                      placeholder="e.g. 5000"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      className="w-full bg-[#17263C] border border-[#28415F] rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                    />
                  </div>
                  {topUpAmount && (
                    <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <p className="text-xs text-slate-400">New Balance</p>
                      <p className="text-lg font-bold text-emerald-400">
                        PKR {(selectedCustomer.walletBalance + Number(topUpAmount || 0)).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#28415F] flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTopUpModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <PlusCircle size={16} /> Confirm Top-Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CREDIT LIMIT MODAL */}
      {creditModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg">
          <div className="w-full max-w-md bg-gradient-to-br from-[#111C2E] to-[#0f1419] border border-[#28415F] rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-[#28415F] p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/30 border border-purple-500/50 flex items-center justify-center">
                    <CreditCard className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Modify Credit Limit</h2>
                    <p className="text-xs text-slate-400">Set max credit threshold</p>
                  </div>
                </div>
                <button
                  onClick={() => setCreditModal(false)}
                  className="text-slate-400 hover:text-white transition text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Customer Info Card */}
              <div className="bg-[#17263C] border border-[#28415F] rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Customer</p>
                  <p className="text-sm font-bold text-white">{selectedCustomer.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Current Outstanding</p>
                  <p className="text-sm font-bold text-amber-400">PKR {selectedCustomer.outstanding.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleCreditSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">New Credit Limit (PKR)</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="number"
                      required
                      min="0"
                      step="100"
                      placeholder="e.g. 25000"
                      value={creditLimitAmount}
                      onChange={(e) => setCreditLimitAmount(e.target.value)}
                      className="w-full bg-[#17263C] border border-[#28415F] rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                    />
                  </div>

                  {creditLimitAmount && (
                    <div className="mt-4 space-y-2">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-xs text-slate-400">New Limit</p>
                        <p className="text-lg font-bold text-blue-400">PKR {Number(creditLimitAmount).toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <p className="text-xs text-slate-400">Utilization After Change</p>
                        <p className="text-lg font-bold text-purple-400">
                          {Math.round((selectedCustomer.outstanding / Number(creditLimitAmount)) * 100)}%
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#28415F] flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCreditModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Zap size={16} /> Update Limit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMER DETAILS MODAL */}
      {detailsModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-lg">
          <div className="w-full max-w-2xl bg-gradient-to-br from-[#111C2E] to-[#0f1419] border border-[#28415F] rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-[#28415F] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xl">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCustomer.name}</h2>
                    <p className="text-sm text-slate-400 font-mono">{selectedCustomer.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDetailsModal(false)}
                  className="text-slate-400 hover:text-white transition text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#17263C] border border-[#28415F] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone size={14} className="text-blue-400" />
                    <p className="text-xs text-slate-400">Phone</p>
                  </div>
                  <p className="text-sm font-bold text-white">{selectedCustomer.phone}</p>
                </div>
                <div className="bg-[#17263C] border border-[#28415F] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail size={14} className="text-blue-400" />
                    <p className="text-xs text-slate-400">Email</p>
                  </div>
                  <p className="text-sm font-bold text-white">{selectedCustomer.email}</p>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-emerald-600/10 to-green-600/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-400 mb-2">Wallet Balance</p>
                  <p className="text-2xl font-black text-emerald-400">PKR {selectedCustomer.walletBalance.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 border border-amber-500/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-400 mb-2">Outstanding</p>
                  <p className="text-2xl font-black text-amber-400">PKR {selectedCustomer.outstanding.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-400 mb-2">Credit Limit</p>
                  <p className="text-2xl font-black text-purple-400">PKR {selectedCustomer.creditLimit.toLocaleString()}</p>
                </div>
              </div>

              {/* Activity & History */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#17263C] border border-[#28415F] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className="text-blue-400" />
                    <p className="text-xs text-slate-400">Last Transaction</p>
                  </div>
                  <p className="text-sm font-bold text-white">{selectedCustomer.lastTransaction}</p>
                </div>
                <div className="bg-[#17263C] border border-[#28415F] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={14} className="text-blue-400" />
                    <p className="text-xs text-slate-400">Total Spent</p>
                  </div>
                  <p className="text-sm font-bold text-white">PKR {selectedCustomer.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-4 border-t border-[#28415F]">
                <button
                  onClick={() => setDetailsModal(false)}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold transition-all"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}