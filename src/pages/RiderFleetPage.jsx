import React, { useState, useMemo } from 'react';
import { Truck, Phone, MapPin, CheckCircle2, Clock, Users, DollarSign, Search, ShieldCheck, Navigation, Star, TrendingUp, MessageSquare, Eye, Filter, ArrowUpDown, Award, AlertCircle } from 'lucide-react';

export default function RiderFleetPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Enhanced Rider Fleet Data
  const [riders, setRiders] = useState([
    { 
      id: 'RDR-101', 
      name: 'Usman Ali', 
      phone: '+92 300 1234567', 
      zone: 'Gulberg / DHA', 
      activeDeliveries: 3, 
      status: 'On Delivery', 
      cashInHand: 12500,
      rating: 4.8,
      completedDeliveries: 245,
      joinDate: '2023-01-15',
      performance: 98,
      vehicle: 'Bike - White',
      totalEarnings: 125000
    },
    { 
      id: 'RDR-102', 
      name: 'Bilal Ahmed', 
      phone: '+92 321 9876543', 
      zone: 'Johar Town', 
      activeDeliveries: 0, 
      status: 'Available', 
      cashInHand: 0,
      rating: 4.6,
      completedDeliveries: 189,
      joinDate: '2023-03-20',
      performance: 96,
      vehicle: 'Car - Silver',
      totalEarnings: 95000
    },
    { 
      id: 'RDR-103', 
      name: 'Hamza Sheikh', 
      phone: '+92 333 4567890', 
      zone: 'Model Town', 
      activeDeliveries: 2, 
      status: 'On Delivery', 
      cashInHand: 8400,
      rating: 4.9,
      completedDeliveries: 312,
      joinDate: '2022-11-10',
      performance: 99,
      vehicle: 'Bike - Black',
      totalEarnings: 156000
    },
    { 
      id: 'RDR-104', 
      name: 'Zeeshan Malik', 
      phone: '+92 312 5554433', 
      zone: 'Bahria Town', 
      activeDeliveries: 0, 
      status: 'Offline', 
      cashInHand: 1500,
      rating: 4.3,
      completedDeliveries: 87,
      joinDate: '2023-08-05',
      performance: 92,
      vehicle: 'Bike - Red',
      totalEarnings: 43500
    },
  ]);

  // Calculate Summary Metrics
  const totalRiders = riders.length;
  const activeOnDelivery = riders.filter(r => r.status === 'On Delivery').length;
  const availableRiders = riders.filter(r => r.status === 'Available').length;
  const totalCashCollection = riders.reduce((acc, r) => acc + r.cashInHand, 0);
  const avgRating = (riders.reduce((acc, r) => acc + r.rating, 0) / riders.length).toFixed(1);

  // Filter and Sort riders
  const filteredRiders = useMemo(() => {
    let filtered = riders.filter(r => {
      const matchesSearch = 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sorting logic
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'earnings') {
      filtered.sort((a, b) => b.totalEarnings - a.totalEarnings);
    } else if (sortBy === 'performance') {
      filtered.sort((a, b) => b.performance - a.performance);
    }

    return filtered;
  }, [searchQuery, riders, statusFilter, sortBy]);

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto px-4 py-6 bg-gradient-to-br from-slate-950 via-[#0f1419] to-slate-950 min-h-screen rounded-3xl">
      
      {/* Header with Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <Truck size={20} className="text-[#4EA5FF]" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Rider Fleet & Logistics</h1>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse">LIVE OPS</span>
          </div>
          <p className="text-sm text-slate-400 ml-13">Real-time tracking, performance analytics, and cash settlements</p>
        </div>
      </div>

      {/* Enhanced Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-[#28415F] rounded-2xl p-5 shadow-lg backdrop-blur-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Fleet</p>
          <h3 className="text-2xl font-black text-white">{totalRiders}</h3>
          <p className="text-xs text-slate-500 mt-1">Active riders</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-600/10 to-green-600/10 border border-[#28415F] rounded-2xl p-5 shadow-lg backdrop-blur-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">On Route</p>
          <h3 className="text-2xl font-black text-emerald-400">{activeOnDelivery}</h3>
          <p className="text-xs text-slate-500 mt-1">Delivering now</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-[#28415F] rounded-2xl p-5 shadow-lg backdrop-blur-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Available</p>
          <h3 className="text-2xl font-black text-blue-400">{availableRiders}</h3>
          <p className="text-xs text-slate-500 mt-1">Ready for orders</p>
        </div>

        <div className="bg-gradient-to-br from-amber-600/10 to-orange-600/10 border border-[#28415F] rounded-2xl p-5 shadow-lg backdrop-blur-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cash Collection</p>
          <h3 className="text-2xl font-black text-amber-400">PKR {(totalCashCollection/1000).toFixed(0)}K</h3>
          <p className="text-xs text-slate-500 mt-1">Pending settlement</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border border-[#28415F] rounded-2xl p-5 shadow-lg backdrop-blur-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Avg Rating</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-black text-yellow-400">{avgRating}</h3>
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>
          <p className="text-xs text-slate-500 mt-1">Fleet performance</p>
        </div>
      </div>

      {/* Advanced Filters & Controls */}
      <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search by name, zone, or rider ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#17263C] border border-[#28415F] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#4EA5FF] focus:ring-1 focus:ring-[#4EA5FF]/30"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#17263C] border border-[#28415F] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4EA5FF] cursor-pointer"
            >
              <option>All</option>
              <option>Available</option>
              <option>On Delivery</option>
              <option>Offline</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-slate-400" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#17263C] border border-[#28415F] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4EA5FF] cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
              <option value="earnings">Sort by Earnings</option>
              <option value="performance">Sort by Performance</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <p className="text-xs text-slate-400">Showing <span className="text-white font-bold">{filteredRiders.length}</span> of <span className="text-white font-bold">{totalRiders}</span> riders</p>
      </div>

      {/* Riders Table */}
      <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-[#17263C]/80 to-[#1a2a3a]/80 uppercase tracking-wider text-slate-400 border-b border-[#28415F]">
              <tr>
                <th className="px-4 py-4 font-semibold">Rider Info</th>
                <th className="px-4 py-4 font-semibold">Rating</th>
                <th className="px-4 py-4 font-semibold">Active Orders</th>
                <th className="px-4 py-4 font-semibold">Performance</th>
                <th className="px-4 py-4 font-semibold">Cash</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {filteredRiders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    <AlertCircle className="mx-auto mb-2 text-slate-500" size={24} />
                    No riders found matching your search.
                  </td>
                </tr>
              ) : (
                filteredRiders.map((rider) => (
                  <tr key={rider.id} className="hover:bg-[#17263C]/50 transition-all duration-200 border-l-2 border-transparent hover:border-l-[#4EA5FF]">
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm">
                          {rider.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{rider.name}</p>
                          <p className="text-xs text-slate-500 font-mono">{rider.id}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin size={12} className="text-slate-500" />
                            <p className="text-xs text-slate-400">{rider.zone}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-white">{rider.rating}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{rider.completedDeliveries} deliveries</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              rider.activeDeliveries === 0 ? 'bg-slate-600' :
                              rider.activeDeliveries === 1 ? 'bg-blue-500' :
                              rider.activeDeliveries === 2 ? 'bg-purple-500' : 'bg-red-500'
                            }`}
                            style={{width: `${(rider.activeDeliveries / 5) * 100}%`}}
                          ></div>
                        </div>
                        <span className="font-bold text-white min-w-fit">{rider.activeDeliveries}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                            style={{width: `${rider.performance}%`}}
                          ></div>
                        </div>
                        <span className="font-bold text-emerald-400 text-sm">{rider.performance}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-mono font-bold text-amber-400">PKR {rider.cashInHand.toLocaleString()}</p>
                      <p className="text-xs text-slate-500 mt-1">Pending</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                        rider.status === 'Available' 
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                          : rider.status === 'On Delivery'
                          ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          : 'bg-slate-500/15 text-slate-400 border border-slate-500/30'
                      }`}>
                        <span className={`h-2 w-2 rounded-full ${rider.status === 'Available' ? 'bg-emerald-400' : rider.status === 'On Delivery' ? 'bg-blue-400 animate-pulse' : 'bg-slate-400'}`}></span>
                        {rider.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedRider(rider);
                          setSelectedTab('overview');
                          setModalOpen(true);
                        }}
                        className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-500/40 hover:from-blue-600/60 hover:to-cyan-600/60 text-blue-300 hover:text-white px-4 py-2 rounded-lg font-bold transition duration-200 text-xs"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Modal with Tabs */}
      {modalOpen && selectedRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
          <div className="w-full max-w-2xl bg-gradient-to-br from-[#111C2E] to-[#0f1419] border border-[#28415F] rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-b border-[#28415F] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-lg">
                    {selectedRider.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedRider.name}</h2>
                    <p className="text-xs text-slate-400">{selectedRider.zone} • {selectedRider.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-slate-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2">
                {['overview', 'performance', 'history'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                      selectedTab === tab
                        ? 'bg-blue-600/50 text-white border border-blue-500/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 text-white space-y-6">
              
              {selectedTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                      <p className="text-xs text-slate-400 mb-2">Phone Number</p>
                      <p className="font-mono font-bold text-white flex items-center gap-2">
                        <Phone size={14} className="text-blue-400" /> {selectedRider.phone}
                      </p>
                    </div>
                    <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                      <p className="text-xs text-slate-400 mb-2">Vehicle</p>
                      <p className="font-bold text-white">{selectedRider.vehicle}</p>
                    </div>
                    <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                      <p className="text-xs text-slate-400 mb-2">Rating</p>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-white text-lg">{selectedRider.rating}</span>
                      </div>
                    </div>
                    <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                      <p className="text-xs text-slate-400 mb-2">Total Earnings</p>
                      <p className="font-bold text-emerald-400">PKR {selectedRider.totalEarnings.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-600/15 to-orange-600/15 border border-amber-600/30 p-4 rounded-xl">
                    <p className="text-xs text-amber-300 font-bold mb-1">⚠ Cash Pending Settlement</p>
                    <p className="font-mono font-black text-amber-400 text-2xl">PKR {selectedRider.cashInHand.toLocaleString()}</p>
                  </div>
                </div>
              )}

              {selectedTab === 'performance' && (
                <div className="space-y-4">
                  <div className="bg-[#17263C] p-4 rounded-xl border border-[#28415F]">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-bold text-white">Performance Score</p>
                      <span className="text-lg font-black text-emerald-400">{selectedRider.performance}%</span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all"
                        style={{width: `${selectedRider.performance}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#17263C] p-3 rounded-lg border border-[#28415F] text-center">
                      <TrendingUp size={20} className="mx-auto mb-2 text-blue-400" />
                      <p className="text-xs text-slate-400 mb-1">Deliveries</p>
                      <p className="font-bold text-white">{selectedRider.completedDeliveries}</p>
                    </div>
                    <div className="bg-[#17263C] p-3 rounded-lg border border-[#28415F] text-center">
                      <Clock size={20} className="mx-auto mb-2 text-blue-400" />
                      <p className="text-xs text-slate-400 mb-1">Active Orders</p>
                      <p className="font-bold text-white">{selectedRider.activeDeliveries}</p>
                    </div>
                    <div className="bg-[#17263C] p-3 rounded-lg border border-[#28415F] text-center">
                      <Award size={20} className="mx-auto mb-2 text-yellow-400" />
                      <p className="text-xs text-slate-400 mb-1">Member Since</p>
                      <p className="font-bold text-white text-xs">{new Date(selectedRider.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'history' && (
                <div className="space-y-3">
                  <div className="bg-[#17263C] p-3 rounded-lg border border-[#28415F] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <div>
                        <p className="text-sm font-bold text-white">Last Settlement</p>
                        <p className="text-xs text-slate-400">2 hours ago - PKR 5,000</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#17263C] p-3 rounded-lg border border-[#28415F] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <div>
                        <p className="text-sm font-bold text-white">Previous Settlement</p>
                        <p className="text-xs text-slate-400">Yesterday - PKR 8,500</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#17263C] p-3 rounded-lg border border-[#28415F] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <div>
                        <p className="text-sm font-bold text-white">Recent Settlement</p>
                        <p className="text-xs text-slate-400">3 days ago - PKR 12,000</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#28415F] p-6 bg-[#17263C]/40 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-lg font-bold transition duration-200"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => alert(`Message sent to ${selectedRider.name}!`)}
                className="bg-blue-600/40 hover:bg-blue-600 border border-blue-500/50 text-blue-300 hover:text-white px-6 py-2.5 rounded-lg font-bold transition duration-200 flex items-center gap-2"
              >
                <MessageSquare size={16} /> Message
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Cash settlement recorded for ${selectedRider.name}!`);
                  setRiders(riders.map(r => r.id === selectedRider.id ? {...r, cashInHand: 0, status: 'Available'} : r));
                  setModalOpen(false);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-bold transition duration-200 flex items-center gap-2"
              >
                <CheckCircle2 size={16} /> Settle & Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}