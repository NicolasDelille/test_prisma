import React, { Fragment } from 'react';
import { Consumer } from '../../provider/movie-provider';
import Filters from '../filters/Filters';
import Movie from './Movie';
import Pagination from './Pagination';

import './Movies.scss';

const Movies = () => {
	return (
		<Consumer>
			{value => {
				const [ movies ] = value;

				if (movies === undefined || movies.length === 0) {
					return 'loading...';
				} else {
					return (
						<Fragment>
							<Filters />
							<div className='movies'>{movies.map(movie => <Movie key={movie.id} movie={movie} />)}</div>
							<Pagination />
						</Fragment>
					);
				}
			}}
		</Consumer>
	);
};

export default Movies;
