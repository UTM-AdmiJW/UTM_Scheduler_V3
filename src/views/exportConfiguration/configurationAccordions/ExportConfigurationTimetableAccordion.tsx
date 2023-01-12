import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExportConfigurationCard from "./ExportConfigurationCard";
import HookFormSelect from "../../../components/form/HookFormSelect";
import HookFormSwitch from "../../../components/form/HookFormSwitch";

import { TimetableWeekendTypeMenuItems } from "../../../enums";
import type { Control, UseFormGetValues } from "react-hook-form";
import type { ITimetableExportConfig } from "../../../model/domain/ITimetableExportConfig";

import { MdExpandMore, MdTableChart } from "react-icons/md";

import { getMenuItemsfromIMenuItems, hoursMenuItem } from "../../../util/menuItemUtils";



interface IExportConfigurationTimetableAccordionProps {
    control: Control<ITimetableExportConfig, any>;
    getValues: UseFormGetValues<ITimetableExportConfig>;
};


export default function ExportConfigurationTimetableAccordion({ 
    control, 
    getValues,
}: IExportConfigurationTimetableAccordionProps) {


    const validateVisibleTimeRange = ()=> {
        const beginTime = getValues(`visibleTimeRangeStart`);
        const endTime = getValues(`visibleTimeRangeEnd`);
        if (beginTime >= endTime) return "Visible time range start time must be before end time";
    }

    return <>
    <Accordion className="mb-3">

        <AccordionSummary expandIcon={ <MdExpandMore className='text-2xl' /> }>
            <Typography className='text-xl font-light'>
                <MdTableChart className='inline-block mr-3' />
                Timetable
            </Typography>
        </AccordionSummary>

        <AccordionDetails className='grid gap-3' sx={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 300px))' }}>
            
            {/* Weekend */}
            <ExportConfigurationCard
                title="Weekend"
                tooltip="Select the weekends. Some states, like Johor, have weekends on Fri/Sat instead of Sat/Sun."
            >
                <HookFormSelect
                    menuItems={ getMenuItemsfromIMenuItems(TimetableWeekendTypeMenuItems) }
                    hookFormProps={{
                        name: 'weekendType',
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                    }}
                />
            </ExportConfigurationCard>

            {/* Include Weekend? */}
            <ExportConfigurationCard
                title="Include Weekend?"
                tooltip="If yes, weekends will be drawn to your timetable."
            >
                <Box className='flex gap-2 items-center text-gray-400'>
                    <Typography>No</Typography>
                    <HookFormSwitch
                        hookFormProps={{
                            name: 'includeWeekends',
                            control,
                        }}
                        switchProps={{
                            color: 'primary',
                        }}
                    />
                    <Typography>Yes</Typography>
                </Box>
            </ExportConfigurationCard>

            {/* Starting time and Ending time */}
            <ExportConfigurationCard
                title="Time range"
                tooltip="Select the starting and ending time of your timetable."
            >
                <Box className='flex flex-col'>
                    <HookFormSelect
                        menuItems={ hoursMenuItem }
                        hookFormProps={{
                            name: 'visibleTimeRangeStart',
                            control,
                            rules: { validate: validateVisibleTimeRange }
                        }}
                        textFieldProps={{
                            label: 'Starting time',
                            size: 'small',
                            fullWidth: true,
                            required: true,
                        }}
                    />

                    <Typography className='my-3 text-center'>To</Typography>

                    <HookFormSelect
                        menuItems={ hoursMenuItem }
                        hookFormProps={{
                            name: 'visibleTimeRangeEnd',
                            control,
                            rules: { validate: validateVisibleTimeRange }
                        }}
                        textFieldProps={{
                            label: 'End time',
                            size: 'small',
                            fullWidth: true,
                            required: true,
                        }}
                    />
                </Box>
            </ExportConfigurationCard>

        </AccordionDetails>
    </Accordion>
    </>
}