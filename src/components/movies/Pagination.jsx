import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import { Context } from '../../provider/movie-provider';
import paginationnextarrow from '../../assets/paginationnextarrow.svg';
import paginationpreviousarrow from '../../assets/paginationpreviousarrow.svg';
import './Pagination.scss';

const Pagination = () => {
	const [ page, setPage ] = useState(1);
	const [ paginationIndex, setPaginationIndex ] = useState(1);
	const [ currentPagination, setCurrentPagination ] = useState([]);

	const value = useContext(Context);

	const [ , , filterType, fetchMovies, param, , , totalPages ] = value;

	const getCurrentPagination = (paginationIndex, totalPages) => {
		let paginationButtons = [];
		for (let index = 1; index <= totalPages; index++) {
			paginationButtons.push(index);
		}
		setCurrentPagination(paginationButtons.slice(paginationIndex - 1, paginationIndex + 9));
	};

	const prevPagination = () => {
		const newIndex = paginationIndex - 10;
		setPaginationIndex(newIndex);
		getCurrentPagination(newIndex, totalPages);
		setPage(paginationIndex - 10);
	};

	const nextPagination = () => {
		const newIndex = paginationIndex + 10;
		setPaginationIndex(newIndex);
		getCurrentPagination(newIndex, totalPages);
		setPage(paginationIndex + 10);
	};

	useEffect(
		() => {
			getCurrentPagination(paginationIndex, totalPages);
		},
		[ paginationIndex, totalPages ]
	);

	useEffect(
		() => {
			fetchMovies(page, filterType, param);
		},
		[ page, filterType, param ]
	);

	return (
		<div className='pagination'>
			<button onClick={() => prevPagination()} className='paginationButton prev' disabled={paginationIndex === 1}>
				<img src={paginationpreviousarrow} alt='Pages précédentes' />
			</button>
			{currentPagination.map(index => (
				<button
					className={classnames('pageButton', {
						selected: page === index
					})}
					key={index}
					onClick={() => {
						setPage(index);
						fetchMovies(index, filterType, param);
					}}
				>
					{index}
				</button>
			))}
			<button
				onClick={() => nextPagination()}
				className='paginationButton next'
				disabled={paginationIndex + 10 > totalPages}
			>
				<img src={paginationnextarrow} alt='Pages suivantes' />
			</button>
		</div>
	);
};

export default Pagination;
