import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFilm, 
  FaBars, 
  FaTimes, 
  FaUser, 
  FaSearch, 
  FaMoon, 
  FaSun,
  FaTicketAlt,
  FaHome,
  FaVideo,
  FaTheaterMasks,
  FaStar
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Movies', path: '/movies', icon: <FaVideo /> },
    { name: 'Theaters', path: '/theaters', icon: <FaTheaterMasks /> },
    { name: 'Offers', path: '/offers', icon: <FaStar /> },
  ];

  return (
    <>
      {/* Modern Minimal Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/90 dark:bg-dark-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-dark-800 shadow-sm"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Minimal */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 p-1.5 rounded-lg"
              >
                <FaFilm className="text-lg text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                CineBook
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 flex items-center space-x-2"
                >
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-200 text-gray-600 dark:text-gray-400"
              >
                <FaSearch className="text-lg" />
              </motion.button>

              {/* Book Tickets Button */}
              <Link to="/movies">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FaTicketAlt />
                  <span>Book Tickets</span>
                </motion.button>
              </Link>

              {/* Theme Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-200 text-gray-600 dark:text-gray-400"
              >
                {isDarkMode ? (
                  <FaSun className="text-lg" />
                ) : (
                  <FaMoon className="text-lg" />
                )}
              </motion.button>

              {/* User Profile */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-200 text-gray-600 dark:text-gray-400"
              >
                <FaUser className="text-lg" />
              </motion.button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-200 text-gray-600 dark:text-gray-400"
              >
                {isMenuOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="pb-3"
              >
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search movies, theaters, or actors..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-dark-900 z-50 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="p-4 border-b border-gray-100 dark:border-dark-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
                        <FaFilm className="text-white" />
                      </div>
                      <span className="font-bold text-lg">Menu</span>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                      >
                        <span className="text-primary-600 dark:text-primary-400">
                          {link.icon}
                        </span>
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-800">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3 px-3">
                      Account
                    </h3>
                    <div className="space-y-1">
                      <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        <FaUser />
                        <span>Sign In</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        <FaTicketAlt />
                        <span>My Bookings</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Menu Footer */}
                <div className="p-4 border-t border-gray-100 dark:border-dark-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Dark Mode
                    </span>
                    <button
                      onClick={toggleTheme}
                      className="relative w-12 h-6 bg-gray-200 dark:bg-dark-700 rounded-full p-1 transition-colors duration-200"
                    >
                      <motion.div
                        animate={{ x: isDarkMode ? 24 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-4 h-4 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                  <button className="w-full btn-primary py-2.5 text-sm">
                    Book Tickets Now
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;