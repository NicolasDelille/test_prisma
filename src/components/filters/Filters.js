import React from 'react';
import YearFilter from './YearFilter';
import OrderFilter from './OrderFilter';
import GenderFilter from './GenderFilter';
import './Filters.scss';

const Filter = () => {
    return (
        <div className='section'>
            <h2>Tous les films</h2>
            <div className='filterwrapper'>
                <div className='ordering'>
                    <span>Trier par :</span>
                    <OrderFilter />
                </div>
                <div className='filtering'>
                    <span>Filtrer par :</span>
                    <GenderFilter />
                    <YearFilter />
                </div>
            </div>
        </div>
    );
};

export default Filter;
