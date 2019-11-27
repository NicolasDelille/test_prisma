import React from 'react';
import Navbar from './Navbar';
import TopRatedMovies from '../movies/TopRatedMovies';

const Header = () => {
    return (
        <header>
            <div className='header-inside'>
                <Navbar />
                <TopRatedMovies />
            </div>
        </header>
    );
};

export default Header;
