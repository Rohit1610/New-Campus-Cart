import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useDarkMode } from '../hooks/useDarkMode';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSellerType, setSelectedSellerType] = useState('');
  const { addToCart } = useCart();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (product: Product) => {
    if (product.quantity === 0) {
      alert('This item is out of stock!');
      return;
    }

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p._id === product._id
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );

    addToCart(product);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSellerType = !selectedSellerType || product.seller?.type === selectedSellerType;

    return matchesSearch && matchesCategory && matchesSellerType;
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar 
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Campus Marketplace
          </h1>
          <div className="flex gap-4">
            <select 
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              }`}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="phones">Phones</option>
              <option value="electronics">Electronics</option>
              <option value="other">Other</option>
            </select>
            <select 
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              }`}
              value={selectedSellerType}
              onChange={(e) => setSelectedSellerType(e.target.value)}
            >
              <option value="">All Sellers</option>
              <option value="society">Societies</option>
              <option value="student">Students</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
