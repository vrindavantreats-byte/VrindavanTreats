import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export const CartDrawer: React.FC = () => {
  const { items, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeItem, clearOrder, subtotal, totalCount } =
    useOrder();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gray-100">
          {/* Header */}
          <div className="p-5 bg-white text-gray-900 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#E52E2D]" />
              <h3 className="font-display font-black text-lg">Your Order Inquiry</h3>
              <span className="text-xs bg-red-100 text-[#E52E2D] font-black px-2 py-0.5 rounded-full">
                {totalCount} items
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#E52E2D]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900">No items selected yet</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs">
                    Browse our delicious vegetarian quick bites, shakes and Amul ice creams to add them here!
                  </p>
                </div>
                <Link
                  to="/menu"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-5 py-2.5 bg-[#E52E2D] text-white rounded-full text-xs font-bold tracking-wide hover:bg-[#D0201F] transition-colors shadow-sm"
                >
                  Explore Menu
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-xs flex gap-3.5 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-[#E52E2D] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1 text-[11px]">
                      {item.selectedVariant && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">
                          {item.selectedVariant}
                        </span>
                      )}
                      {item.extraCheese && (
                        <span className="bg-red-50 text-[#E52E2D] px-2 py-0.5 rounded font-medium">
                          +Cheese (₹20)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                      <span className="font-black text-sm text-gray-900">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center rounded bg-white text-gray-700 hover:bg-gray-100 text-xs shadow-2xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs px-1 text-gray-900 min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center rounded bg-white text-gray-700 hover:bg-gray-100 text-xs shadow-2xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & Proceed */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-gray-100 shadow-lg space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-500 text-xs">
                  <span>Items count:</span>
                  <span className="font-semibold text-gray-900">{totalCount} items</span>
                </div>
                <div className="flex justify-between items-baseline font-bold text-base text-gray-900 pt-1 border-t border-dashed border-gray-200">
                  <span>Estimated Total:</span>
                  <span className="text-xl font-black text-[#E52E2D]">₹{subtotal}</span>
                </div>
                <p className="text-[11px] text-gray-400 italic text-right">
                  Prices inclusive of all taxes
                </p>
              </div>

              <div className="space-y-2">
                <Link
                  to="/order"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full py-3.5 px-4 bg-[#E52E2D] hover:bg-[#D0201F] text-white rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-red-500/20 transition-all active:scale-95"
                >
                  <span>Proceed to Order Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={clearOrder}
                  className="w-full py-2 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
