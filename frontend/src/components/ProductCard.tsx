import React, { useState } from 'react';
import axios from 'axios';
import {
  ShoppingCart, Heart, Star, MessageCircle
} from 'lucide-react';
import type { Product, Review } from '../types';
import { useDarkMode } from '../hooks/useDarkMode';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  refreshProduct?: () => void; // optional refresh callback
}

export function ProductCard({ product, onAddToCart, refreshProduct }: ProductCardProps) {
  const { isDarkMode } = useDarkMode();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`/api/products/${product._id}/reviews`, newReview);
      setNewReview({ rating: 5, comment: '' });
      setIsReviewModalOpen(false);
      refreshProduct?.(); // refresh product details if provided
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Error submitting review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <div className="flex justify-between mb-2">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
          <Heart size={20} className="text-gray-400 hover:text-red-500" />
        </div>

        <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
          ))}
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
          <span className={`px-2 py-1 text-xs rounded-full ${
            product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
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
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Rating</label>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                      >
                        <Star
                          size={24}
                          className={i < newReview.rating ? 'text-yellow-400' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Comment</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className={`w-full rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border p-2`}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsReviewModalOpen(false)} className="text-sm text-gray-500 hover:text-gray-800">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {loading ? 'Submitting...' : 'Submit Review'}
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
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
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
