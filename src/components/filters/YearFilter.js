import React, { useState } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';
import { Consumer } from '../../provider/movie-provider';
import './YearFilter.scss';

const YearFilter = () => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [heading, setHeading] = useState('Année');

    const onClickHandler = () => {
        setOpen(!open);
    };

    return (
        <Consumer>
            {value => {
                const [, , , fetchMovies, , setParam, ,] = value;
                return (
                    <div className='filter-button year-filter-button'>
                        <span onClick={onClickHandler}>{heading}</span>
                        {open && (
                            <Calendar
                                onChange={date => {
                                    setDate(date);
                                    fetchMovies(1, 'year', date.getFullYear());
                                    setParam(date.getFullYear());
                                    setOpen(!open);
                                    setHeading(date.getFullYear());
                                }}
                                value={date}
                                view='decade'
                                maxDetail='decade'
                                minDetail='decade'
                                prev2Label=''
                                next2Label=''
                                prevLabel=''
                                nextLabel=''
                            />
                        )}
                    </div>
                );
            }}
        </Consumer>
    );
};

export default YearFilter;
