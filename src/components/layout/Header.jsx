import React from 'react';
import Navbar from './Navbar';
import TopRatedMovies from '../movies/TopRatedMovies';

import './Header.scss';

const Header = () => {
    return (
        <header className='header'>
            <Navbar />
            <TopRatedMovies />
        </header>
    );
};

export default Header;
