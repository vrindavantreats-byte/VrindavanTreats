import { supabase } from './supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface AdminOrder {
  id: string;
  created_at: string;
  full_name: string;
  mobile_number: string;
  email: string;
  pickup_date: string;
  pickup_time: string;
  special_instructions: string;
  order_source: string;
  total_item_count: number;
  subtotal: number;
  currency: string;
  formatted_order_text: string;
  status: OrderStatus;
}

export interface DashboardMetrics {
  totalOrders: number;
  newOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  todayRevenue: number;
}

/**
 * Calculates current date string in Asia/Kolkata (IST) timezone (YYYY-MM-DD)
 */
export function getTodayDateStringIST(): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(new Date()); // Returns "YYYY-MM-DD"
}

/**
 * Calculates date string in Asia/Kolkata for a given timestamp
 */
export function getDateStringIST(isoString: string): string {
  try {
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(date);
  } catch {
    return '';
  }
}

/**
 * Formats timestamp to readable Indian Standard Time string
 */
export function formatToIST(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return isoString;
  }
}

/**
 * Computes dashboard statistics from the list of orders
 */
export function computeDashboardMetrics(orders: AdminOrder[]): DashboardMetrics {
  const todayIST = getTodayDateStringIST();

  let totalOrders = orders.length;
  let newOrders = 0;
  let pendingOrders = 0;
  let completedOrders = 0;
  let cancelledOrders = 0;
  let todayRevenue = 0;

  for (const order of orders) {
    const status = (order.status || 'pending').toLowerCase();

    if (status === 'pending') {
      newOrders += 1;
      pendingOrders += 1;
    } else if (status === 'confirmed' || status === 'preparing' || status === 'ready') {
      pendingOrders += 1;
    } else if (status === 'completed') {
      completedOrders += 1;
    } else if (status === 'cancelled') {
      cancelledOrders += 1;
    }

    // Revenue calculation for orders created today in IST (excluding cancelled)
    const orderDateIST = getDateStringIST(order.created_at);
    if (orderDateIST === todayIST && status !== 'cancelled') {
      todayRevenue += Number(order.subtotal) || 0;
    }
  }

  return {
    totalOrders,
    newOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    todayRevenue,
  };
}

/**
 * Fetches all orders from Supabase ordered by creation date descending
 */
export async function fetchAllOrders(): Promise<{ orders: AdminOrder[]; error: string | null }> {
  const { data, error } = await supabase
    .from('order_inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[AdminOrders] Error fetching orders:', error.message);
    return { orders: [], error: error.message };
  }

  return { orders: (data as AdminOrder[]) || [], error: null };
}

/**
 * Updates the status of an order
 */
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus
): Promise<{ success: boolean; error: string | null }> {
  const { error } = await supabase
    .from('order_inquiries')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) {
    console.error(`[AdminOrders] Failed to update order ${orderId}:`, error.message);
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

/**
 * Subscribes to realtime Postgres changes on the order_inquiries table
 */
export function subscribeToOrders(
  onInsert: (order: AdminOrder) => void,
  onUpdate: (order: AdminOrder) => void
): RealtimeChannel {
  const channel = supabase
    .channel('admin-order-inquiries-realtime')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'order_inquiries',
      },
      (payload) => {
        onInsert(payload.new as AdminOrder);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'order_inquiries',
      },
      (payload) => {
        onUpdate(payload.new as AdminOrder);
      }
    )
    .subscribe();

  return channel;
}
