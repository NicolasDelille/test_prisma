import React, { useState } from 'react';
import classnames from 'classnames';
import dropdownarrow from '../../assets/dropdownarrow.svg';
import './GenderFilter.scss';

const GenderFilter = () => {
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState('Genre');

    const onClickHandler = () => {
        setOpen(!open);
    };

    const handleClick = e => {
        e.preventDefault();
        console.log(e.target.value);
        setGender(e.target.value);
    };

    return (
        <div onClick={onClickHandler} className={classnames('filter-button', 'gender-filter-button', { expand: open })}>
            <span>{gender}</span>
            {!open && <img src={dropdownarrow} alt='open' />}
            {open && (
                <div className='dropdown-menu'>
                    <ul>
                        <li>
                            <button onClick={e => handleClick(e)} value='Tous'>
                                Tous
                            </button>
                        </li>
                        <li>
                            <button onClick={e => handleClick(e)} value='Action'>
                                Action
                            </button>
                        </li>
                        <li>
                            <button onClick={e => handleClick(e)} value='Horreur'>
                                Horreur
                            </button>
                        </li>
                        <li>
                            <button onClick={e => handleClick(e)} value='Amour'>
                                Amour
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GenderFilter;
