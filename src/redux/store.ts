import { configureStore } from '@reduxjs/toolkit';

import studentReducer from './studentSlice';


export const store = configureStore({
    reducer: {
        student: studentReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

