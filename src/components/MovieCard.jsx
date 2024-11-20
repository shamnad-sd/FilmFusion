import React, { useState } from 'react'
import { TMDB_IMAGE_BASE_URL } from '../config'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({movie, isCarousel}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative group mb-7 bg-zinc-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/20 max-w-[280px] mx-auto">
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 w-full">
            <h2 className="text-white font-bold text-lg mb-2 line-clamp-1">{movie.title}</h2>
            <p className="text-gray-200 text-sm mb-3 line-clamp-3">
              {movie.overview}
            </p>
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-gray-300">{movie.release_date?.split('-')[0]}</span>
              <div className="flex items-center bg-black/50 px-2 py-1 rounded-full">
                <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white">{movie.vote_average?.toFixed(1)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <span>Watch Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard