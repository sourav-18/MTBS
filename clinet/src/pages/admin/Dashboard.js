import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaFilm, 
  FaTheaterMasks, 
  FaTicketAlt, 
  FaChartLine, 
  FaSignOutAlt,
  FaHome,
  FaUsers,
  FaCog,
  FaBell
} from 'react-icons/fa';
import ActorSection from '../../components/admin/ActorSection';
import MovieSection from '../../components/admin/MovieSection';
import TheaterSection from "../../components/admin/TheaterSection";

const Dashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard', component: 'Dashboard' },
    { path: '/admin/actors', icon: <FaUsers />, label: 'Actors', component: 'ActorSection' },
    { path: '/admin/movies', icon: <FaFilm />, label: 'Movies', component: 'MovieSection' },
    { path: '/admin/theaters', icon: <FaTheaterMasks />, label: 'Theaters', component: 'TheaterSection' },
    { path: '/admin/bookings', icon: <FaTicketAlt />, label: 'Bookings', component: 'BookingSection' },
    { path: '/admin/analytics', icon: <FaChartLine />, label: 'Analytics', component: 'Analytics' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings', component: 'Settings' },
  ];

  const stats = [
    { label: 'Total Actors', value: '248', change: '+12%', icon: <FaUsers />, color: 'bg-blue-500' },
    { label: 'Total Movies', value: '156', change: '+8%', icon: <FaFilm />, color: 'bg-purple-500' },
    { label: 'Active Theaters', value: '89', change: '+5%', icon: <FaTheaterMasks />, color: 'bg-green-500' },
    { label: 'Today Bookings', value: '2,458', change: '+23%', icon: <FaTicketAlt />, color: 'bg-orange-500' },
  ];

  const renderComponent = () => {
    switch (true) {
      case location.pathname.includes('/admin/actors'):
        return <ActorSection />;
      case location.pathname.includes('/admin/movies'):
        return <MovieSection/>;
      case location.pathname.includes('/admin/theaters'):
        return <TheaterSection/>;
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Dashboard Overview</h2>
              <p className="text-gray-600 dark:text-gray-400">Welcome to CineBook Admin Panel</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="flex items-center ml-4">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
                  <FaFilm className="text-white text-xl" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">CineBook Admin</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaBell className="text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
              </div>
              
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <FaSignOutAlt className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block lg:w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out`}>
          <div className="h-full overflow-y-auto py-6">
            <nav className="space-y-1 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-2">
          <div className="py-6 px-4 sm:px-6 lg:px-8">

            {/* Dynamic Content Section */}
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;