import React, { useState } from 'react'

const Category = ({MovieList}) => {
    const [activeButton, setActiveButton] = useState('home');

    const HomeMovie = () => {
        setActiveButton('home');
        MovieList('popular', 'category');
    }

    const LatestMovie = () => {
        setActiveButton('latest');
        MovieList('now_playing', 'category');
    }
    
    const TrendingMovie = () => {
        setActiveButton('trending');
        MovieList('upcoming', 'category');
    }

    const MustWatchMovie = () => {
        setActiveButton('mustwatch');
        MovieList('top_rated', 'category');
    }

    const getButtonClass = (buttonName) => {
        const baseClass = "px-8 py-2 text-white rounded transition-colors duration-300 font-medium text-sm tracking-wide";
        return activeButton === buttonName 
            ? `${baseClass} bg-red-600 hover:bg-red-700`
            : `${baseClass} bg-[#141414] hover:bg-[#2f2f2f] text-[#e5e5e5] hover:text-white`;
    }

    return (
        <div className='flex flex-wrap justify-center items-center gap-4 p-6 bg-zinc-900/90 rounded-md mx-4 mt-4'>
            <button 
                className={getButtonClass('home')}
                onClick={HomeMovie}
            >
                Home
            </button>
            <button 
                className={getButtonClass('latest')}
                onClick={LatestMovie}
            >
                Latest
            </button>
            <button 
                className={getButtonClass('trending')}
                onClick={TrendingMovie}
            >
                Trending
            </button>
            <button 
                className={getButtonClass('mustwatch')}
                onClick={MustWatchMovie}
            >
                Must Watch
            </button>
        </div>
  )
}

export default Category