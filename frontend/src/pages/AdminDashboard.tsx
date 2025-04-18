import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';

export function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchQuery="" onSearch={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            {/* Add order management UI here */}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">User Management</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {users.map((user: any) => (
                <li key={user._id}>{user.email} ({user.role})</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Product Management</h2>
            {/* Add product management UI here */}
          </div>
        </div>
      </main>
    </div>
  );
}
