import React from 'react'

const Category = ({MovieList}) => {

    const HomeMovie = () => {
        MovieList('popular', 'category');
    }

    const LatestMovie = () => {
        MovieList('now_playing', 'category');
    }
    

    const TrendingMovie = () => {
        MovieList('upcoming', 'category');
    }

    const MustWatchMovie = () => {
        MovieList('top_rated', 'category');
    }
    

  return (
    <div className='flex flex-wrap justify-center items-center gap-4 p-6 bg-black/30 backdrop-blur-sm rounded-xl mx-4 mt-4 shadow-lg'>
        <button 
            className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white font-medium py-3 px-8 rounded-l-2xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-red-500/50 hover:from-red-700 hover:to-red-900 group"
            onClick={HomeMovie}
        >
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
        <button 
            className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white font-medium py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-purple-500/50 hover:from-purple-700 hover:to-purple-900 group"
            onClick={LatestMovie}
        >
            <span className="relative z-10">Latest </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
        <button 
            className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white font-medium py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/50 hover:from-blue-700 hover:to-blue-900 group"
            onClick={TrendingMovie}
        >
            <span className="relative z-10">Trending </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
        <button 
            className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-800 text-white font-medium py-3 px-8 rounded-r-2xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-green-500/50 hover:from-green-700 hover:to-green-900 group"
            onClick={MustWatchMovie}
        >
            <span className="relative z-10">MWatch </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0  group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
    </div>
  )
}

export default Category