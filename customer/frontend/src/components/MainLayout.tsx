import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { MistriLogo } from "@/components/MistriLogo";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Find Services", path: "/search" },
    { name: "Bookings", path: "/booking-history" },
    { name: "Notifications", path: "/notifications" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <MistriLogo small />
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium hover:text-blue-600 transition-colors ${
                    location.pathname === item.path
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                  {item.name === "Notifications" && hasNotifications && (
                    <span className="ml-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>
          )}
          
          {/* User Menu (Desktop) */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                    <span className="sr-only">Open user menu</span>
                    <div className="flex items-center justify-center h-full w-full bg-gray-200 rounded-full">
                      <span className="text-sm font-medium">JD</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2 border-b">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="cursor-pointer">Help & Support</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="cursor-pointer text-red-600">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden"
            >
              {showMobileMenu ? (
                <span className="text-xl">×</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </Button>
          )}
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobile && showMobileMenu && (
          <div className="md:hidden bg-white border-t p-4">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium p-2 rounded hover:bg-gray-100 ${
                    location.pathname === item.path
                      ? "bg-gray-100 text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                  {item.name === "Notifications" && hasNotifications && (
                    <span className="ml-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Link>
              ))}
              <div className="border-t pt-2 mt-2">
                <Link
                  to="/profile"
                  className="text-sm font-medium p-2 rounded hover:bg-gray-100 block"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="text-sm font-medium p-2 rounded hover:bg-gray-100 block"
                >
                  Settings
                </Link>
                <Link
                  to="/help"
                  className="text-sm font-medium p-2 rounded hover:bg-gray-100 block"
                >
                  Help & Support
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-medium p-2 rounded hover:bg-gray-100 text-red-600 block"
                >
                  Logout
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="flex items-center space-x-2">
                <MistriLogo small />
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                Find the best handymen for your home services.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h4 className="font-medium mb-2">Quick Links</h4>
                <ul className="text-sm space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-500 hover:text-gray-900">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-500 hover:text-gray-900">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-gray-500 hover:text-gray-900">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Legal</h4>
                <ul className="text-sm space-y-2">
                  <li>
                    <Link to="/terms" className="text-gray-500 hover:text-gray-900">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-500 hover:text-gray-900">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} MistriConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};