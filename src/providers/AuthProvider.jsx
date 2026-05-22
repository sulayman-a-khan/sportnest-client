import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");

        if (res.data && res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (res.data?.success) {
        setUser(res.data.user);
        toast.success(res.data.message || "Login successful");
        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const register = async (name, email, password, photoUrl) => {
    try {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        photoUrl,
      });

      if (res.data?.success) {
        // Strict Registration: Account created, but NO auto-login.
        toast.success(res.data.message || "Registered successfully. Please log in.");
        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      toast.success("Logged out");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const googleLogin = async (credential) => {
    try {
      const res = await axiosInstance.post("/auth/google", {
        credential,
      });

      if (res.data?.success) {
        setUser(res.data.user);
        toast.success(res.data.message || "Google login successful");
        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Google auth failed");
      throw error;
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
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
