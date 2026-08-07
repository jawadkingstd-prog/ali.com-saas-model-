import React, { useState, useEffect, useMemo } from 'react';
import { 
  Package, Truck, Plus, Search, Filter, ArrowUpDown, 
  ChevronLeft, ChevronRight, Trash2, Eye, X, CheckCircle2, 
  Clock, AlertCircle, MapPin, User, Shield, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrderManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dropdown & Modal States
  const [activeRowDropdown, setActiveRowDropdown] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewOrderModal, setViewOrderModal] = useState(null);

  // New Order Form State
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    phone: '',
    address: '',
    riderName: '',
    amount: '',
    itemsSummary: '',
    status: 'Pending'
  });

  // --- LOCALSTORAGE PERSISTED ORDERS ---
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('aliLedger_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 101, customerName: 'Faiza Malik', phone: '+92 300 1234567', address: 'House 45, Street 2, Gulberg', riderName: 'Sajid Khan', amount: 4500, itemsSummary: '2x Basmati Rice 5kg', status: 'Dispatched', date: '2026-06-06' },
      { id: 102, customerName: 'Zainab Ahmed', phone: '+92 321 7654321', address: 'Apartment 12B, Clifton', riderName: 'Bilal Butt', amount: 1200, itemsSummary: '1x Cooking Oil 3L', status: 'Pending', date: '2026-06-06' },
      { id: 103, customerName: 'Asad Ali', phone: '+92 333 9876543', address: 'Sector F-7/2, Street 10', riderName: 'Kamran Shah', amount: 8900, itemsSummary: '4x Wheat Flour 10kg', status: 'Delivered', date: '2026-06-05' },
      { id: 104, customerName: 'Hamza Lodhi', phone: '+92 301 4567890', address: 'Main Peshawar Road, Block C', riderName: 'Waseem Akram', amount: 3400, itemsSummary: 'Sugar 5kg & Tea Pack', status: 'Dispatched', date: '2026-06-06' },
    ];
  });

  // Retrieve Riders from shared localStorage so it syncs with Customers/Fleet page
  const [ridersList, setRidersList] = useState(() => {
    const saved = localStorage.getItem('aliLedger_deliveryPersons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 1, name: 'Sajid Khan', phone: '+92 300 9998887', vehicle: 'Motorcycle', status: 'On Delivery', completed: 142 },
      { id: 2, name: 'Bilal Butt', phone: '+92 312 4445556', vehicle: 'Carry Dabba', status: 'Idle', completed: 320 },
      { id: 3, name: 'Kamran Shah', phone: '+92 345 2221110', vehicle: 'Suzuki Pickup', status: 'Idle', completed: 89 },
      { id: 4, name: 'Usman Ghani', phone: '+92 320 5556667', vehicle: 'Motorcycle', status: 'Idle', completed: 215 },
      { id: 5, name: 'Waseem Akram', phone: '+92 331 8881112', vehicle: 'Cargo Van', status: 'On Delivery', completed: 310 },
    ];
  });

  // Save Orders
  useEffect(() => {
    localStorage.setItem('aliLedger_orders', JSON.stringify(orders));
  }, [orders]);

  // Save Riders state when synced
  useEffect(() => {
    localStorage.setItem('aliLedger_deliveryPersons', JSON.stringify(ridersList));
  }, [ridersList]);

  // --- DYNAMIC RIDER STATUS SYNCHRONIZER FUNCTION ---
  const updateRiderFleetStatus = (riderName, newOrderStatus, oldOrderStatus = null) => {
    if (!riderName || riderName === 'Unassigned') return;

    setRidersList(prevRiders => {
      return prevRiders.map(rider => {
        if (rider.name.toLowerCase() === riderName.toLowerCase()) {
          let updatedStatus = rider.status;
          let tripIncrement = 0;

          if (newOrderStatus === 'Dispatched') {
            updatedStatus = 'On Delivery';
          } else if (newOrderStatus === 'Delivered') {
            updatedStatus = 'Idle';
            // Increment completed trip if it wasn't already delivered
            if (oldOrderStatus !== 'Delivered') {
              tripIncrement = 1;
            }
          } else if (newOrderStatus === 'Cancelled' || newOrderStatus === 'Pending') {
            updatedStatus = 'Idle';
          }

          return {
            ...rider,
            status: updatedStatus,
            completed: rider.completed + tripIncrement
          };
        }
        return rider;
      });
    });
  };

  // --- CHANGE ORDER STATUS HANDLER ---
  const handleOrderStatusChange = (orderId, targetStatus) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const previousStatus = targetOrder.status;

    // Update orders list
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return { ...ord, status: targetStatus };
      }
      return ord;
    }));

    // Sync with Rider Fleet
    updateRiderFleetStatus(targetOrder.riderName, targetStatus, previousStatus);

    setActiveRowDropdown(null);
    toast.success(`Order #${orderId} marked as ${targetStatus}! Rider fleet synced.`);
  };

  // --- DELETE ORDER HANDLER ---
  const handleDeleteOrder = (orderId) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (targetOrder && targetOrder.status === 'Dispatched') {
      // Free up rider if order deleted while dispatched
      updateRiderFleetStatus(targetOrder.riderName, 'Cancelled');
    }
    setOrders(orders.filter(o => o.id !== orderId));
    setActiveRowDropdown(null);
    toast.success('Order record deleted successfully!');
  };

  // --- ADD NEW ORDER HANDLER ---
  const handleAddOrderSubmit = (e) => {
    e.preventDefault();
    if (!newOrder.customerName || !newOrder.phone || !newOrder.amount) {
      toast.error('Customer name, phone and amount are required!');
      return;
    }

    const createdOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      customerName: newOrder.customerName,
      phone: newOrder.phone,
      address: newOrder.address || 'Lahore, PK',
      riderName: newOrder.riderName || 'Unassigned',
      amount: Number(newOrder.amount),
      itemsSummary: newOrder.itemsSummary || 'General Order Items',
      status: newOrder.status,
      date: new Date().toISOString().split('T')[0]
    };

    setOrders([createdOrder, ...orders]);

    // If created with Dispatched status, sync rider
    if (newOrder.status === 'Dispatched' && newOrder.riderName) {
      updateRiderFleetStatus(newOrder.riderName, 'Dispatched');
    }

    setNewOrder({ customerName: '', phone: '', address: '', riderName: '', amount: '', itemsSummary: '', status: 'Pending' });
    setShowAddModal(false);
    toast.success(`Order #${createdOrder.id} successfully created!`);
  };

  // --- FILTERING & SORTING LOGIC ---
  const processedOrders = useMemo(() => {
    let list = [...orders];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(o => 
        o.customerName.toLowerCase().includes(q) || 
        o.phone.includes(q) || 
        o.riderName.toLowerCase().includes(q) ||
        o.id.toString().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      list = list.filter(o => o.status.toLowerCase() === statusFilter.toLowerCase());
    }

    list.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'name') return a.customerName.localeCompare(b.customerName);
      return 0;
    });

    return list;
  }, [orders, searchQuery, statusFilter, sortBy]);

  // --- PAGINATION ---
  const totalItems = processedOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const pageItems = processedOrders.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 antialiased">

      {/* Top Header & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#28415F]/50 pb-5">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Package className="text-[#4EA5FF]" size={22} />
            Orders & Logistics Sync
          </h2>
          <p className="text-xs text-[#9FB6D4]">Manage customer orders and dispatch updates that automatically synchronize with your rider fleet status.</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-1.5 bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-extrabold text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer self-start md:self-auto"
        >
          <Plus size={16} strokeWidth={2.5} />
          Create New Order
        </button>
      </div>

      {/* Search & Filters Deck */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="relative md:col-span-5">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-[#9FB6D4]/50" />
          </span>
          <input
            type="text"
            placeholder="Search by order ID, customer, phone, or rider..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full bg-[#111C2E] border border-[#28415F] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#9FB6D4]/30 focus:outline-none focus:border-[#4EA5FF] transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2 md:col-span-3.5 bg-[#111C2E] border border-[#28415F] rounded-xl px-3 py-2">
          <Filter size={14} className="text-[#9FB6D4]/60" />
          <span className="text-[9px] uppercase font-bold text-[#9FB6D4] tracking-wider mr-1">Status:</span>
          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer font-semibold"
          >
            <option value="all" className="bg-[#111C2E]">All Order Statuses</option>
            <option value="pending" className="bg-[#111C2E]">Pending</option>
            <option value="dispatched" className="bg-[#111C2E]">Dispatched (On-Route)</option>
            <option value="delivered" className="bg-[#111C2E]">Delivered</option>
            <option value="cancelled" className="bg-[#111C2E]">Cancelled</option>
          </select>
        </div>

        <div className="flex items-center gap-2 md:col-span-3.5 bg-[#111C2E] border border-[#28415F] rounded-xl px-3 py-2">
          <ArrowUpDown size={14} className="text-[#9FB6D4]/60" />
          <span className="text-[9px] uppercase font-bold text-[#9FB6D4] tracking-wider mr-1">Sort:</span>
          <select 
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer font-semibold"
          >
            <option value="date" className="bg-[#111C2E]">Newest Date First</option>
            <option value="amount" className="bg-[#111C2E]">Highest Bill Amount</option>
            <option value="name" className="bg-[#111C2E]">Customer Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Orders Table Grid */}
      <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#28415F] bg-[#090E17]/40 text-[9px] text-[#9FB6D4] font-bold uppercase tracking-widest">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Assigned Rider</th>
                <th className="p-4 text-right">Bill Amount</th>
                <th className="p-4 text-center">Order Status</th>
                <th className="p-4 w-16 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#28415F]/30 text-xs">
              {pageItems.length > 0 ? (
                pageItems.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#17263C]/30 transition-colors group">
                    <td className="p-4">
                      <span className="font-bold text-white font-mono">#{ord.id}</span>
                      <p className="text-[10px] text-[#9FB6D4]/50">{ord.date}</p>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-white block">{ord.customerName}</span>
                      <span className="text-[10px] text-[#9FB6D4] font-mono">{ord.phone}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-[#33D1FF] font-semibold">
                        <Truck size={14} />
                        {ord.riderName}
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono font-bold text-white">
                      PKR {ord.amount.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold ${
                        ord.status === 'Dispatched' 
                          ? 'bg-[#FFB020]/10 text-[#FFB020] border border-[#FFB020]/20' 
                          : ord.status === 'Delivered'
                          ? 'bg-[#36D399]/10 text-[#36D399] border border-[#36D399]/20'
                          : ord.status === 'Cancelled'
                          ? 'bg-[#FF5C5C]/10 text-[#FF5C5C] border border-[#FF5C5C]/20'
                          : 'bg-[#4EA5FF]/10 text-[#4EA5FF] border border-[#4EA5FF]/20'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          ord.status === 'Dispatched' ? 'bg-[#FFB020]' : ord.status === 'Delivered' ? 'bg-[#36D399]' : ord.status === 'Cancelled' ? 'bg-[#FF5C5C]' : 'bg-[#4EA5FF]'
                        } animate-pulse`}></span>
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-4 text-center relative">
                      <button 
                        onClick={() => setActiveRowDropdown(activeRowDropdown === ord.id ? null : ord.id)}
                        className="text-[#9FB6D4] hover:text-white cursor-pointer inline-flex items-center gap-1 bg-[#090E17] border border-[#28415F] px-2.5 py-1.5 rounded-xl transition-all"
                      >
                        <span>Action</span>
                        <ChevronDown size={12} />
                      </button>

                      {activeRowDropdown === ord.id && (
                        <div className="absolute right-4 mt-1 w-48 bg-[#111C2E] border border-[#28415F] rounded-xl shadow-2xl py-1.5 z-40 text-left">
                          <button onClick={() => { setViewOrderModal(ord); setActiveRowDropdown(null); }} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#17263C] text-[#9FB6D4] hover:text-white cursor-pointer text-xs">
                            <Eye size={13} /> View Bill & Items
                          </button>
                          
                          <div className="border-t border-[#28415F] my-1"></div>
                          <p className="px-3 py-1 text-[9px] uppercase font-bold text-[#9FB6D4]/50">Change Status:</p>
                          
                          <button onClick={() => handleOrderStatusChange(ord.id, 'Pending')} className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#4EA5FF]/10 text-[#4EA5FF] cursor-pointer text-xs">
                            <Clock size={12} /> Set Pending
                          </button>
                          <button onClick={() => handleOrderStatusChange(ord.id, 'Dispatched')} className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#FFB020]/10 text-[#FFB020] cursor-pointer text-xs">
                            <Truck size={12} /> Mark Dispatched
                          </button>
                          <button onClick={() => handleOrderStatusChange(ord.id, 'Delivered')} className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#36D399]/10 text-[#36D399] cursor-pointer text-xs">
                            <CheckCircle2 size={12} /> Mark Delivered
                          </button>

                          <div className="border-t border-[#28415F] my-1"></div>
                          <button onClick={() => handleDeleteOrder(ord.id)} className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#FF5C5C]/10 text-[#FF5C5C] cursor-pointer text-xs">
                            <Trash2 size={12} /> Delete Order
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-xs text-[#9FB6D4]">
                    <AlertCircle className="mx-auto text-[#FFB020] mb-2" size={20} />
                    No orders found matching the filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="bg-[#090E17]/40 border-t border-[#28415F] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#9FB6D4]">
              Showing <span className="text-white font-mono font-bold">{startIndex + 1}</span> to{' '}
              <span className="text-white font-mono font-bold">{endIndex}</span> of{' '}
              <span className="text-white font-mono font-bold">{totalItems}</span> orders
            </span>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-[#28415F] bg-[#111C2E] text-[#9FB6D4] hover:text-white disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-8 w-8 rounded-xl text-xs font-bold font-mono border ${
                    currentPage === i + 1 ? 'bg-[#4EA5FF] border-[#4EA5FF] text-[#090E17]' : 'bg-[#111C2E] border-[#28415F] text-[#9FB6D4]'
                  } cursor-pointer`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-[#28415F] bg-[#111C2E] text-[#9FB6D4] hover:text-white disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- CREATE ORDER MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#090E17]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-[#9FB6D4] hover:text-white cursor-pointer">
              <X size={18} />
            </button>

            <h3 className="text-sm font-black uppercase tracking-wider text-[#33D1FF] border-b border-[#28415F] pb-3">
              Create New Order & Assign Fleet Rider
            </h3>

            <form onSubmit={handleAddOrderSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    placeholder="e.g., Usman Ghani"
                    className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                    placeholder="e.g., +92 300 1234567"
                    className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Delivery Address</label>
                <input
                  type="text"
                  value={newOrder.address}
                  onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                  placeholder="e.g., House 10, Street 3, DHA Phase 5"
                  className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Assign Rider</label>
                  <select
                    value={newOrder.riderName}
                    onChange={(e) => setNewOrder({ ...newOrder, riderName: e.target.value })}
                    className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Unassigned">-- Select Rider --</option>
                    {ridersList.map(r => (
                      <option key={r.id} value={r.name}>{r.name} ({r.status})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Bill Amount (PKR)</label>
                  <input
                    type="number"
                    required
                    value={newOrder.amount}
                    onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
                    placeholder="e.g., 3500"
                    className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Initial Status</label>
                  <select
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                    className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Dispatched">Dispatched (Syncs Rider)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Items Summary</label>
                  <input
                    type="text"
                    value={newOrder.itemsSummary}
                    onChange={(e) => setNewOrder({ ...newOrder, itemsSummary: e.target.value })}
                    placeholder="e.g., 2x Sugar bags"
                    className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="bg-[#17263C] text-white hover:bg-[#28415F] font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-black text-xs uppercase tracking-wider py-2.5 px-6 rounded-xl cursor-pointer">
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- VIEW ORDER DETAILS MODAL --- */}
      {viewOrderModal && (
        <div className="fixed inset-0 bg-[#090E17]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111C2E] border border-[#28415F] rounded-3xl w-full max-w-md p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#28415F]">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Order Bill Summary #{viewOrderModal.id}
              </h3>
              <button onClick={() => setViewOrderModal(null)} className="p-1.5 bg-[#090E17] text-[#9FB6D4] hover:text-white rounded-xl border border-[#28415F] cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="bg-[#090E17] p-4 rounded-2xl border border-[#28415F] space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                <span className="text-[#9FB6D4]">Customer:</span>
                <span className="text-white font-bold">{viewOrderModal.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                <span className="text-[#9FB6D4]">Contact Phone:</span>
                <span className="text-white font-mono">{viewOrderModal.phone}</span>
              </div>
              <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                <span className="text-[#9FB6D4]">Delivery Address:</span>
                <span className="text-white font-bold">{viewOrderModal.address}</span>
              </div>
              <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                <span className="text-[#9FB6D4]">Assigned Rider:</span>
                <span className="text-[#33D1FF] font-bold">{viewOrderModal.riderName}</span>
              </div>
              <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                <span className="text-[#9FB6D4]">Items Breakdown:</span>
                <span className="text-white font-bold">{viewOrderModal.itemsSummary}</span>
              </div>
              <div className="flex justify-between text-sm pt-1">
                <span className="text-[#9FB6D4] font-bold">Total Bill:</span>
                <span className="text-[#36D399] font-black font-mono">PKR {viewOrderModal.amount.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={() => setViewOrderModal(null)} className="w-full bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-black text-xs uppercase tracking-widest py-3 rounded-xl cursor-pointer">
              Close Bill
            </button>
          </div>
        </div>
      )}

    </div>
  );
}