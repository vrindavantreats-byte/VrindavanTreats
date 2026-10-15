import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Settings, Volume2, VolumeX, LogOut, UtensilsCrossed, RefreshCw } from 'lucide-react';
import { signOutOwner } from '../../lib/adminAuth';
import { fetchAllOrders, subscribeToOrders } from '../../lib/adminOrders';
import { orderSound } from '../../lib/audioNotification';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check new orders count on mount and listen to realtime updates
  useEffect(() => {
    let mounted = true;

    async function loadStats() {
      const { orders } = await fetchAllOrders();
      if (mounted) {
        const count = orders.filter((o) => (o.status || 'pending').toLowerCase() === 'pending').length;
        setNewOrderCount(count);
      }
    }

    loadStats();

    // Subscribe to realtime orders
    const channel = subscribeToOrders(
      (_newOrder) => {
        if (!mounted) return;
        setNewOrderCount((prev) => prev + 1);
        if (soundEnabled) {
          orderSound.playNewOrderChime();
        }
      },
      (_updatedOrder) => {
        if (!mounted) return;
        // Recount pending orders on status changes
        loadStats();
      }
    );

    return () => {
      mounted = false;
      channel.unsubscribe();
    };
  }, [soundEnabled]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const { orders } = await fetchAllOrders();
    const count = orders.filter((o) => (o.status || 'pending').toLowerCase() === 'pending').length;
    setNewOrderCount(count);
    // Dispatch a custom event so child pages can reload their orders too
    window.dispatchEvent(new CustomEvent('admin-refresh-orders'));
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out of Vrindavan Treats Owner?')) {
      await signOutOwner();
      navigate('/admin/login', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Header - Mobile Status Bar Aware */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 pt-safe">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E52E2D] to-red-500 flex items-center justify-center text-white shadow-md shadow-red-900/30">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base tracking-tight text-white">Vrindavan Treats</h1>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                  OWNER
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Orders Connected</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) orderSound.playNewOrderChime();
              }}
              className={`p-2 rounded-xl transition-all ${
                soundEnabled
                  ? 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-800/50 text-slate-500 hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Order Chime Enabled' : 'Order Chime Muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Manual Refresh */}
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all ${
                isRefreshing ? 'animate-spin text-red-400' : ''
              }`}
              title="Refresh Orders"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
          <Outlet />
        </div>
      </main>

      {/* Fixed Bottom Navigation Bar - Android App Feel */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/80 pb-safe">
        <div className="max-w-md mx-auto grid grid-cols-3 py-2 px-3">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
                isActive
                  ? 'text-red-500 font-bold bg-red-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5 mb-1" />
            <span className="text-[11px] font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
                isActive
                  ? 'text-red-500 font-bold bg-red-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <div className="relative">
              <ClipboardList className="w-5 h-5 mb-1" />
              {newOrderCount > 0 && (
                <span className="absolute -top-1.5 -right-3 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse">
                  {newOrderCount > 99 ? '99+' : newOrderCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium">Orders</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
                isActive
                  ? 'text-red-500 font-bold bg-red-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <Settings className="w-5 h-5 mb-1" />
            <span className="text-[11px] font-medium">Settings</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
