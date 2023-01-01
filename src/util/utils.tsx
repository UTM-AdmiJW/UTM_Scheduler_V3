import { MenuItem } from "@mui/material"



export function enumToMenuItem<T extends Record<string, string>>(
    enumObj: T
): React.ReactElement[] {
    
    // Since we set properties using prop = enum.VALUE, we need to use label as the value.
    return Object.entries(enumObj).map( ([value, label]) => (
        <MenuItem key={value} value={label}>{ label }</MenuItem>
    ));
}


export function hoursToMenuItem(): React.ReactElement[] {
    return Array
        .from(Array(24).keys())
        .map((hour) => (
            <MenuItem key={hour} value={hour}>
                { (hour % 12 || 12) + ` ${ hour < 12? 'AM': 'PM' }` }
            </MenuItem>
        ));
}