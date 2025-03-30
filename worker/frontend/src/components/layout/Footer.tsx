import { Link } from 'react-router-dom';

const Footer = () => {
return (
<footer className="bg-gray-50 border-t">
<div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
<nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
<div className="px-5 py-2">
<Link to="/" className="text-base text-gray-500 hover:text-gray-900">
Home
</Link>
</div>
<div className="px-5 py-2">
<Link to="/browse" className="text-base text-gray-500 hover:text-gray-900">
Browse Handymen
</Link>
</div>
<div className="px-5 py-2">
<Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
About Us
</Link>
</div>
<div className="px-5 py-2">
<Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
Contact
</Link>
</div>
<div className="px-5 py-2">
<Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
Privacy
</Link>
</div>
<div className="px-5 py-2">
<Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
Terms
</Link>
</div>
</nav>
<p className="mt-8 text-center text-base text-gray-400">
&copy; {new Date().getFullYear()} MistriConnect. All rights reserved.
</p>
</div>
</footer>
);
};

export default Footer;