import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENTRYPOINT, API_SECRET_TOKEN } from '../config';

export const Context = React.createContext();

export const Provider = props => {
    const [movies, setMovies] = useState([]);
    const [param, setParam] = useState('');
    const [filterType, setFilterType] = useState('');
    const [genre, setGenre] = useState('');
    const [date, setDate] = useState(null);
    const [genreList, setGenreList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [orderAlpha, setOrderAlpha] = useState(false);
    const fetchMovies = async (currentPage, filterType, param) => {
        let requestURI;
        switch (filterType) {
            case 'genre':
                if (date !== null) {
                    setDate(null);
                }
                setFilterType('genre');
                requestURI = `${API_ENTRYPOINT}/discover/movie?page=${currentPage}&language=fr_FR&with_genres=${param}&include_adult=false`;
                break;
            case 'query':
                setFilterType('query');
                requestURI = `${API_ENTRYPOINT}/search/movie?page=${currentPage}&language=fr_FR&query=${param}&include_adult=false`;
                break;
            case 'year':
                if (genre !== 'null') {
                    setGenre('');
                }
                setFilterType('year');
                requestURI = `${API_ENTRYPOINT}/discover/movie?page=${currentPage}&language=fr_FR&year=${param}&include_adult=false`;
                break;
            case 'alpha':
                setFilterType('alpha');
                requestURI = `${API_ENTRYPOINT}/discover/movie?page=${currentPage}&language=fr_FR&include_adult=false&sort_by=${param}`;
                break;
            default:
                setFilterType('');
                requestURI = `${API_ENTRYPOINT}/discover/movie?page=${currentPage}&language=fr_FR&include_adult=false`;
                break;
        }

        try {
            const res = await axios.get(requestURI, {
                headers: { Authorization: `Bearer ${API_SECRET_TOKEN}` }
            });

            const fetchedMovies = res.data.results;
            const totalPages = res.data.total_pages;

            setTotalPages(totalPages);
            setMovies(fetchedMovies);
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchGenreList = async () => {
        try {
            const res = await axios.get(`${API_ENTRYPOINT}/genre/movie/list?language=fr-FR`, {
                headers: { Authorization: `Bearer ${API_SECRET_TOKEN}` }
            });
            setGenreList(res.data.genres);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchMovies(1);
        fetchGenreList();
    }, []);

    return (
        <Context.Provider
            value={[
                movies,
                setMovies,
                filterType,
                fetchMovies,
                param,
                setParam,
                genreList,
                totalPages,
                orderAlpha,
                setOrderAlpha,
                genre,
                setGenre,
                date,
                setDate
            ]}
        >
            {props.children}
        </Context.Provider>
    );
};

export const Consumer = Context.Consumer;
