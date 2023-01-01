
import { Paper } from "@mui/material";
import InfoTooltipButton from "../../components/form/InfoTooltipButton";
import HookFormSelect from "../../components/form/HookFormSelect";

import type { IHookFormSelectProps } from "../../components/form/HookFormSelect";
import type { FieldValues } from "react-hook-form";



export interface IExportConfigurationSelectProps<T extends FieldValues> extends IHookFormSelectProps<T> {
    tooltip?: string;
}



export default function ExportConfigurationSelectControl<T extends FieldValues>({
    tooltip,
    ...props
}: IExportConfigurationSelectProps<T>) {

    return <>
        <Paper variant='outlined' className='p-3 flex flex-col justify-between'>
            <p className='text-lg font-medium mb-5'>
                { props.textFieldProps.label }
                { tooltip && <InfoTooltipButton tooltip={tooltip} /> }
            </p>

            <HookFormSelect {...props} />
        </Paper>
    </>
}