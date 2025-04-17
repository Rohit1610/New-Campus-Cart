import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, StarHalf, MessageCircle } from 'lucide-react';
import type { Product, Review } from '../types';
import { useDarkMode } from '../hooks/useDarkMode';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { isDarkMode } = useDarkMode();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user-' + Math.random().toString(36).substr(2, 9),
      userName: 'Anonymous User',
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date()
    };
    
    product.reviews.push(review);
    product.averageRating = product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length;
    
    setNewReview({ rating: 5, comment: '' });
    setIsReviewModalOpen(false);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow`}>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-lg font-semibold line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {product.name}
          </h3>
          <button className={`${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}>
            <Heart size={20} />
          </button>
        </div>
        <p className={`text-sm mb-2 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className={index < Math.floor(product.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            ({product.reviews.length} reviews)
          </span>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="ml-2 text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
          >
            <MessageCircle size={14} />
            Add Review
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {product.seller.type}
          </span>
          {product.condition && (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              {product.condition}
            </span>
          )}
          <span className={`px-2 py-1 text-xs rounded-full ${
            product.quantity > 0 
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.quantity === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              product.quantity > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={18} />
            {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>

        {/* Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full mx-4`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Write a Review</h3>
              <form onSubmit={handleAddReview}>
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, rating: index + 1 }))}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={index < newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Comment
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    className={`w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'border-gray-300 text-gray-900'
                    }`}
                    rows={4}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className={`px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reviews List */}
        {product.reviews.length > 0 && (
          <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Reviews</h4>
            <div className="space-y-3">
              {product.reviews.slice(0, 2).map((review) => (
                <div key={review.id} className="text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={12}
                          className={index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{review.userName}</span>
                  </div>
                  <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}