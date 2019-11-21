import React, { useState } from 'react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import { MovieContext } from './provider/movie-provider';
import './App.scss';

function App() {
    const [movies, setMovies] = useState({
        movies: [],
        fetchMovies
    });
    return (
        <div className='App'>
            <Header />
            <Main />
        </div>
    );
}

export default App;
