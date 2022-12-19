import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import Router from './routes/Router';
import { QueryClient, QueryClientProvider } from 'react-query';

import './style/index.css';

const queryClient = new QueryClient();


// Encapsulate all top level components available throughout whole application here:
function Application() {
    return <>
        <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
        </Provider>
    </>
}



ReactDOM
    .createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <React.StrictMode>
            <Application />
        </React.StrictMode>
    );