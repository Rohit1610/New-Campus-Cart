import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import type { Product, CartItem } from '../types';
import { useCart } from '../hooks/useCart';
import { useDarkMode } from '../hooks/useDarkMode';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Computer Science Society Hoodie',
    description: 'Comfortable cotton hoodie with CS Society logo. Limited edition design.',
    price: 35.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800',
    seller: {
      name: 'Computer Science Society',
      type: 'society',
      id: 'css-001'
    },
    category: 'clothing',
    condition: 'new',
    createdAt: new Date(),
    quantity: 50,
    reviews: [],
    averageRating: 0
  },
  {
    id: '2',
    name: 'Data Structures Textbook',
    description: 'Slightly used textbook for CS202. Perfect condition, no highlights.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800',
    seller: {
      name: 'Jane Smith',
      type: 'student',
      id: 'student-123'
    },
    category: 'books',
    condition: 'like-new',
    createdAt: new Date(),
    quantity: 1,
    reviews: [],
    averageRating: 0
  },
  {
    id: '3',
    name: 'iPhone 13 Pro',
    description: 'Used iPhone 13 Pro 128GB, great condition, includes charger and original box.',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1632661674596-df3210908b84?auto=format&fit=crop&w=800',
    seller: {
      name: 'Mike Johnson',
      type: 'student',
      id: 'student-456'
    },
    category: 'phones',
    condition: 'good',
    createdAt: new Date(),
    quantity: 1,
    reviews: [],
    averageRating: 0
  },
  {
    id: '4',
    name: 'Samsung Galaxy S22',
    description: 'Brand new Samsung Galaxy S22, won in a competition, sealed in box.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800',
    seller: {
      name: 'Tech Society',
      type: 'society',
      id: 'tech-001'
    },
    category: 'phones',
    condition: 'new',
    createdAt: new Date(),
    quantity: 2,
    reviews: [],
    averageRating: 0
  }
];

export function HomePage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSellerType, setSelectedSellerType] = useState('');
  const { addToCart } = useCart();
  const { isDarkMode } = useDarkMode();

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
        p.id === product.id
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
    const matchesSellerType = !selectedSellerType || product.seller.type === selectedSellerType;
    
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
                key={product.id}
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