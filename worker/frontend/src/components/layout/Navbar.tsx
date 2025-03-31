import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MistriLogo } from './MistriLogo';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Check if current route matches the link
  const isActive = (path: string) => location.pathname === path;
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={()=>{navigate("/")}}>
              <MistriLogo/>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                to="/" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 hover:border-tool-blue ${
                  isActive('/') 
                    ? 'text-gray-900 border-tool-blue' 
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 hover:border-tool-blue ${
                  isActive('/about') 
                    ? 'text-gray-900 border-tool-blue' 
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 hover:border-tool-blue ${
                  isActive('/contact') 
                    ? 'text-gray-900 border-tool-blue' 
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tool-blue"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              onClick={toggleMenu}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium hover:bg-gray-50 hover:border-tool-blue ${
                isActive('/') 
                  ? 'text-gray-900 border-tool-blue' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={toggleMenu}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium hover:bg-gray-50 hover:border-tool-blue ${
                isActive('/about') 
                  ? 'text-gray-900 border-tool-blue' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              onClick={toggleMenu}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium hover:bg-gray-50 hover:border-tool-blue ${
                isActive('/contact') 
                  ? 'text-gray-900 border-tool-blue' 
                  : 'text-gray-600 border-transparent hover:text-gray-800'
              }`}
            >
              Contact
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-red-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={toggleMenu}
                    className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={toggleMenu}
                    className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;