import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://orkzhuikftajfnlnldzq.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ya3podWlrZnRhamZubG5sZHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5MDMwOTYsImV4cCI6MjEwNzQ3OTA5Nn0.sBq7fiqoehWRQg8K5GbZR4KiKAMpp3XA-p7jx1RDxpo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/** Shape that maps directly to the order_inquiries table columns */
export interface OrderInquiryItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant: string | null;
  extraCheese: boolean;
}

export interface OrderInquiryRecord {
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
  status: string;
  items?: OrderInquiryItem[];
}

/**
 * Saves an order inquiry to the Supabase `order_inquiries` table.
 * If individual items are provided, they are also saved to `order_inquiry_items`.
 * Returns true on success, false on failure (non-blocking).
 */
export async function saveOrderInquiry(record: OrderInquiryRecord): Promise<boolean> {
  const { items: _unusedItems, ...inquiryData } = record;

  const { error } = await supabase
    .from('order_inquiries')
    .insert([inquiryData]);

  if (error) {
    console.error('[Supabase] Failed to save order inquiry:', error.message);
    return false;
  }

  return true;
}


