import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import './Movie.scss';

const Movie = ({ movie }) => {
    const [poster, setPoster] = useState({});
    const fecthPoster = () => {};

    return (
        <div className='movie-card'>
            <img src='http://lorempixel.com/138/200' alt='' />
            <div className='details'>
                <span className='title'>{movie.title}</span>
                <br />
                <span className='date'>
                    <Moment format='YYYY'>{movie.release_date}</Moment>
                </span>
            </div>
        </div>
    );
};

export default Movie;
