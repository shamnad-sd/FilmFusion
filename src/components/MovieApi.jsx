// src/components/NavAPi.jsx
import { useState, useEffect } from 'react';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../config';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';
import Banner from './Banner';
import Category from './Category';
import Navbar from './Navbar'; // Import the new Navbar component
import { Loader } from 'lucide-react';

const MovieApi = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MovieList = async (query, type = 'search') => {
    setLoading(true);
    setError(null);
    try {
      let url;
      if (type === 'search') {
        url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`;
      } else if (type === 'category') {
        url = `${TMDB_BASE_URL}/movie/${query}?api_key=${TMDB_API_KEY}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setMovies(data.results);
      } else {
        setError('No movies found');
      }
    } catch (error) {
      setError('Failed to fetch movies');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    MovieList('popular', 'category');
  }, []);

  

  const handleSearch = () => {
    MovieList(searchTerm);
  };

  return (
    <div>
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSearch={handleSearch} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
       // Pass isScrolled to Navbar
      />
      <Banner />
      <Category MovieList={MovieList} />
      {loading ? (
        <div className="empty w-full mt-20 flex justify-center items-center">
          <h2><Loader /></h2>
        </div>
      ) : error ? (
        <div className="empty w-full mt-20 flex justify-center items-center">
          <h2>{error}</h2>
        </div>
      ) : (
        <>
          <div className="mt-20 mb-8">
            <Carousel
              responsive={{
                desktop: {
                  breakpoint: { max: 3000, min: 900 },
                  items: 6,
                  slidesToSlide: 1
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2,
                  slidesToSlide: 1
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                  slidesToSlide: 1
                }
              }}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 500ms ease-in-out"
              transitionDuration={500}
            >
              {movies.map((movie) => (
                <div key={movie.id} className="px-2">
                  <MovieCard movie={movie} isCarousel={true} />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="w-full flex justify-center items-center flex-wrap">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieApi;