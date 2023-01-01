import { Switch } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

import type { SwitchProps } from "@mui/material";

// A reusable react-hook-form combined with MUI's <Switch> component.



export interface IHookFormSwitchProps<T extends FieldValues> {
    hookFormProps: UseControllerProps<T>;
    switchProps: SwitchProps;
}


export default function HookFormSwitch<T extends FieldValues>({
    hookFormProps, 
    switchProps,
}: IHookFormSwitchProps<T>) {

    const { field } = useController(hookFormProps);

    return <>
        <Switch
            {...switchProps}
            {...field}
        />
    </>
}