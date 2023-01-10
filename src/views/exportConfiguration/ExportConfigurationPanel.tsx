import { useEffect } from "react";
import { Alert, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAlert } from "../../hooks/useAlert";
import { useTimetableRedux } from "../../hooks/redux/useTimetableRedux";

import type { ITimetable } from "../../model/domain/ITimetable";
import type { ITimetableExportConfig } from "../../model/domain/ITimetableExportConfig";

import ExportConfigurationAppearanceAccordion from "./ExportConfigurationAppearanceAccordion";
import ExportConfigurationGridAccordion from "./ExportConfigurationGridAccordion";
import ExportConfigurationSizingAccordion from "./ExportConfigurationSizingAccordion";

// TODO: Testing import please remove
import { useDialog } from "../../hooks/useDialog";
import RenderTimetableDialog from "../renderTimetable/RenderTimetableDialog";



export default function ExportConfigurationPanel({ timetable }: { timetable: ITimetable }) {

    const { timetableActions: { updateTimetableExportConfig } } = useTimetableRedux();
    const { alertSuccess, alertInfo, alertError } = useAlert();

    const { control, handleSubmit, formState: { isDirty }, reset, getValues } = useForm<ITimetableExportConfig>({
        defaultValues: timetable.exportConfig
    });


    // Testing purpose, remove this.
    const { openDialog } = useDialog();
    //




    // When timetable export config changes, reset the form to the new values
    useEffect(() => {
        reset(timetable.exportConfig);
    }, [timetable.exportConfig, reset]);



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
        <Alert severity='warning' className={`transition-all ${isDirty? 'mb-5 scale-100': 'p-0 h-0 scale-0'}`}>
            You have unsaved changes. Click <strong>Save</strong> to save your changes.
        </Alert>

        <form onSubmit={ handleSubmit(onSubmit, onInvalid) }>
            <ExportConfigurationAppearanceAccordion control={control} />
            <ExportConfigurationGridAccordion control={control} getValues={getValues} />
            <ExportConfigurationSizingAccordion control={control} />

            <Box className='mt-5 flex gap-4 justify-end'>
                <Button type='submit' variant='contained' color='success' disabled={ !isDirty }>Save</Button>
                <Button type='reset' variant='outlined' color='warning' disabled={ !isDirty } onClick={onReset}>Reset</Button>
            </Box>
        </form>



        {/* TODO: Testing Purpose remove this. */}
        <Button variant='contained' onClick={() => openDialog(<RenderTimetableDialog timetable={timetable} />)}>Render Timetable</Button>
    </>
}