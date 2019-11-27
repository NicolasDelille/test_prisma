import React, { useState } from 'react';
import { Consumer } from '../../provider/movie-provider';
import classnames from 'classnames';
import dropdownarrow from '../../assets/dropdownarrow.svg';
import './GenreFilter.scss';

const GenreFilter = () => {
    const [open, setOpen] = useState(false);
    const [genre, setGenre] = useState('Genre');

    const onClickHandler = () => {
        setOpen(!open);
    };

    const handleClick = e => {
        e.preventDefault();
        setGenre(e.target.value);
    };

    return (
        <Consumer>
            {value => {
                const [, , , fetchMovies, , setParam, genreList] = value;

                return (
                    <div
                        onClick={onClickHandler}
                        className={classnames('filter-button', 'genre-filter-button', { expand: open })}
                    >
                        <span>{genre}</span>
                        {!open && <img src={dropdownarrow} alt='open' />}
                        {open && (
                            <div className='dropdown-menu'>
                                <ul>
                                    {genreList.map(item => (
                                        <li key={item.id}>
                                            <button
                                                onClick={e => {
                                                    handleClick(e);
                                                    fetchMovies(1, 'genre', item.id);
                                                    setParam(item.id);
                                                }}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            }}
        </Consumer>
    );
};

export default GenreFilter;
