import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import Router from './routes/Router';


import './style/index.css';



ReactDOM
    .createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <React.StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
        </React.StrictMode>
    );