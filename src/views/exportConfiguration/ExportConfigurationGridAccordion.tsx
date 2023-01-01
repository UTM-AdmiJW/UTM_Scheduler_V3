import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import ExportConfigurationCard from "./ExportConfigurationCard";
import HookFormSelect from "../../components/form/HookFormSelect";

import type { Control } from "react-hook-form";
import type { ITimetableExportConfig } from "../../model/domain/ITimetableExportConfig";

import { TimetableWeekendType } from "../../enums/TimetableWeekendType";

import { MdExpandMore } from "react-icons/md";
import { AiOutlineTable } from "react-icons/ai";

import { enumToMenuItem, hoursToMenuItem } from "../../util/utils";
import HookFormSwitch from "../../components/form/HookFormSwitch";



interface IExportConfigurationGridAccordionProps {
    control: Control<ITimetableExportConfig, any>;
}


export default function ExportConfigurationGridAccordion({ 
    control 
}: IExportConfigurationGridAccordionProps) {

    return <>
    <Accordion className="mb-3">

        <AccordionSummary expandIcon={ <MdExpandMore className='text-2xl' /> }>
            <h4 className='text-2xl font-medium'>
                <AiOutlineTable className='inline-block mr-2' />
                Grid
            </h4>
        </AccordionSummary>

        <AccordionDetails className='grid gap-3' sx={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 300px))' }}>
            
            {/* Weekend */}
            <ExportConfigurationCard
                title="Weekend"
                tooltip="Select the weekends. Some states, like Johor, have weekends on Fri/Sat instead of Sat/Sun."
            >
                <HookFormSelect
                    menuItems={ enumToMenuItem(TimetableWeekendType) }
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
                    <span>No</span>
                    <HookFormSwitch
                        hookFormProps={{
                            name: 'includeWeekends',
                            control,
                        }}
                        switchProps={{
                            color: 'primary',
                        }}
                    />
                    <span>Yes</span>
                </Box>
            </ExportConfigurationCard>

            {/* Starting time and Ending time */}
            <ExportConfigurationCard
                title="Time range"
                tooltip="Select the starting and ending time of your timetable."
            >
                <Box className='flex flex-col'>
                    <HookFormSelect
                        menuItems={ hoursToMenuItem() }
                        hookFormProps={{
                            name: 'visibleTimeRangeStart',
                            control,
                        }}
                        textFieldProps={{
                            label: 'Starting time',
                            size: 'small',
                            fullWidth: true,
                            required: true,
                        }}
                    />

                    <span className='my-3 text-center'>To</span>

                    <HookFormSelect
                        menuItems={ hoursToMenuItem() }
                        hookFormProps={{
                            name: 'visibleTimeRangeEnd',
                            control,
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