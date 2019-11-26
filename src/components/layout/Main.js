import React from 'react';
import Movies from '../movies/Movies';
import Filters from '../filters/Filters';
import './Main.scss';

const Main = () => {
    return (
        <div className='main'>
            <Movies />
        </div>
    );
};

export default Main;
