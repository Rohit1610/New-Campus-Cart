import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Spinner } from '../components/Spinner';  // Import the Spinner component
import { StatusIcon } from '../components/StatusIcon'; 
import { StatusBadge  } from '../components/StatusBadge'; 
interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery: Date;
}

export function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // For error handling

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders');  // Replace with your actual API URL
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar searchQuery="" onSearch={() => {}} />
        <div className="flex justify-center items-center h-full">
          <Spinner />  {/* Show loading spinner while data is being fetched */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar searchQuery="" onSearch={() => {}} />
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchQuery="" onSearch={() => {}} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>

        <div className="space-y-4">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {/* Assume you have StatusIcon and StatusBadge components */}
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
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
