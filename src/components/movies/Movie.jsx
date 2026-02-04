import React from 'react';
// import Moment from 'react-moment';
import './Movie.scss';
import { API_IMAGE_ENTRYPOINT } from '../../config';

const Movie = ({ movie }) => {
    return (
        <div className='movie-card'>
            {movie.poster_path ? (
                <img
                    className='poster'
                    src={`${API_IMAGE_ENTRYPOINT}/w200${movie.poster_path}`}
                    alt=''
                />
            ) : (
                <div className='no-poster'>
                    <span>No poster found</span>
                </div>
            )}
            <div className='details'>
                <span className='title'>{movie.title}</span>
                {/* <span className='date'>
                    <Moment format='YYYY'>{movie.release_date}</Moment>
                </span> */}
            </div>
        </div>
    );
};

export default Movie;
