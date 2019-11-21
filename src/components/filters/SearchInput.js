import React, { useState } from 'react';
import './SearchInput.scss';

const SearchInput = () => {
    const [formData, setformData] = useState({
        searchValue: ''
    });

    const onChange = e => {
        setformData({ [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
    };

    const { searchValue } = formData;

    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
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
};

export default SearchInput;
