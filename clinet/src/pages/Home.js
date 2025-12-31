import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MoviePosterSlider from '../components/movie/MoviePosterSlider';
import MovieCards from '../components/movie/MovieCards';
import { FaTicketAlt, FaCalendarAlt, FaVideo, FaStar, FaFire } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaTicketAlt className="text-3xl" />,
      title: "Easy Booking",
      description: "Book tickets in 3 simple steps",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: <FaCalendarAlt className="text-3xl" />,
      title: "Multiple Shows",
      description: "Flexible show timings",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      icon: <FaVideo className="text-3xl" />,
      title: "Premium Experience",
      description: "IMAX, 4DX & Dolby Atmos",
      color: "bg-gradient-to-br from-orange-500 to-red-500",
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Member Rewards",
      description: "Earn points on every booking",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
  ];

  return (
    <div>
      {/* Movie Poster Slider - Fullscreen */}
      <section className="relative">
        <MoviePosterSlider />
      </section>

      {/* Movie Cards Grid */}
      <section className="relative">
        <MovieCards />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-dark-900 dark:to-dark-950">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <FaFire className="text-orange-500 text-2xl" />
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
                Why Choose <span className="text-primary-600">CineBook</span>
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience seamless movie booking with our premium features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-dark-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px'
        }}></div>

        <div className="relative container-custom px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Your Next
              <span className="block text-yellow-300 mt-2">Movie Adventure?</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8">
              Join millions of movie lovers who trust us for the best cinema experience
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/movies"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/30 flex items-center justify-center gap-3"
              >
                <FaTicketAlt />
                Browse All Movies
              </Link>
              
              <Link
                to="/signup"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Get Started Free
              </Link>
            </div>
            
            <p className="mt-8 text-white/70 text-sm">
              No credit card required • 24/7 support • Free cancellation
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;