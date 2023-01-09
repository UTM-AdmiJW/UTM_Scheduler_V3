import { MenuItem } from "@mui/material"
import React from "react";

import { convert24HourTo12Hour } from "./timetableUtils";



/**
 * Utility functions that deal with creation of <MenuItem> elements
 */




/**
 * Converts an enum to an array of <MenuItem> for use in select fields of MUI
 * 
 * @param enumObj enum to convert to MenuItem
 * @returns array of <MenuItem>
 */
export function enumToMenuItem<IEnum>(
    enumObj: Record<string, any>
): React.ReactElement[] {
    
    return Object.entries(enumObj)
        .map(([value, label]) => (
            <MenuItem key={value} value={label}>{ label }</MenuItem>
        ));
}



export const hoursMenuItem = Array.from(Array(24).keys()).map((hour) => (
    <MenuItem key={hour} value={hour}>
        { convert24HourTo12Hour(hour) }
    </MenuItem>
));
    