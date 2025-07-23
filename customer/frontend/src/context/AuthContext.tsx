// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (formData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check for existing token on initial load
  useEffect(() => {
    if (token) {
      // You might want to verify the token with the backend here
      // For now, we'll just set a dummy user
      setUser({ email: 'user@example.com' }); // Replace with actual user data from token
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8001/auth/login', { email, password },{withCredentials:true});
      console.log(response)
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem('customer_token', response.data.token);
        setUser(response.data.user);
        return Promise.resolve(); // Resolve the promise to indicate success
      } else {
        return Promise.reject(new Error("Login fadasailed")); // Reject the promise to indicate failure
      }
      
    } catch (error: any) {
      return Promise.reject(new Error(error.response?.data?.message || "Login failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8001/auth/register', formData, { withCredentials: true });
  
      if (response.status === 201) {
        return Promise.resolve(); // Resolve the promise to indicate success
      } else {
        return Promise.reject(new Error("Signup failed")); // Reject the promise to indicate failure
      }
    } catch (error: any) {
      return Promise.reject(new Error(error.response?.data?.message || "Signup failed")); // Reject with the actual error message
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('customer_token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};