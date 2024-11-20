import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from '../config';
import { Loader } from 'lucide-react';

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results.slice(0, 10));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        <div className="text-white text-2xl"><Loader/></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100vh]">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container h-full"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="relative h-full w-full">
            <img
              src={`${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-20 mb-18 left-9 p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-lg max-w-2xl">{movie.overview}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
    
  );
};

export default Banner;