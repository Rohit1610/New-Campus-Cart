import { useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
        role,
      });

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage(`Welcome, ${data.user.name || data.user.email}!`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/signup', {
        email,
        password,
      });

      setMessage('Signup completed successfully!');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed. Try again.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setMessage('Logged out.');
    setError('');
  };

  return { user, message, error, loading, login, signup, logout };
};
