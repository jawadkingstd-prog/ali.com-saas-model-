import React from 'react';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) {
  if (!isOpen) return null;

  // Type ke mutabik color theme select karna
  const isDanger = type === 'danger';
  const actionButtonClass = isDanger
    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/30'
    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      
      {/* Dialog Card */}
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform scale-100 transition-all">
        
        {/* Content Area */}
        <div className="p-6 text-center">
          {/* Icon Badge */}
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4 bg-slate-950 border ${isDanger ? 'border-rose-500/30 text-rose-400' : 'border-emerald-500/30 text-emerald-400'}`}>
            {isDanger ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>

          {/* Text */}
          <h3 className="text-lg font-semibold text-slate-50 tracking-tight mb-2">
            {title || 'Are you absolutely sure?'}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {message || 'This action cannot be undone. Please double check before proceeding.'}
          </p>
        </div>

        {/* Actions Footer */}
        <div className="px-6 py-4 bg-slate-950/50 border-t border-slate-800 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${actionButtonClass}`}
          >
            {isDanger ? 'Delete Record' : 'Confirm Action'}
          </button>
        </div>

      </div>
    </div>
  );
}