import { TextField, TextFieldProps } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

// A reusable react-hook-form combined with MUI's <TextField> component.



export interface IHookFormTextFieldProps<T extends FieldValues> {
    hookFormProps: UseControllerProps<T>;
    textFieldProps: TextFieldProps;
}


export default function HookFormTextField<T extends FieldValues>({
    hookFormProps, 
    textFieldProps,
}: IHookFormTextFieldProps<T>) {

    const { field, fieldState: { error } } = useController(hookFormProps);

    return <>
        <TextField
            {...textFieldProps}
            {...field}
            error={ Boolean(error) }
            helperText={error?.message}
        />
    </>
}