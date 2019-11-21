import React, { useState } from 'react';
import dropdownarrow from '../../assets/dropdownarrow.svg';
import './OrderFilter.scss';

const Ordering = () => {
    const [orderDesc, setOrderDesc] = useState(false);

    const onClickHandler = () => {
        setOrderDesc(!orderDesc);
    };

    return (
        <div onClick={onClickHandler} className='filter-button order-filter-button'>
            Ordre alphabétique
            {orderDesc && <img src={dropdownarrow} alt='order desc' />}
        </div>
    );
};

export default Ordering;
