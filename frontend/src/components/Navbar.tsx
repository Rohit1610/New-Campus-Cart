import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Store, Package, Moon, Sun, LogIn } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useDarkMode } from '../hooks/useDarkMode';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function Navbar({ onSearch, searchQuery }: NavbarProps) {
  const { cartItems } = useCart();
  const { isDarkMode, toggle } = useDarkMode();
  const { user, logout } = useAuth();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Store className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              CampusCart
            </span>
          </Link>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/sell"
              className={`font-medium ${isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Sell Item
            </Link>

            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name || user.email}`}
                    alt="User avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {user.name || user.email}
                  </span>
                </div>
                <Link
                  to="/orders"
                  className={`font-medium flex items-center gap-1 ${isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Package className="h-5 w-5" />
                  Orders
                </Link>
                <button
                  onClick={logout}
                  className={`font-medium ${isDarkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`font-medium flex items-center gap-1 ${isDarkMode
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <LogIn className="h-5 w-5" />
                Login
              </Link>
            )}

            <Link to="/cart" className="relative">
              <ShoppingCart className={`h-6 w-6 ${isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                }`} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggle}
              className={`p-2 rounded-lg ${isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
