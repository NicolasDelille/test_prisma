import React from 'react';
import classnames from 'classnames';
import { Consumer } from '../../provider/movie-provider';
import paginationnextarrow from '../../assets/paginationnextarrow.svg';
import paginationpreviousarrow from '../../assets/paginationpreviousarrow.svg';
import './Pagination.scss';

const Pagination = () => {
    const prevPagination = (paginationIndex, setPaginationIndex, getCurrentPagination, totalPages) => {
        const newIndex = paginationIndex - 10;
        setPaginationIndex(newIndex);
        getCurrentPagination(newIndex, totalPages);
    };

    const nextPagination = (paginationIndex, setPaginationIndex, getCurrentPagination, totalPages) => {
        const newIndex = paginationIndex + 10;
        setPaginationIndex(newIndex);
        getCurrentPagination(newIndex, totalPages);
    };

    return (
        <Consumer>
            {([
                movies,
                setMovies,
                filterType,
                fetchMovies,
                param,
                setParam,
                genreList,
                page,
                setPage,
                totalPages,
                setTotalPages,
                paginationIndex,
                setPaginationIndex,
                currentPagination,
                setCurrentPagination,
                getCurrentPagination
            ]) => {
                return (
                    <div className='pagination'>
                        <button
                            onClick={() =>
                                prevPagination(paginationIndex, setPaginationIndex, getCurrentPagination, totalPages)
                            }
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
                                    fetchMovies(index, filterType, param);
                                }}
                            >
                                {index}
                            </button>
                        ))}
                        <button
                            onClick={() =>
                                nextPagination(paginationIndex, setPaginationIndex, getCurrentPagination, totalPages)
                            }
                            className='paginationButton next'
                            disabled={paginationIndex + 10 > totalPages}
                        >
                            <img src={paginationnextarrow} alt='Pages suivantes' />
                        </button>
                    </div>
                );
            }}
        </Consumer>
    );
};

export default Pagination;
