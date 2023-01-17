import { Alert, Box, Button, Typography } from "@mui/material";
import ExportConfigurationAppearanceAccordion from "./ExportConfigurationAppearanceAccordion";
import ExportConfigurationFontSizeAccordion from "./ExportConfigurationFontSizeAccordion";
import ExportConfigurationGridAccordion from "./ExportConfigurationGridAccordion";
import ExportConfigurationTimetableAccordion from "./ExportConfigurationTimetableAccordion";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "../../../hooks/useAlert";
import { useTimetableRedux } from "../../../hooks/redux/useTimetableRedux";
import { useApplicationRedux } from "../../../hooks/redux/useApplicationRedux";

import { RiSettings3Line } from "react-icons/ri";

import type { ITimetable } from "../../../model/domain/ITimetable";
import type { ITimetableExportConfig } from "../../../model/domain/ITimetableExportConfig";



export default function ExportConfiguration({ timetable }: { timetable: ITimetable}) {

    const { timetableActions: { updateTimetableExportConfig } } = useTimetableRedux();
    const { applicationActions: { setHasUnsavedData } } = useApplicationRedux();
    const { alertSuccess, alertInfo, alertError } = useAlert();

    const { control, handleSubmit, formState: { isDirty }, reset, getValues } = useForm<ITimetableExportConfig>({
        defaultValues: timetable.exportConfig
    });


    useEffect(() => {
        reset(timetable.exportConfig);
    }, [timetable.exportConfig, reset]);

    useEffect(()=> {
        setHasUnsavedData(isDirty);
    }, [isDirty, setHasUnsavedData]);



    const onSubmit = (data: ITimetableExportConfig) => {
        updateTimetableExportConfig({ timetableId: timetable.id, exportConfig: data });
        alertSuccess('Export configuration saved successfully.');
    }

    const onInvalid = ()=> {
        alertError("Invalid fields. Please check your inputs.");
    }

    const onReset = () => {
        reset(timetable.exportConfig);
        alertInfo('Export configuration resetted.');
    }
    

    return <>
        <Typography className='font-light text-2xl my-3'>
            <RiSettings3Line className='inline-block mr-2' />
            Export Settings
        </Typography>

        <Alert severity='warning' className={`transition-all ${isDirty? 'mb-5 scale-100': 'p-0 h-0 scale-0'}`}>
            You have unsaved changes. Click <strong>Save</strong> to save your changes.
        </Alert>

        <form onSubmit={ handleSubmit(onSubmit, onInvalid) }>
            <ExportConfigurationAppearanceAccordion control={control} />
            <ExportConfigurationTimetableAccordion control={control} getValues={getValues} />
            <ExportConfigurationGridAccordion control={control} />
            <ExportConfigurationFontSizeAccordion control={control} />

            <Box className='mt-5 flex gap-4 justify-end'>
                <Button type='submit' variant='contained' color='success' disabled={ !isDirty }>Save</Button>
                <Button type='reset' variant='outlined' color='warning' disabled={ !isDirty } onClick={onReset}>Reset</Button>
            </Box>
        </form>
    </>
}