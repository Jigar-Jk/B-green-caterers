import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart, LayoutDashboard, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { toast } = useToast();

  // Check if user is logged in as admin
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    setIsAdmin(adminAuth === 'true');
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminId');
    setIsAdmin(false);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Order', path: '/order' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-forest shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/images/logo_bgreen_-removebg-preview.png"
              alt="BGREEN caterers logo"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-bold text-gold"
            >
              BGREEN CATERERS
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-black hover:text-gold transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-gold font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Admin Controls */}
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard">
                  <Button variant="outline" className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="bg-red-600 text-white border-red-600 hover:bg-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/order" className="relative">
                <Button variant="outline" className="bg-gold text-forest border-gold hover:bg-gold/90">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Button>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-forest pb-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 text-black hover:text-gold transition-colors ${
                  location.pathname === link.path ? 'text-gold font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Admin Controls */}
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3">
                  <Button variant="outline" className="w-full bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <div className="block px-4 py-3">
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full bg-red-600 text-white border-red-600 hover:bg-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/order" onClick={() => setIsOpen(false)} className="block px-4 py-3">
                <Button variant="outline" className="w-full bg-gold text-forest border-gold hover:bg-gold/90">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({getCartCount()})
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;