import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITimetable } from "../model/ITimetable";
import { IStudent } from '../model/IStudent';
import createBlankTimetable from "../model/generators/createBlankTimetable";






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
        },
        updateTimetableName(state, action: PayloadAction<{ id: string, timetableName: string }>) {
            const { id, timetableName } = action.payload;
            state.timetables[id].timetableName = timetableName;
            state.timetables[id].lastModifiedDate = new Date().toLocaleDateString();
        },
        updateTimetableDescription(state, action: PayloadAction<{ id: string, description: string }>) {
            const { id, description } = action.payload;
            state.timetables[id].description = description;
            state.timetables[id].lastModifiedDate = new Date().toLocaleDateString();
        },

    }
});


// Export actions and reducers
export default timetableSlice.reducer;

export const { 
    addBlankTimetable,
    deleteTimetable,
    updateTimetableName,
    updateTimetableDescription,
} = timetableSlice.actions;