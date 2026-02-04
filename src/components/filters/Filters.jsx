import React, { Fragment } from 'react';
import YearFilter from './YearFilter';
import OrderAlpha from './OrderAlpha';
import GenreFilter from './GenreFilter';
import { Consumer } from '../../provider/movie-provider';
import './Filters.scss';

const Filter = () => {
	return (
		<Consumer>
			{value => {
				const [ , , filterType, fetchMovies, param, , , , , , genre, setGenre, date, setDate ] = value;
				let heading;

				switch (filterType) {
					case 'genre':
						heading = (
							<div className='heading-wrapper'>
								<h2>{`Films ${genre}`}</h2>
								{genre !== '' ? (
									<button
										onClick={() => {
											setGenre('');
											fetchMovies(1);
										}}
										type='button'
									>
										{genre}
									</button>
								) : null}
							</div>
						);
						break;
					case 'year':
						heading = (
							<div className='heading-wrapper'>
								<h2>{`Films sortis en ${param}`}</h2>
								{date !== null ? (
									<button
										onClick={() => {
											setDate(null);
											fetchMovies(1);
										}}
										type='button'
									>
										{param}
									</button>
								) : null}
							</div>
						);
						break;
					case 'query':
						heading = (
							<div className='heading-wrapper'>
								<h2>{`Résultat(s) de la recherche : '${param}'`}</h2>
							</div>
						);
						break;
					default:
						heading = (
							<div className='heading-wrapper'>
								<h2>{`Tous les films`}</h2>
							</div>
						);
						break;
				}
				return (
					<Fragment>
						{heading}
						<div className='filterwrapper'>
							<div className='ordering'>
								<span>Trier par :</span>
								<OrderAlpha />
							</div>
							<div className='filtering'>
								<span>Filtrer par :</span>
								<GenreFilter />
								<YearFilter />
							</div>
						</div>
					</Fragment>
				);
			}}
		</Consumer>
	);
};

export default Filter;
