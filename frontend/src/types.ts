export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller: {
    name: string;
    type: 'society' | 'student';
    id: string;
  };
  category: 'clothing' | 'books' | 'electronics' | 'phones' | 'other';
  condition?: 'new' | 'like-new' | 'good' | 'fair';
  createdAt: Date;
  quantity: number;
  reviews: Review[];
  averageRating: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'student' | 'society';
  createdAt: Date;
}