import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MenuItem, OrderItem } from '../types';
import { STORE_INFO } from '../data/menuData';

interface OrderContextType {
  items: OrderItem[];
  addItem: (item: MenuItem, selectedVariant?: string, extraCheese?: boolean) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearOrder: () => void;
  totalCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('vt_order_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('vt_order_items', JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items]);

  const addItem = (item: MenuItem, selectedVariant?: string, extraCheese = false) => {
    let unitPrice = item.price;
    if (selectedVariant && item.variants) {
      const v = item.variants.find((v) => v.name === selectedVariant);
      if (v) unitPrice = v.price;
    }
    if (extraCheese && item.allowExtraCheese) {
      unitPrice += STORE_INFO.extraCheesePrice;
    }

    const uniqueId = `${item.id}__${selectedVariant || 'default'}__${extraCheese ? 'cheese' : 'plain'}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === uniqueId);
      if (existing) {
        return prev.map((i) =>
          i.id === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: uniqueId,
          menuItemId: item.id,
          name: item.name,
          category: item.categoryLabel,
          selectedVariant,
          extraCheese,
          unitPrice,
          quantity: 1,
          image: item.image,
        },
      ];
    });

    setIsDrawerOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const clearOrder = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearOrder,
        totalCount,
        subtotal,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
