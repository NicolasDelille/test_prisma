import React from 'react';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import { Provider } from './provider/movie-provider';
import './App.scss';

function App() {
    return (
        <Provider>
            <div className='App'>
                <Header />
                <Main />
            </div>
        </Provider>
    );
}

export default App;
