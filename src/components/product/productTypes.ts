export interface Review {
  id: number;
  rating: number;
  content: string;
  user: User;
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
}

export interface User {
  userId: number;
  name: string;
  pfp?: string;
}

export interface Category {
  name: string;
}
