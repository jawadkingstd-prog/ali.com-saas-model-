import React, { useState } from 'react';
import { User, Shield, Key, BellRing, Settings, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Syed Ali',
    email: 'admin@ledger.com',
    phone: '+92 300 9876543',
    role: 'Super Administrator',
    company: 'Ali.com Logistics'
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('System profile settings updated successfully!', {
      style: { background: '#111C2E', color: '#FFFFFF', borderLeft: '4px solid #36D399' }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 antialiased py-4">
      {/* Centered Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
          <Settings className="text-[#4EA5FF]" size={24} />
          Profile Settings
        </h1>
        <p className="text-xs text-[#9FB6D4]">Centralized administration dashboard controls & developer info</p>
      </div>

      {/* Profile Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Avatar Card */}
        <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-[#090E17] border-2 border-[#4EA5FF] flex items-center justify-center text-[#4EA5FF] text-3xl font-black shadow-inner">
              SA
            </div>
            <span className="absolute bottom-1 right-1 h-5 w-5 bg-[#36D399] border-2 border-[#111C2E] rounded-full flex items-center justify-center" title="Active Account">
              <CheckCircle2 size={10} className="text-white" />
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{profile.name}</h3>
            <p className="text-[11px] text-[#9FB6D4]/80">{profile.role}</p>
            <p className="text-[10px] text-[#33D1FF] font-semibold tracking-wider mt-1 font-mono uppercase">{profile.company}</p>
          </div>
          
          <div className="w-full pt-4 border-t border-[#28415F]/60 flex justify-around text-center">
            <div>
              <p className="text-[10px] text-[#9FB6D4] uppercase font-bold">Node</p>
              <p className="text-xs font-bold text-white font-mono">LHE-01</p>
            </div>
            <div>
              <p className="text-[10px] text-[#9FB6D4] uppercase font-bold">Status</p>
              <p className="text-xs font-bold text-[#36D399] font-mono">Secure</p>
            </div>
          </div>
        </div>

        {/* Right Side: Configuration Options */}
        <form onSubmit={handleSave} className="md:col-span-2 bg-[#111C2E] border border-[#28415F] rounded-2xl p-6 space-y-4 shadow-xl">
          <h4 className="text-xs font-bold text-[#4EA5FF] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#28415F] pb-3 mb-2">
            <User size={14} /> Account Credentials
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Admin Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Registered Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full bg-[#090E17]/50 border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-[#9FB6D4]/50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Phone Contact</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Node System</label>
              <select className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none">
                <option>Active Console Terminal</option>
                <option>Backup Standby Server</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Update Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}