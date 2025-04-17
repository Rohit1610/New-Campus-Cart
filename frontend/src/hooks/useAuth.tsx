import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, role: string) => void;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: (email: string, password: string, role: string) => {
    // Simple mock authentication
    if (email && password) {
      set({
        user: {
          id: '1',
          email,
          role: role as 'admin' | 'student' | 'society',
          createdAt: new Date(),
        },
        error: null,
      });
    } else {
      set({ error: 'Invalid credentials' });
    }
  },

  signup: async (email: string, password: string) => {
    try {
      // Simple mock signup
      set({
        user: {
          id: '1',
          email,
          role: 'student',
          createdAt: new Date(),
        },
        error: null,
      });
    } catch (error) {
      set({ error: 'Failed to create account' });
    }
  },

  logout: () => {
    set({ user: null, error: null });
  },
}));