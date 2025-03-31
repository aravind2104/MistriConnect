import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import WorkerProfile from "./pages/WorkerProfile.tsx";
import WorkerDashboard from "./pages/WorkerDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import Signup from "./pages/Signup.tsx";

// Layout components
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import EarningsPage from "./pages/EarningsPage.tsx";
import SetAvailability from "./pages/SetAvailbaility.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";

const queryClient = new QueryClient();

const RedirectToDashboard = () => {
  const { user } = useAuth(); // Get user authentication state

  return user ? <Navigate to="/worker/dashboard" replace /> : <Home />;
};

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout><RedirectToDashboard /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/worker/profile" element={<Layout><WorkerProfile /></Layout>} />
              <Route path="/worker/dashboard" element={<Layout><WorkerDashboard /></Layout>} />
              <Route path="/worker/earnings" element={<Layout><EarningsPage /></Layout>} />
              <Route path="/worker/setavailability" element={<Layout><SetAvailability /></Layout>} />
              <Route path="/about" element={<Layout><About/></Layout>} />
              <Route path="/contact" element={<Layout><Contact/></Layout>} />
            </Route>

            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
