import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import applicationReducer from './applicationSlice';
import studentReducer from './studentSlice';
import timetableReducer from './timetableSlice';



export const store = configureStore({
    reducer: {
        student: persistReducer({ key: 'student', storage }, studentReducer),
        timetable: persistReducer({ key: 'timetable', storage }, timetableReducer),
        application: applicationReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

