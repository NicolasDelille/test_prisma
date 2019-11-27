import React from 'react';
import Header from './components/layout/Header';
import Movies from './components/movies/Movies';
import { Provider } from './provider/movie-provider';
import './App.scss';

function App() {
    return (
        <Provider>
            <div className='App'>
                <Header />
                <Movies />
            </div>
        </Provider>
    );
}

export default App;
