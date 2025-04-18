import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '../types';

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product: Product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
          set({
            cartItems: cartItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cartItems: [...cartItems, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId: string) => {
        set({
          cartItems: get().cartItems.filter(item => item.id !== productId),
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        const updatedItems =
          quantity === 0
            ? get().cartItems.filter(item => item.id !== productId)
            : get().cartItems.map(item =>
              item.id === productId ? { ...item, quantity } : item
            );
        set({ cartItems: updatedItems });
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
