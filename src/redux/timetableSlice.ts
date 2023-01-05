import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { ITimetable } from "../model/domain/ITimetable";
import type { IStudent } from '../model/domain/IStudent';
import type { ITimetableExportConfig } from "../model/domain/ITimetableExportConfig";
import type { IEditableCourse } from "../model/domain/IEditableCourse";

import createBlankTimetable from "../model/modelGenerators/createBlankTimetable";
import createBlankEditableCourse from "../model/modelGenerators/createBlankEditableCourse";





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
        updateTimetableName(state, action: PayloadAction<{ timetableId: string, timetableName: string }>) {
            const { timetableId, timetableName } = action.payload;
            state.timetables[timetableId].timetableName = timetableName;
            
            state.timetables[timetableId].lastModifiedDate = new Date().toLocaleString();
        },
        updateTimetableDescription(state, action: PayloadAction<{ timetableId: string, description: string }>) {
            const { timetableId, description } = action.payload;
            state.timetables[timetableId].description = description;

            state.timetables[timetableId].lastModifiedDate = new Date().toLocaleString();
        },
        updateTimetableExportConfig(state, action: PayloadAction<{ timetableId: string, exportConfig: ITimetableExportConfig }>) {
            const { timetableId, exportConfig } = action.payload;
            state.timetables[timetableId].exportConfig = exportConfig;

            state.timetables[timetableId].lastModifiedDate = new Date().toLocaleString();
        },
        addBlankCourse(state, action: PayloadAction<{ timetableId: string }>) {
            const { timetableId } = action.payload;
            const blankEditableCourse = createBlankEditableCourse();
            state.timetables[timetableId].editableCourses[blankEditableCourse.id] = blankEditableCourse;

            state.timetables[timetableId].lastModifiedDate = new Date().toLocaleString();
        },
        deleteCourse(state, action: PayloadAction<{ timetableId: string, courseId: string }>) {
            const { timetableId, courseId } = action.payload;
            delete state.timetables[timetableId].editableCourses[courseId];

            state.timetables[timetableId].lastModifiedDate = new Date().toLocaleString();
        },
        addCourse(state, action: PayloadAction<{ timetableId: string, course: IEditableCourse }>) {
            const { timetableId, course } = action.payload;
            state.timetables[timetableId].editableCourses[course.id] = course;

            state.timetables[timetableId].lastModifiedDate = new Date().toLocaleString();
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

    addBlankCourse,
    deleteCourse,
    addCourse,
} = timetableSlice.actions;