import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from '../config';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`
        );
        const data = await response.json();
        setMovie(data);

        // Extract the trailer key
        const trailer = data.videos.results.find(video => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleWatchButtonClick = () => {
    setShowTrailer(!showTrailer);
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!movie) return <div className="text-white text-center mt-20">Movie not found</div>;

  return (
    <div className="text-white pt-20">
      <div className="relative h-[90vh]">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={`${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded-full">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span>{movie.release_date.split('-')[0]}</span>
            <span>{movie.runtime} min</span>
          </div>
          <p className="text-lg max-w-2xl">{movie.overview}</p>
          <button 
            onClick={handleWatchButtonClick} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {showTrailer ? 'Hide Trailer' : 'Watch Trailer'}
          </button>
        </div>
      </div>

      {showTrailer && trailerKey && (
        <div className="mt-8">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {movie.credits?.cast?.slice(0, 15).map((actor) => (
            <div key={actor.id} className="flex-shrink-0 w-32">
              <img
                src={`${TMDB_IMAGE_BASE_URL}${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <p className="text-sm text-center">{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;