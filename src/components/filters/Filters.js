import React from 'react';
import YearFilter from './YearFilter';
import OrderAlpha from './OrderAlpha';
import GenreFilter from './GenreFilter';
import { Consumer } from '../../provider/movie-provider';
import './Filters.scss';

const Filter = () => {
    return (
        <Consumer>
            {value => {
                const [movies, setMovies, filterType, fetchMovies, param, setParam, genreList] = value;
                let heading;

                console.log(param);

                switch (filterType) {
                    case 'genre':
                        const genre = genreList.filter(item => item.id === param);
                        heading = `Films ${genre[0].name}`;
                        break;
                    case 'year':
                        heading = `Films sortis en ${param}`;
                        break;
                    case 'query':
                        heading = `Résultat(s) de la recherche : '${param}'`;
                        break;
                    default:
                        heading = `Tous les films`;
                        break;
                }
                return (
                    <div className='section'>
                        <h2>{heading}</h2>
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
                    </div>
                );
            }}
        </Consumer>
    );
};

export default Filter;
