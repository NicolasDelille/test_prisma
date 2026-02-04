import React from 'react';
import Header from './components/layout/Header';
import Movies from './components/movies/Movies';
import { Provider } from './provider/movie-provider';
import './App.scss';

function App() {
    return (
        <Provider>
            <div className='App'>
                <div className="wrapper">
                    <Header />
                    <div className="content">
                        <Movies />
                    </div>
                </div>
            </div>
        </Provider>
    );
}

export default App;
