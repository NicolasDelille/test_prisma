import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopRatedMovies.scss';
import Movie from './Movie';

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

            const moviesWithIndex = fetchedMovies.map((movie, index) => ({ ...movie, index }));

            setMovies(moviesWithIndex);
            setMovie(moviesWithIndex[0]);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchTopMovies();
    }, []);

    const prevMovie = () => {
        const newIndex = movie.index - 1;
        setMovie({ ...movie, index: newIndex });
    };

    const nextMovie = () => {
        const newIndex = movie.index + 1;
        setMovie({ ...movie, index: newIndex });
    };

    return (
        <div className='wrapper'>
            <h2>Les 10 meilleurs films</h2>
            {loading ? (
                <span style={{ height: '275px' }}>loading...</span>
            ) : (
                <div className='slider'>
                    <button onClick={() => prevMovie()} disabled={movie.index === 0}>
                        Prev
                    </button>
                    <div className='movie-slider'>
                        <div
                            className='movie-slider-wrapper'
                            style={{
                                transform: `translateX(-${movie.index * (100 / movies.length)}%)`
                            }}
                        >
                            {!loading && movies.map(movie => <Movie key={movie.id} movie={movie} />)}
                        </div>
                    </div>
                    <button onClick={() => this.nextMovie()} disabled={movie.index === movies.length - 1}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default TopRatedMovies;
