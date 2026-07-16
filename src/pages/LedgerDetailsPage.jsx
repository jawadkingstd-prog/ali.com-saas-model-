import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function LedgerDetailsPage({ orderId, onBack }) {
  // Details Page state management mapping mock wrapper
  const [orderSummary, setOrderSummary] = useState({
    id: orderId || 'ORD-9921',
    customerName: 'Amir Khan',
    phone: '+92 300 1234567',
    date: '2026-07-01',
    totalAmount: 45000,
    paidAmount: 30000,
    transactions: [
      { id: 'TXN-101', date: '2026-07-01', amount: 20000, method: 'Cash' },
      { id: 'TXN-102', date: '2026-07-05', amount: 10000, method: 'Bank Transfer' }
    ]
  });

  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const remainingBalance = orderSummary.totalAmount - orderSummary.paidAmount;

  const handleAddPayment = (e) => {
    e.preventDefault();
    const amount = parseFloat(paymentAmount);

    if (!amount || amount <= 0) {
      toast.error('Please enter a valid payment amount.', {
        style: { borderLeft: '4px solid #f43f5e' }
      });
      return;
    }

    if (amount > remainingBalance) {
      toast.error(`Amount exceeds remaining balance of Rs. ${remainingBalance}`, {
        style: { borderLeft: '4px solid #f43f5e' }
      });
      return;
    }

    // Append calculation dynamically
    const updatedPaid = orderSummary.paidAmount + amount;
    const newTxn = {
      id: `TXN-${Date.now().toString().slice(-3)}`,
      date: new Date().toISOString().split('T')[0],
      amount: amount,
      method: paymentMethod
    };

    setOrderSummary({
      ...orderSummary,
      paidAmount: updatedPaid,
      transactions: [...orderSummary.transactions, newTxn]
    });

    setPaymentAmount('');
    
    // Premium Success Toast Requirement 
    toast.success(`Success! Payment of Rs. ${amount.toLocaleString()} added.`, {
      style: { borderLeft: '4px solid #10b981' }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Back Button & Header */}
      <div className="flex items-center space-x-4 border-b border-slate-900 pb-5">
        <button
          onClick={onBack}
          className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-100 bg-slate-900 border border-slate-800 rounded-xl transition-all"
        >
          ← Back to List
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-50">Statement Details: <span className="font-mono text-emerald-400">{orderSummary.id}</span></h2>
          <p className="text-xs text-slate-400 mt-0.5">Customer: {orderSummary.customerName} ({orderSummary.phone})</p>
        </div>
      </div>

      {/* Grid Layout for Scorecards and Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Financial Cards & Transaction History */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stats Badges Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Invoice</div>
              <div className="text-xl font-bold text-slate-100 mt-1">Rs. {orderSummary.totalAmount.toLocaleString()}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Received</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">Rs. {orderSummary.paidAmount.toLocaleString()}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Remaining Due</div>
              <div className="text-xl font-bold text-rose-400 mt-1">Rs. {remainingBalance.toLocaleString()}</div>
            </div>
          </div>

          {/* Transaction History Logs */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/20">
              <h3 className="text-sm font-semibold text-slate-300">Payment Audit Logs</h3>
            </div>
            <div className="divide-y divide-slate-800/60">
              {orderSummary.transactions.map((txn) => (
                <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-slate-850/20 transition-all">
                  <div>
                    <span className="text-xs font-mono font-semibold text-slate-400">{txn.id}</span>
                    <div className="text-xs text-slate-500 mt-0.5">{txn.date} • via {txn.method}</div>
                  </div>
                  <div className="text-sm font-bold text-emerald-400">
                    + Rs. {txn.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Record New Payment (Form Container) */}
        <div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl sticky top-6">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-b border-slate-800 pb-3">
              Collect Installment
            </h3>
            
            <form onSubmit={handleAddPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Amount to Collect (Rs.)
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="e.g. 5000"
                  disabled={remainingBalance === 0}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-700 focus:outline-none focus:border-emerald-500 transition-all text-sm disabled:opacity-40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Payment Mode
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  disabled={remainingBalance === 0}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 transition-all text-sm cursor-pointer disabled:opacity-40"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={remainingBalance === 0}
                className="w-full py-2.5 px-4 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl shadow-lg shadow-emerald-500/5 transition-all disabled:cursor-not-allowed"
              >
                {remainingBalance === 0 ? 'Invoice Fully Settled' : 'Post Transaction'}
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}