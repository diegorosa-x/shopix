export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string;
  category_name: string;
  category_slug: string;
  brand: string;
  main_image: string;
  stock: number;
  is_featured: boolean;
  specs: Record<string, string> | null;
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
  images: string[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type ProductPayload = {
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string;
  brand: string;
  main_image: string;
  stock: number;
  is_featured: boolean;
  specs: Record<string, string> | null;
};

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  avatar?: string;
}

export type OrderStatus =
  | "Pending"
  | "Paid"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  salesData: { date: string; amount: number }[];
  categoryData: { name: string; value: number }[];
}