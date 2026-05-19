import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Recover active session on load/refresh (persistence)
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axiosInstance.get('/auth/me');
        if (response.data && response.data.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      if (response.data && response.data.success) {
        setUser(response.data.user);
        toast.success(response.data.message || 'Welcome back!');
        return response.data;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      throw err;
    }
  };

  const register = async (name, email, password, photoUrl) => {
    try {
      const response = await axiosInstance.post('/auth/register', { name, email, password, photoUrl });
      if (response.data && response.data.success) {
        setUser(response.data.user);
        toast.success(response.data.message || 'Account registered successfully!');
        return response.data;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed.';
      toast.error(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      setUser(null);
      toast.success('Logged out successfully.');
    } catch (err) {
      toast.error('Error during logout.');
    }
  };

  const googleLogin = async (idToken) => {
    try {
      const response = await axiosInstance.post('/auth/google', { idToken });
      if (response.data && response.data.success) {
        setUser(response.data.user);
        toast.success(response.data.message || 'Authenticated successfully via Google!');
        return response.data;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Google authentication failed.';
      toast.error(message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    googleLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
