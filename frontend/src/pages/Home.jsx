import ImageLightbox from '@/components/ImageLightbox';
import YouTubeSection from '@/components/YouTubeSection';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Award, ChefHat, Clock, Leaf } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// (headline animation removed) show static headline text

const Home = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  
  const features = [
    { icon: ChefHat, title: 'Expert Chefs', description: 'Crafted by culinary masters' },
    { icon: Award, title: 'Premium Quality', description: 'Only the finest ingredients' },
    { icon: Clock, title: 'Fresh Daily', description: 'Prepared fresh every day' },
    { icon: Leaf, title: 'Natural Flavors', description: 'No artificial additives' }
  ];

  return (
    <>
      <Helmet>
        <title>B Green Caterers - Bold Flavours, Naturally Crafted | Premium Non-Veg Food</title>
        <meta name="description" content="Experience bold flavors with caterers premium non-veg cuisine. Fresh ingredients, expert preparation, and unforgettable taste." />
      </Helmet>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-forest via-[#0a1f14] to-black">
          <img 
            className="w-full h-full object-cover opacity-40" 
            alt="Delicious tandoori chicken and grilled seafood platter"
           src="https://images.unsplash.com/photo-1691171047403-0abfd83f0ea7" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50"></div>
        </div>

        <div className="steam-effect"></div>

        <div className="absolute inset-0">
          <div className="leaf-particle" style={{ left: '15%', top: '25%' }}>🍃</div>
          <div className="leaf-particle" style={{ left: '75%', top: '45%', animationDelay: '4s' }}>🍃</div>
          <div className="leaf-particle" style={{ left: '50%', top: '70%', animationDelay: '7s' }}>🍃</div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-5xl w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-forest mb-4 sm:mb-6"
            >
                <span className="text-forest text-4xl sm:text-5xl md:text-6xl lg:text-7xl">B Green Caterers</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-forest">Bold Flavours, Naturally Crafted</span>
            </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-forest mb-6 sm:mb-8 px-2"
          >
            Experience premium non-veg cuisine with fresh ingredients and rich flavors
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4"
          >
            <Link to="/menu" className="w-full sm:w-auto">
              <Button className="bg-gold text-forest hover:bg-gold/90 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 transform hover:scale-105 transition-all w-full sm:w-auto">
                Explore Menu
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button variant="outline" className="border-2 border-gold text-white hover:bg-gold hover:text-forest text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 transform hover:scale-105 transition-all w-full sm:w-auto">
                About Us
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce text-gold">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4">Why Choose B Green Caterers?</h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">Premium quality meets exceptional taste</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-cream p-6 sm:p-8 rounded-lg shadow-lg text-center border-2 border-transparent hover:border-gold transition-all"
              >
                <feature.icon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-forest" />
                <h3 className="text-lg sm:text-xl font-bold text-forest mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <YouTubeSection />

      <section className="py-12 sm:py-16 md:py-20 gradient-green">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cursor-pointer w-full"
              onClick={() => setLightboxImage({ src: '/images/02 Tava Fry Menu.jpg', alt: 'Chef preparing signature biryani dish' })}
            >
              <div className="relative w-full rounded-lg shadow-2xl overflow-hidden bg-white p-2 sm:p-4 md:p-6">
                <img 
                  className="w-full h-auto object-contain rounded-lg hover:scale-105 active:scale-100 transition-transform duration-300" 
                  alt="Chef preparing signature biryani dish"
                  src='/images/02 Tava Fry Menu.jpg'
                  loading="lazy"
                  style={{ 
                    maxHeight: 'calc(100vh - 200px)',
                    maxWidth: '100%'
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Signature Dishes</h2>
              <p className="text-xl mb-6 text-gray-100">
                From aromatic biryanis to perfectly grilled tandoori, each dish is a masterpiece crafted with passion and precision.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <span className="text-gold text-2xl">✓</span>
                  <span className="text-lg">Authentic tandoori preparations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-gold text-2xl">✓</span>
                  <span className="text-lg">Fresh seafood specialties</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-gold text-2xl">✓</span>
                  <span className="text-lg">Rich, flavorful biryanis</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-gold text-2xl">✓</span>
                  <span className="text-lg">Premium cuts and marinades</span>
                </li>
              </ul>
              <Link to="/menu">
                <Button className="bg-gold text-forest hover:bg-gold/90 text-lg px-8 py-6 transform hover:scale-105 transition-all">
                  View Full Menu
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        src={lightboxImage?.src}
        alt={lightboxImage?.alt}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
};

export default Home;