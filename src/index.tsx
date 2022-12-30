import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import { muiThemeOptions } from './style/MUITheme';
import BaseView from './views/BaseView';
import { DialogContextProvider } from './context/DialogContext';

import './style/index.css';




const queryClient = new QueryClient();


// Encapsulate all top level components available throughout whole application here:
function UTMSchedulerV3() {
    return <>
        {/* Redux store provider */}
        <Provider store={store}>
        {/* Redux Persist Gate */}
        <PersistGate loading={null} persistor={persistor}>
        {/* React Query client provider */}
        <QueryClientProvider client={queryClient}>
        {/* Material UI Custom Theme Provider */}
        <ThemeProvider theme={muiThemeOptions}>
        {/* Notistack Snackbar provider */}
        <SnackbarProvider maxSnack={5} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
        {/* Dialog Context Provider */}
        <DialogContextProvider>
        {/* Browser Router from React Router DOM */}
        <BrowserRouter>
        
            <BaseView />

        </BrowserRouter>
        </DialogContextProvider>
        </SnackbarProvider>
        </ThemeProvider>
        </QueryClientProvider>
        </PersistGate>
        </Provider>
    </>
}



ReactDOM
    .createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <React.StrictMode>
            <UTMSchedulerV3 />
        </React.StrictMode>
    );