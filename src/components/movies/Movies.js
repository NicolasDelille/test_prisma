import React, { Fragment, useState, useEffect } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import Movie from './Movie';
import paginationnextarrow from '../../assets/paginationnextarrow.svg';
import paginationpreviousarrow from '../../assets/paginationpreviousarrow.svg';

import './Movies.scss';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [paginationIndex, setPaginationIndex] = useState(1);
    const [currentPagination, setCurrentPagination] = useState([]);

    const getCurrentPagination = (paginationIndex, totalPages) => {
        let paginationButtons = [];
        for (let index = 1; index <= totalPages; index++) {
            paginationButtons.push(index);
        }
        setCurrentPagination(paginationButtons.slice(paginationIndex - 1, paginationIndex + 9));
    };

    const fetchMovies = async currentPage => {
        setPage(currentPage);
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENTRYPOINT}/discover/movie?page=${currentPage}`, {
                headers: { Authorization: `Bearer ${process.env.REACT_APP_API_SECRET_TOKEN}` }
            });

            const fetchedMovies = res.data.results;
            const totalPages = res.data.total_pages;

            setTotalPages(totalPages);
            setMovies(fetchedMovies);
            getCurrentPagination(paginationIndex, totalPages);
            setPaginationIndex(paginationIndex);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchMovies(1);
    }, []);

    const prevPagination = () => {
        const newIndex = paginationIndex - 10;
        setPaginationIndex(newIndex);
        getCurrentPagination(newIndex, totalPages);
    };

    const nextPagination = () => {
        const newIndex = paginationIndex + 10;
        setPaginationIndex(newIndex);
        getCurrentPagination(newIndex, totalPages);
    };

    return (
        <div className='wrapper'>
            <h2>Tous les films</h2>
            {loading ? (
                <span style={{ height: '275px' }}>loading...</span>
            ) : (
                <Fragment>
                    <div className='movies'>
                        {movies.map(movie => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                    </div>

                    <div className='pagination'>
                        <button
                            onClick={() => prevPagination()}
                            className='paginationButton prev'
                            disabled={paginationIndex === 1}
                        >
                            <img src={paginationpreviousarrow} alt='Pages précédentes' />
                        </button>
                        {currentPagination.map(index => (
                            <button
                                className={classnames('pageButton', {
                                    selected: page === index
                                })}
                                key={index}
                                onClick={() => {
                                    fetchMovies(index);
                                }}
                            >
                                {index}
                            </button>
                        ))}
                        <button
                            onClick={() => nextPagination()}
                            className='paginationButton next'
                            disabled={paginationIndex + 10 > totalPages}
                        >
                            <img src={paginationnextarrow} alt='Pages suivantes' />
                        </button>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default Movies;
