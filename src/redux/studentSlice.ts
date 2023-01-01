import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IStudent } from "../model/domain/IStudent";




export interface IStudentSliceState {
    isLoggedIn: boolean;
    student: IStudent;
}


const initialState: IStudentSliceState = {
    isLoggedIn: false,
    student: {
        name: 'Guest',
        matricNo: '',
    },
};


export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IStudent>) => {
            state.isLoggedIn = true;
            state.student = action.payload;
        },
        logout: () => {
            return initialState;
        },
    }
});


// Export actions and reducers
export const { login, logout } = studentSlice.actions;
export default studentSlice.reducer;