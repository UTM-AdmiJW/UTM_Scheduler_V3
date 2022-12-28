import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import { store } from './redux/store';
import Router from './routes/Router';
import './style/index.css';
import { muiThemeOptions } from './style/MUITheme';
import { DialogContextProvider } from './context/DialogContext';


const queryClient = new QueryClient();


// Encapsulate all top level components available throughout whole application here:
function Application() {
    return <>
        {/* Redux store provider */}
        <Provider store={store}>
        {/* React Query client provider */}
        <QueryClientProvider client={queryClient}>
        {/* Material UI Custom Theme Provider */}
        <ThemeProvider theme={muiThemeOptions}>
        {/* Notistack Snackbar provider */}
        <SnackbarProvider anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
        {/* Dialog Context Provider */}
        <DialogContextProvider>
            <Router />
        </DialogContextProvider>
        </SnackbarProvider>
        </ThemeProvider>
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