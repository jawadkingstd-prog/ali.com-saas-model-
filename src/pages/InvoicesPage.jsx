import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileText, PlusCircle, Search, DollarSign, CheckCircle2, Clock, 
  AlertCircle, Download, Wallet, ArrowUpRight, Filter, Eye, X, Send, ShieldCheck 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [createModal, setCreateModal] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Form states for creating new invoice
  const [newCustomer, setNewCustomer] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Initial Invoices Data (persisted in localStorage)
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('aliLedger_invoices');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'INV-1001', customer: 'Ali Khan', amount: 8500, dueDate: '2026-08-15', status: 'Unpaid', description: 'Bulk Grocery Order #32', items: 4 },
      { id: 'INV-1002', customer: 'Ayesha Tariq', amount: 3200, dueDate: '2026-08-10', status: 'Paid', description: 'Express Delivery & Handling', items: 2 },
      { id: 'INV-1003', customer: 'Saad Raza', amount: 15400, dueDate: '2026-08-05', status: 'Overdue', description: 'Monthly Corporate Supply', items: 8 },
      { id: 'INV-1004', customer: 'Fatima Noor', amount: 4500, dueDate: '2026-08-20', status: 'Partial', description: 'Household Essentials', items: 3 },
    ];
  });

  useEffect(() => {
    localStorage.setItem('aliLedger_invoices', JSON.stringify(invoices));
  }, [invoices]);

  // Calculations for Summary Cards
  const totalBilled = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const totalCollected = invoices.filter(i => i.status === 'Paid').reduce((acc, inv) => acc + inv.amount, 0);
  const totalOutstanding = invoices.filter(i => i.status !== 'Paid').reduce((acc, inv) => acc + inv.amount, 0);
  const overdueCount = invoices.filter(i => i.status === 'Overdue').length;

  // Filter Logic
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            inv.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    if (!newCustomer || !newAmount || !newDueDate) {
      toast.error('Please fill out all required fields');
      return;
    }

    const newInv = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: newCustomer,
      amount: parseFloat(newAmount),
      dueDate: newDueDate,
      status: 'Unpaid',
      description: newDescription || 'General Invoice',
      items: 1
    };

    setInvoices([newInv, ...invoices]);
    toast.success('Invoice created and sent successfully!');
    setCreateModal(false);
    setNewCustomer('');
    setNewAmount('');
    setNewDueDate('');
    setNewDescription('');
  };

  const handleMarkAsPaid = (id) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: 'Paid' } : inv));
    toast.success('Invoice marked as Paid!');
    setPayModal(false);
  };

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto px-4 py-4 bg-gradient-to-br from-slate-950 via-[#0f1419] to-slate-950 min-h-screen rounded-2xl antialiased">
      
      {/* Header & Create Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <FileText size={20} className="text-[#4EA5FF]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Invoice & Payment Management</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Manage billing, track client receivables, and process wallet payments.</p>
        </div>

        <button
          onClick={() => setCreateModal(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <PlusCircle size={16} /> Create New Invoice
        </button>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-4 shadow-md">
          <p className="text-xs text-slate-400 uppercase font-semibold">Total Billed</p>
          <h3 className="text-xl font-black text-white mt-1">PKR {totalBilled.toLocaleString()}</h3>
          <p className="text-[10px] text-blue-400 mt-1">Across all invoices</p>
        </div>
        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-4 shadow-md">
          <p className="text-xs text-slate-400 uppercase font-semibold">Total Collected</p>
          <h3 className="text-xl font-black text-emerald-400 mt-1">PKR {totalCollected.toLocaleString()}</h3>
          <p className="text-[10px] text-emerald-400 mt-1">Successfully cleared</p>
        </div>
        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-4 shadow-md">
          <p className="text-xs text-slate-400 uppercase font-semibold">Outstanding Debt</p>
          <h3 className="text-xl font-black text-amber-400 mt-1">PKR {totalOutstanding.toLocaleString()}</h3>
          <p className="text-[10px] text-amber-400 mt-1">Pending payments</p>
        </div>
        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-4 shadow-md">
          <p className="text-xs text-slate-400 uppercase font-semibold">Overdue Invoices</p>
          <h3 className="text-xl font-black text-rose-400 mt-1">{overdueCount} Invoices</h3>
          <p className="text-[10px] text-rose-400 mt-1">Requires immediate attention</p>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="bg-[#111C2E] border border-[#28415F] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Search by Invoice ID or Customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#17263C] border border-[#28415F] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#4EA5FF]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#17263C] border border-[#28415F] rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Partial">Partial</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#17263C] uppercase text-slate-400 border-b border-[#28415F] text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3 font-semibold">Invoice ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Due Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">No invoices match your criteria.</td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#17263C]/50 transition-all">
                    <td className="px-4 py-3 font-mono font-bold text-blue-400">{inv.id}</td>
                    <td className="px-4 py-3 font-bold text-white">{inv.customer}</td>
                    <td className="px-4 py-3 text-slate-300">{inv.description}</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-400">PKR {inv.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-300 font-mono">{inv.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        inv.status === 'Paid' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                        inv.status === 'Overdue' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' :
                        inv.status === 'Partial' ? 'bg-purple-500/15 text-purple-400 border-purple-500/30' :
                        'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inv.status !== 'Paid' && (
                          <button
                            onClick={() => { setSelectedInvoice(inv); setPayModal(true); }}
                            className="bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/40 text-emerald-300 px-3 py-1 rounded font-bold text-[11px] cursor-pointer"
                          >
                            Pay Now
                          </button>
                        )}
                        <button
                          onClick={() => toast.success(`Downloading PDF Receipt for ${inv.id}`)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Download Receipt"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE INVOICE MODAL */}
      {createModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#28415F] pb-3">
              <h2 className="text-base font-bold text-white">Create New Invoice</h2>
              <button onClick={() => setCreateModal(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            
            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Customer Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Ali Khan"
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  className="w-full bg-[#17263C] border border-[#28415F] rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Amount (PKR)</label>
                  <input 
                    type="number"
                    required
                    placeholder="e.g. 5000"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full bg-[#17263C] border border-[#28415F] rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Due Date</label>
                  <input 
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-[#17263C] border border-[#28415F] rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Description / Order Summary</label>
                <textarea 
                  rows={2}
                  placeholder="Item details..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-[#17263C] border border-[#28415F] rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#28415F]">
                <button type="button" onClick={() => setCreateModal(false)} className="bg-slate-700 text-white px-4 py-2 rounded-xl">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1">Generate Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {payModal && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#28415F] pb-3">
              <h2 className="text-base font-bold text-white">Settle Invoice #{selectedInvoice.id}</h2>
              <button onClick={() => setPayModal(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="bg-[#17263C] p-3 rounded-xl border border-[#28415F] space-y-1">
                <p><span className="text-slate-400">Customer:</span> <span className="font-bold text-white">{selectedInvoice.customer}</span></p>
                <p><span className="text-slate-400">Total Due:</span> <span className="font-mono font-bold text-emerald-400">PKR {selectedInvoice.amount.toLocaleString()}</span></p>
              </div>

              <p className="text-slate-300">Choose payment settlement method:</p>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleMarkAsPaid(selectedInvoice.id)}
                  className="bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/40 text-emerald-300 p-3 rounded-xl font-bold flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Wallet size={18} /> Pay via Wallet
                </button>
                <button 
                  onClick={() => handleMarkAsPaid(selectedInvoice.id)}
                  className="bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/40 text-blue-300 p-3 rounded-xl font-bold flex flex-col items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck size={18} /> Cash / Credit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}