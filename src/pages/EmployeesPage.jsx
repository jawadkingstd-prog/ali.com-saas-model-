import React, { useState, useEffect } from 'react';
import { UserCheck, Plus, Mail, Trash2, X, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([
    { id: 'EMP-101', name: 'Ali (Rider 1)', email: 'delivery1@ledger.com', role: 'Delivery Rider', status: 'Active' },
    { id: 'EMP-102', name: 'Usman (Rider 2)', email: 'delivery2@ledger.com', role: 'Delivery Rider', status: 'Active' },
    { id: 'EMP-103', name: 'Bilal (Rider 3)', email: 'delivery3@ledger.com', role: 'Delivery Rider', status: 'Active' },
    { id: 'EMP-104', name: 'Hamza (Rider 4)', email: 'delivery4@ledger.com', role: 'Delivery Rider', status: 'Active' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Delete confirmation state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Delivery Rider');

  useEffect(() => {
    const saved = localStorage.getItem('aliLedgerEmployees');
    if (saved) {
      try { 
        setEmployees(JSON.parse(saved)); 
      } catch (e) { 
        console.error("Error loading employees", e); 
      }
    }
  }, []);

  const saveToStorage = (updated) => {
    setEmployees(updated);
    localStorage.setItem('aliLedgerEmployees', JSON.stringify(updated));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const newEmp = {
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      email: email.trim(),
      role,
      status: 'Active'
    };

    const updated = [newEmp, ...employees];
    saveToStorage(updated);
    toast.success(`Employee ${newEmp.name} added successfully!`);
    setShowModal(false);
    setName('');
    setEmail('');
    setRole('Delivery Rider');
  };

  const handleDeleteConfirm = () => {
    if (employeeToDelete) {
      const updated = employees.filter(e => e.id !== employeeToDelete.id);
      saveToStorage(updated);
      toast.success(`Employee ${employeeToDelete.name} removed successfully.`);
      setEmployeeToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#111C2E] border border-[#28415F] p-6 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <UserCheck className="text-[#4EA5FF]" size={20} /> Employees & Staff Directory
          </h2>
          <p className="text-xs text-[#9FB6D4]">Add, manage, and monitor company staff, managers, and delivery riders.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus size={16} strokeWidth={3} /> Hire / Add Employee
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#28415F] text-[10px] font-bold uppercase tracking-widest text-[#9FB6D4] bg-[#090E17]/40">
                <th className="p-4">Employee ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email / Credentials</th>
                <th className="p-4">Designation / Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#28415F]/50 text-xs">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[#9FB6D4]">
                    No employees found in the directory.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-[#17263C]/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#4EA5FF]">{emp.id}</td>
                    <td className="p-4 font-bold text-white">{emp.name}</td>
                    <td className="p-4 text-[#9FB6D4] flex items-center gap-1.5"><Mail size={12} className="text-[#4EA5FF]" /> {emp.email}</td>
                    <td className="p-4 font-semibold text-white">{emp.role}</td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setEmployeeToDelete(emp)}
                        className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 p-2 rounded-lg transition cursor-pointer"
                        title="Remove Employee"
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

      {/* Add Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#28415F] pb-4">
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="text-[#4EA5FF]" size={18} /> Add New Employee
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#9FB6D4] hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9FB6D4] mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#4EA5FF]"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9FB6D4] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. tariq@ledger.com"
                  className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#4EA5FF]"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9FB6D4] mb-1">Role / Designation</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#4EA5FF] cursor-pointer"
                >
                  <option value="Delivery Rider">Delivery Rider</option>
                  <option value="Dispatch Manager">Dispatch Manager</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Operations Executive">Operations Executive</option>
                </select>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#28415F]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#9FB6D4] hover:bg-[#17263C] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl transition shadow-lg cursor-pointer"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {employeeToDelete && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#28415F] pb-4">
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="text-rose-400" size={18} /> Confirm Deletion
              </h3>
              <button onClick={() => setEmployeeToDelete(null)} className="text-[#9FB6D4] hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-[#9FB6D4]">
                Are you sure you want to remove <strong className="text-white">{employeeToDelete.name}</strong> from the system? This action cannot be undone.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#28415F]">
              <button
                type="button"
                onClick={() => setEmployeeToDelete(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#9FB6D4] hover:bg-[#17263C] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl transition shadow-lg cursor-pointer"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}