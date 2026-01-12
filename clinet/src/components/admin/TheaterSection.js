import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaPlus,
    FaTimes,
    FaEdit,
    FaTrash,
    FaTheaterMasks,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaSearch,
    FaFilter,
    FaBuilding,
    FaMapMarkerAlt,
    FaToggleOn,
    FaToggleOff,
    FaUpload,
    FaImage,
    FaCity,
    FaCheck,
    FaHourglassHalf,
    FaBan
} from 'react-icons/fa';
import theaterService from "../../services/theater.service";

const TheaterSection = () => {
    const [theaters, setTheaters] = useState({
        data: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        verificationStatus: 'all',
        status: 'all',
        city: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);
    const profileImageInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        city: '',
        status: 'active',
        verificationStatus: 'Pending',
        profilePicture: null,
        previewUrl: ''
    });

    const itemsPerPage = 5;

    const cities = [
        'Kolkata', 'Mumbai', 'Delhi', 'Bengaluru',
        'Hyderabad', 'Chandigarh', 'Pune', 'Chennai', 'Kochi'
    ];

    const verificationStatusOptions = [
        { value: 'Pending', label: 'Pending', icon: <FaClock className="text-yellow-500" />, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
        { value: 'Success', label: 'Success', icon: <FaCheckCircle className="text-green-500" />, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
        { value: 'Failed', label: 'Failed', icon: <FaTimesCircle className="text-red-500" />, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' }
    ];

    // Mock statistics
    const [stats, setStats] = useState({
        total: 0,
        Pending: 0,
        Success: 0,
        Failed: 0
    });

    useEffect(() => {
        loadTheaters(1, '', filters);
        calculateStats();
    }, [filters]);

    const calculateStats = () => {
        // Calculate stats based on filtered data
        const total = mockTheaters.length;
        const Pending = mockTheaters.filter(t => t.verificationStatus === 'Pending').length;
        const Success = mockTheaters.filter(t => t.verificationStatus === 'Success').length;
        const Failed = mockTheaters.filter(t => t.verificationStatus === 'Failed').length;

        setStats({ total, Pending, Success, Failed });
    };

    const loadTheaters = async (page = 1, search = '', filterParams = filters) => {
        setIsLoading(true);
        try {
            const status=filterParams.status!=='all'?filterParams.status:null;
            const verificationStatus=filterParams.verificationStatus!=='all'?filterParams.verificationStatus:null;
            const city=filterParams.city!=='all'?filterParams.city:null;

            const listForAdminApiRes=await theaterService.listForAdmin({page,search,city,status,verificationStatus});

            if(listForAdminApiRes.statusCode===200) {
                // // Filter logic
                // let filtered = listForAdminApiRes.data.contains;
                //
                // // Search filter
                // if (search) {
                //     filtered = filtered.filter(theater =>
                //         theater.name.toLowerCase().includes(search.toLowerCase()) ||
                //         theater.id.toString().includes(search)
                //     );
                // }
                //
                // // Status filter
                // if (filterParams.status !== 'all') {
                //     filtered = filtered.filter(theater => theater.status === filterParams.status);
                // }
                //
                // // Verification status filter
                // if (filterParams.verificationStatus !== 'all') {
                //     filtered = filtered.filter(theater => theater.verificationStatus === filterParams.verificationStatus);
                // }
                //
                // // City filter
                // if (filterParams.city !== 'all') {
                //     filtered = filtered.filter(theater => theater.city === filterParams.city);
                // }
                setTheaters({
                    data: listForAdminApiRes.data.contains,
                    totalCount: listForAdminApiRes.data.totalCount,
                    totalPages: listForAdminApiRes.data.totalPages,
                    currentPage: page
                });
            }else{
                setTheaters({
                    data: [],
                    totalCount: 0,
                    totalPages: 0,
                    currentPage: page
                });
            }
                setIsLoading(false);
        } catch (error) {
            console.error('Error loading theaters:', error);
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if(value&&value.length>1) {
            loadTheaters(1, value, filters);
        }

    };

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);
        loadTheaters(1, searchTerm, newFilters);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= theaters.totalPages) {
            loadTheaters(page, searchTerm, filters);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profilePicture: file,
                    previewUrl: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateOrUpdate = () => {
        if (selectedTheater) {
            handleUpdate();
        } else {
            handleCreate();
        }
    };

    const handleCreate = () => {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('verificationStatus', formData.verificationStatus);

        if (formData.profilePicture) {
            formDataToSend.append('profilePicture', formData.profilePicture);
        }

        console.log('Creating theater:', Object.fromEntries(formDataToSend));
        handleCloseModal();
        loadTheaters(theaters.currentPage, searchTerm, filters);
    };

    const handleUpdate = () => {
        console.log('Updating theater:', formData);
        handleCloseModal();
        loadTheaters(theaters.currentPage, searchTerm, filters);
    };

    const handleEdit = (theater) => {
        setSelectedTheater(theater);
        setFormData({
            name: theater.name || '',
            city: theater.city || '',
            status: theater.status || 'active',
            verificationStatus: theater.verificationStatus || 'Pending',
            profilePicture: null,
            previewUrl: theater.profilePicture || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this theater?')) {
            console.log('Deleting theater:', id);
            loadTheaters(theaters.currentPage, searchTerm, filters);
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        if(window.confirm('Are you sure you want to update this status?')) {
            const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
            const apiRes=await theaterService.statusUpdate({id,status: newStatus});
            if(apiRes.statusCode===200) {
                alert(apiRes.message);
                loadTheaters(theaters.currentPage, searchTerm, filters);
            }
        }

    };

    const handleVerificationStatusUpdate = async (id, newStatus) => {
        if(window.confirm('Are you sure you want to update this verification?')) {
            const apiRes=await theaterService.verificationStatusUpdate({id,verificationStatus: newStatus});
            if(apiRes.statusCode===200) {
                alert(apiRes.message);
                loadTheaters(theaters.currentPage, searchTerm, filters);
            }
        }
    };

    const handleAddNew = () => {
        setSelectedTheater(null);
        setFormData({
            name: '',
            city: '',
            status: 'active',
            verificationStatus: 'Pending',
            profilePicture: null,
            previewUrl: ''
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        if (formData.previewUrl && formData.profilePicture) {
            URL.revokeObjectURL(formData.previewUrl);
        }
        setShowModal(false);
        setSelectedTheater(null);
    };

    const getStatusColor = (status) => {
        return status === 'Active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    };

    const getVerificationStatusIcon = (status) => {
        const option = verificationStatusOptions.find(opt => opt.value === status);
        return option ? option.icon : <FaClock />;
    };

    const getVerificationStatusColor = (status) => {
        const option = verificationStatusOptions.find(opt => opt.value === status);
        return option ? option.color : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    };

    const renderPagination = () => {
        const { currentPage, totalPages } = theaters;

        if (totalPages <= 1) return null;

        return (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-dark-700">
                <div className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                    <span className="font-semibold">{Math.min(currentPage * itemsPerPage, theaters.totalCount)}</span> of{' '}
                    <span className="font-semibold">{theaters.totalCount}</span> theaters
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-lg border border-gray-300 dark:border-dark-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-dark-700"
                    >
                        Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-10 h-10 rounded-lg ${currentPage === pageNum
                                    ? 'bg-primary-600 text-white'
                                    : 'border border-gray-300 dark:border-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-lg border border-gray-300 dark:border-dark-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-dark-700"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    const mockTheaters = [
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Theaters Management</h2>
                    <p className="text-gray-600 dark:text-gray-400">Manage all theaters in the system</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search theaters..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${showFilters ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'border-gray-300 dark:border-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'}`}
                    >
                        <FaFilter />
                        Filter
                    </button>

                    {/* Add Theater Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddNew}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                        <FaPlus />
                        Add Theater
                    </motion.button>
                </div>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-dark-700"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="all">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Verification Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Verification Status
                                </label>
                                <select
                                    value={filters.verificationStatus}
                                    onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="all">All Verification</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Success">Success</option>
                                    <option value="Failed">Failed</option>
                                </select>
                            </div>

                            {/* City Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    City
                                </label>
                                <select
                                    value={filters.city}
                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="all">All Cities</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Total Theaters */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Total Theaters</p>
                            <p className="text-3xl font-bold mt-1">{stats.total}</p>
                        </div>
                        <FaBuilding className="text-3xl opacity-80" />
                    </div>
                </div>

                {/* Pending Verification */}
                <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Pending Verification</p>
                            <p className="text-3xl font-bold mt-1">{stats.Pending}</p>
                        </div>
                        <FaClock className="text-3xl opacity-80" />
                    </div>
                </div>

                {/* Verified */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Verified</p>
                            <p className="text-3xl font-bold mt-1">{stats.Success}</p>
                        </div>
                        <FaCheck className="text-3xl opacity-80" />
                    </div>
                </div>

                {/* Failed Verification */}
                <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Failed Verification</p>
                            <p className="text-3xl font-bold mt-1">{stats.Failed}</p>
                        </div>
                        <FaBan className="text-3xl opacity-80" />
                    </div>
                </div>
            </div>

            {/* Theaters Table */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
                                <thead className="bg-gray-50 dark:bg-dark-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Theater
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        City
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Verification
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                                {theaters.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            No theaters found
                                        </td>
                                    </tr>
                                ) : (
                                    theaters.data.map((theater) => (
                                        <motion.tr
                                            key={theater.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50 dark:hover:bg-dark-700"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <img
                                                        className="h-12 w-12 rounded-full object-cover"
                                                        src={theater.profilePicture || 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=100&auto=format&fit=crop'}
                                                        alt={theater.name}
                                                    />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                            {theater.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            ID: {theater.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                                    {theater.city}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleStatusToggle(theater.id, theater.status)}
                                                        className={`p-2 rounded-lg transition-colors ${theater.status === 'Active'
                                                            ? 'text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30'
                                                            : 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30'
                                                        }`}
                                                    >
                                                        {theater.status === 'Active' ? (
                                                            <FaToggleOn className="text-2xl" />
                                                        ) : (
                                                            <FaToggleOff className="text-2xl" />
                                                        )}
                                                    </button>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(theater.status)}`}>
                                                            {theater.status}
                                                        </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getVerificationStatusColor(theater.verificationStatus)}`}>
                                                        {getVerificationStatusIcon(theater.verificationStatus)}
                                                        {theater.verificationStatus}
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {verificationStatusOptions.map((status) => (
                                                            <button
                                                                key={status.value}
                                                                onClick={() => handleVerificationStatusUpdate(theater.id, status.value)}
                                                                className={`p-1 rounded ${theater.verificationStatus === status.value
                                                                    ? 'bg-gray-200 dark:bg-gray-700'
                                                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                                                }`}
                                                                title={`Mark as ${status.label}`}
                                                            >
                                                                {status.icon}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(theater)}
                                                        className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(theater.id)}
                                                        className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                        {renderPagination()}
                    </>
                )}
            </div>

            {/* Add/Edit Theater Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="fixed inset-0 bg-black/50"
                            />

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                            <motion.div
                                className="inline-block align-bottom bg-white dark:bg-dark-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="px-6 pt-6 pb-6 max-h-[85vh] overflow-y-auto">
                                    <div className="flex items-center justify-between mb-6 sticky top-0 bg-white dark:bg-dark-800 pb-4">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {selectedTheater ? 'Edit Theater' : 'Add New Theater'}
                                        </h3>
                                        <button
                                            onClick={handleCloseModal}
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Theater Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Theater Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                placeholder="Enter theater name"
                                            />
                                        </div>

                                        {/* City Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                City *
                                            </label>
                                            <select
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            >
                                                <option value="">Select City</option>
                                                {cities.map((city) => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Status Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Status
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <label className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.status === 'Active'
                                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                                                    : 'border-gray-300 dark:border-dark-700 hover:border-gray-400 dark:hover:border-dark-600'
                                                }`}>
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="Active"
                                                        checked={formData.status === 'Active'}
                                                        onChange={handleInputChange}
                                                        className="hidden"
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <FaToggleOn className={`${formData.status === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                                        <span className={`font-medium ${formData.status === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                                            Active
                                                        </span>
                                                    </div>
                                                </label>

                                                <label className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.status === 'inactive'
                                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                                                    : 'border-gray-300 dark:border-dark-700 hover:border-gray-400 dark:hover:border-dark-600'
                                                }`}>
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="Inactive"
                                                        checked={formData.status === 'Inactive'}
                                                        onChange={handleInputChange}
                                                        className="hidden"
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <FaToggleOff className={`${formData.status === 'Inactive' ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                                        <span className={`font-medium ${formData.status === 'Inactive' ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                                            Inactive
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Verification Status Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Verification Status
                                            </label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {verificationStatusOptions.map((status) => (
                                                    <label
                                                        key={status.value}
                                                        className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.verificationStatus === status.value
                                                            ? `border-${status.value === 'Pending' ? 'yellow' : status.value === 'Success' ? 'green' : 'red'}-500 bg-${status.value === 'Pending' ? 'yellow' : status.value === 'Success' ? 'green' : 'red'}-50 dark:bg-${status.value === 'Pending' ? 'yellow' : status.value === 'Success' ? 'green' : 'red'}-900/30`
                                                            : 'border-gray-300 dark:border-dark-700 hover:border-gray-400 dark:hover:border-dark-600'
                                                        }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="verificationStatus"
                                                            value={status.value}
                                                            checked={formData.verificationStatus === status.value}
                                                            onChange={handleInputChange}
                                                            className="hidden"
                                                        />
                                                        <div className="flex flex-col items-center gap-1">
                                                            {status.icon}
                                                            <span className={`text-xs font-medium ${formData.verificationStatus === status.value
                                                                ? `text-${status.value === 'Pending' ? 'yellow' : status.value === 'Success' ? 'green' : 'red'}-600 dark:text-${status.value === 'Pending' ? 'yellow' : status.value === 'Success' ? 'green' : 'red'}-400`
                                                                : 'text-gray-700 dark:text-gray-300'
                                                            }`}>
                                                                {status.label}
                                                            </span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Profile Picture Upload */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Profile Picture
                                            </label>
                                            <div className="space-y-4">
                                                {/* Upload Button */}
                                                <input
                                                    ref={profileImageInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => profileImageInputRef.current.click()}
                                                    className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-dark-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors bg-gray-50 dark:bg-dark-900 hover:bg-gray-100 dark:hover:bg-dark-800"
                                                >
                                                    <div className="flex flex-col items-center justify-center">
                                                        <FaUpload className="text-2xl text-gray-400 dark:text-gray-500 mb-2" />
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            Click to upload profile picture
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                            PNG, JPG, WebP up to 5MB
                                                        </p>
                                                    </div>
                                                </button>

                                                {/* Image Preview */}
                                                {formData.previewUrl && (
                                                    <div className="relative group">
                                                        <img
                                                            src={formData.previewUrl}
                                                            alt="Profile preview"
                                                            className="w-32 h-32 rounded-lg object-cover mx-auto border border-gray-300 dark:border-dark-700"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    profilePicture: null,
                                                                    previewUrl: ''
                                                                }));
                                                            }}
                                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                                        >
                                                            <FaTimes className="text-xs" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-gray-200 dark:border-dark-700 flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={handleCloseModal}
                                                className="px-6 py-3 border border-gray-300 dark:border-dark-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 font-medium transition-colors duration-200"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                                                onClick={handleCreateOrUpdate}
                                            >
                                                {selectedTheater ? 'Update Theater' : 'Add Theater'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TheaterSection;