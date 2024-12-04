// src/components/Navbar.jsx
import { Film, Search, User, Bell, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ searchTerm, setSearchTerm, handleSearch}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? ' backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
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
                
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className= "relative w-64">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                type="search"
                placeholder="Search..."
                className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button type='submit' alt="search" onClick={handleSearch}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </button>
            </div>

            <button className="relative p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label="Notifications">
              <Bell className="h-6 w-6 text-gray-300" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <button className="p-1 rounded-full hover:bg-gray-700 transition-colors" aria-label="User  account">
              <User  className="h-6 w-6 text-gray-300" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;