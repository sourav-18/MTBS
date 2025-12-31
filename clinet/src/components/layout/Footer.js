import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Explore': [
      { name: 'Movies', path: '/movies' },
      { name: 'Theaters', path: '/theaters' },
      { name: 'Offers', path: '/offers' },
      { name: 'Events', path: '/events' },
    ],
    'Company': [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Contact', path: '/contact' },
    ],
    'Support': [
      { name: 'Help Center', path: '/help' },
      { name: 'Terms', path: '/terms' },
      { name: 'Privacy', path: '/privacy' },
      { name: 'FAQ', path: '/faq' },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebook />, path: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, path: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, path: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaYoutube />, path: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-dark-900 text-gray-300 border-t border-dark-800">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
                <FaFacebook className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">CineBook</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for booking movie tickets. Experience cinema like never before.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-dark-800 p-2 rounded-lg hover:bg-primary-600 transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for the latest movie updates and exclusive offers.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button className="w-full btn-primary py-2.5 text-sm">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-dark-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              <p>&copy; {currentYear} CineBook. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-gray-300 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-gray-300 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-gray-300 transition-colors duration-200">
                Cookies
              </Link>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>for movie lovers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;