import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Context = React.createContext();

export const Provider = props => {
    const [movies, setMovies] = useState([]);
    const [param, setParam] = useState('');
    const [filterType, setFilterType] = useState('');
    const [genreList, setGenreList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [paginationIndex, setPaginationIndex] = useState(1);
    const [currentPagination, setCurrentPagination] = useState([]);

    const getCurrentPagination = (paginationIndex, totalPages) => {
        let paginationButtons = [];
        for (let index = 1; index <= totalPages; index++) {
            paginationButtons.push(index);
        }
        setCurrentPagination(paginationButtons.slice(paginationIndex - 1, paginationIndex + 9));
    };

    const fetchMovies = async (currentPage, type, param) => {
        let requestURI;
        switch (type) {
            case 'genre':
                setFilterType('genre');
                requestURI = `${process.env.REACT_APP_API_ENTRYPOINT}/discover/movie?page=${currentPage}&language=fr-FR&with_genres=${param}&include_adult=false`;
                break;
            case 'query':
                setFilterType('query');
                requestURI = `${process.env.REACT_APP_API_ENTRYPOINT}/search/movie?page=${currentPage}&language=fr-FR&query=${param}&include_adult=false`;
                break;
            case 'year':
                setFilterType('year');
                requestURI = `${process.env.REACT_APP_API_ENTRYPOINT}/discover/movie?page=${currentPage}&language=fr-FR&year=${param}&include_adult=false`;
                break;
            default:
                setFilterType('');
                setPage(currentPage);
                requestURI = `${process.env.REACT_APP_API_ENTRYPOINT}/discover/movie?page=${currentPage}&language=fr-FR&include_adult=false`;
                break;
        }
        console.log(requestURI);

        try {
            const res = await axios.get(requestURI, {
                headers: { Authorization: `Bearer ${process.env.REACT_APP_API_SECRET_TOKEN}` }
            });

            const fetchedMovies = res.data.results;
            const totalPages = res.data.total_pages;

            setTotalPages(totalPages);
            setMovies(fetchedMovies);
            getCurrentPagination(paginationIndex, totalPages);
            setPaginationIndex(paginationIndex);
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchGenreList = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_ENTRYPOINT}/genre/movie/list?language=fr-FR`, {
                headers: { Authorization: `Bearer ${process.env.REACT_APP_API_SECRET_TOKEN}` }
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
                page,
                setPage,
                totalPages,
                setTotalPages,
                paginationIndex,
                setPaginationIndex,
                currentPagination,
                setCurrentPagination,
                getCurrentPagination
            ]}
        >
            {props.children}
        </Context.Provider>
    );
};

export const Consumer = Context.Consumer;
