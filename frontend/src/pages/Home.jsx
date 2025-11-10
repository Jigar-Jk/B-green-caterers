import ImageLightbox from '@/components/ImageLightbox';
import ScrollingMarquee from '@/components/ScrollingMarquee';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Award, ChefHat, Clock, Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// (headline animation removed) show static headline text

const Home = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Counter states for animated numbers
  const [yearsCount, setYearsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const features = [
    { icon: ChefHat, title: 'Expert Chefs', description: 'Crafted by culinary masters' },
    { icon: Award, title: 'Premium Quality', description: 'Only the finest ingredients' },
    { icon: Clock, title: 'Fresh Daily', description: 'Prepared fresh every day' },
    { icon: Leaf, title: 'Natural Flavors', description: 'No artificial additives' }
  ];

  const menuImages = [
    { src: '/Items/CHICKEN%20MLAI%20TIKKA.jpg', alt: 'Chicken Malai Tikka - Signature Dish' },
    { src: '/Items/CHICKEN%20MLAI%20LOVLYPOP.jpg', alt: 'Chicken Malai Lollypop' },
    { src: '/Items/B%20GREEN%20FRIED%20CHICKEN%20TANGDI.jpg', alt: 'B Green Fried Chicken Tangdi' },
    { src: '/Items/MUTTON%20CHILLI%20DRY.jpg', alt: 'Mutton Chilli Dry' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % menuImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + menuImages.length) % menuImages.length);
  };

  // Auto-play carousel - slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentSlide]);

  // Animated counter function
  const animateCounter = (target, setter, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setter(target);
        clearInterval(timer);
      } else {
        setter(Math.floor(start));
      }
    }, 16);
    
    return timer;
  };

  // Trigger counter animation when stats section comes into view
  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimated) return;
      
      const statsSection = document.getElementById('stats-section');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
          setHasAnimated(true);
          animateCounter(14, setYearsCount, 2000);
          animateCounter(2000, setEventsCount, 2500);
          animateCounter(98, setCustomersCount, 2000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  return (
    <>
      <Helmet>
        <title>B Green Caterers - Bold Flavours, Naturally Crafted | Premium Non-Veg Food</title>
        <meta name="description" content="Experience bold flavors with caterers premium non-veg cuisine. Fresh ingredients, expert preparation, and unforgettable taste." />
      </Helmet>

      <ScrollingMarquee />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full mt-12 sm:mt-16">
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
            {/* Explore Menu Button */}
            <Link to="/menu" className="w-full sm:w-auto">
              <button className="relative overflow-hidden bg-[#d4af37] text-forest font-bold text-sm sm:text-base pl-5 sm:pl-6 pr-2 py-2 sm:py-3 rounded-full shadow-lg border-2 border-[#d4af37] group transition-all duration-300 w-full sm:w-auto">
                {/* Darker gold background on hover */}
                <span className="absolute inset-0 bg-[#b8941f] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                
                {/* Content */}
                <span className="relative z-10 flex items-center justify-between gap-2 sm:gap-3">
                  <span className="group-hover:text-white transition-colors duration-500">
                    Explore Menu
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-forest group-hover:bg-white flex items-center justify-center transition-colors duration-500 flex-shrink-0">
                    <svg 
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gold group-hover:text-forest transition-colors duration-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              </button>
            </Link>

            {/* About Us Button */}
            <Link to="/about" className="w-full sm:w-auto">
              <button className="relative overflow-hidden bg-transparent text-white font-bold text-sm sm:text-base pl-5 sm:pl-6 pr-2 py-2 sm:py-3 rounded-full shadow-lg border-2 border-white group transition-all duration-300 hover:border-[#d4af37] w-full sm:w-auto">
                {/* Gold background on hover */}
                <span className="absolute inset-0 bg-[#d4af37] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                
                {/* Content */}
                <span className="relative z-10 flex items-center justify-between gap-2 sm:gap-3">
                  <span className="group-hover:text-forest transition-colors duration-500">
                    About Us
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white group-hover:border-forest group-hover:bg-forest flex items-center justify-center transition-all duration-500 flex-shrink-0">
                    <svg 
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-gold transition-colors duration-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              </button>
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

      {/* Our Story Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          {/* Heading - Single Line Above Everything */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-[#fef3e2] px-3 py-1 text-[#D32F2F]">OUR STORY</span>
              <span className="text-gray-800"> at B Green Caterers</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <img 
                src="/banners/Banner~1.webp" 
                alt="Traditional Indian Thali - B Green Caterers"
                className="w-full h-auto object-contain rounded-lg shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                onClick={() => setLightboxImage({ src: '/banners/Banner~1.webp', alt: 'Traditional Indian Thali - B Green Caterers' })}
              />
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Subheading */}
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Over a Decade of Culinary Excellence
              </h3>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Taste, quality, service - these are the promises we live by at B Green Caterers. For over a decade, we've been crafting culinary excellence and delivering unforgettable experiences.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-2">
                  <svg className="w-6 h-6 text-[#D32F2F] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-semibold">AWARD-WINNING SERVICE</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-6 h-6 text-[#D32F2F] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-semibold">24/7 SUPPORT</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-6 h-6 text-[#D32F2F] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-semibold">PROFESSIONAL CHEFS</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-6 h-6 text-[#D32F2F] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-semibold">CUSTOM MENUS</span>
                </div>
              </div>

              {/* Contact Button */}
              <Link to="/contact">
                <button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-lg px-8 py-3 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105">
                  CONTACT US
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Parallax Background */}
      <section 
        className="relative py-20 sm:py-24 md:py-32 bg-cover bg-center bg-fixed overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=2000)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/75"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
            className="text-center mb-16 sm:mb-20"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 60 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">Why Choose </span>
              <span className="text-[#D32F2F] font-extrabold tracking-wide">
                B GREEN CATERERS
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 60 }}
              className="text-xl sm:text-2xl text-gray-200 px-4"
            >
              Premium quality meets exceptional taste
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + (index * 0.15),
                  type: "spring",
                  stiffness: 50,
                  damping: 12
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative overflow-hidden bg-white p-8 sm:p-10 rounded-2xl shadow-2xl text-center border-t-4 border-[#D32F2F] group cursor-pointer"
              >
                {/* Green gradient that slides from top to bottom on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88] to-[#008000] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-in-out"></div>
                
                {/* Content with relative positioning */}
                <div className="relative z-10">
                  {/* Icon */}
                  <feature.icon className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 text-forest group-hover:text-black transition-colors duration-1000" strokeWidth={1.5} />
                  
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-forest mb-4 group-hover:text-black transition-colors duration-1000">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-base sm:text-lg text-gray-600 group-hover:text-black leading-relaxed transition-colors duration-1000">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Side - Images with carousel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Large Left Image with Carousel */}
                <div className="col-span-1 relative">
                  <div 
                    className="cursor-pointer relative overflow-hidden rounded-3xl shadow-xl"
                    onClick={() => setLightboxImage(menuImages[currentSlide])}
                  >
                    <img 
                      className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500" 
                      alt={menuImages[currentSlide].alt}
                      src={menuImages[currentSlide].src}
                      loading="lazy"
                    />
                    {/* Previous Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                      aria-label="Previous slide"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                      aria-label="Next slide"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Side - Small Image Grid */}
                <div className="col-span-1 space-y-4">
                  <div 
                    className="cursor-pointer relative overflow-hidden rounded-3xl shadow-xl"
                    onClick={() => setLightboxImage({ src: '/banners/Menu 2~1.webp', alt: 'Menu Highlights' })}
                  >
                    <img 
                      className="w-full h-[240px] object-cover hover:scale-105 transition-transform duration-500" 
                      alt="Menu Highlights"
                      src="/banners/Menu 2~1.webp"
                      loading="lazy"
                    />
                  </div>
                  <div 
                    className="cursor-pointer relative overflow-hidden rounded-3xl shadow-xl"
                    onClick={() => setLightboxImage({ src: '/banners/Menu 3~1.webp', alt: 'Special Menu Items' })}
                  >
                    <img 
                      className="w-full h-[240px] object-cover hover:scale-105 transition-transform duration-500" 
                      alt="Special Menu Items"
                      src="/banners/Menu 3~1.webp"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* "Since 2011" Badge - Smaller Size */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                  {/* Gold outer ring */}
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#d4af37] to-[#c4941f] p-1.5 shadow-2xl">
                    {/* Maroon inner circle */}
                    <div className="w-full h-full rounded-full bg-[#8B2942] flex flex-col items-center justify-center text-white shadow-inner">
                      <span className="text-sm sm:text-base font-normal">Since</span>
                      <span className="text-3xl sm:text-4xl font-bold">2011</span>
                    </div>
                  </div>
                  {/* Decorative border lines */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-forest"
            >
              <div className="mb-4 overflow-hidden">
                <motion.span 
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  className="inline-block text-gold text-sm font-bold tracking-[0.2em] uppercase"
                >
                  SIGNATURE DISHES
                </motion.span>
              </div>
              
              {/* Animated Heading - Word by Word */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-forest leading-tight overflow-hidden">
                <motion.span
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 80 }}
                  className="inline-block"
                >
                  Elevating&nbsp;
                </motion.span>
                <motion.span
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 80 }}
                  className="inline-block"
                >
                  Your&nbsp;
                </motion.span>
                <motion.span
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 80 }}
                  className="inline-block"
                >
                  Events&nbsp;
                </motion.span>
                <motion.span
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 80 }}
                  className="inline-block"
                >
                  with&nbsp;
                </motion.span>
                <motion.span
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.0, type: "spring", stiffness: 80 }}
                  className="inline-block"
                >
                  Exceptional&nbsp;
                </motion.span>
                <motion.span
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 80 }}
                  className="inline-block text-gold"
                >
                  Food.
                </motion.span>
              </h2>
              
              <motion.p 
                initial={{ x: -150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.4, type: "spring", stiffness: 80 }}
                className="text-xl mb-8 text-gray-700"
              >
                B Green is The Place where Food is Celebrated over 25 Years. We Love to Create Unforgettable Culinary Experiences.
              </motion.p>

              {/* Stats Cards */}
              <div id="stats-section" className="grid grid-cols-3 gap-4 mb-8">
                {/* 25 Years of Experience */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-forest mb-1">{yearsCount}</div>
                  <div className="text-sm text-gray-600 leading-tight">Years of<br />Experience</div>
                </motion.div>

                {/* 2000+ Successful Events */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-forest mb-1">{eventsCount.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600 leading-tight">Successful<br />Events</div>
                </motion.div>

                {/* 98% Repeated Customers */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-forest mb-1">{customersCount}%</div>
                  <div className="text-sm text-gray-600 leading-tight">Repeated<br />Customers</div>
                </motion.div>
              </div>

              <Link to="/menu">
                <button className="relative overflow-hidden bg-white text-black font-bold text-lg pl-8 pr-3 py-3 rounded-full shadow-lg border-2 border-black group transition-all duration-300 hover:border-[#8B1E3F]">
                  {/* Red background that slides from left to right */}
                  <span className="absolute inset-0 bg-[#8B1E3F] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  
                  {/* Content container */}
                  <span className="relative z-10 flex items-center justify-between gap-4">
                    {/* Text */}
                    <span className="group-hover:text-white transition-colors duration-500">
                      View Full Menu
                    </span>
                    
                    {/* Arrow Circle */}
                    <span className="w-10 h-10 rounded-full bg-[#8B1E3F] group-hover:bg-white flex items-center justify-center transition-colors duration-500">
                      <svg 
                        className="w-5 h-5 text-white group-hover:text-[#8B1E3F] transition-colors duration-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </span>
                </button>
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