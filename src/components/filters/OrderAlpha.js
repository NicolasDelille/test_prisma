import React, { useState } from 'react';
import dropdownarrow from '../../assets/dropdownarrow.svg';
import './OrderAlpha.scss';
import { Consumer } from '../../provider/movie-provider';

const OrderAlpha = () => {
    const [orderAlpha, setOrderAlpha] = useState(false);
    const [old, setOld] = useState();

    const onClickHandler = (movies, setMovies) => {
        setOld(movies.slice());

        setOrderAlpha(!orderAlpha);
        if (!orderAlpha) {
            setMovies(
                [...movies].sort(function(a, b) {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                })
            );
        } else {
            setMovies(old);
        }
    };

    return (
        <Consumer>
            {([movies, setMovies]) => {
                return (
                    <div
                        onClick={() => {
                            onClickHandler(movies, setMovies);
                        }}
                        className='filter-button order-alpha-button'
                    >
                        Ordre alphabétique
                        {orderAlpha && <img src={dropdownarrow} alt='order alpha' />}
                    </div>
                );
            }}
        </Consumer>
    );
};

export default OrderAlpha;
