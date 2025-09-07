export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  devices: string;
  category: string;
  is_available: boolean;
  domain: string;
  product_key: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: 'bank_transfer';
  status: 'pending' | 'paid' | 'delivered';
  createdAt: Date;
}