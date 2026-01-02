import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaUpload,
  FaUser,
  FaVenus,
  FaMars,
  FaCalendarAlt,
  FaGlobe,
  FaBriefcase,
  FaStar,
  FaUsers,
  FaToggleOn,
  FaToggleOff,
  FaSearch
} from 'react-icons/fa';
import { actorCreate, actorStatusUpdate, actorUpdate, getActorList, getTotalActorCountDetails } from '../../services/actor.service';
import { uploadImages } from '../../services/upload.service';

const ActorSection = () => {
  const [actorCountDetails, setActorCountDetails] = useState({
    totalCount: 0,
    maleCount: 0,
    femaleCount: 0
  });

  const [actors, setActors] = useState({
    data: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedActor, setSelectedActor] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    born: '',
    gender: 'Male',
    nationality: '',
    awards: '',
    rating: '',
    profilePic: null,
    previewUrl: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const loadActorCountDetails = async (value=null) => {
    try {
      const response = await getTotalActorCountDetails(value);
      if (response.statusCode === 200) {
        setActorCountDetails(response.data);
      }
    } catch (error) {
      console.error('Error loading actor count details:', error);
    }
  };

  const loadActors = async (page = 1, search = '') => {
    setIsLoading(true);
    try {
      const response = await getActorList(page, itemsPerPage, search);
      if (response.statusCode === 200) {
        setActors({
          data: response.data.contains || [],
          totalCount: response.data.totalCount || 0,
          totalPages: response.data.totalPages || 0,
          currentPage: page
        });
      } else {
        setActors({
          data: [],
          totalCount: 0,
          totalPages: 0,
          currentPage: 0
        })
      }
    } catch (error) {
      console.error('Error loading actors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadActorCountDetails();
    loadActors(1, '');
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    loadActors(1, value);
    loadActorCountDetails(value);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= actors.totalPages) {
      loadActors(page, searchTerm);
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
          profilePic: file,
          previewUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    if (formData.profilePic) {
      const bodyFromData = new FormData();
      bodyFromData.append("file", formData.profilePic);
      bodyFromData.append("folderName", "actors");
      const imageUpload = await uploadImages(bodyFromData);

      if (imageUpload.statusCode == 200) {
        const crateActorData = {
          name: formData.name,
          gender: formData.gender,
          profilePicture: imageUpload.data,
          dob: formData.born,
          nationality: formData.nationality,
          rating: formData.rating
        }
        const createApiRes = await actorCreate(crateActorData);
        console.log(createApiRes.message)
      }

      // API call for add/edit actor would go here
      handleCloseModal();
      // Refresh the list after adding/editing
      loadActors(actors.currentPage, searchTerm);
      loadActorCountDetails();
    } else {
      alert("enter profile picture")
    }
  };

  const handleUpdate = async () => {
    console.log(formData);
    return;
    const updateActorData = {
      name: formData.name,
      gender: formData.gender,
      dob: formData.born,
      nationality: formData.nationality,
      rating: formData.rating,
      profilePicture: formData.previewUrl
    }

    if (formData.profilePic) {
      const bodyFromData = new FormData();
      bodyFromData.append("file", formData.profilePic);
      bodyFromData.append("folderName", "actors");
      const imageUpload = await uploadImages(bodyFromData);
      updateActorData.profilePicture = imageUpload.data;
    }

    const updateApiRes = await actorUpdate(updateActorData, formData.id);
    console.log(updateApiRes.message);
    handleCloseModal();
    loadActors(actors.currentPage, searchTerm);
    loadActorCountDetails();
  }

  const handleCreateOrUpdate = () => {
    if (selectedActor) {
      handleUpdate()
    } else {
      handleCreate();
    }
  }

  const handleEdit = (actor) => {
    setSelectedActor(actor);
    setFormData({
      id: actor.id,
      name: actor.name || '',
      born: actor.dob || '',
      gender: actor.gender || 'Male',
      nationality: actor.nationality || '',
      awards: actor.awards || '',
      rating: actor.rating ? actor.rating.toString() : '',
      profilePic: null,
      previewUrl: actor.profilePicture || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this actor?')) {
      // API call for delete would go here
      loadActors(actors.currentPage, searchTerm);
      loadActorCountDetails();
    }
  };

  const handleStatusToggle = async (id, status) => {
    const isUpdate = window.confirm("Are you sure to status update");
    if (isUpdate) {
      if (status == 'Active') status = 'Inactive';
      else if (status == 'Inactive') status = 'Active';
      actorStatusUpdate(id, status)
      loadActors(actors.currentPage, searchTerm);
      loadActorCountDetails();
    }
  };

  const handleAddNew = () => {
    setSelectedActor(null);
    setFormData({
      name: '',
      born: '',
      gender: 'Male',
      nationality: '',
      awards: '',
      rating: '',
      profilePic: null,
      previewUrl: ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedActor(null);
  };

  const renderPagination = () => {
    const { currentPage, totalPages } = actors;

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-dark-700">
        <div className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-semibold">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
          <span className="font-semibold">{Math.min(currentPage * itemsPerPage, actors.totalCount)}</span> of{' '}
          <span className="font-semibold">{actors.totalCount}</span> actors
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Actors Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage all actors in the system</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search actors..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <motion.button
            // whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.95 }}
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            <FaPlus />
            Add Actor
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Actors</p>
              <p className="text-3xl font-bold mt-1">{actorCountDetails.totalCount}</p>
            </div>
            <FaUsers className="text-3xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Male Actors</p>
              <p className="text-3xl font-bold mt-1">{actorCountDetails.maleCount}</p>
            </div>
            <FaMars className="text-3xl opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Female Actors</p>
              <p className="text-3xl font-bold mt-1">{actorCountDetails.femaleCount}</p>
            </div>
            <FaVenus className="text-3xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Actors Table */}
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
                      Actor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Movies
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                  {actors.data.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                        No actors found
                      </td>
                    </tr>
                  ) : (
                    actors.data.map((actor) => (
                      <motion.tr
                        key={actor.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-dark-700"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              className="h-14 w-14 rounded-full object-cover"
                              src={actor.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop'}
                              alt={actor.name}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {actor.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {actor.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-900 dark:text-white">
                              <FaCalendarAlt className="mr-2 text-gray-400" />
                              {actor.dob || 'N/A'}
                            </div>
                            <div className="flex items-center text-sm text-gray-900 dark:text-white">
                              <FaGlobe className="mr-2 text-gray-400" />
                              {actor.nationality || 'N/A'}
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${actor.gender === 'Male'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                              : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300'
                              }`}>
                              {actor.gender === 'Male' ? <FaMars className="mr-1" /> : <FaVenus className="mr-1" />}
                              {actor.gender || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-500 mr-1" />
                            <span className="font-semibold text-gray-900 dark:text-white">{actor.rating || '0'}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/5.0</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-900 dark:text-white">
                            <FaBriefcase className="mr-2 text-gray-400" />
                            {actor.movieCount || 0} movies
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleStatusToggle(actor.id, actor.status)}
                            className={`p-2 rounded-lg transition-colors ${actor.status === 'Active'
                              ? 'text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30'
                              : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/30'
                              }`}
                          >
                            {actor.status === 'Active' ? (
                              <FaToggleOn className="text-2xl" />
                            ) : (
                              <FaToggleOff className="text-2xl" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(actor)}
                              className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(actor.id)}
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

      {/* Add/Edit Actor Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
              <motion.div
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50"
              />

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

              <motion.div
                // initial={{ opacity: 0, scale: 0.95, y: 20 }}
                // animate={{ opacity: 1, scale: 1, y: 0 }}
                // exit={{ opacity: 0, scale: 0.95, y: 20 }}
                // transition={{ type: "spring", damping: 25 }}
                className="inline-block align-bottom bg-white dark:bg-dark-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-8 pt-8 pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedActor ? 'Edit Actor' : 'Add New Actor'}
                    </h3>
                    <button
                      onClick={handleCloseModal}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Timothée Chalamet"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date of Birth *
                          </label>
                          <input
                            type="text"
                            name="born"
                            value={formData.born}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="December 27, 1995"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nationality
                          </label>
                          <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="American"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Gender *
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <label className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.gender === 'Male'
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                              : 'border-gray-300 dark:border-dark-700 hover:border-gray-400 dark:hover:border-dark-600'
                              }`}>
                              <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleInputChange}
                                className="hidden"
                              />
                              <div className="flex items-center gap-2">
                                <FaMars className={`${formData.gender === 'Male' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                <span className={`font-medium ${formData.gender === 'Male' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                  Male
                                </span>
                              </div>
                            </label>

                            <label className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.gender === 'Female'
                              ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/30'
                              : 'border-gray-300 dark:border-dark-700 hover:border-gray-400 dark:hover:border-dark-600'
                              }`}>
                              <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleInputChange}
                                className="hidden"
                              />
                              <div className="flex items-center gap-2">
                                <FaVenus className={`${formData.gender === 'Female' ? 'text-secondary-600 dark:text-secondary-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                <span className={`font-medium ${formData.gender === 'Female' ? 'text-secondary-600 dark:text-secondary-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                  Female
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Rating (0-5)
                          </label>
                          <input
                            type="number"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            min="0"
                            max="5"
                            step="0.1"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="4.8"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Profile Picture
                          </label>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-dark-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-dark-900 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors">
                                <FaUpload className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" />
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                  Upload Image
                                </p>
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                              </label>
                            </div>

                            {formData.previewUrl && (
                              <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300 dark:border-dark-700">
                                <img
                                  src={formData.previewUrl}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                          {formData.previewUrl && (
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                              Image preview
                            </p>
                          )}
                        </div>
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
                        onClick={(e) => handleCreateOrUpdate(e)}
                        className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      >
                        {selectedActor ? 'Update Actor' : 'Add Actor'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActorSection;