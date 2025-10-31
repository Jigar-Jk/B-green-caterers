import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChefHat, Award, Clock, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageLightbox from '@/components/ImageLightbox';

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

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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

        <div className="relative z-10 text-center px-4 max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-forest mb-6"
            >
                <span className="text-forest text-5xl md:text-7xl">B Green Caterers</span>
              <br />
              <span className="text-3xl md:text-5xl text-forest">Bold Flavours, Naturally Crafted</span>
            </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-forest mb-8"
          >
            Experience premium non-veg cuisine with fresh ingredients and rich flavors
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/order">
              <Button className="bg-gold text-forest hover:bg-gold/90 text-lg px-8 py-6 transform hover:scale-105 transition-all">
                Order Now
              </Button>
            </Link>
            <Link to="/menu">
              <Button variant="outline" className="border-2 border-gold text-white hover:bg-gold hover:text-forest text-lg px-8 py-6 transform hover:scale-105 transition-all">
                Explore Menu
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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-forest mb-4">Why Choose B Green Caterers?</h2>
            <p className="text-xl text-gray-600">Premium quality meets exceptional taste</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-cream p-8 rounded-lg shadow-lg text-center border-2 border-transparent hover:border-gold transition-all"
              >
                <feature.icon className="w-16 h-16 mx-auto mb-4 text-forest" />
                <h3 className="text-xl font-bold text-forest mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-green">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cursor-pointer"
              onClick={() => setLightboxImage({ src: '/images/02 Tava Fry Menu.jpg', alt: 'Chef preparing signature biryani dish' })}
            >
              <img 
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover hover:scale-105 transition-transform duration-300" 
                alt="Chef preparing signature biryani dish"
               src='/images/02 Tava Fry Menu.jpg' />
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