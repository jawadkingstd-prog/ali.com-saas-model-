import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Truck, Plus, Search, MapPin, Phone, Shield, 
  ChevronDown, ArrowUpDown, Filter, ChevronLeft, ChevronRight, 
  Trash2, Eye, X, Landmark, TrendingUp, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CustomersPage() {
  const [activeSegment, setActiveSegment] = useState('customers'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Pagination limit

  // Row Dropdown state
  const [activeRowDropdown, setActiveRowDropdown] = useState(null);

  // Modals States
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(null);

  const [newCustomer, setNewCustomer] = useState({ firstName: '', lastName: '', phone: '', location: '', address: '', balance: '', orders: '' });
  const [newRider, setNewRider] = useState({ firstName: '', lastName: '', phone: '', vehicle: '', status: 'Idle', completed: '' });

  // --- LIVE DATABASES WITH LOCALSTORAGE PERSISTENCE ---
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('aliLedger_customers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 1, name: 'Faiza Malik', phone: '+92 300 1234567', location: 'Lahore, PK', address: 'House 45, Street 2, Gulberg', balance: 12500, orders: 45 },
      { id: 2, name: 'Zainab Ahmed', phone: '+92 321 7654321', location: 'Karachi, PK', address: 'Apartment 12B, Clifton', balance: -3200, orders: 12 },
      { id: 3, name: 'Asad Ali', phone: '+92 333 9876543', location: 'Islamabad, PK', address: 'Sector F-7/2, Street 10', balance: 0, orders: 28 },
      { id: 4, name: 'Hamza Lodhi', phone: '+92 301 4567890', location: 'Rawalpindi, PK', address: 'Main Peshawar Road, Block C', balance: 8400, orders: 19 },
      { id: 5, name: 'Sana Qureshi', phone: '+92 315 1122334', location: 'Multan, PK', address: 'Abdali Road, Near Chowk', balance: -1500, orders: 7 },
      { id: 6, name: 'Bilal Farooq', phone: '+92 322 9988776', location: 'Peshawar, PK', address: 'University Town, Street 5', balance: 0, orders: 32 },
    ];
  });

  const [deliveryPersons, setDeliveryPersons] = useState(() => {
    const saved = localStorage.getItem('aliLedger_deliveryPersons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 1, name: 'Sajid Khan', phone: '+92 300 9998887', vehicle: 'Motorcycle (HON-123)', status: 'On Delivery', completed: 142 },
      { id: 2, name: 'Bilal Butt', phone: '+92 312 4445556', vehicle: 'Carry Dabba (LE-9988)', status: 'Idle', completed: 320 },
      { id: 3, name: 'Kamran Shah', phone: '+92 345 2221110', vehicle: 'Suzuki Pickup (RI-4433)', status: 'On Delivery', completed: 89 },
      { id: 4, name: 'Usman Ghani', phone: '+92 320 5556667', vehicle: 'Motorcycle (KY-402)', status: 'Idle', completed: 215 },
      { id: 5, name: 'Waseem Akram', phone: '+92 331 8881112', vehicle: 'Cargo Van (MN-786)', status: 'On Delivery', completed: 310 },
    ];
  });

  // Save changes to localStorage automatically
  useEffect(() => {
    localStorage.setItem('aliLedger_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('aliLedger_deliveryPersons', JSON.stringify(deliveryPersons));
  }, [deliveryPersons]);

  // --- STATS CALCULATIONS ---
  const totalCustomers = customers.length;
  const netOutstanding = customers.reduce((acc, curr) => acc + curr.balance, 0);
  const activeRiders = deliveryPersons.filter(r => r.status === 'On Delivery').length;
  const idleRiders = deliveryPersons.filter(r => r.status === 'Idle').length;

  // --- STATS CLICK SHORTCUT FILTERS ---
  const handleStatCardClick = (segment, filterVal) => {
    setActiveSegment(segment);
    setStatusFilter(filterVal);
    setSearchQuery(''); 
    setCurrentPage(1); 
    setActiveRowDropdown(null);
    toast.success(`Showing ${filterVal === 'all' ? 'All' : filterVal.replace('-', ' ')} entries!`, {
      id: 'stat-filter-toast',
      style: { background: '#111C2E', color: '#FFFFFF', borderLeft: '4px solid #4EA5FF' }
    });
  };

  // --- DELETE AND INSERTION HANDLERS ---
  const handleDeleteItem = (id, segment) => {
    if (segment === 'customers') {
      setCustomers(customers.filter(c => c.id !== id));
      toast.success('Customer record deleted!');
    } else {
      setDeliveryPersons(deliveryPersons.filter(r => r.id !== id));
      toast.success('Rider profile removed!');
    }
    setActiveRowDropdown(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (activeSegment === 'customers') {
      if (!newCustomer.firstName || !newCustomer.lastName || !newCustomer.phone) {
        toast.error('Please enter First Name, Last Name and Phone contact!');
        return;
      }
      const fullName = `${newCustomer.firstName} ${newCustomer.lastName}`;
      const created = {
        id: Date.now(),
        name: fullName,
        phone: newCustomer.phone,
        location: newCustomer.location || 'Lahore, PK',
        address: newCustomer.address || 'N/A',
        balance: Number(newCustomer.balance) || 0,
        orders: Number(newCustomer.orders) || 0
      };
      setCustomers([created, ...customers]);
      setNewCustomer({ firstName: '', lastName: '', phone: '', location: '', address: '', balance: '', orders: '' });
      toast.success(`${fullName} added to directory!`);
    } else {
      if (!newRider.firstName || !newRider.lastName || !newRider.phone || !newRider.vehicle) {
        toast.error('First Name, Last Name, Phone and Vehicle fields are required.');
        return;
      }
      const fullName = `${newRider.firstName} ${newRider.lastName}`;
      const createdRider = {
        id: Date.now(),
        name: fullName,
        phone: newRider.phone,
        vehicle: newRider.vehicle,
        status: newRider.status,
        completed: Number(newRider.completed) || 0
      };
      setDeliveryPersons([createdRider, ...deliveryPersons]);
      setNewRider({ firstName: '', lastName: '', phone: '', vehicle: '', status: 'Idle', completed: '' });
      toast.success(`Rider ${fullName} registered into fleet!`);
    }
    setShowAddModal(false);
  };

  // --- FILTERING & SORTING LOGIC ---
  const processedData = useMemo(() => {
    let dataset = activeSegment === 'customers' ? [...customers] : [...deliveryPersons];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      dataset = dataset.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.phone.includes(q) ||
        (item.vehicle && item.vehicle.toLowerCase().includes(q)) ||
        (item.address && item.address.toLowerCase().includes(q))
      );
    }

    if (statusFilter !== 'all') {
      if (activeSegment === 'customers') {
        if (statusFilter === 'outstanding') dataset = dataset.filter(c => c.balance !== 0);
        if (statusFilter === 'settled') dataset = dataset.filter(c => c.balance === 0);
      } else {
        if (statusFilter === 'on-delivery') dataset = dataset.filter(r => r.status === 'On Delivery');
        if (statusFilter === 'idle') dataset = dataset.filter(r => r.status === 'Idle');
      }
    }

    dataset.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (activeSegment === 'customers') {
        if (sortBy === 'balance') return b.balance - a.balance;
        if (sortBy === 'orders') return b.orders - a.orders;
      } else {
        if (sortBy === 'completed') return b.completed - a.completed;
      }
      return 0;
    });

    return dataset;
  }, [activeSegment, customers, deliveryPersons, searchQuery, statusFilter, sortBy]);

  // --- PAGINATION ARITHMETIC ---
  const totalItems = processedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const pageItems = processedData.slice(startIndex, endIndex);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setActiveRowDropdown(null);
    }
  };

  return (
    <div className="space-y-6 antialiased">
      
      {/* Interactive Top Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => handleStatCardClick('customers', 'all')}
          className={`bg-[#111C2E] border rounded-2xl p-4 flex items-center gap-4 shadow-lg cursor-pointer transition-all active:scale-[0.97] hover:bg-[#17263C]/40 ${
            activeSegment === 'customers' && statusFilter === 'all' 
              ? 'border-[#4EA5FF] ring-1 ring-[#4EA5FF]/20 shadow-[#4EA5FF]/5' 
              : 'border-[#28415F] hover:border-[#4EA5FF]/50'
          }`}
        >
          <div className="h-10 w-10 rounded-xl bg-[#4EA5FF]/10 flex items-center justify-center text-[#4EA5FF]">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[10px] text-[#9FB6D4] uppercase font-bold tracking-wider">Total Clients</p>
            <h3 className="text-lg font-black text-white font-mono">{totalCustomers}</h3>
          </div>
        </div>

        <div 
          onClick={() => handleStatCardClick('customers', 'outstanding')}
          className={`bg-[#111C2E] border rounded-2xl p-4 flex items-center gap-4 shadow-lg cursor-pointer transition-all active:scale-[0.97] hover:bg-[#17263C]/40 ${
            activeSegment === 'customers' && statusFilter === 'outstanding' 
              ? 'border-[#36D399] ring-1 ring-[#36D399]/20 shadow-[#36D399]/5' 
              : 'border-[#28415F] hover:border-[#36D399]/50'
          }`}
        >
          <div className="h-10 w-10 rounded-xl bg-[#36D399]/10 flex items-center justify-center text-[#36D399]">
            <Landmark size={20} />
          </div>
          <div>
            <p className="text-[10px] text-[#9FB6D4] uppercase font-bold tracking-wider">Net Outstanding</p>
            <h3 className="text-lg font-black text-[#36D399] font-mono">PKR {netOutstanding.toLocaleString()}</h3>
          </div>
        </div>

        <div 
          onClick={() => handleStatCardClick('delivery', 'on-delivery')}
          className={`bg-[#111C2E] border rounded-2xl p-4 flex items-center gap-4 shadow-lg cursor-pointer transition-all active:scale-[0.97] hover:bg-[#17263C]/40 ${
            activeSegment === 'delivery' && statusFilter === 'on-delivery' 
              ? 'border-[#33D1FF] ring-1 ring-[#33D1FF]/20 shadow-[#33D1FF]/5' 
              : 'border-[#28415F] hover:border-[#33D1FF]/50'
          }`}
        >
          <div className="h-10 w-10 rounded-xl bg-[#33D1FF]/10 flex items-center justify-center text-[#33D1FF]">
            <Truck size={20} />
          </div>
          <div>
            <p className="text-[10px] text-[#9FB6D4] uppercase font-bold tracking-wider">On-Route Fleet</p>
            <h3 className="text-lg font-black text-white font-mono">{activeRiders} Riders</h3>
          </div>
        </div>

        <div 
          onClick={() => handleStatCardClick('delivery', 'idle')}
          className={`bg-[#111C2E] border rounded-2xl p-4 flex items-center gap-4 shadow-lg cursor-pointer transition-all active:scale-[0.97] hover:bg-[#17263C]/40 ${
            activeSegment === 'delivery' && statusFilter === 'idle' 
              ? 'border-[#FFB020] ring-1 ring-[#FFB020]/20 shadow-[#FFB020]/5' 
              : 'border-[#28415F] hover:border-[#FFB020]/50'
          }`}
        >
          <div className="h-10 w-10 rounded-xl bg-[#FFB020]/10 flex items-center justify-center text-[#FFB020]">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[10px] text-[#9FB6D4] uppercase font-bold tracking-wider">Transit Available</p>
            <h3 className="text-lg font-black text-white font-mono">{idleRiders} Standby</h3>
          </div>
        </div>
      </div>

      {/* Segment Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#28415F]/50 pb-px">
        <div className="flex">
          <button
            onClick={() => { setActiveSegment('customers'); setSearchQuery(''); setStatusFilter('all'); setSortBy('name'); setCurrentPage(1); setActiveRowDropdown(null); }}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeSegment === 'customers' 
                ? 'border-[#4EA5FF] text-[#4EA5FF] bg-[#4EA5FF]/5' 
                : 'border-transparent text-[#9FB6D4] hover:text-white'
            }`}
          >
            <Users size={14} />
            Customers Log
          </button>
          <button
            onClick={() => { setActiveSegment('delivery'); setSearchQuery(''); setStatusFilter('all'); setSortBy('name'); setCurrentPage(1); setActiveRowDropdown(null); }}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeSegment === 'delivery' 
                ? 'border-[#4EA5FF] text-[#4EA5FF] bg-[#4EA5FF]/5' 
                : 'border-transparent text-[#9FB6D4] hover:text-white'
            }`}
          >
            <Truck size={14} />
            Logistics Fleet
          </button>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-1.5 bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-extrabold text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer self-start md:self-auto"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add {activeSegment === 'customers' ? 'Customer' : 'Rider'}
        </button>
      </div>

      {/* Interactive Search & Filter Deck */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="relative md:col-span-5">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-[#9FB6D4]/50" />
          </span>
          <input
            type="text"
            placeholder={`Search by name, address, contact info...`}
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
            <option value="all" className="bg-[#111C2E]">All Statuses</option>
            {activeSegment === 'customers' ? (
              <>
                <option value="outstanding" className="bg-[#111C2E]">Has Balance</option>
                <option value="settled" className="bg-[#111C2E]">Settled Zero</option>
              </>
            ) : (
              <>
                <option value="on-delivery" className="bg-[#111C2E]">On Delivery Run</option>
                <option value="idle" className="bg-[#111C2E]">On-Standby Idle</option>
              </>
            )}
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
            <option value="name" className="bg-[#111C2E]">Alphabetical (A-Z)</option>
            {activeSegment === 'customers' ? (
              <>
                <option value="balance" className="bg-[#111C2E]">Highest Balances</option>
                <option value="orders" className="bg-[#111C2E]">Most Orders Placed</option>
              </>
            ) : (
              <>
                <option value="completed" className="bg-[#111C2E]">Most Trips Finished</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Data Grid Table */}
      <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl overflow-hidden shadow-2xl relative">
        {activeSegment === 'customers' ? (
          /* CUSTOMERS LOG */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#28415F] bg-[#090E17]/40 text-[9px] text-[#9FB6D4] font-bold uppercase tracking-widest">
                  <th className="p-4">Customer Identity</th>
                  <th className="p-4">Contact Phone</th>
                  <th className="p-4">Registered Location</th>
                  <th className="p-4 text-center">Total Orders</th>
                  <th className="p-4 text-right">Ledger Outstanding</th>
                  <th className="p-4 w-12 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#28415F]/30 text-xs">
                {pageItems.length > 0 ? (
                  pageItems.map((cust) => (
                    <tr key={cust.id} className="hover:bg-[#17263C]/30 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div 
                            onClick={() => setActiveRowDropdown(activeRowDropdown === cust.id ? null : cust.id)}
                            className="relative h-9 w-9 rounded-xl bg-[#090E17] border border-[#28415F] flex items-center justify-center text-[#33D1FF] font-black text-xs cursor-pointer group-hover:border-[#4EA5FF] transition-all"
                          >
                            {cust.name.split(' ').map(n => n[0]).join('')}
                            <span className="absolute -bottom-1 -right-1 bg-[#111C2E] border border-[#28415F] rounded-full p-0.5 text-[#9FB6D4] group-hover:text-white">
                              <ChevronDown size={8} />
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-white group-hover:text-[#4EA5FF] transition-colors">{cust.name}</span>
                            <p className="text-[10px] text-[#9FB6D4]/50">ID: CLIENT-{cust.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-[#9FB6D4] font-mono">{cust.phone}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-[#9FB6D4]">
                          <MapPin size={12} className="text-[#33D1FF]" />
                          {cust.location}
                        </span>
                      </td>
                      <td className="p-4 text-center font-mono text-white font-semibold">{cust.orders}</td>
                      <td className="p-4 text-right">
                        <span className={`font-mono font-bold px-2.5 py-1 rounded-lg text-[11px] ${
                          cust.balance > 0 
                            ? 'text-[#36D399] bg-[#36D399]/10' 
                            : cust.balance < 0 
                            ? 'text-[#FF5C5C] bg-[#FF5C5C]/10' 
                            : 'text-[#9FB6D4] bg-[#090E17]/60'
                        }`}>
                          {cust.balance > 0 ? `+PKR ${cust.balance}` : cust.balance < 0 ? `-PKR ${Math.abs(cust.balance)}` : 'Settle'}
                        </span>
                      </td>
                      <td className="p-4 text-center relative">
                        <button 
                          onClick={() => setActiveRowDropdown(activeRowDropdown === cust.id ? null : cust.id)}
                          className="text-[#9FB6D4] hover:text-white cursor-pointer p-1"
                        >
                          <ChevronDown size={14} />
                        </button>

                        {activeRowDropdown === cust.id && (
                          <div className="absolute right-4 mt-1 w-40 bg-[#111C2E] border border-[#28415F] rounded-xl shadow-2xl py-1.5 z-40 text-left">
                            <button onClick={() => { setViewUserModal({ ...cust, type: 'customer' }); setActiveRowDropdown(null); }} className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#17263C] text-[#9FB6D4] hover:text-white cursor-pointer">
                              <Eye size={12} /> View Details
                            </button>
                            <button onClick={() => handleDeleteItem(cust.id, 'customers')} className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#FF5C5C]/10 text-[#FF5C5C] cursor-pointer">
                              <Trash2 size={12} /> Delete Record
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
                      No customers matched the applied criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* LOGISTICS FLEET */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#28415F] bg-[#090E17]/40 text-[9px] text-[#9FB6D4] font-bold uppercase tracking-widest">
                  <th className="p-4">Rider Identity</th>
                  <th className="p-4">Contact Phone</th>
                  <th className="p-4">Assigned Vehicle</th>
                  <th className="p-4 text-center">Completed Runs</th>
                  <th className="p-4 text-right">Deployment Status</th>
                  <th className="p-4 w-12 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#28415F]/30 text-xs">
                {pageItems.length > 0 ? (
                  pageItems.map((rider) => (
                    <tr key={rider.id} className="hover:bg-[#17263C]/30 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div 
                            onClick={() => setActiveRowDropdown(activeRowDropdown === rider.id ? null : rider.id)}
                            className="relative h-9 w-9 rounded-xl bg-[#090E17] border border-[#28415F] flex items-center justify-center text-[#33D1FF] cursor-pointer group-hover:border-[#4EA5FF] transition-all"
                          >
                            <Shield size={16} />
                            <span className="absolute -bottom-1 -right-1 bg-[#111C2E] border border-[#28415F] rounded-full p-0.5 text-[#9FB6D4] group-hover:text-white">
                              <ChevronDown size={8} />
                            </span>
                          </div>
                          <div>
                            <span className="font-bold text-white group-hover:text-[#4EA5FF] transition-colors">{rider.name}</span>
                            <p className="text-[10px] text-[#9FB6D4]/50">ID: FLEET-{rider.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-[#9FB6D4] font-mono">{rider.phone}</td>
                      <td className="p-4 text-white font-semibold font-mono">{rider.vehicle}</td>
                      <td className="p-4 text-center font-mono text-white font-semibold">{rider.completed} trips</td>
                      <td className="p-4 text-right">
                        <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          rider.status === 'On Delivery' 
                            ? 'text-[#FFB020] bg-[#FFB020]/10 border border-[#FFB020]/20' 
                            : 'text-[#36D399] bg-[#36D399]/10 border border-[#36D399]/20'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${rider.status === 'On Delivery' ? 'bg-[#FFB020]' : 'bg-[#36D399]'} animate-pulse`}></span>
                          {rider.status}
                        </span>
                      </td>
                      <td className="p-4 text-center relative">
                        <button 
                          onClick={() => setActiveRowDropdown(activeRowDropdown === rider.id ? null : rider.id)}
                          className="text-[#9FB6D4] hover:text-white cursor-pointer p-1"
                        >
                          <ChevronDown size={14} />
                        </button>

                        {activeRowDropdown === rider.id && (
                          <div className="absolute right-4 mt-1 w-40 bg-[#111C2E] border border-[#28415F] rounded-xl shadow-2xl py-1.5 z-40 text-left">
                            <button onClick={() => { setViewUserModal({ ...rider, type: 'rider' }); setActiveRowDropdown(null); }} className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#17263C] text-[#9FB6D4] hover:text-white cursor-pointer">
                              <Eye size={12} /> View Details
                            </button>
                            <button onClick={() => handleDeleteItem(rider.id, 'delivery')} className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#FF5C5C]/10 text-[#FF5C5C] cursor-pointer">
                              <Trash2 size={12} /> Remove Rider
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
                      No active riders matches the selection.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Unified Pagination Footer */}
        {totalPages > 1 && (
          <div className="bg-[#090E17]/40 border-t border-[#28415F] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#9FB6D4]">
              Showing <span className="text-white font-mono font-bold">{startIndex + 1}</span> to{' '}
              <span className="text-white font-mono font-bold">{endIndex}</span> of{' '}
              <span className="text-white font-mono font-bold">{totalItems}</span> registered logs
            </span>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center p-2 rounded-xl border border-[#28415F] bg-[#111C2E] hover:bg-[#17263C] text-[#9FB6D4] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`h-8 w-8 rounded-xl text-xs font-bold font-mono transition-all border ${
                    currentPage === i + 1
                      ? 'bg-[#4EA5FF] border-[#4EA5FF] text-[#090E17]'
                      : 'bg-[#111C2E] border-[#28415F] text-[#9FB6D4] hover:text-white hover:bg-[#17263C]'
                  } cursor-pointer`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center p-2 rounded-xl border border-[#28415F] bg-[#111C2E] hover:bg-[#17263C] text-[#9FB6D4] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- ADD MODAL WITH ADDRESS FIELD --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#090E17]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111C2E] border border-[#28415F] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#9FB6D4] hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-sm font-black uppercase tracking-wider text-[#33D1FF] border-b border-[#28415F] pb-3">
              Register New {activeSegment === 'customers' ? 'Customer Profile' : 'Transit Rider'}
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {activeSegment === 'customers' ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">First Name</label>
                      <input
                        type="text"
                        required
                        value={newCustomer.firstName}
                        onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                        placeholder="e.g., Kashif"
                        className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Last Name</label>
                      <input
                        type="text"
                        required
                        value={newCustomer.lastName}
                        onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                        placeholder="e.g., Khan"
                        className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Phone Contact</label>
                    <input
                      type="text"
                      required
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      placeholder="e.g., +92 312 3456789"
                      className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Street Address</label>
                    <input
                      type="text"
                      value={newCustomer.address}
                      onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                      placeholder="e.g., House 123, Street 4, Block A"
                      className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Initial Ledger (PKR)</label>
                      <input
                        type="number"
                        value={newCustomer.balance}
                        onChange={(e) => setNewCustomer({ ...newCustomer, balance: e.target.value })}
                        placeholder="e.g., 5000"
                        className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Total Orders</label>
                      <input
                        type="number"
                        value={newCustomer.orders}
                        onChange={(e) => setNewCustomer({ ...newCustomer, orders: e.target.value })}
                        placeholder="e.g., 10"
                        className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">First Name</label>
                      <input
                        type="text"
                        required
                        value={newRider.firstName}
                        onChange={(e) => setNewRider({ ...newRider, firstName: e.target.value })}
                        placeholder="e.g., Majid"
                        className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Last Name</label>
                      <input
                        type="text"
                        required
                        value={newRider.lastName}
                        onChange={(e) => setNewRider({ ...newRider, lastName: e.target.value })}
                        placeholder="e.g., Butt"
                        className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Phone Contact</label>
                    <input
                      type="text"
                      required
                      value={newRider.phone}
                      onChange={(e) => setNewRider({ ...newRider, phone: e.target.value })}
                      placeholder="e.g., +92 300 1122334"
                      className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Assigned Vehicle</label>
                    <input
                      type="text"
                      required
                      value={newRider.vehicle}
                      onChange={(e) => setNewRider({ ...newRider, vehicle: e.target.value })}
                      placeholder="e.g., Cargo Bike (KH-99)"
                      className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Status</label>
                      <select
                        value={newRider.status}
                        onChange={(e) => setNewRider({ ...newRider, status: e.target.value })}
                        className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Idle">Idle (Standby)</option>
                        <option value="On Delivery">On Active Delivery</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9FB6D4] mb-1.5">Finished Trips</label>
                      <input
                        type="number"
                        value={newRider.completed}
                        onChange={(e) => setNewRider({ ...newRider, completed: e.target.value })}
                        placeholder="e.g., 5"
                        className="w-full bg-[#090E17] border border-[#28415F] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4EA5FF]"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-[#17263C] text-white hover:bg-[#28415F] font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-black text-xs uppercase tracking-wider py-2.5 px-6 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Confirm Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- VIEW DETAILS POPUP MODAL --- */}
      {viewUserModal && (
        <div className="fixed inset-0 bg-[#090E17]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#111C2E] border border-[#28415F] rounded-3xl w-full max-w-md p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#28415F]/40">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Profile Details
              </h3>
              <button 
                onClick={() => setViewUserModal(null)}
                className="p-1.5 bg-[#090E17] text-[#9FB6D4] hover:text-white rounded-xl border border-[#28415F] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#090E17] p-4 rounded-2xl border border-[#28415F] space-y-3">
                <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                  <span className="text-[#9FB6D4]">Full Name:</span>
                  <span className="text-white font-bold">{viewUserModal.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                  <span className="text-[#9FB6D4]">Contact Phone:</span>
                  <span className="text-white font-bold font-mono">{viewUserModal.phone}</span>
                </div>

                {viewUserModal.type === 'customer' ? (
                  <>
                    <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                      <span className="text-[#9FB6D4]">Location / City:</span>
                      <span className="text-white font-bold">{viewUserModal.location}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                      <span className="text-[#9FB6D4]">Street Address:</span>
                      <span className="text-white font-bold">{viewUserModal.address || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                      <span className="text-[#9FB6D4]">Total Orders:</span>
                      <span className="text-white font-bold font-mono">{viewUserModal.orders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9FB6D4]">Ledger Balance:</span>
                      <span className={`font-bold font-mono ${viewUserModal.balance >= 0 ? 'text-[#36D399]' : 'text-[#FF5C5C]'}`}>
                        PKR {viewUserModal.balance}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                      <span className="text-[#9FB6D4]">Assigned Vehicle:</span>
                      <span className="text-white font-bold font-mono">{viewUserModal.vehicle}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#28415F]/30 pb-2">
                      <span className="text-[#9FB6D4]">Deployment Status:</span>
                      <span className="text-[#36D399] font-bold">{viewUserModal.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9FB6D4]">Completed Runs:</span>
                      <span className="text-white font-bold font-mono">{viewUserModal.completed} trips</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button 
              onClick={() => setViewUserModal(null)}
              className="w-full bg-[#4EA5FF] hover:bg-[#33D1FF] text-[#090E17] font-black text-xs uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

    </div>
  );
}