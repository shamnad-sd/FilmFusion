import { useState, useEffect } from 'react'
import { TMDB_API_KEY, TMDB_BASE_URL } from '../config'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import MovieCard from './MovieCard'
import { Film, Search, User, Bell, Menu, X, Loader } from 'lucide-react'
import Banner from './Banner'
import Category from './Category'

const NavAPi = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)

  }, [])

  

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)


  return (
    <div>
      {/* Navbar */}
      <div className="flex flex-col  text-white">
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between h-16 md:h-20">
              <a href="/" className="flex items-center space-x-2">
                <Film className="h-8 w-8 text-red-500" />
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
                  FilmFusion
                </span>
              </a>

              <div className="hidden md:flex space-x-1">
                {['Home', 'Movies', 'TV Shows', 'New & Popular'].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase().replace(' & ', '-')}`}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <div className={`relative ${searchFocused ? 'w-64' : 'w-40'} transition-all duration-700`}>
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />

                  <button type='submit' alt="search" onClick={() => { MovieList(searchTerm) }} >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </button>

                </div>

                <button className="relative p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label="Notifications">
                  <Bell className="h-6 w-6 text-gray-300" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <button className="p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label="User account">
                  <User className="h-6 w-6 text-gray-300" />
                </button>

                <button
                  className="md:hidden p-1 rounded-full hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-gray-300" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-300" />
                  )}
                </button>
              </div>
            </nav>

            {isMenuOpen && (
              <div className="md:hidden py-2 space-y-1">
                {['Home', 'Movies', 'TV Shows', 'New & Popular'].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase().replace(' & ', '-')}`}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>
      </div>
      <Banner />
      <Category MovieList={MovieList}/>
      {movies?.length > 0 ? (
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
      ) : (
        <div className="empty w-full  mt-20 flex justify-center items-center">
          <h2><Loader/></h2>
        </div>
      )}

    </div>
  )
}

export default NavAPi;