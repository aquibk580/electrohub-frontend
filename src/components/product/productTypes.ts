export interface Review {
  id: number;
  rating: number;
  content: string;
  user: User;
}

export interface User {
  userId: number;
  name: string;
  pfp?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Category {
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  offerPercentage: number;
  stock: number;
  categoryName: string;
  status: string;
  productInfo: { brand: string; details: { key: string; value: string }[] };
  images: { id: number; url: string }[];
  reviews: Array<Review> | [];
  averageRating: number;
  seller: { name: string };
}

export interface Detail {
  key: string;
  value: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  status: string;
  paymentStatus: string;
  product: Product;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: number;
  userId: number;
  user: User;
  total: number;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}
