import { MenuItem } from "@mui/material"


import { convert24HourTo12Hour } from "./timetableUtils";


// Utility functions that deal with convertion to menu items <option> or <MenuItem>


/**
 * Converts an enum to an array of <MenuItem> for use in <Select> component of MUI.
 * 
 * @param enumObj enum to convert to MenuItem
 * @returns array of <MenuItem>
 */
export function enumToMenuItem<T extends Record<string, string>>(
    enumObj: T
): React.ReactElement[] {
    
    // Since we set properties using prop = enum.VALUE, we need to use label as the value.
    return Object.entries(enumObj).map( ([value, label]) => (
        <MenuItem key={value} value={label}>{ label }</MenuItem>
    ));
}



/**
 * Converts an enum to an array of <option> for use in <select> component of HTML.
 * 
 * @param enumObj The enum to convert to <option> for use in <select> component of HTML.
 * @returns array of <option> for use in <select> component of HTML.
 */
export function enumToOptions<T extends Record<string, string>>(
    enumObj: T
): React.ReactElement[] {
    return Object.entries(enumObj).map( ([value, label]) => (
        <option key={value} value={label}>{ label }</option>
    ));
}



/**
 * Returns an array of <MenuItem> for hours 0-23 in 12-hour format for use in <Select> component of MUI.
 * 
 * @returns array of <MenuItem> for hours 0-23
 */
export function hoursToMenuItem(): React.ReactElement[] {
    return Array
        .from(Array(24).keys())
        .map((hour) => (
            <MenuItem key={hour} value={hour}>
                { convert24HourTo12Hour(hour) }
            </MenuItem>
        ));
}


