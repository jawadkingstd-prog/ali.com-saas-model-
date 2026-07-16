import React from 'react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const handleSaveSettings = (e) => {
    e.preventDefault();
    toast.success('Configuration saved successfully!', {
      style: { borderLeft: '4px solid #10b981' }
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-50">Account Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage system configurations and admin profile keys.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Admin Name</label>
              <input type="text" defaultValue="Jawad Admin" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">System Email</label>
              <input type="email" defaultValue="admin@ledger.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Currency Reference</label>
            <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer">
              <option value="PKR">PKR (Rs.)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          <button type="submit" className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md transition-all">
            Update System Keys
          </button>
        </form>
      </div>
    </div>
  );
}