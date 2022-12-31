import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITimetable } from "../model/ITimetable";
import { IStudent } from '../model/IStudent';
import createBlankTimetable from "../model/createBlankTimetable";






export interface ITimetableSliceState {
    timetables: {
        [id: string]: ITimetable;
    }
}


const initialState: ITimetableSliceState = {
    timetables: {}
};




export const timetableSlice = createSlice({
    name: 'timetable',
    initialState,
    reducers: {
        addBlankTimetable: (state, action: PayloadAction<IStudent>) => {
            const blankTimetable = createBlankTimetable();
            blankTimetable.createdBy = action.payload;
            state.timetables[blankTimetable.id] = blankTimetable;
        },
        deleteTimetable(state, action: PayloadAction<string>) {
            delete state.timetables[action.payload];
        }
    }
});


// Export actions and reducers
export default timetableSlice.reducer;

export const { 
    addBlankTimetable,
    deleteTimetable,
} = timetableSlice.actions;