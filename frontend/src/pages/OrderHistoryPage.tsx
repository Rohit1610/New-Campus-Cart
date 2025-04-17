import React from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import type { Order } from '../types';

// Mock data for demonstration
const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    userId: 'user1',
    items: [
      {
        productId: '1',
        name: 'Computer Science Society Hoodie',
        price: 35.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800'
      }
    ],
    totalAmount: 35.99,
    status: 'delivered',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Campus Street',
      city: 'University City',
      state: 'CA',
      zipCode: '12345'
    },
    trackingNumber: 'TRK123456789',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-04'),
    estimatedDelivery: new Date('2024-03-04')
  },
  {
    id: '2',
    userId: 'user1',
    items: [
      {
        productId: '2',
        name: 'Data Structures Textbook',
        price: 45.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800'
      }
    ],
    totalAmount: 45.00,
    status: 'shipped',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Campus Street',
      city: 'University City',
      state: 'CA',
      zipCode: '12345'
    },
    trackingNumber: 'TRK987654321',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-11'),
    estimatedDelivery: new Date('2024-03-15')
  }
];

const StatusIcon = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'processing':
      return <Package className="h-5 w-5 text-blue-500" />;
    case 'shipped':
      return <Truck className="h-5 w-5 text-purple-500" />;
    case 'delivered':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'cancelled':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export function OrderHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchQuery="" onSearch={() => {}} />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>
        
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <StatusIcon status={order.status} />
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>

                <p className="text-xs text-gray-500 mb-3">
                  Order #{order.id} • {order.createdAt.toLocaleDateString()}
                </p>

                <div className="flex items-center gap-3">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </div>
                  ))}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {order.items.map(item => item.name).join(', ')}
                    </p>
                    {order.trackingNumber && (
                      <p className="text-xs text-gray-500">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}