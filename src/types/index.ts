export type FoodCategory =
  | 'all'
  | 'quick-bites'
  | 'burger'
  | 'momos'
  | 'sandwich'
  | 'pizza'
  | 'shakes-drinks'
  | 'amul-ice-cream';

export interface ProductVariant {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: FoodCategory;
  categoryLabel: string;
  description: string;
  price: number; // Base price or starting price
  variants?: ProductVariant[];
  image: string;
  isVeg: true; // All items at Vrindavan Treats are 100% vegetarian Amul dairy
  isChefsSpecial?: boolean;
  isBestSeller?: boolean;
  allowExtraCheese?: boolean;
}

export interface OrderItem {
  id: string; // unique cart line id: menuItemId + variant + cheese
  menuItemId: string;
  name: string;
  category: string;
  selectedVariant?: string;
  extraCheese: boolean;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface CustomerOrderDetails {
  fullName: string;
  mobileNumber: string;
  email: string;
  pickupDate?: string;
  pickupTime?: string;
  specialInstructions?: string;
}
