import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-forest shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <img
              src="/images/logo_bgreen_-removebg-preview.png"
              alt="BGREEN caterers logo"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gold"
            >
              <span className="hidden sm:inline">BGREEN CATERERS</span>
              <span className="sm:hidden">BGREEN</span>
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
            {isAdmin && (
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
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gold hover:text-white transition-colors duration-300 p-2"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-forest border-t border-gold/20"
          >
            <div className="py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 text-base font-medium transition-colors ${
                    location.pathname === link.path 
                      ? 'text-gold bg-gold/10 border-r-4 border-gold' 
                      : 'text-white hover:text-gold hover:bg-gold/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Admin Controls */}
              {isAdmin && (
                <div className="border-t border-gold/20 pt-2 mt-2">
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
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;