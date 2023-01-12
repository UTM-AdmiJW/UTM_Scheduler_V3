import { TextField, TextFieldProps } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";



/**
 * Since html inputs only output string values, we have to explicitly parse the output type
 * to number, manually.
 * 
 * This is done by overriding the default onChange event handler provided by react-hook-form:
 * parse the int first before passing it into the default onChange event handler
 */



export interface IHookFormNumberFieldProps<T extends FieldValues> {
    hookFormProps: UseControllerProps<T>;
    textFieldProps: TextFieldProps;
}


export default function HookFormNumberField<T extends FieldValues>({
    hookFormProps, 
    textFieldProps,
}: IHookFormNumberFieldProps<T>) {

    const { field, fieldState: { error } } = useController(hookFormProps);


    return <>
        <TextField
            {...textFieldProps}
            {...field}
            onChange={(e)=> field.onChange( Number(e.target.value) )}
            type='number'
            error={ Boolean(error) }
            helperText={error?.message}
        />
    </>
}