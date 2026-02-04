import React, { useContext } from 'react';
import dropdownarrow from '../../assets/dropdownarrow.svg';
import { Context } from '../../provider/movie-provider';
import './OrderAlpha.scss';

const OrderAlpha = () => {
    const value = useContext(Context);
    const [, , , fetchMovies, , setParam, , , orderAlpha, setOrderAlpha] = value;

    const onClickHandler = () => {
        if (!orderAlpha) {
            fetchMovies(1, 'alpha', 'original_title.desc');
            setParam('original_title.desc');
        } else {
            fetchMovies(1, '', '');
            setParam('');
        }
        setOrderAlpha(!orderAlpha);
    };

    return (
        <div onClick={() => onClickHandler()} className='filter-button order-alpha-button'>
            Ordre alphabétique
            {orderAlpha && <img src={dropdownarrow} alt='order alpha' />}
        </div>
    );
};

export default OrderAlpha;
