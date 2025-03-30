import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import WorkerProfile from "./pages/WorkerProfile.tsx";
import WorkerDashboard from "./pages/WorkerDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

// Layout components
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
<QueryClientProvider client={queryClient}>
<TooltipProvider>
<Toaster />
<BrowserRouter>
<Routes>
<Route path="/" element={<Layout><Home /></Layout>} />
<Route path="/login" element={<Layout><Login /></Layout>} />
<Route path="/worker/profile" element={<Layout><WorkerProfile /></Layout>} />
<Route path="/worker/dashboard" element={<Layout><WorkerDashboard /></Layout>} />
<Route path="*" element={<Layout><NotFound /></Layout>} />
</Routes>
</BrowserRouter>
</TooltipProvider>
</QueryClientProvider>
);

export default App;
