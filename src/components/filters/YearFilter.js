import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';
import { Context } from '../../provider/movie-provider';
import './YearFilter.scss';

const YearFilter = () => {
	const [ open, setOpen ] = useState(false);

	const value = useContext(Context);
	const [ , , , fetchMovies, , setParam, , , , , , , date, setDate ] = value;

	const onClickHandler = () => {
		setDate(new Date());
		setOpen(!open);
	};

	return (
		<div className='filter-button year-filter-button'>
			<span onClick={onClickHandler}>{date === null ? 'Année' : date.getFullYear()}</span>
			{open && (
				<Calendar
					onChange={date => {
						setDate(date);
						fetchMovies(1, 'year', date.getFullYear());
						setParam(date.getFullYear());
						setOpen(!open);
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
};

export default YearFilter;
