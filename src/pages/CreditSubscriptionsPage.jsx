import React, { useState, useMemo } from 'react';
import { CreditCard, ShieldCheck, Zap, UserCheck, Plus, Search, Calendar, CheckCircle, Filter, Download, TrendingUp, Clock, AlertCircle, Edit2, Trash2, Eye, MoreVertical, ChevronUp, ChevronDown, Save, X } from 'lucide-react';

export default function CreditSubscriptionsPagePro() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Mock Credit Subscriptions Data (Expanded)
  const [subscriptions, setSubscriptions] = useState([
    { id: 'SUB-001', customerName: 'Faiza Malik', planName: 'Gold Credit Tier', creditLimit: 50000, utilizedCredit: 35000, billingCycle: 'Monthly', status: 'Active', renewalDate: '2026-08-15', joinDate: '2024-01-15', nextBillingDate: '2026-08-10', paymentMethod: 'Bank Transfer' },
    { id: 'SUB-002', customerName: 'Zainab Ahmed', planName: 'Silver Line', creditLimit: 25000, utilizedCredit: 18500, billingCycle: 'Monthly', status: 'Active', renewalDate: '2026-08-20', joinDate: '2024-02-20', nextBillingDate: '2026-08-15', paymentMethod: 'Card' },
    { id: 'SUB-003', customerName: 'Sajid Khan', planName: 'Enterprise Fleet', creditLimit: 150000, utilizedCredit: 120000, billingCycle: 'Weekly', status: 'Expiring Soon', renewalDate: '2026-08-02', joinDate: '2023-06-10', nextBillingDate: '2026-07-31', paymentMethod: 'Bank Transfer' },
    { id: 'SUB-004', customerName: 'Asad Ali', planName: 'Standard Starter', creditLimit: 10000, utilizedCredit: 500, billingCycle: 'Monthly', status: 'Suspended', renewalDate: '2026-07-30', joinDate: '2024-05-01', nextBillingDate: '2026-07-25', paymentMethod: 'Card' },
    { id: 'SUB-005', customerName: 'Hana Fatima', planName: 'Premium Plus', creditLimit: 75000, utilizedCredit: 62000, billingCycle: 'Monthly', status: 'Active', renewalDate: '2026-09-01', joinDate: '2024-03-15', nextBillingDate: '2026-08-12', paymentMethod: 'Bank Transfer' },
    { id: 'SUB-006', customerName: 'Karim Hassan', planName: 'Gold Credit Tier', creditLimit: 50000, utilizedCredit: 45000, billingCycle: 'Monthly', status: 'Active', renewalDate: '2026-08-25', joinDate: '2024-04-20', nextBillingDate: '2026-08-20', paymentMethod: 'Card' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);

  // Analytics
  const totalActive = subscriptions.filter(s => s.status === 'Active').length;
  const totalCreditAllocated = subscriptions.reduce((acc, s) => acc + s.creditLimit, 0);
  const totalUtilized = subscriptions.reduce((acc, s) => acc + s.utilizedCredit, 0);
  const utilizationRate = ((totalUtilized / totalCreditAllocated) * 100).toFixed(1);
  const expiringCount = subscriptions.filter(s => s.status === 'Expiring Soon').length;

  // Filter and Sort logic
  const filteredSubs = useMemo(() => {
    let filtered = subscriptions;

    if (filterStatus !== 'All') {
      filtered = filtered.filter(s => s.status === filterStatus);
    }

    filtered = filtered.filter(s => 
      s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.planName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aVal, bVal;

      switch(sortBy) {
        case 'creditLimit':
          aVal = a.creditLimit;
          bVal = b.creditLimit;
          break;
        case 'utilization':
          aVal = (a.utilizedCredit / a.creditLimit) * 100;
          bVal = (b.utilizedCredit / b.creditLimit) * 100;
          break;
        case 'customerName':
          aVal = a.customerName;
          bVal = b.customerName;
          break;
        default:
          aVal = a.id;
          bVal = b.id;
      }

      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [searchQuery, subscriptions, filterStatus, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredSubs.length / itemsPerPage);
  const paginatedSubs = filteredSubs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Customer', 'Plan', 'Credit Limit', 'Utilized', 'Utilization %', 'Status', 'Renewal Date'];
    const data = filteredSubs.map(s => [
      s.id,
      s.customerName,
      s.planName,
      s.creditLimit,
      s.utilizedCredit,
      ((s.utilizedCredit / s.creditLimit) * 100).toFixed(1),
      s.status,
      s.renewalDate
    ]);

    const csv = [headers, ...data].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'credit-subscriptions.csv';
    a.click();
  };

  // Handle View Details Button
  const handleViewDetails = () => {
    setViewDetails(true);
    setEditMode(false);
  };

  // Handle Edit Plan Button
  const handleEditPlan = () => {
    setEditMode(true);
    setViewDetails(false);
    setEditData({ ...selectedSub });
  };

  // Handle Save Edit
  const handleSaveEdit = () => {
    setSubscriptions(subscriptions.map(s => s.id === editData.id ? editData : s));
    setSelectedSub(editData);
    setEditMode(false);
    alert(`✅ Subscription updated successfully for ${editData.customerName}!`);
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData(null);
  };

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto px-4 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black tracking-tight text-white">Credit Subscriptions & Plans</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4EA5FF]/15 text-[#4EA5FF] border border-[#4EA5FF]/30">ENTERPRISE</span>
          </div>
          <p className="text-xs text-slate-400">Real-time credit line management with billing analytics and automated renewals.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-[#4EA5FF]/10 hover:bg-[#4EA5FF]/20 border border-[#4EA5FF]/30 text-[#4EA5FF] px-4 py-2.5 rounded-xl font-bold text-xs transition"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Summary Cards - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-[#28415F] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Plans</p>
            <Zap size={16} className="text-[#4EA5FF]" />
          </div>
          <h3 className="text-2xl font-black text-white font-mono">{totalActive}</h3>
          <p className="text-[10px] text-slate-500 mt-1">of {subscriptions.length} total</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-[#28415F] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Allocated</p>
            <CreditCard size={16} className="text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-emerald-400 font-mono">PKR {(totalCreditAllocated / 1000000).toFixed(1)}M</h3>
          <p className="text-[10px] text-slate-500 mt-1">Total limit</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-[#28415F] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Utilized</p>
            <TrendingUp size={16} className="text-purple-400" />
          </div>
          <h3 className="text-2xl font-black text-purple-400 font-mono">{utilizationRate}%</h3>
          <p className="text-[10px] text-slate-500 mt-1">PKR {(totalUtilized / 1000000).toFixed(1)}M</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-[#28415F] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expiring Soon</p>
            <AlertCircle size={16} className="text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-amber-400 font-mono">{expiringCount}</h3>
          <p className="text-[10px] text-slate-500 mt-1">within 15 days</p>
        </div>

        <div className="bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-[#28415F] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Renewals</p>
            <Clock size={16} className="text-rose-400" />
          </div>
          <h3 className="text-2xl font-black text-rose-400 font-mono">Automated</h3>
          <p className="text-[10px] text-slate-500 mt-1">24/7 monitoring</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-xl overflow-hidden">
        
        {/* Toolbar */}
        <div className="bg-[#17263C]/60 border-b border-[#28415F] p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Search customer, plan, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111C2E] border border-[#28415F] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#4EA5FF] transition"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#111C2E] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF] transition cursor-pointer"
              >
                <option>All</option>
                <option>Active</option>
                <option>Expiring Soon</option>
                <option>Suspended</option>
              </select>

              <button className="flex items-center gap-1.5 bg-[#111C2E] border border-[#28415F] hover:border-[#4EA5FF] text-slate-300 hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition">
                <Filter size={14} /> More
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#17263C]/60 uppercase tracking-wider text-slate-400 border-b border-[#28415F]">
              <tr>
                <th className="px-4 py-3.5 font-semibold">Sub ID</th>
                <th className="px-4 py-3.5 font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('customerName')}>
                  <div className="flex items-center gap-1">
                    Customer {sortBy === 'customerName' && (sortOrder === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                  </div>
                </th>
                <th className="px-4 py-3.5 font-semibold">Credit Plan</th>
                <th className="px-4 py-3.5 font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('creditLimit')}>
                  <div className="flex items-center gap-1">
                    Credit Limit {sortBy === 'creditLimit' && (sortOrder === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                  </div>
                </th>
                <th className="px-4 py-3.5 font-semibold">Utilization</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-4 py-3.5 font-semibold">Renewal</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {paginatedSubs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                    No subscriptions found.
                  </td>
                </tr>
              ) : (
                paginatedSubs.map((sub) => {
                  const utilization = (sub.utilizedCredit / sub.creditLimit) * 100;
                  return (
                    <tr key={sub.id} className="hover:bg-[#17263C]/40 transition-colors">
                      <td className="px-4 py-4 font-mono font-bold text-[#4EA5FF]">{sub.id}</td>
                      <td className="px-4 py-4 font-bold text-white flex items-center gap-2">
                        <UserCheck size={14} className="text-emerald-400" />
                        {sub.customerName}
                      </td>
                      <td className="px-4 py-4 text-slate-200">{sub.planName}</td>
                      <td className="px-4 py-4 font-mono font-bold text-emerald-400">
                        PKR {sub.creditLimit.toLocaleString()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-[#17263C] rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all ${
                                utilization > 80 ? 'bg-rose-500' : 
                                utilization > 50 ? 'bg-amber-500' : 
                                'bg-emerald-500'
                              }`}
                              style={{ width: `${utilization}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">{utilization.toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${
                          sub.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : sub.status === 'Expiring Soon'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          <CheckCircle size={10} />
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-mono text-slate-400 text-[10px]">{sub.renewalDate}</td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedSub(sub);
                            setEditMode(false);
                            setViewDetails(false);
                            setModalOpen(true);
                          }}
                          className="bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 text-blue-300 hover:text-white px-3 py-1.5 rounded-lg font-bold text-[10px] transition"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-[#17263C]/60 border-t border-[#28415F] px-6 py-4 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Showing {paginatedSubs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredSubs.length)} of {filteredSubs.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="bg-[#111C2E] border border-[#28415F] text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#4EA5FF]"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    currentPage === page
                      ? 'bg-[#4EA5FF] text-white'
                      : 'bg-[#111C2E] border border-[#28415F] text-slate-300 hover:border-[#4EA5FF]'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="bg-[#111C2E] border border-[#28415F] text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#4EA5FF]"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {modalOpen && selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#4EA5FF]/10 to-transparent border-b border-[#28415F] px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {editMode ? 'Edit Subscription' : viewDetails ? 'Subscription Details' : 'Manage Credit Subscription'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">{selectedSub.id} • {selectedSub.customerName}</p>
              </div>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditMode(false);
                  setViewDetails(false);
                  handleCancelEdit();
                }}
                className="text-slate-400 hover:text-white transition text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {editMode ? (
                // Edit Mode Form
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 block mb-2">Customer Name</label>
                      <input
                        type="text"
                        value={editData?.customerName || ''}
                        onChange={(e) => setEditData({ ...editData, customerName: e.target.value })}
                        className="w-full bg-[#17263C] border border-[#28415F] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-2">Plan Name</label>
                      <input
                        type="text"
                        value={editData?.planName || ''}
                        onChange={(e) => setEditData({ ...editData, planName: e.target.value })}
                        className="w-full bg-[#17263C] border border-[#28415F] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-2">Credit Limit</label>
                      <input
                        type="number"
                        value={editData?.creditLimit || ''}
                        onChange={(e) => setEditData({ ...editData, creditLimit: parseInt(e.target.value) })}
                        className="w-full bg-[#17263C] border border-[#28415F] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-2">Utilized Credit</label>
                      <input
                        type="number"
                        value={editData?.utilizedCredit || ''}
                        onChange={(e) => setEditData({ ...editData, utilizedCredit: parseInt(e.target.value) })}
                        className="w-full bg-[#17263C] border border-[#28415F] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-2">Billing Cycle</label>
                      <select
                        value={editData?.billingCycle || ''}
                        onChange={(e) => setEditData({ ...editData, billingCycle: e.target.value })}
                        className="w-full bg-[#17263C] border border-[#28415F] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#4EA5FF]"
                      >
                        <option>Monthly</option>
                        <option>Weekly</option>
                        <option>Quarterly</option>
                        <option>Annual</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-2">Status</label>
                      <select
                        value={editData?.status || ''}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                        className="w-full bg-[#17263C] border border-[#28415F] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#4EA5FF]"
                      >
                        <option>Active</option>
                        <option>Suspended</option>
                        <option>Expiring Soon</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-slate-400 block mb-2">Renewal Date</label>
                      <input
                        type="date"
                        value={editData?.renewalDate || ''}
                        onChange={(e) => setEditData({ ...editData, renewalDate: e.target.value })}
                        className="w-full bg-[#17263C] border border-[#28415F] text-white px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                      <p className="text-xs text-slate-400 mb-1">Customer</p>
                      <p className="text-sm font-bold text-white">{selectedSub.customerName}</p>
                    </div>
                    <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                      <p className="text-xs text-slate-400 mb-1">Plan</p>
                      <p className="text-sm font-bold text-white">{selectedSub.planName}</p>
                    </div>
                    <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                      <p className="text-xs text-slate-400 mb-1">Credit Limit</p>
                      <p className="text-sm font-bold text-emerald-400">PKR {selectedSub.creditLimit.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                      <p className="text-xs text-slate-400 mb-1">Utilized</p>
                      <p className="text-sm font-bold text-amber-400">PKR {selectedSub.utilizedCredit.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                      <p className="text-xs text-slate-400 mb-1">Billing Cycle</p>
                      <p className="text-sm font-bold text-white">{selectedSub.billingCycle}</p>
                    </div>
                    <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                      <p className="text-xs text-slate-400 mb-1">Next Billing</p>
                      <p className="text-sm font-bold text-white">{selectedSub.nextBillingDate}</p>
                    </div>
                  </div>

                  <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                    <p className="text-xs text-slate-400 mb-2">Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                      selectedSub.status === 'Active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : selectedSub.status === 'Expiring Soon'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      <CheckCircle size={12} />
                      {selectedSub.status}
                    </span>
                  </div>

                  {viewDetails && (
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 space-y-2">
                      <p className="text-xs text-slate-400"><strong>Join Date:</strong> {selectedSub.joinDate}</p>
                      <p className="text-xs text-slate-400"><strong>Payment Method:</strong> {selectedSub.paymentMethod}</p>
                      <p className="text-xs text-slate-400"><strong>Subscription ID:</strong> {selectedSub.id}</p>
                    </div>
                  )}

                  <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl">
                    <p className="text-xs text-slate-400 mb-2">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={handleViewDetails}
                        className="bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 text-blue-300 hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition">
                        <Eye size={12} className="inline mr-1" /> View Details
                      </button>
                      <button 
                        onClick={handleEditPlan}
                        className="bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 text-purple-300 hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition">
                        <Edit2 size={12} className="inline mr-1" /> Edit Plan
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-[#17263C] border-t border-[#28415F] px-6 py-4 flex justify-end gap-3">
              {editMode ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2"
                  >
                    <X size={14} /> Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2"
                  >
                    <Save size={14} /> Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-bold transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      alert(`✅ Subscription renewed for ${selectedSub.customerName}!`);
                      setSubscriptions(subscriptions.map(s => s.id === selectedSub.id ? {...s, status: 'Active'} : s));
                      setModalOpen(false);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2"
                  >
                    <CheckCircle size={14} /> Renew Subscription
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}