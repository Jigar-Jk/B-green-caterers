import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - B Green Caterers | Get in Touch</title>
        <meta name="description" content="Contact B Green Caterers for reservations, catering, or inquiries. Visit us or reach out via phone, email, or social media." />
      </Helmet>

      <div className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-forest mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">We'd love to hear from you</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-gold">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-8 h-8 text-forest flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-forest mb-2">Visit Us</h3>
                    <p className="text-gray-700">B Green Caterers, nr. Kamdar Police Chowki, Gomtipur, Ahmedabad, Gujarat 380021</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-gold">
                <div className="flex items-start space-x-4">
                  <Phone className="w-8 h-8 text-forest flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-forest mb-2">Call Us</h3>
                       <p className="text-gray-700">Main: 74 330 330 31</p>
                       <p className="text-gray-700">Reservations: 74 330 330 31</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-gold">
                <div className="flex items-start space-x-4">
                  <Mail className="w-8 h-8 text-forest flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-forest mb-2">Email Us</h3>
                    <p className="text-gray-700">info@caterers.com</p>
                    <p className="text-gray-700">reservations@caterers.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-gold">
                <div className="flex items-start space-x-4">
                  <Clock className="w-8 h-8 text-forest flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-forest mb-2">Opening Hours</h3>
                    <p className="text-gray-700 font-semibold">Monday - Sunday</p>
                    <p className="text-gray-700">11:00 AM - 11:00 PM</p>
                    <p className="text-gray-500 text-sm mt-2">Kitchen closes at 10:30 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-gold">
                <h3 className="text-xl font-bold text-forest mb-4">Follow Us</h3>
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="text-forest hover:text-gold transition-colors transform hover:scale-110"
                  >
                    <Facebook className="w-8 h-8" />
                  </a>
                  <a
                    href="#"
                    className="text-forest hover:text-gold transition-colors transform hover:scale-110"
                  >
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a
                    href="#"
                    className="text-forest hover:text-gold transition-colors transform hover:scale-110"
                  >
                    <Twitter className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden h-[600px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.097354199313!2d72.6061892!3d23.0201974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e852c4ede1bf3%3A0x11d88d88327603f5!2sB%20GREEN%20CATERERS!5e0!3m2!1sen!2sin!4v1761403180110!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="B Green Caterers Location Map"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;