import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-forest text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="leaf-particle" style={{ left: '10%', top: '20%' }}>🍃</div>
        <div className="leaf-particle" style={{ left: '80%', top: '60%', animationDelay: '3s' }}>🍃</div>
        <div className="leaf-particle" style={{ left: '50%', top: '40%', animationDelay: '6s' }}>🍃</div>
      </div>

         <div className="container mx-auto px-4 py-12 relative z-10 max-w-screen-xl">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-12 items-start justify-items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gold mb-4">caterers</h3>
            <p className="text-gray-300 mb-4">
              Bold Flavours, Naturally Crafted. Experience premium non-veg cuisine with fresh ingredients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
              className="w-full"
          >
            <h4 className="text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-gold transition-colors">Menu</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link to="/order" className="hover:text-gold transition-colors">Order</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
              className="w-full"
          >
            <h4 className="text-lg font-semibold mb-4 text-gold">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>74 330 330 31</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@caterers.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>B Green Caterers, nr. Kamdar Police Chowki, Gomtipur, Ahmedabad, Gujarat 380021</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
              className="w-full"
          >
            <h4 className="text-lg font-semibold mb-4 text-gold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold transition-colors transform hover:scale-110">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gold transition-colors transform hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gold transition-colors transform hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-300">Opening Hours:</p>
              <p className="text-gold font-semibold">Mon-Sun: 11:00 AM - 11:00 PM</p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 caterers. All rights reserved. Crafted with passion for food lovers.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Designed & Developed by <a href="https://www.infinitone.tech/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline">InfiniteOne</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;