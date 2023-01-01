import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExportConfigurationSelectControl from "./ExportConfigurationSelectControl";

import type { ITimetable } from "../../model/ITimetable";
import type { ITimetableExportConfig } from "../../model/ITimetableExportConfig";

import { TimetableTheme } from "../../enums/TimetableTheme";
import { TimetableOrientation } from "../../enums/TimetableOrientation";
import { TimetableWeekendType } from "../../enums/TimetableWeekendType";


import { MdPalette, MdExpandMore } from "react-icons/md";
import { AiOutlineTable } from "react-icons/ai";




// A quick utility function to convert enums into { value: string, label: string }[]
function enumToValueLabel<T extends Record<string, string>>(enumObj: T) {
    return Object.entries(enumObj).map( ([key, value]) => (
        { value: key, label: value }
    ))
}



export default function ExportConfigurationPanel({ timetable }: { timetable: ITimetable }) {

    const dispatch = useDispatch();

    const { control, handleSubmit } = useForm<ITimetableExportConfig>({
        defaultValues: timetable.exportConfig
    });


    return <>

        {/* Appearance settings */}
        <Accordion className="mb-3">
        <AccordionSummary expandIcon={ <MdExpandMore className='text-2xl' /> }>
            <h4 className='text-2xl font-medium'>
                <MdPalette className='inline-block mr-2' />
                Appearance
            </h4>
        </AccordionSummary>
        <AccordionDetails className='grid gap-3' sx={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {/* Theme */}
            <ExportConfigurationSelectControl
                tooltip="Select the preset theme for the exported timetable."
                menuItems={ enumToValueLabel(TimetableTheme) }
                hookFormProps={{
                    name: 'theme',
                    control,
                }}
                textFieldProps={{
                    label: 'Theme',
                    size: 'small',
                    fullWidth: true,
                    required: true,
                }}
            />

            {/* Timetable Orientation */}
            <ExportConfigurationSelectControl
                tooltip="Select the export orientation for the timetable."
                menuItems={ enumToValueLabel(TimetableOrientation) }
                hookFormProps={{
                    name: 'orientation',
                    control,
                }}
                textFieldProps={{
                    label: 'Orientation',
                    size: 'small',
                    fullWidth: true,
                    required: true,
                }}
            />
        </AccordionDetails>
        </Accordion>


        {/* Slot Settings */}
        <Accordion className="mb-3">
        <AccordionSummary expandIcon={ <MdExpandMore className='text-2xl' /> }>
            <h4 className='text-2xl font-medium'>
                <AiOutlineTable className='inline-block mr-2' />
                Slots
            </h4>
        </AccordionSummary>
        <AccordionDetails className='grid gap-3' sx={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {/* Weekend */}
            <ExportConfigurationSelectControl
                tooltip="Select the weekends. Some states, like Johor, have weekends on Fri/Sat instead of Sat/Sun."
                menuItems={ enumToValueLabel(TimetableWeekendType) }
                hookFormProps={{
                    name: 'weekendType',
                    control,
                }}
                textFieldProps={{
                    label: 'Weekend',
                    size: 'small',
                    fullWidth: true,
                    required: true,
                }}
            />

            {/* Include Weekend? */}
            <ExportConfigurationSelectControl
                tooltip="If yes, weekends will be drawn to your timetable."
                menuItems={ [{ value: true, label: 'Yes' }, { value: false, label: 'No' }] }
                hookFormProps={{
                    name: 'includeWeekends',
                    control,
                }}
                textFieldProps={{
                    label: 'Include weekends?',
                    size: 'small',
                    fullWidth: true,
                    required: true,
                }}
            />
        </AccordionDetails>
        </Accordion>
    </>
}