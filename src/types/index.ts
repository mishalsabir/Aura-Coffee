export interface Recipe {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  status: 'active' | 'inactive';
  rating?: number;
  isSignature?: boolean;
  isBestSeller?: boolean;
  calories?: number;
  volume?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  badgeColor?: string;
}

export interface CartItem {
  recipe: Recipe;
  quantity: number;
  customization?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';

export interface OrderItem {
  recipeId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    type: 'pickup' | 'delivery';
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface Review {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface CoffeeBean {
  id: string;
  origin: string;
  country: string;
  notes: string[];
  tagline: string;
  description: string;
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  altitude: string;
  process: string;
  price: number;
  image: string;
}

