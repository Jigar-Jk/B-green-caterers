import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
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
                <a 
                  href="tel:+917433033031"
                  className="text-sm sm:text-base hover:text-gold transition-colors cursor-pointer"
                >
                  74 330 330 31
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.487"/>
                </svg>
                <a 
                  href="https://wa.me/917433033031?text=Hi%20B%20Green%20Caterers!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base hover:text-gold transition-colors cursor-pointer"
                >
                  74 330 330 31
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <a href="mailto:bgreencaterers@gmail.com" className="text-sm sm:text-base hover:text-gold transition-colors">bgreencaterers@gmail.com</a>
              </li>
              <li className="flex items-start justify-center sm:justify-start space-x-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                <a 
                  href="https://www.google.com/maps/place/B+GREEN+CATERERS/@23.0201974,72.6061892,17z/data=!3m1!4b1!4m6!3m5!1s0x395e852c4ede1bf3:0x11d88d88327603f5!8m2!3d23.0201974!4d72.6087641!16s%2Fg%2F11h0tlhg2k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-center sm:text-left hover:text-gold transition-colors cursor-pointer"
                >
                  B Green Caterers, nr. Kamdar Police Chowki, Gomtipur, Ahmedabad, Gujarat 380021
                </a>
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
              <a href="https://www.facebook.com/bgreencaterers" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors transform hover:scale-110" title="Follow us on Facebook">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.instagram.com/bgreencaterers/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors transform hover:scale-110" title="Follow us on Instagram">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.youtube.com/@bgreencaterers" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors transform hover:scale-110" title="Subscribe on YouTube">
                <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="hover:text-gold transition-colors transform hover:scale-110" title="Follow us on X">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
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