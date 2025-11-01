import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-forest text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="leaf-particle" style={{ left: '10%', top: '20%' }}>🍃</div>
        <div className="leaf-particle" style={{ left: '80%', top: '60%', animationDelay: '3s' }}>🍃</div>
        <div className="leaf-particle" style={{ left: '50%', top: '40%', animationDelay: '6s' }}>🍃</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 max-w-screen-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center sm:text-left"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gold mb-3 sm:mb-4">B Green Caterers</h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Bold Flavours, Naturally Crafted. Experience premium non-veg cuisine with fresh ingredients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center sm:text-left"
          >
            <h4 className="text-lg font-semibold mb-3 sm:mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gold transition-colors text-sm sm:text-base">Home</Link></li>
              <li><Link to="/menu" className="hover:text-gold transition-colors text-sm sm:text-base">Menu</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors text-sm sm:text-base">About</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors text-sm sm:text-base">Contact</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center sm:text-left"
          >
            <h4 className="text-lg font-semibold mb-3 sm:mb-4 text-gold">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center sm:justify-start space-x-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">74 330 330 31</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">info@caterers.com</span>
              </li>
              <li className="flex items-start justify-center sm:justify-start space-x-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-center sm:text-left">B Green Caterers, nr. Kamdar Police Chowki, Gomtipur, Ahmedabad, Gujarat 380021</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center sm:text-left"
          >
            <h4 className="text-lg font-semibold mb-3 sm:mb-4 text-gold">Follow Us</h4>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="hover:text-gold transition-colors transform hover:scale-110">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="hover:text-gold transition-colors transform hover:scale-110">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="hover:text-gold transition-colors transform hover:scale-110">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
            <div className="mt-4 sm:mt-6">
              <p className="text-xs sm:text-sm text-gray-300">Opening Hours:</p>
              <p className="text-gold font-semibold text-sm sm:text-base">Mon-Sun: 11:00 AM - 11:00 PM</p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2025 caterers. All rights reserved. Crafted with passion for food lovers.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Designed & Developed by <a href="https://www.infinitone.tech/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline">InfiniteOne</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;