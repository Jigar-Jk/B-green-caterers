import { motion } from 'framer-motion';
import { Award, Heart, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ImageLightbox from '@/components/ImageLightbox';
import ScrollingMarquee from '@/components/ScrollingMarquee';

const About = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const timeline = [
    { year: '2011', event: 'B Green Carteres was founded with a vision to bring authentic flavors' },
    { year: '2017', event: 'Expanded to multiple locations across the city' },
    { year: '2020', event: 'Launched online ordering and delivery services' },
    { year: '2023', event: 'Awarded "Best Non-Veg Restaurant" by Food Critics Association' },
    { year: '2025', event: 'Continuing to serve bold flavors with natural ingredients' }
  ];

  const chefs = [
    {
      name: 'Aslambhai',
      role: 'Owner & Head Chef',
      specialty: 'Gravies, Biryani, Tarkari & Gujarati Dishes',
      contact: '+91 97237 01034',
      image: 'Professional Indian chef in white uniform with chef hat in modern kitchen'
    },
    {
      name: 'Hajibhai',
      role: 'Master Chef',
      specialty: 'Biryani, Pulao, Gujarati Ghaari & Sweets',
      contact: '+91 95748 72497',
      image: 'Female chef preparing fresh seafood in professional kitchen'
    },
    {
      name: 'Imtiyajbhai',
      role: 'Specialist Chef',
      specialty: 'Chicken 65, Mutton Chilli, Fried Items & Kheema Pulav',
      contact: '+91 99981 41571',
      image: 'Chef preparing traditional biryani with aromatic spices'
    }
  ];

  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on ingredient quality or preparation standards'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Your satisfaction and experience are our top priorities'
    },
    {
      icon: Heart,
      title: 'Passion for Food',
      description: 'Every dish is prepared with love and dedication'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Blending traditional recipes with modern techniques'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - B Green Caterers | Our Story & Values</title>
        <meta name="description" content="Learn about B Green Caterers journey, our expert chefs, and our commitment to delivering premium non-veg cuisine with natural ingredients." />
      </Helmet>

      <ScrollingMarquee />

      <div className="pt-32 sm:pt-36 pb-12 px-4 bg-cream min-h-screen">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-forest mb-4">Our Story</h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              A journey of passion, flavor, and dedication to culinary excellence
            </p>
          </motion.div>

          {/* Banner area - mobile optimized */}
          <div className="mb-8 cursor-pointer" onClick={() => setLightboxImage({ src: '/images/banner.jpg', alt: 'B Green Caterers Banner' })}>
            <img
              src="/images/banner.jpg"
              alt="About banner"
              className="w-full h-auto object-contain rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <img 
                className="rounded-lg shadow-2xl w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover" 
                alt="B Green Caterers restaurant interior with warm lighting"
               src="https://images.unsplash.com/photo-1654483949849-ed21ae4fb2c1" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 px-4 lg:px-0"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-forest mb-6">The B Green Caterers Legacy</h2>
              <p className="text-base sm:text-lg text-gray-700 mb-4">
                Founded in 2011, B Green Caterers began with a simple mission: to bring authentic, bold flavors to food lovers who appreciate quality and tradition.
              </p>
              <p className="text-base sm:text-lg text-gray-700 mb-4">
                Our name, B Green Caterers, represents our commitment to being carriers of culinary heritage, bringing time-honored recipes and techniques to modern tables.
              </p>
              <p className="text-base sm:text-lg text-gray-700">
                Every dish we serve tells a story of passion, precision, and the finest natural ingredients. We believe that great food brings people together and creates lasting memories.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-20 px-4"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-forest text-center mb-8 lg:mb-12">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center mb-6 lg:mb-8 relative"
                >
                  {/* Mobile: Stack vertically, Desktop: Alternate sides */}
                  <div className={`flex-1 w-full lg:${index % 2 === 0 ? 'text-right pr-8' : 'order-2 pl-8'}`}>
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border-l-4 border-gold">
                      <h3 className="text-xl sm:text-2xl font-bold text-gold mb-2">{item.year}</h3>
                      <p className="text-sm sm:text-base text-gray-700">{item.event}</p>
                    </div>
                  </div>
                  <div className="hidden lg:block w-4 h-4 bg-gold rounded-full border-4 border-forest z-10"></div>
                  <div className={`hidden lg:block flex-1 ${index % 2 === 0 ? 'order-2' : ''}`}></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-20 px-4"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-forest text-center mb-8 lg:mb-12">Meet Our Chefs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {chefs.map((chef, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-transparent hover:border-gold transition-all"
                >
                  <div className="h-64 sm:h-72 lg:h-80 overflow-hidden">
                    <img 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                      alt={chef.name}
                      src="https://images.unsplash.com/photo-1541282517588-706bfb5ba91e" 
                    />
                  </div>
                  <div className="p-4 sm:p-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-forest mb-2">{chef.name}</h3>
                    <p className="text-gold font-semibold mb-2 text-sm sm:text-base">{chef.role}</p>
                    <p className="text-gray-600 text-sm sm:text-base mb-3">{chef.specialty}</p>
                    {chef.contact && (
                      <a 
                        href={`https://wa.me/${chef.contact.replace(/[^0-9]/g, '')}?text=Hi%20${chef.name}!%20I%20would%20like%20to%20connect%20with%20you%20regarding%20your%20specialty%20in%20${encodeURIComponent(chef.specialty)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-forest hover:text-gold font-semibold text-sm sm:text-base transition-colors"
                      >
                        📞 {chef.contact}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-forest text-center mb-8 lg:mb-12">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 lg:p-8 rounded-lg shadow-lg text-center border-2 border-transparent hover:border-gold transition-all"
                >
                  <value.icon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-forest" />
                  <h3 className="text-lg sm:text-xl font-bold text-forest mb-3">{value.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

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

export default About;