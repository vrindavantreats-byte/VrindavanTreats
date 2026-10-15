import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  X,
  AlertCircle,
  Filter,
} from 'lucide-react';
import {
  type AdminOrder,
  type OrderStatus,
  fetchAllOrders,
  updateOrderStatus,
  formatToIST,
  getDateStringIST,
  getTodayDateStringIST,
} from '../../lib/adminOrders';

export const AdminOrdersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || 'all';

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'yesterday'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadOrders = async () => {
    const { orders: fetched } = await fetchAllOrders();
    setOrders(fetched);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();

    const handleRefresh = () => loadOrders();
    window.addEventListener('admin-refresh-orders', handleRefresh);
    return () => window.removeEventListener('admin-refresh-orders', handleRefresh);
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    }
    setUpdatingId(null);
  };

  const filteredOrders = useMemo(() => {
    const todayIST = getTodayDateStringIST();
    const query = searchQuery.trim().toLowerCase();

    return orders.filter((order) => {
      // Status filter
      if (statusFilter !== 'all' && (order.status || 'pending').toLowerCase() !== statusFilter) {
        return false;
      }

      // Date filter
      if (dateFilter === 'today') {
        if (getDateStringIST(order.created_at) !== todayIST) return false;
      }

      // Search query
      if (query) {
        const matchesName = order.full_name?.toLowerCase().includes(query);
        const matchesMobile = order.mobile_number?.toLowerCase().includes(query);
        const matchesText = order.formatted_order_text?.toLowerCase().includes(query);
        const matchesId = order.id?.toLowerCase().includes(query);
        if (!matchesName && !matchesMobile && !matchesText && !matchesId) {
          return false;
        }
      }

      return true;
    });
  }, [orders, statusFilter, dateFilter, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Page Title & Search Bar */}
      <div className="space-y-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Order Management</h2>
          <p className="text-xs text-slate-400">Search, track status, and contact customers</p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone, or items..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-all placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {[
          { key: 'all', label: 'All Orders' },
          { key: 'pending', label: 'New / Pending' },
          { key: 'confirmed', label: 'Confirmed' },
          { key: 'preparing', label: 'In Kitchen' },
          { key: 'ready', label: 'Ready' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setStatusFilter(tab.key);
              setSearchParams(tab.key === 'all' ? {} : { status: tab.key });
            }}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              statusFilter === tab.key
                ? 'bg-red-500 text-white shadow-md shadow-red-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date Filter Pills */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Filter className="w-3.5 h-3.5" />
        <span>Date:</span>
        <button
          onClick={() => setDateFilter('all')}
          className={`px-2 py-0.5 rounded-md ${dateFilter === 'all' ? 'bg-slate-700 text-white font-bold' : 'hover:text-white'}`}
        >
          All Dates
        </button>
        <button
          onClick={() => setDateFilter('today')}
          className={`px-2 py-0.5 rounded-md ${dateFilter === 'today' ? 'bg-slate-700 text-white font-bold' : 'hover:text-white'}`}
        >
          Today Only
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span>Loading orders...</span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs space-y-2">
          <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="font-semibold text-slate-300">No orders match your filter.</p>
          <p className="text-slate-500">Try changing your search keywords or status tabs.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const status = (order.status || 'pending').toLowerCase();
            return (
              <div
                key={order.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 shadow-md transition-all space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm sm:text-base text-white">{order.full_name}</h4>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          status === 'pending'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                            : status === 'confirmed'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : status === 'preparing'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : status === 'ready'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {formatToIST(order.created_at)}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-sm sm:text-base text-white">₹{order.subtotal}</span>
                    <p className="text-[11px] text-slate-400">{order.total_item_count} items</p>
                  </div>
                </div>

                {/* Items summary */}
                <div className="bg-slate-950/70 rounded-xl p-2.5 text-xs text-slate-300 font-mono border border-slate-800/80">
                  {order.formatted_order_text || 'No items listed'}
                </div>

                {/* Pickup and Special Request */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-400 bg-slate-900/40 p-2 rounded-xl">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>Pickup: <strong className="text-slate-200">{order.pickup_date} at {order.pickup_time}</strong></span>
                  </div>
                  {order.special_instructions && order.special_instructions !== 'None' && (
                    <div className="text-amber-400 font-medium truncate">
                      Note: {order.special_instructions}
                    </div>
                  )}
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                  {/* Contact Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${order.mobile_number}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/91${order.mobile_number.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Namaste ${order.full_name}, thank you for your order at Vrindavan Treats! Your order status is: ${status.toUpperCase()}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  {/* Status Dropdown / Next Action */}
                  <div className="flex items-center gap-2">
                    <select
                      value={status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-red-500 transition-all"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready for Pickup</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-black text-lg text-white">Order Details</h3>
                <p className="text-[11px] text-slate-400 font-mono">ID: {selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Information */}
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Details</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Name:</span>
                  <p className="font-bold text-white">{selectedOrder.full_name}</p>
                </div>
                <div>
                  <span className="text-slate-500">Mobile:</span>
                  <p className="font-bold text-white">{selectedOrder.mobile_number}</p>
                </div>
                {selectedOrder.email && (
                  <div className="col-span-2">
                    <span className="text-slate-500">Email:</span>
                    <p className="font-bold text-white truncate">{selectedOrder.email}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pickup Schedule */}
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pickup Schedule</h4>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-red-400" />
                  <span className="font-bold text-white">{selectedOrder.pickup_date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span className="font-bold text-white">{selectedOrder.pickup_time}</span>
                </div>
              </div>
            </div>

            {/* Items Content */}
            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Items</h4>
              <p className="text-xs font-mono text-slate-200 whitespace-pre-line leading-relaxed">
                {selectedOrder.formatted_order_text || 'No items description'}
              </p>
              {selectedOrder.special_instructions && selectedOrder.special_instructions !== 'None' && (
                <div className="pt-2 border-t border-slate-800 text-xs">
                  <span className="text-amber-400 font-bold">Special Instructions:</span>
                  <p className="text-slate-300 mt-0.5">{selectedOrder.special_instructions}</p>
                </div>
              )}
            </div>

            {/* Total and Status */}
            <div className="flex items-center justify-between p-3.5 bg-slate-950/90 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400">Total Bill Amount</span>
                <div className="text-xl font-black text-red-400">₹{selectedOrder.subtotal}</div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Update Status</label>
                <select
                  value={selectedOrder.status || 'pending'}
                  disabled={updatingId === selectedOrder.id}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                  className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-bold focus:outline-none focus:border-red-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready for Pickup</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
