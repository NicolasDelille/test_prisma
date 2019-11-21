import React, { useState } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';
import './YearFilter.scss';

const YearFilter = () => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const onChange = date => {
        setDate(date);
    };

    const onClickHandler = () => {
        setOpen(!open);
    };

    // console.log(date.getFullYear());

    return (
        <div className='filter-button year-filter-button'>
            <button onClick={onClickHandler}>Année</button>
            {open && (
                <Calendar
                    onChange={onChange}
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
            {/* <Calendar
                onChange={onChange}
                value={date}
                view='decade'
                maxDetail='decade'
                minDetail='decade'
                prev2Label=''
                next2Label=''
                prevLabel=''
                nextLabel=''
            /> */}
        </div>
    );
};

export default YearFilter;
