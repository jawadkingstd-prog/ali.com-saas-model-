import React from 'react';

export default function CustomerTable({ customers, onEdit, onDelete }) {
  
  // Status Badge Styling Helper
  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Inactive':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  if (customers.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500">
        No customers found. Click "Add New Customer" to start.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        
        {/* Table Head */}
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/40">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Customer Name</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Contact Details</th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-800/60">
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-slate-850/40 transition-colors group">
              
              {/* Name */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {customer.name}
                </div>
                <div className="text-xs text-slate-500">ID: #{customer.id}</div>
              </td>

              {/* Contact (Email & Phone) */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-slate-300">{customer.phone}</div>
                <div className="text-xs text-slate-500">{customer.email || 'No Email'}</div>
              </td>

              {/* Status Badge */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusClass(customer.status)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
                  {customer.status}
                </span>
              </td>

              {/* Action Buttons */}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => onEdit(customer)}
                    className="px-3 py-1.5 text-xs text-slate-300 hover:text-emerald-400 bg-slate-950 border border-slate-800 rounded-lg hover:border-emerald-500/30 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(customer)}
                    className="px-3 py-1.5 text-xs text-rose-400 hover:text-white hover:bg-rose-950/50 border border-transparent rounded-lg transition-all"
                  >
                    Delete
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}