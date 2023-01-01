import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { ITimetable } from "../model/domain/ITimetable";
import type { IStudent } from '../model/domain/IStudent';
import type { ITimetableExportConfig } from "../model/domain/ITimetableExportConfig";

import createBlankTimetable from "../model/modelGenerators/createBlankTimetable";





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
            state.timetables[id].lastModifiedDate = new Date().toLocaleString();
        },
        updateTimetableDescription(state, action: PayloadAction<{ id: string, description: string }>) {
            const { id, description } = action.payload;
            state.timetables[id].description = description;
            state.timetables[id].lastModifiedDate = new Date().toLocaleString();
        },
        updateTimetableExportConfig(state, action: PayloadAction<{ id: string, exportConfig: ITimetableExportConfig }>) {
            const { id, exportConfig } = action.payload;
            state.timetables[id].exportConfig = exportConfig;
            state.timetables[id].lastModifiedDate = new Date().toLocaleString();
        }
    }
});


// Export actions and reducers
export default timetableSlice.reducer;

export const { 
    addBlankTimetable,
    deleteTimetable,
    updateTimetableName,
    updateTimetableDescription,
    updateTimetableExportConfig,
} = timetableSlice.actions;