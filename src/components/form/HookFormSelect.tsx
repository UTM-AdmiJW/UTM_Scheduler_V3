import { MenuItem, TextField } from "@mui/material";
import { FieldValues, useController } from "react-hook-form";


import type { IHookFormTextFieldProps } from "./HookFormTextField";


// A reusable react-hook-form combined with MUI's <TextField> component, but select variant.
// Extends from IHookFormTextFieldProps, with menuItems.


export interface IHookFormSelectProps<T extends FieldValues> extends IHookFormTextFieldProps<T> {
    menuItems: { value: any, label: string }[];
}




// Converts { value: any, label: string }[] to MenuItem[]
function labelValuesToMenuItem(labelValues: { value: any, label: string }[]) {
    return labelValues.map(({ value, label }) => {
        return <MenuItem key={value} value={value}>{ label }</MenuItem>
    });
}


export default function HookFormSelect<T extends FieldValues>({
    hookFormProps, 
    textFieldProps,
    menuItems
}: IHookFormSelectProps<T>) {

    const { field, fieldState: { error } } = useController(hookFormProps);

    return <>
        <TextField
            {...textFieldProps}
            {...field}
            select
            error={ Boolean(error) }
            helperText={error?.message}
        >
            { labelValuesToMenuItem(menuItems) }
        </TextField>
    </>
}