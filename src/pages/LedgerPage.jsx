import React, { useState, useMemo } from 'react';
import { Plus, Download, Filter, Search, CheckCircle, Clock, Trash2, X } from 'lucide-react';

export default function LedgersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  
  const [ledgers, setLedgers] = useState([
    { id: 'TXN-9081', party: 'Faiza Malik', transaction: 'Credit Received', amount: 'PKR 12,500', status: 'Completed' },
    { id: 'TXN-9082', party: 'Zainab Ahmed', transaction: 'Outstanding Debit', amount: 'PKR 3,200', status: 'Pending' },
    { id: 'TXN-9083', party: 'Sajid Khan', transaction: 'Rider Allowance', amount: 'PKR 1,500', status: 'Completed' },
    { id: 'TXN-9084', party: 'Asad Ali', transaction: 'Settled Ledger', amount: 'PKR 8,000', status: 'Completed' },
    { id: 'TXN-9085', party: 'Sana Qureshi', transaction: 'Outstanding Debit', amount: 'PKR 1,500', status: 'Pending' },
  ]);

  const [form, setForm] = useState({
    party: '',
    transaction: 'Credit Received',
    amount: '',
    status: 'Completed'
  });

  const filteredLedgers = useMemo(() => {
    return ledgers.filter((item) => {
      const matchesSearch = 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.transaction.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = 
        statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, ledgers]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `TXN-${9000 + ledgers.length + 1}`,
      party: form.party,
      transaction: form.transaction,
      amount: `PKR ${Number(form.amount).toLocaleString()}`,
      status: form.status,
    };
    setLedgers([newEntry, ...ledgers]);
    setModalOpen(false);
    setForm({ party: '', transaction: 'Credit Received', amount: '', status: 'Completed' });
  };

  const handleDelete = (id) => {
    setLedgers(ledgers.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black tracking-tight text-white">Ledgers</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b] text-[#38bdf8] border border-[#334155]">ADMIN</span>
          </div>
          <p className="text-xs text-slate-400">Transaction audit trail.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-lg cursor-pointer"
        >
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      {/* Main Content Box */}
      <div className="bg-[#111C2E] border border-[#1e293b] rounded-2xl shadow-xl overflow-hidden p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#17263C] border border-[#28415F] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#4EA5FF]"
            />
          </div>

          {/* Filters & Export */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-[#17263C] border border-[#28415F] px-3.5 py-2 rounded-xl text-xs text-slate-300">
              <Filter size={14} className="text-[#4EA5FF]" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-white outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#111C2E]">All Ledgers Log</option>
                <option value="completed" className="bg-[#111C2E]">Completed</option>
                <option value="pending" className="bg-[#111C2E]">Pending</option>
              </select>
            </div>

            <button 
              onClick={() => alert('Exporting audit logs to CSV...')}
              className="flex items-center gap-2 bg-[#17263C] border border-[#28415F] hover:bg-[#203450] text-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#17263C]/50 uppercase tracking-wider text-slate-400 border-b border-[#28415F]">
              <tr>
                <th className="px-4 py-3.5 font-semibold">Reference ID</th>
                <th className="px-4 py-3.5 font-semibold">Account Party</th>
                <th className="px-4 py-3.5 font-semibold">Transaction</th>
                <th className="px-4 py-3.5 font-semibold">Amount</th>
                <th className="px-4 py-3.5 font-semibold">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredLedgers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                    No transaction logs found.
                  </td>
                </tr>
              ) : (
                filteredLedgers.map((log) => (
                  <tr key={log.id} className="hover:bg-[#17263C]/30 transition-colors">
                    <td className="px-4 py-4 font-mono font-bold text-[#4EA5FF]">{log.id}</td>
                    <td className="px-4 py-4 font-bold text-white">{log.party}</td>
                    <td className="px-4 py-4 text-slate-300">{log.transaction}</td>
                    <td className="px-4 py-4 font-mono font-bold text-white">{log.amount}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                        log.status === 'Completed' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {log.status === 'Completed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => handleDelete(log.id)}
                        className="text-slate-400 hover:text-red-400 transition cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#111C2E] border border-[#1e293b] rounded-2xl shadow-2xl p-6 text-white">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-4 mb-4">
              <h2 className="text-base font-bold">Add New Transaction</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Account Party Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Ahmed"
                  value={form.party}
                  onChange={(e) => setForm({ ...form, party: e.target.value })}
                  className="w-full bg-[#17263C] border border-[#28415F] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-[#4EA5FF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Transaction Type</label>
                <select
                  value={form.transaction}
                  onChange={(e) => setForm({ ...form, transaction: e.target.value })}
                  className="w-full bg-[#17263C] border border-[#28415F] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="Credit Received">Credit Received</option>
                  <option value="Outstanding Debit">Outstanding Debit</option>
                  <option value="Rider Allowance">Rider Allowance</option>
                  <option value="Settled Ledger">Settled Ledger</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Amount (PKR)</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 5000"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full bg-[#17263C] border border-[#28415F] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-[#4EA5FF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-[#17263C] border border-[#28415F] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-[#1e293b]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}