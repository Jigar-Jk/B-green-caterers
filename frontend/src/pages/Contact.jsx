import { motion } from 'framer-motion';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - B Green Caterers | Get in Touch</title>
        <meta name="description" content="Contact B Green Caterers for reservations, catering, or inquiries. Visit us or reach out via phone, email, or social media." />
      </Helmet>

      <div className="pt-20 pb-12 bg-cream min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 lg:mb-12 px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-forest mb-4">Contact Us</h1>
            <p className="text-lg sm:text-xl text-gray-600">We'd love to hear from you</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 border-l-4 border-gold">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-forest flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-forest mb-2">Visit Us</h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">B Green Caterers, nr. Kamdar Police Chowki, Gomtipur, Ahmedabad, Gujarat 380021</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 border-l-4 border-gold">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-forest flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-forest mb-2">Call Us</h3>
                    <div className="space-y-2">
                      <p className="text-sm sm:text-base text-gray-700">
                        <span className="font-medium">Main:</span>{' '}
                        <a 
                          href="tel:+917433033031" 
                          className="text-forest hover:text-gold font-semibold transition-colors duration-200 hover:underline"
                          title="Click to call main number"
                        >
                          74 330 330 31
                        </a>
                      </p>
                      <p className="text-sm sm:text-base text-gray-700">
                        <span className="font-medium">Reservations:</span>{' '}
                        <a 
                          href="https://wa.me/917433033031?text=Hi B Green Caterers! I would like to make a reservation. Please help me with table booking." 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-forest hover:text-gold font-semibold transition-colors duration-200 hover:underline inline-flex items-center gap-1"
                          title="Click to chat on WhatsApp for reservations"
                        >
                          74 330 330 31
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.487"/>
                          </svg>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-gold">
                <div className="flex items-start space-x-4">
                  <Mail className="w-8 h-8 text-forest flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-forest mb-2">Email Us</h3>
                    <p className="text-gray-700">
                      <a href="mailto:bgreencaterers@gmail.com" className="text-forest hover:text-gold transition-colors font-semibold">bgreencaterers@gmail.com</a>
                    </p>
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
                    href="https://www.facebook.com/share/1AduZ4LqRu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest hover:text-gold transition-colors transform hover:scale-110"
                    title="Follow us on Facebook"
                  >
                    <Facebook className="w-8 h-8" />
                  </a>
                  <a
                    href="https://www.instagram.com/bgreencaterers?utm_source=qr&igsh=emZubTZlNmtobA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest hover:text-gold transition-colors transform hover:scale-110"
                    title="Follow us on Instagram"
                  >
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a
                    href="#"
                    className="text-forest hover:text-gold transition-colors transform hover:scale-110"
                    title="Follow us on Twitter"
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