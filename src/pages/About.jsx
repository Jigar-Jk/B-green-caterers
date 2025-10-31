import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Users, Heart, Sparkles } from 'lucide-react';

const About = () => {
  const timeline = [
    { year: '2015', event: 'B Green Carteres was founded with a vision to bring authentic flavors' },
    { year: '2017', event: 'Expanded to multiple locations across the city' },
    { year: '2020', event: 'Launched online ordering and delivery services' },
    { year: '2023', event: 'Awarded "Best Non-Veg Restaurant" by Food Critics Association' },
    { year: '2025', event: 'Continuing to serve bold flavors with natural ingredients' }
  ];

  const chefs = [
    {
      name: 'Chef Rajesh Kumar',
      role: 'Head Chef',
      specialty: 'Tandoori & Grills',
      image: 'Professional Indian chef in white uniform with chef hat in modern kitchen'
    },
    {
      name: 'Chef Maria Santos',
      role: 'Seafood Specialist',
      specialty: 'Coastal Cuisine',
      image: 'Female chef preparing fresh seafood in professional kitchen'
    },
    {
      name: 'Chef Ahmed Hassan',
      role: 'Biryani Master',
      specialty: 'Rice & Curries',
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

      <div className="pt-24 pb-16 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-forest mb-4">Our Story</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A journey of passion, flavor, and dedication to culinary excellence
            </p>
          </motion.div>

          {/* Banner area - random photo placeholder */}
          <div className="mb-8">
            <img
              src="/images/banner.jpg"
              alt="About banner"
              className="w-full h-56 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover" 
                alt="B Green Caterers restaurant interior with warm lighting"
               src="https://images.unsplash.com/photo-1654483949849-ed21ae4fb2c1" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-forest mb-6">The B Green Caterers Legacy</h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2015, B Green Caterers began with a simple mission: to bring authentic, bold flavors to food lovers who appreciate quality and tradition.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Our name, B Green Caterers, represents our commitment to being carriers of culinary heritage, bringing time-honored recipes and techniques to modern tables.
              </p>
              <p className="text-lg text-gray-700">
                Every dish we serve tells a story of passion, precision, and the finest natural ingredients. We believe that great food brings people together and creates lasting memories.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-forest text-center mb-12">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center mb-8 relative"
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'order-2 pl-8'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gold">
                      <h3 className="text-2xl font-bold text-gold mb-2">{item.year}</h3>
                      <p className="text-gray-700">{item.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-gold rounded-full border-4 border-forest z-10"></div>
                  <div className={`flex-1 ${index % 2 === 0 ? 'order-2' : ''}`}></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-forest text-center mb-12">Meet Our Chefs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <div className="h-80 overflow-hidden">
                    <img 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                      alt={chef.name}
                     src="https://images.unsplash.com/photo-1541282517588-706bfb5ba91e" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-forest mb-2">{chef.name}</h3>
                    <p className="text-gold font-semibold mb-2">{chef.role}</p>
                    <p className="text-gray-600">{chef.specialty}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-forest text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-8 rounded-lg shadow-lg text-center border-2 border-transparent hover:border-gold transition-all"
                >
                  <value.icon className="w-16 h-16 mx-auto mb-4 text-forest" />
                  <h3 className="text-xl font-bold text-forest mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;