import { createSlice, PayloadAction } from "@reduxjs/toolkit";



/**
 * A redux slice that store general application states. For example, whether there is unsaved data in the application,
 * so that we can prompt the user to save before leaving the page.
 * 
 */

export interface IApplicationSlice {
    hasUnsavedData: boolean;
}


const initialState: IApplicationSlice = {
    hasUnsavedData: false,
};


export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setHasUnsavedData: (state, action: PayloadAction<boolean>) => {
            state.hasUnsavedData = action.payload;
        },
    }
});


// Export actions and reducers
export const actions = applicationSlice.actions;
export default applicationSlice.reducer;