import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaPlay, FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';

const MovieCards = () => {
  const movies = [
    {
      id: 1,
      title: "DUNE: PART TWO",
      genre: "Sci-Fi/Adventure",
      rating: 4.8,
      duration: "2h 46m",
      release: "2024",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop",
      status: "Now Showing"
    },
    {
      id: 2,
      title: "THE BATMAN",
      genre: "Action/Crime",
      rating: 4.7,
      duration: "2h 56m",
      release: "2022",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&auto=format&fit=crop",
      status: "Now Showing"
    },
    {
      id: 3,
      title: "OPPENHEIMER",
      genre: "Biography/Thriller",
      rating: 4.9,
      duration: "3h 00m",
      release: "2023",
      image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&auto=format&fit=crop",
      status: "Now Showing"
    },
    {
      id: 4,
      title: "JOHN WICK 4",
      genre: "Action/Thriller",
      rating: 4.6,
      duration: "2h 49m",
      release: "2023",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop",
      status: "Now Showing"
    },
    {
      id: 5,
      title: "SPIDER-MAN",
      genre: "Action/Adventure",
      rating: 4.8,
      duration: "2h 28m",
      release: "2021",
      image: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=400&auto=format&fit=crop",
      status: "Coming Soon"
    },
    {
      id: 6,
      title: "DEADPOOL 3",
      genre: "Action/Comedy",
      rating: 4.5,
      duration: "2h 15m",
      release: "2024",
      image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&auto=format&fit=crop",
      status: "Coming Soon"
    },
    {
      id: 7,
      title: "FURIOSA",
      genre: "Action/Adventure",
      rating: 4.7,
      duration: "2h 30m",
      release: "2024",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop",
      status: "Coming Soon"
    },
    {
      id: 8,
      title: "KINGDOM",
      genre: "Sci-Fi/Adventure",
      rating: 4.4,
      duration: "2h 22m",
      release: "2024",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&auto=format&fit=crop",
      status: "Coming Soon"
    }
  ];

  // Filter movies by status
  const nowShowing = movies.filter(movie => movie.status === "Now Showing");
  const comingSoon = movies.filter(movie => movie.status === "Coming Soon");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-white dark:bg-dark-900 py-16">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Now Showing Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-2">
                Now <span className="text-primary-600">Showing</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Currently playing in theaters near you
              </p>
            </div>
            <Link
              to="/movies"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
            >
              View All
              <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {nowShowing.map((movie, index) => (
              <motion.div
                key={movie.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Movie Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex gap-2 mb-3">
                          <button className="flex-1 bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2">
                            <FaPlay />
                            Trailer
                          </button>
                          <Link
                            to={`/movie/${movie.id}`}
                            className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <FaTicketAlt />
                            Book
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <FaStar className="text-yellow-300" />
                      {movie.rating}
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold dark:text-white mb-2 line-clamp-1">
                      {movie.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        {movie.release}
                      </span>
                      <span>{movie.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-dark-700 rounded-full text-gray-700 dark:text-gray-300">
                        {movie.genre}
                      </span>
                      <span className="text-primary-600 font-semibold">
                        From $12.99
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Coming Soon Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-2">
                Coming <span className="text-secondary-600">Soon</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Exciting movies arriving in theaters soon
              </p>
            </div>
            <Link
              to="/movies?filter=coming-soon"
              className="text-secondary-600 hover:text-secondary-700 font-medium flex items-center gap-2"
            >
              View All
              <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {comingSoon.map((movie, index) => (
              <motion.div
                key={movie.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-200 dark:border-dark-700">
                  {/* Movie Image - Coming Soon version */}
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-90"
                    />
                    
                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute top-3 right-3 bg-secondary-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Coming Soon
                      </div>
                    </div>
                    
                    {/* Hover Info */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center p-6">
                        <h4 className="text-white text-xl font-bold mb-3">{movie.title}</h4>
                        <p className="text-gray-300 mb-4">{movie.release}</p>
                        <button className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                          Set Reminder
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold dark:text-white mb-2 line-clamp-1">
                      {movie.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span>{movie.genre}</span>
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        {movie.rating}
                      </span>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-secondary-600 font-semibold">
                        Releases {movie.release}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieCards;