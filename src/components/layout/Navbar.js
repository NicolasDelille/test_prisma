import React from 'react';
import Logo from '../../assets/logo.svg';
import SearchInput from '../filters/SearchInput';
import './Navbar.scss';

const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={Logo} alt='' />
            <SearchInput />
        </div>
    );
};

export default Navbar;
