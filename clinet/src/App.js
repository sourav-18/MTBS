import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ThemeProvider from './context/ThemeContext';

// Pages (to be created later)
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
// import Movies from './pages/Movies';
// import MovieDetails from './pages/MovieDetails';
// import SeatsSelection from './pages/SeatsSelection';
// import Payment from './pages/Payment';
// import Confirmation from './pages/Confirmation';
// import NotFound from './pages/NotFound';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 to-dark-950">
        <div className="text-center">
          <div className="loading-spinner w-16 h-16 border-4 border-gray-300 border-t-primary-600 rounded-full mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white animate-pulse">Loading Cinema Experience...</h2>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/movies" element={<Movies />} /> */}
              {/* <Route path="/movie/:id" element={<MovieDetails />} /> */}
              {/* <Route path="/booking/:id" element={<Booking />} /> */}
              {/* <Route path="/seats/:id" element={<SeatsSelection />} /> */}
              {/* <Route path="/payment" element={<Payment />} /> */}
              {/* <Route path="/confirmation" element={<Confirmation />} /> */}
              {/* <Route path="*" element={<NotFound />} /> */}
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/actors" element={<Dashboard />} />
              <Route path="/admin/movies" element={<Dashboard />} />
              <Route path="/admin/theaters" element={<Dashboard />} />
              <Route path="/admin/bookings" element={<Dashboard />} />
              <Route path="/admin/analytics" element={<Dashboard />} />
              <Route path="/admin/settings" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;