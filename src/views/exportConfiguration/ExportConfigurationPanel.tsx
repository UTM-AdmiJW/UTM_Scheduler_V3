import { useEffect } from "react";
import { Alert, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAlert } from "../../hooks/useAlert";

import type { ITimetable } from "../../model/domain/ITimetable";
import type { ITimetableExportConfig } from "../../model/domain/ITimetableExportConfig";

import ExportConfigurationAppearanceAccordion from "./ExportConfigurationAppearanceAccordion";
import ExportConfigurationGridAccordion from "./ExportConfigurationGridAccordion";
import ExportConfigurationSizingAccordion from "./ExportConfigurationSizingAccordion";

import { updateTimetableExportConfig } from "../../redux/timetableSlice";





export default function ExportConfigurationPanel({ timetable }: { timetable: ITimetable }) {

    const dispatch = useDispatch();
    const { alertSuccess, alertInfo } = useAlert();

    const { control, handleSubmit, formState: { isDirty }, reset } = useForm<ITimetableExportConfig>({
        defaultValues: timetable.exportConfig
    });


    // When timetable export config changes, reset the form to the new values
    useEffect(() => {
        reset(timetable.exportConfig);
    }, [timetable.exportConfig, reset]);



    const onSubmit = (data: ITimetableExportConfig) => {
        dispatch(updateTimetableExportConfig({ timetableId: timetable.id, exportConfig: data }));
        alertSuccess('Export configuration saved successfully.');
    }

    const onReset = () => {
        reset(timetable.exportConfig);
        alertInfo('Export configuration resetted.');
    }


    return <>
        <Alert severity='warning' className={`transition-all ${isDirty? 'mb-5 scale-100': 'p-0 h-0 scale-0'}`}>
            You have unsaved changes. Click <strong>Save</strong> to save your changes.
        </Alert>

        <form onSubmit={ handleSubmit(onSubmit) }>
            <ExportConfigurationAppearanceAccordion control={control} />
            <ExportConfigurationGridAccordion control={control} />
            <ExportConfigurationSizingAccordion control={control} />

            <Box className='mt-5 flex gap-4 justify-end'>
                <Button type='submit' variant='contained' color='success' disabled={ !isDirty }>Save</Button>
                <Button type='reset' variant='outlined' color='warning' disabled={ !isDirty } onClick={onReset}>Reset</Button>
            </Box>
        </form>
    </>
}