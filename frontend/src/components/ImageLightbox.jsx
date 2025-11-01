import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * ImageLightbox - Full screen image viewer
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {boolean} isOpen - Control visibility
 * @param {function} onClose - Close handler
 */
const ImageLightbox = ({ src, alt, isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white z-[10000]"
            aria-label="Close image"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg cursor-default"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />

          {/* Image caption */}
          {alt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full max-w-2xl text-center"
            >
              {alt}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
