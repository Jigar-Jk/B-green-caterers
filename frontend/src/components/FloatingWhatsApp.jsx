import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="tel:+917433033031"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 group"
      initial={{ x: 500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        delay: 1, 
        duration: 1.8,
        type: "spring", 
        stiffness: 80, 
        damping: 15 
      }}
      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 211, 102, 0.4)" }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Phone Icon */}
      <div className="relative">
        <Phone className="w-6 h-6" fill="currentColor" />
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
      </div>
      
      {/* Text */}
      <span className="font-semibold text-sm whitespace-nowrap">
        Call Us Now
      </span>

      {/* Notification Badge */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
        1
      </div>
    </motion.a>
  );
};

export default FloatingWhatsApp;
