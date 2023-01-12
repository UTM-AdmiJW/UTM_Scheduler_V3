import { MenuItem } from "@mui/material"
import React from "react";

import { convert24HourTo12Hour } from "./timeUtils";

import type { IMenuItem } from "../model/types/menuItem/IMenuItem";



/**
 * Utility functions that deal with creation of <MenuItem> elements
 */




/**
 * Converts an enum to an array of <MenuItem> for use in select fields of MUI
 * 
 * @param enumObj enum to convert to MenuItem
 * @returns array of <MenuItem>
 */
export function getMenuItemsfromIMenuItems<T extends number | string>(
    menuItems: IMenuItem<T>[]
): React.ReactElement[] {
    
    return menuItems.map(({ label, value }, i) => (
        <MenuItem key={i} value={value}>
            { label }
        </MenuItem>
    ));
}



// If you have a string only enum, you can use this to use the value of the enum as the MenuItem label.
/**
 * Converts a string enum to an array of <MenuItem> for use in select fields of MUI
 * 
 * @param enumObj string only enum to convert to MenuItem
 * @returns array of IMenuItem<T>
 */
export function stringEnumToIMenuItems<T extends string>(enumObj: Record<string, T>): IMenuItem<T>[] {
    return Object
        .entries<T>(enumObj)
        .map(([key, value]) => ({ 
            label: value, value: value
        }));
}



export const hoursMenuItem = Array.from(Array(24).keys()).map((hour) => (
    <MenuItem key={hour} value={hour}>
        { convert24HourTo12Hour(hour) }
        { hour >= 8 && hour <= 20 && ` - (${(hour - 6).toString().padStart(2, '0')})` }
    </MenuItem>
));
    