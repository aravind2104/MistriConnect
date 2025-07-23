import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import CustomerProfile from "./pages/Profile";
import { createContext, useState } from "react";
import { ToastProviderCompat } from "@/hooks/use-toast-compat";
import { AuthProvider } from "./context/AuthContext";

// Create a context for auth state management
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <QueryClientProvider client={queryClient}>
       <BrowserRouter>
        <TooltipProvider>
          <ToastProviderCompat>
            <Toaster />
           <AuthProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/profile" element={<CustomerProfile />} />
              </Routes>
              </AuthProvider>
            
          </ToastProviderCompat>
        </TooltipProvider>
        </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
