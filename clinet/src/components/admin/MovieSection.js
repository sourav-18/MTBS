import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaPlus,
    FaTimes,
    FaEdit,
    FaTrash,
    FaFilm,
    FaCalendarAlt,
    FaClock,
    FaLanguage,
    FaUsers,
    FaStar,
    FaToggleOn,
    FaToggleOff,
    FaSearch,
    FaUpload,
    FaImage,
    FaVideo,
    FaGlobe,
    FaUserPlus,
    FaCalendarDay,
    FaWindowClose,
} from 'react-icons/fa';
import { IoEye } from "react-icons/io5";
import { uploadMultiImages } from '../../services/upload.service';
import { getActorListForSelect } from '../../services/actor.service';
import { createMovie, getMovieActorList, getMovieList, movieStatusUpdate } from '../../services/movie.service';

const MovieSection = () => {
    const [movies, setMovies] = useState({
        data: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [actors, setActors] = useState([]);
    const [showActorSearch, setShowActorSearch] = useState(false);
    const [actorSearchTerm, setActorSearchTerm] = useState('');
    const [filteredActors, setFilteredActors] = useState([]);
    const [isMovieActorShow,setIsMovieActorShow]=useState(null);
    const[isEdit,setIsEdit]=useState(false);

    const cardImageInputRef = useRef(null);
    const posterImageInputRef = useRef(null);
    const itemsPerPage = 10;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        languages: [],
        cardImages: [],
        posterImages: [],
        releaseDate: '',
        actors: [],
        duration: '',
        rating: '',
        genre: '',
        director: '',
        trailerUrl: '',
        status: 'active'
    });

    useEffect(() => {
        loadMovies(1, '');
        loadLanguages();
        loadActors('');
    }, []);

    const loadMovies = async (page = 1, search = '') => {
        setIsLoading(true);
        const apiRes = await getMovieList(search, page, itemsPerPage);
        // console.log(apiRes)
        if (apiRes.statusCode == 200) {
            setMovies({
                data: apiRes.data.contains,
                totalCount: apiRes.data.totalCount,
                totalPages: apiRes.data.totalPages,
                currentPage: page
            });
        }
        setIsLoading(false);
        // try {
        //     setTimeout(() => {
        //         setMovies({
        //             data: mockMovies,
        //             totalCount: mockMovies.length,
        //             totalPages: Math.ceil(mockMovies.length / itemsPerPage),
        //             currentPage: page
        //         });
        //         setIsLoading(false);
        //     }, 500);
        // } catch (error) {
        //     console.error('Error loading movies:', error);
        //     setIsLoading(false);
        // }
    };

    const loadLanguages = async () => {
        try {
            setLanguages([
                { id: 1, name: 'English' },
                { id: 2, name: 'Hindi' },
                { id: 3, name: 'Bengali' },
                { id: 4, name: 'Tamil' },
                { id: 5, name: 'Malayali' },
            ]);
        } catch (error) {
            console.error('Error loading languages:', error);
        }
    };

    const loadActors = async (search = '') => {
        setIsMovieActorShow(null)
        try {
            let mockActors = [];
            const actors = await getActorListForSelect(search);
            if (actors.statusCode == 200) {
                mockActors = actors.data;
            }
            setActors(mockActors);
            setFilteredActors(mockActors);
        } catch (error) {
            console.error('Error loading actors:', error);
        }
    };

    const showMovieActor = async (movieId,search='') => {
        try {
            setIsMovieActorShow(movieId)
            let mockActors = [];
            const actors = await getMovieActorList(movieId,search);
            if (actors.statusCode == 200) {
                mockActors = actors.data;
            }
            setActors(mockActors);
            setFilteredActors(mockActors);
        } catch (error) {
            console.error('Error loading actors:', error);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        loadMovies(1, value);
        
    };

    const handleSearchForShowMovieActor=(e)=>{
        const value = e.target.value;
        setActorSearchTerm(value);
        console.log("first",isMovieActorShow)
        showMovieActor(isMovieActorShow, value);
    }

    const handleActorSearch = (e) => {
        const value = e.target.value;
        setActorSearchTerm(value);
        loadActors(value)
        // const filtered = actors.filter(actor =>
        //     actor.name.toLowerCase().includes(value.toLowerCase())
        // );
        // setFilteredActors(filtered);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= movies.totalPages) {
            loadMovies(page, searchTerm);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLanguageSelect = (languageId) => {
        const isSelected = formData.languages.includes(languageId);
        setFormData(prev => ({
            ...prev,
            languages: isSelected
                ? prev.languages.filter(id => id !== languageId)
                : [...prev.languages, languageId]
        }));
    };

    const handleActorSelect = (actorId) => {
        const isSelected = formData.actors.includes(actorId);
        setFormData(prev => ({
            ...prev,
            actors: isSelected
                ? prev.actors.filter(id => id !== actorId)
                : [...prev.actors, actorId]
        }));
    };

    const handleCardImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
        }));

        setFormData(prev => ({
            ...prev,
            cardImages: [...prev.cardImages, ...newImages]
        }));
    };

    const handlePosterImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
        }));

        setFormData(prev => ({
            ...prev,
            posterImages: [...prev.posterImages, ...newImages]
        }));
    };

    const removeCardImage = (index) => {
        setFormData(prev => ({
            ...prev,
            cardImages: prev.cardImages.filter((_, i) => i !== index)
        }));
    };

    const removePosterImage = (index) => {
        setFormData(prev => ({
            ...prev,
            posterImages: prev.posterImages.filter((_, i) => i !== index)
        }));
    };

    const getActorName = (actorId) => {
        const actor = actors.find(a => a.id === actorId);
        return actor ? actor.name : '';
    };

    const getLanguageName = (languageId) => {
        const language = languages.find(l => l.id === languageId);
        return language ? language.name : '';
    };

    const handleCreateOrUpdate = () => {
        if (selectedMovie) {
            handleUpdate();
        } else {
            handleCreate();
        }
    }

    const handleCreate = async () => {
         setIsEdit(false);
        const crateData = {
            name: formData.name,
            description: formData.description,
            releaseDate: formData.releaseDate,
            duration: formData.duration,
            languages: formData.languages,
            actors: formData.actors,
            trailerUrl: formData.trailerUrl
        }


        if (formData.cardImages.length > 0) {
            const cardImagesData = new FormData();
            formData.cardImages.forEach(item => {
                cardImagesData.append("files", item.file); // 👈 same key
            });
            cardImagesData.append("folderName", "movies");
            // console.log(Object.fromEntries(cardImagesData))
            const cardImagesApiRes = await uploadMultiImages(cardImagesData);
            if (cardImagesApiRes.statusCode == 500) {
                alert(cardImagesApiRes.message);
                return;
            }
            crateData.cardImageUrls = cardImagesApiRes.data;
        }

        if (formData.posterImages.length > 0) {
            const posterImagesData = new FormData();
            formData.posterImages.forEach(item => {
                posterImagesData.append("files", item.file); // 👈 same key
            });
            posterImagesData.append("folderName", "movies");
            const posterImageApiRes = await uploadMultiImages(posterImagesData);
            if (posterImageApiRes.statusCode == 500) {
                alert(posterImageApiRes.message);
                return;
            }
            crateData.posterImageUrls = posterImageApiRes.data;
        }

        const createMovieApiRes = await createMovie(crateData);
        console.log(createMovieApiRes);





        // console.log('Creating movie:', Object.fromEntries(formDataToSend));
        // handleCloseModal();
        // loadMovies(movies.currentPage, searchTerm);
    }

    const handleUpdate = () => {
        console.log('Updating movie:', formData);
        handleCloseModal();
        loadMovies(movies.currentPage, searchTerm);
    }

    const handleEdit = (movie) => {
        setIsEdit(true);
        console.log(movie.actors)
        setSelectedMovie(movie);
        setFormData({
            name: movie.name || '',
            description: movie.description || '',
            languages: movie.languages || [],
            cardImages: movie.cardImageUrls,
            posterImages: movie.posterImageUrls,
            releaseDate: movie.releaseDate || '',
            actors: movie.actors || [],
            duration: movie.duration || '',
            rating: movie.rating || '',
            genre: movie.genre || '',
            director: movie.director || '',
            trailerUrl: movie.trailerUrl || '',
            status: movie.status || 'Active'
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            loadMovies(movies.currentPage, searchTerm);
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        if(window.confirm("Are you sure to update status")){
           const apiRes=await movieStatusUpdate(id,currentStatus==='Active'?'Inactive':'Active');
           alert(apiRes.message)
        }
        loadMovies(movies.currentPage);
    };

    const handleAddNew = () => {
        setSelectedMovie(null);
        setFormData({
            name: '',
            description: '',
            languages: [],
            cardImages: [],
            posterImages: [],
            releaseDate: '',
            actors: [],
            duration: '',
            rating: '',
            genre: '',
            director: '',
            trailerUrl: '',
            status: 'active'
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        // Clean up object URLs
        formData.cardImages.forEach(image => URL.revokeObjectURL(image.preview));
        formData.posterImages.forEach(image => URL.revokeObjectURL(image.preview));

        setShowModal(false);
        setSelectedMovie(null);
        setShowActorSearch(false);
        setActorSearchTerm('');
    };

    const ImageUploadSection = ({ title, images, onUpload, onRemove, inputRef, type }) => (
        <div>
            <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {title} <span className="text-primary-600">({images.length})</span>
                </label>
                <button
                    type="button"
                    onClick={() => inputRef.current.click()}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                >
                    <FaUpload className="text-sm" />
                    Upload {type}
                </button>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onUpload}
                    className="hidden"
                />
            </div>

            {/* Upload Area */}
            {images.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-dark-700 rounded-xl p-8 text-center">
                    <FaImage className="text-4xl text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">No {type} images uploaded</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Click the upload button above</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative group w-24 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-dark-700"
                            >
                                <img
                                    src={image.preview}
                                    alt={`${type} preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => onRemove(index)}
                                        className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <FaTimes className="text-xs" />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                                    {image.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderPagination = () => {
        const { currentPage, totalPages } = movies;

        if (totalPages <= 1) return null;

        return (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-dark-700">
                <div className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                    <span className="font-semibold">{Math.min(currentPage * itemsPerPage, movies.totalCount)}</span> of{' '}
                    <span className="font-semibold">{movies.totalCount}</span> movies
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

    const mockMovies = [
        {
            id: 1,
            name: 'Dune: Part Two',
            description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
            languages: [1, 3],
            cardImageUrls: ['https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop'],
            posterImageUrls: ['https://images.unsplash.com/photo-1534447677768-be436bb09401?w-800&auto=format&fit=crop'],
            releaseDate: '2024-03-01',
            actors: [1, 2],
            duration: '166m',
            rating: 8.7,
            genre: 'Sci-Fi, Adventure',
            director: 'Denis Villeneuve',
            status: 'active'
        },
        {
            id: 2,
            name: 'Oppenheimer',
            description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
            languages: [1],
            cardImageUrls: ['https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&auto=format&fit=crop'],
            posterImageUrls: ['https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w-800&auto=format&fit=crop'],
            releaseDate: '2023-07-21',
            actors: [3, 5],
            duration: '180m',
            rating: 8.3,
            genre: 'Biography, Drama',
            director: 'Christopher Nolan',
            status: 'active'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Movies Management</h2>
                    <p className="text-gray-600 dark:text-gray-400">Manage all movies in the system</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddNew}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                        <FaPlus />
                        Add Movie
                    </motion.button>
                </div>
            </div>

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
                                            Movie
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actors
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Release
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
                                    {movies.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                                No movies found
                                            </td>
                                        </tr>
                                    ) : (
                                        movies.data.map((movie) => (
                                            <motion.tr
                                                key={movie.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="hover:bg-gray-50 dark:hover:bg-dark-700"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-16 w-12 rounded overflow-hidden">
                                                            <img
                                                                className="h-16 w-12 object-cover"
                                                                src={movie.cardImageUrls?movie.cardImageUrls[0]: 'https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=100&auto=format&fit=crop'}
                                                                alt={movie.name}
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                {movie.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {movie.genre}
                                                            </div>
                                                            <div className="flex items-center mt-1">
                                                                <FaStar className="text-yellow-500 text-xs mr-1" />
                                                                <span className="text-xs text-gray-600 dark:text-gray-400">{movie.rating}/10</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                            <FaClock className="mr-2 text-gray-400" />
                                                            {movie.duration}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                            <FaLanguage className="mr-2 text-gray-400" />
                                                            {movie.languages?.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(', ') || 'N/A'}
                                                        </div>
                                                        {/* <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                            <FaUsers className="mr-2 text-gray-400" />
                                                            {movie.actors?.length || 0} actors
                                                        </div> */}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                                <button
                                                            type="button"
                                                            onClick={() => {
                                                                setShowActorSearch(true);
                                                                showMovieActor(movie.id);
                                                            }}
                                                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                                                        >
                                                            <IoEye />
                                    
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                        <FaCalendarAlt className="mr-2 text-gray-400" />
                                                        {new Date(movie.releaseDate).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleStatusToggle(movie.id, movie.status)}
                                                        className={`p-2 rounded-lg transition-colors ${movie.status === 'Active'
                                                            ? 'text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30'
                                                            : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/30'
                                                            }`}
                                                    >
                                                        {movie.status === 'Active' ? (
                                                            <FaToggleOn className="text-2xl" />
                                                        ) : (
                                                            <FaToggleOff className="text-2xl" />
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleEdit(movie)}
                                                            className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(movie.id)}
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
                                className="inline-block align-bottom bg-white dark:bg-dark-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="px-6 pt-6 pb-6 max-h-[85vh] overflow-y-auto">
                                    <div className="flex items-center justify-between mb-6 top-0 bg-white dark:bg-dark-800 pb-4">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {selectedMovie ? 'Edit Movie' : 'Add New Movie'}
                                        </h3>
                                        <button
                                            onClick={handleCloseModal}
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Left Column */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Movie Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                        placeholder="Enter movie name"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Description *
                                                    </label>
                                                    <textarea
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                        required
                                                        rows="4"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                        placeholder="Enter movie description"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Duration *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="duration"
                                                            value={formData.duration}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                            placeholder="e.g., 150m"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Release Date *
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="releaseDate"
                                                            value={formData.releaseDate}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    {/* <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Genre *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="genre"
                                                            value={formData.genre}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                            placeholder="e.g., Action, Drama"
                                                        />
                                                    </div> */}

                                                    {/* <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Director
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="director"
                                                            value={formData.director}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                            placeholder="Enter director name"
                                                        />
                                                    </div> */}
                                                </div>

                                                {/* <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Rating (0-10)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="rating"
                                                            value={formData.rating}
                                                            onChange={handleInputChange}
                                                            min="0"
                                                            max="10"
                                                            step="0.1"
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                            placeholder="8.5"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Trailer URL
                                                        </label>
                                                        <input
                                                            type="url"
                                                            name="trailerUrl"
                                                            value={formData.trailerUrl}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                            placeholder="https://youtube.com/watch?v=..."
                                                        />
                                                    </div>
                                                </div> */}
                                            </div>

                                            {/* Right Column */}
                                            <div className="space-y-4">
                                                {/* Languages Selection */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Languages *
                                                        </label>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {formData.languages.length} selected
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                        {languages.map((language) => (
                                                            <button
                                                                key={language.id}
                                                                type="button"
                                                                onClick={() => handleLanguageSelect(language.id)}
                                                                className={`flex items-center justify-center p-2 rounded-lg border transition-all text-sm ${formData.languages.includes(language.id)
                                                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                                                    : 'border-gray-300 dark:border-dark-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-dark-600'
                                                                    }`}
                                                            >
                                                                <FaLanguage className="mr-1" />
                                                                {language.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Actors Selection */}
                                              {!isEdit&&  <div>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Actors
                                                            </label>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                {formData.actors.length} selected
                                                            </span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setShowActorSearch(true);
                                                                loadActors('');
                                                            }}
                                                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                                                        >
                                                            <FaUserPlus />
                                                            Add
                                                        </button>
                                                    </div>

                                                    {/* Selected Actors */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {formData.actors.map((actorId) => {
                                                            const actor = actors.find(a => a.id === actorId);
                                                            return actor ? (
                                                                <div
                                                                    key={actorId}
                                                                    className="flex items-center gap-2 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm"
                                                                >
                                                                    <img
                                                                        src={actor.profilePicture}
                                                                        alt={actor.name}
                                                                        className="w-5 h-5 rounded-full"
                                                                    />
                                                                    <span>{actor.name}</span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleActorSelect(actorId)}
                                                                        className="ml-1 text-primary-500 hover:text-primary-700"
                                                                    >
                                                                        <FaTimes className="text-xs" />
                                                                    </button>
                                                                </div>
                                                            ) : null;
                                                        })}
                                                    </div>
                                                </div>}

                                                {/* Card Images Upload */}
                                                <div className="pt-4">
                                                    <ImageUploadSection
                                                        title="Card Images"
                                                        images={formData.cardImages}
                                                        onUpload={handleCardImageUpload}
                                                        onRemove={removeCardImage}
                                                        inputRef={cardImageInputRef}
                                                        type="card"
                                                    />
                                                </div>

                                                {/* Poster Images Upload */}
                                                <div className="pt-6">
                                                    <ImageUploadSection
                                                        title="Poster Images"
                                                        images={formData.posterImages}
                                                        onUpload={handlePosterImageUpload}
                                                        onRemove={removePosterImage}
                                                        inputRef={posterImageInputRef}
                                                        type="poster"
                                                    />
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
                                                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                                                onClick={() => handleCreateOrUpdate()}
                                            >
                                                {selectedMovie ? 'Update Movie' : 'Add Movie'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showActorSearch && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50"
                            />

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                            <motion.div
                                className="inline-block align-bottom bg-white dark:bg-dark-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="px-6 pt-6 pb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Select Actors
                                        </h3>
                                        <button
                                            onClick={() => setShowActorSearch(false)}
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 dark:text-gray-400"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>

                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            placeholder="Search actors..."
                                            value={actorSearchTerm}
                                            onChange={isMovieActorShow?handleSearchForShowMovieActor:handleActorSearch}
                                            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>

                                    <div className="max-h-64 overflow-y-auto">
                                        {!filteredActors || filteredActors.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                                No actors found
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                {filteredActors.map((actor) => (
                                                    <div
                                                        key={actor.id}
                                                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${formData.actors.includes(actor.id)
                                                            ? 'bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700'
                                                            : 'hover:bg-gray-100 dark:hover:bg-dark-700'
                                                            }`}
                                                        onClick={() => handleActorSelect(actor.id)}
                                                    >
                                                       {!isMovieActorShow&&<input
                                                            type="checkbox"
                                                            checked={formData.actors.includes(actor.id)}
                                                            onChange={() => { }}
                                                            className="rounded text-primary-600 focus:ring-primary-500"
                                                        />}
                                                        <img
                                                            src={actor.profilePicture}
                                                            alt={actor.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        <span className="text-sm text-gray-900 dark:text-white">
                                                            {actor.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                   { !isMovieActorShow&&<div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
                                        <button
                                            onClick={() => setShowActorSearch(false)}
                                            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                        >
                                            Done
                                        </button>
                                    </div>}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MovieSection;