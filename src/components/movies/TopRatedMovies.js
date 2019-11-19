import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import './TopRatedMovies.scss';
import Movie from './Movie';
import prevSlide from '../../assets/sliderpreviousarrow.svg';
import nextSlide from '../../assets/slidernextarrow.svg';

const TopRatedMovies = () => {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(true);

    const fetchTopMovies = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENTRYPOINT}/movie/top_rated?language=en-US`, {
                headers: { Authorization: `Bearer ${process.env.REACT_APP_API_SECRET_TOKEN}` }
            });
            const fetchedMovies = res.data.results;

            const fetchedMoviesWithIndex = fetchedMovies.map((movie, index) => ({ ...movie, index }));

            const topTenMovies = fetchedMoviesWithIndex.splice(0, 10);

            setMovies(topTenMovies);
            setMovie(topTenMovies[0]);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchTopMovies();
    }, []);

    const prevMovie = delta => {
        const newIndex = movie.index - delta;
        setMovie({ ...movie, index: newIndex });
    };

    const nextMovie = delta => {
        const newIndex = movie.index + delta;
        setMovie({ ...movie, index: newIndex });
    };

    let clientX;

    const handleTouchStart = e => {
        clientX = e.touches[0].clientX;
    };

    const handleTouchEnd = e => {
        let deltaX;
        deltaX = e.changedTouches[0].clientX - clientX;

        const delta = parseInt(Math.abs(deltaX) / 100) + 1;

        if (deltaX > 0) {
            if (movie.index <= movies.length - 4) {
                nextMovie(delta);
            }
        } else {
            if (movie.index !== 0) {
                prevMovie(delta);
            }
        }
    };

    return (
        <div className='header-wrapper'>
            <h2>Les 10 meilleurs films</h2>
            {loading ? (
                <span style={{ height: '275px' }}>loading...</span>
            ) : (
                <div className='slider'>
                    <button
                        className={classnames('sliderButton', 'prev', {
                            disabled: movie.index === 0
                        })}
                        onClick={() => prevMovie(4)}
                        disabled={movie.index === 0}
                    >
                        <img src={prevSlide} alt='Film précédent' />
                    </button>
                    <div className='movie-slider'>
                        <div
                            className='movie-slider-wrapper'
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            style={{
                                transform: `translateX(-${movie.index * (100 / movies.length)}%)`
                            }}
                        >
                            {!loading && movies.map(movie => <Movie key={movie.id} movie={movie} />)}
                        </div>
                    </div>
                    <button
                        className={classnames('sliderButton', 'next', {
                            disabled: movie.index === movies.length - 2
                        })}
                        onClick={() => nextMovie(4)}
                        disabled={movie.index === movies.length - 2}
                    >
                        <img src={nextSlide} alt='Film suivant' />
                    </button>
                </div>
            )}
        </div>
    );
};

export default TopRatedMovies;
