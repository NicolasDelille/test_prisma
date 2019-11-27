import React, { useState } from 'react';
import { Consumer } from '../../provider/movie-provider';
import './SearchInput.scss';

const SearchInput = () => {
    const [formData, setformData] = useState({
        searchValue: ''
    });

    const onChange = e => {
        setformData({ [e.target.name]: e.target.value });
    };

    const { searchValue } = formData;

    return (
        <Consumer>
            {value => {
                const [, , , fetchMovies, , setParam, ,] = value;
                return (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                console.log(formData);
                                fetchMovies(1, 'query', searchValue);
                                setParam(searchValue);
                            }}
                        >
                            <input
                                onChange={e => onChange(e)}
                                type='text'
                                name='searchValue'
                                id='searchValue'
                                placeholder='Rechercher un film'
                                value={searchValue}
                            />
                            <button type='submit'></button>
                        </form>
                    </div>
                );
            }}
        </Consumer>
    );
};

export default SearchInput;
