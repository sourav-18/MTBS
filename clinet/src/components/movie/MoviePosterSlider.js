import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTicketAlt, FaPlay, FaVolumeUp, FaVolumeMute, FaExpand, FaHeart } from 'react-icons/fa';
import { GiPopcorn } from 'react-icons/gi';

const MoviePosterSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [direction, setDirection] = useState(0);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const movies = [
    {
      id: 1,
      title: "DUNE: PART TWO",
      subtitle: "The Legend Continues",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
      color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      genre: "EPIC SCI-FI"
    },
    {
      id: 2,
      title: "THE BATMAN",
      subtitle: "Fear The Night",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-dark-cloudy-sky-over-the-city-41600-large.mp4",
      color: "linear-gradient(135deg, #dc2626 0%, #4c0519 100%)",
      genre: "ACTION THRILLER"
    },
    {
      id: 3,
      title: "OPPENHEIMER",
      subtitle: "The World Forever Changes",
      image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-explosion-with-fire-and-smoke-3090-large.mp4",
      color: "linear-gradient(135deg, #fbbf24 0%, #92400e 100%)",
      genre: "BIOPIC DRAMA"
    },
    {
      id: 4,
      title: "JOHN WICK 4",
      subtitle: "No Way Out",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-rainy-night-in-a-city-3444-large.mp4",
      color: "linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)",
      genre: "ACTION MASTERPIECE"
    },
    {
      id: 5,
      title: "SPIDER-MAN",
      subtitle: "Across The Multiverse",
      image: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-skyscrapers-in-a-foggy-city-1127-large.mp4",
      color: "linear-gradient(135deg, #ef4444 0%, #1e40af 100%)",
      genre: "ANIMATED ADVENTURE"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % movies.length);
      }, 6000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, movies.length]);

  // Play video on slide change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      clearInterval(intervalRef.current);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 1.5 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Popcorn Animation Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400"
            initial={{ y: -100, x: Math.random() * window.innerWidth }}
            animate={{
              y: window.innerHeight,
              rotate: 360,
              x: Math.random() * window.innerWidth - 100
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <GiPopcorn className="text-2xl" />
          </motion.div>
        ))}
      </div>

      {/* Background Video/Image with Parallax Effect */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Video Background */}
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            loop
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src={movies[currentSlide].video} type="video/mp4" />
          </video>

          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{ 
              background: movies[currentSlide].color,
              mixBlendMode: 'overlay'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-white rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-6xl mx-auto"
        >
          {/* Genre Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-bold tracking-widest">
              {movies[currentSlide].genre}
            </span>
          </motion.div>

          {/* Movie Title with Glow Effect */}
          <motion.div variants={itemVariants} className="mb-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300 drop-shadow-2xl">
                {movies[currentSlide].title.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="inline-block mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide">
              {movies[currentSlide].subtitle}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to={`/booking/${movies[currentSlide].id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full text-xl font-bold overflow-hidden shadow-2xl"
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button Content */}
                <div className="relative flex items-center justify-center gap-4">
                  <FaTicketAlt className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                  <span className="tracking-wider">BOOK TICKETS NOW</span>
                  <div className="absolute -right-4 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-300">
                    →
                  </div>
                </div>

                {/* Button Border Animation */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/50 transition-all duration-500" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-lg font-bold flex items-center gap-3 hover:bg-white/20 transition-all duration-300"
            >
              <FaPlay />
              WATCH TRAILER
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Control Bar - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
        <div className="container-custom mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Slide Progress */}
            <div className="flex items-center gap-4">
              <div className="text-white text-sm">
                <span className="text-2xl font-bold mr-1">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="text-gray-400">/ {String(movies.length).padStart(2, '0')}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentSlide + 1) / movies.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                ←
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                {isPlaying ? '❚❚' : '▶'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                →
              </motion.button>
            </div>

            {/* Utility Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <FaHeart className={isFavorite ? 'fill-current' : ''} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => document.documentElement.requestFullscreen()}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <FaExpand />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators - Right Side */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-4">
          {movies.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className="relative group"
            >
              <motion.div
                className={`w-16 h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  currentSlide === index 
                    ? 'border-white scale-110' 
                    : 'border-white/30 hover:border-white/60'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Active Indicator */}
                {currentSlide === index && (
                  <motion.div
                    layoutId="activeSlide"
                    className="absolute inset-0 border-4 border-white rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.div>
              
              {/* Hover Title */}
              <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg whitespace-nowrap text-white text-sm">
                  {movie.title.split(":")[0]}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Subtle Hints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white/50 text-sm"
      >
        Scroll for more
      </motion.div>
    </div>
  );
};

export default MoviePosterSlider;