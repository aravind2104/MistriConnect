import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MistriLogo } from './MistriLogo';

const Navbar = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
setIsMenuOpen(!isMenuOpen);
};

return (
<nav className="bg-white shadow-sm">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between h-16">
<div className="flex">
<div className="flex-shrink-0 flex items-center">
</div>
<MistriLogo/>
<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
<Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-tool-blue">
Home
</Link>
<Link to="/browse" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-tool-blue hover:text-gray-700">
Browse Handymen
</Link>
<Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-tool-blue hover:text-gray-700">
About Us
</Link>
<Link to="/contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-tool-blue hover:text-gray-700">
Contact
</Link>
</div>
</div>
<div className="hidden sm:ml-6 sm:flex sm:items-center">
<Link to="/login">
<Button variant="outline" className="mr-2">Log in</Button>
</Link>
<Link to="/signup">
<Button>Sign up</Button>
</Link>
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

{/* Mobile menu, show/hide based on menu state. */}
{isMenuOpen && (
<div className="sm:hidden" id="mobile-menu">
<div className="pt-2 pb-3 space-y-1">
<Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-tool-blue hover:text-gray-800">
Home
</Link>
<Link to="/browse" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-tool-blue hover:text-gray-800">
Browse Handymen
</Link>
<Link to="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-tool-blue hover:text-gray-800">
About Us
</Link>
<Link to="/contact" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-tool-blue hover:text-gray-800">
Contact
</Link>
<div className="pt-4 pb-3 border-t border-gray-200">
<Link to="/login" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-tool-blue hover:text-gray-800">
Log in
</Link>
<Link to="/signup" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-tool-blue hover:text-gray-800">
Sign up
</Link>
</div>
</div>
</div>
)}
</nav>
);
};

export default Navbar;
