import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  BellRing,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Phone,
  ChefHat,
  PackageCheck,
  AlertCircle,
} from 'lucide-react';
import {
  type AdminOrder,
  type DashboardMetrics,
  fetchAllOrders,
  computeDashboardMetrics,
  updateOrderStatus,
  formatToIST,
  type OrderStatus,
} from '../../lib/adminOrders';

export const AdminDashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalOrders: 0,
    newOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    todayRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    const { orders: fetched } = await fetchAllOrders();
    setOrders(fetched);
    setMetrics(computeDashboardMetrics(fetched));
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    // Listen for manual refresh triggered by layout header
    const handleRefreshEvent = () => loadData();
    window.addEventListener('admin-refresh-orders', handleRefreshEvent);

    return () => {
      window.removeEventListener('admin-refresh-orders', handleRefreshEvent);
    };
  }, []);

  const handleQuickStatusChange = async (orderId: string, nextStatus: OrderStatus) => {
    setUpdatingId(orderId);
    const result = await updateOrderStatus(orderId, nextStatus);
    if (result.success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
      );
      setMetrics(
        computeDashboardMetrics(
          orders.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
        )
      );
    }
    setUpdatingId(null);
  };

  const recentOrders = orders.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Restaurant Overview</h2>
          <p className="text-xs text-slate-400">Real-time order flow and kitchen metrics</p>
        </div>
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all self-start sm:self-auto"
        >
          <span>View All Orders</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* New Orders High-Priority Banner (if any) */}
      {metrics.newOrders > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/20 to-amber-500/10 border border-red-500/40 flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold">
              <BellRing className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">
                {metrics.newOrders} New Order{metrics.newOrders > 1 ? 's' : ''} Awaiting Attention!
              </h3>
              <p className="text-xs text-red-200">Review and confirm to alert kitchen staff</p>
            </div>
          </div>
          <Link
            to="/admin/orders?status=pending"
            className="px-3.5 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow-md transition-all shrink-0"
          >
            Review Now
          </Link>
        </div>
      )}

      {/* Key Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Today's Revenue */}
        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Today's Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ₹{metrics.todayRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Calculated in IST (Asia/Kolkata)</p>
        </div>

        {/* Total Orders */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Orders</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            {metrics.totalOrders}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Lifetime customer inquiries</p>
        </div>

        {/* New / Action Required */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">New Pending</span>
            <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
              <BellRing className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-red-400">
            {metrics.newOrders}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Requires confirmation</p>
        </div>

        {/* In Kitchen / Preparing */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Active Orders</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-400">
            {metrics.pendingOrders}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Pending, confirmed, preparing</p>
        </div>

        {/* Completed Orders */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Completed</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400">
            {metrics.completedOrders}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Delivered or picked up</p>
        </div>

        {/* Cancelled */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Cancelled</span>
            <div className="w-7 h-7 rounded-lg bg-slate-700/50 text-slate-400 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-400">
            {metrics.cancelledOrders}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Rejected or cancelled</p>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm sm:text-base text-white">Recent Incoming Orders</h3>
          <Link to="/admin/orders" className="text-xs text-red-400 hover:text-red-300 font-semibold">
            See all ({orders.length})
          </Link>
        </div>

        {loading ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span>Loading orders from database...</span>
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="font-medium text-slate-300">No orders received yet.</p>
            <p className="text-slate-500">Orders placed by customers on the website will appear here in real time.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const status = (order.status || 'pending').toLowerCase();
              return (
                <div
                  key={order.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 transition-all shadow-md space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{order.full_name}</span>
                        {/* Status Badge */}
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
                        {formatToIST(order.created_at)} • {order.total_item_count} items
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="font-black text-sm text-white">₹{order.subtotal}</div>
                      <a
                        href={`tel:${order.mobile_number}`}
                        className="inline-flex items-center gap-1 text-[11px] text-red-400 hover:underline mt-0.5"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{order.mobile_number}</span>
                      </a>
                    </div>
                  </div>

                  {/* Order items summary preview */}
                  <div className="bg-slate-950/60 rounded-xl p-2.5 text-xs text-slate-300 font-mono line-clamp-2 border border-slate-800/80">
                    {order.formatted_order_text || 'No items listed'}
                  </div>

                  {/* Quick Action Buttons for Status Flow */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                    <div className="text-[11px] text-slate-400">
                      Pickup: <span className="text-slate-200 font-medium">{order.pickup_date} at {order.pickup_time}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {status === 'pending' && (
                        <button
                          disabled={updatingId === order.id}
                          onClick={() => handleQuickStatusChange(order.id, 'confirmed')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Confirm</span>
                        </button>
                      )}

                      {status === 'confirmed' && (
                        <button
                          disabled={updatingId === order.id}
                          onClick={() => handleQuickStatusChange(order.id, 'preparing')}
                          className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
                        >
                          <ChefHat className="w-3 h-3" />
                          <span>Start Kitchen</span>
                        </button>
                      )}

                      {status === 'preparing' && (
                        <button
                          disabled={updatingId === order.id}
                          onClick={() => handleQuickStatusChange(order.id, 'ready')}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
                        >
                          <PackageCheck className="w-3 h-3" />
                          <span>Ready for Pickup</span>
                        </button>
                      )}

                      {status === 'ready' && (
                        <button
                          disabled={updatingId === order.id}
                          onClick={() => handleQuickStatusChange(order.id, 'completed')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Mark Completed</span>
                        </button>
                      )}

                      <Link
                        to="/admin/orders"
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
