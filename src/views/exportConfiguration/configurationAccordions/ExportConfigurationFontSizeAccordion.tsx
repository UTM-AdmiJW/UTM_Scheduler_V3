import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExportConfigurationCard from "./ExportConfigurationCard";
import HookFormNumberField from "../../../components/form/HookFormNumberField";

import type { Control } from "react-hook-form";
import type { ITimetableExportConfig } from "../../../model/domain/ITimetableExportConfig";

import { MdExpandMore, MdOutlineTextFields } from "react-icons/md";




interface IExportConfigurationFontSizeAccordionProps {
    control: Control<ITimetableExportConfig, any>;
}


export default function ExportConfigurationFontSizeAccordion({ 
    control 
}: IExportConfigurationFontSizeAccordionProps) {

    return <>
    <Accordion className="mb-3">
        
        <AccordionSummary expandIcon={ <MdExpandMore className='text-2xl' /> }>
            <Typography className='text-xl font-light'>
                <MdOutlineTextFields className='inline-block mr-3' />
                Font Size
            </Typography>
        </AccordionSummary>

        <AccordionDetails className='grid gap-3' sx={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 300px))' }}>
            
            {/* Day of week label indicator font size */}
            <ExportConfigurationCard
                title="Day of week label indicator"
                tooltip="The font size of the day of week label indicator on the top left cell"
            >
                <HookFormNumberField
                    hookFormProps={{
                        name: 'fontSizeDayOfWeekLabelIndiciator',
                        rules: { required: true, min: { value: 0, message: "Value must be non-negative"} },
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                        type: 'number',
                        InputProps: { 
                            inputProps: { min: 0, },
                            endAdornment: <Box component='span' sx={{ ml: 1 }}>px</Box> 
                        }
                    }}
                />
            </ExportConfigurationCard>

            {/* Time label indicator font size */}
            <ExportConfigurationCard
                title="Time label indicator"
                tooltip="The font size of the time label indicator on the top left cell"
            >
                <HookFormNumberField
                    hookFormProps={{
                        name: 'fontSizeTimeLabelIndiciator',
                        rules: { required: true, min: { value: 0, message: "Value must be non-negative"} },
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                        type: 'number',
                        InputProps: { 
                            inputProps: { min: 0, },
                            endAdornment: <Box component='span' sx={{ ml: 1 }}>px</Box> 
                        }
                    }}
                />
            </ExportConfigurationCard>

            {/* Day of week labels font size */}
            <ExportConfigurationCard
                title="Day of week labels"
                tooltip="The font size of the day of week labels"
            >
                <HookFormNumberField
                    hookFormProps={{
                        name: 'fontSizeDayOfWeekLabel',
                        rules: { required: true, min: { value: 0, message: "Value must be non-negative"} },
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                        type: 'number',
                        InputProps: { 
                            inputProps: { min: 0, },
                            endAdornment: <Box component='span' sx={{ ml: 1 }}>px</Box> 
                        }
                    }}
                />
            </ExportConfigurationCard>

            {/* Time labels font size */}
            <ExportConfigurationCard
                title="Time labels"
                tooltip="The font size of the time labels"
            >
                <HookFormNumberField
                    hookFormProps={{
                        name: 'fontSizeTimeLabel',
                        rules: { required: true, min: { value: 0, message: "Value must be non-negative"} },
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                        type: 'number',
                        InputProps: { 
                            inputProps: { min: 0, },
                            endAdornment: <Box component='span' sx={{ ml: 1 }}>px</Box> 
                        }
                    }}
                />
            </ExportConfigurationCard>

            {/* Course name font size */}
            <ExportConfigurationCard
                title="Course name"
                tooltip="The font size of the course name"
            >
                <HookFormNumberField
                    hookFormProps={{
                        name: 'fontSizeCourseName',
                        rules: { required: true, min: { value: 0, message: "Value must be non-negative"} },
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                        type: 'number',
                        InputProps: { 
                            inputProps: { min: 0, },
                            endAdornment: <Box component='span' sx={{ ml: 1 }}>px</Box> 
                        }
                    }}
                />
            </ExportConfigurationCard>

            {/* Venue font size */}
            <ExportConfigurationCard
                title="Venue"
                tooltip="The font size of the venue"
            >
                <HookFormNumberField
                    hookFormProps={{
                        name: 'fontSizeVenue',
                        rules: { required: true, min: { value: 0, message: "Value must be non-negative"} },
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                        type: 'number',
                        InputProps: { 
                            inputProps: { min: 0, },
                            endAdornment: <Box component='span' sx={{ ml: 1 }}>px</Box> 
                        }
                    }}
                />
            </ExportConfigurationCard>

            {/* Lecturer font size */}
            <ExportConfigurationCard
                title="Lecturer"
                tooltip="The font size of the lecturer"
            >
                <HookFormNumberField
                    hookFormProps={{
                        name: 'fontSizeLecturer',
                        rules: { required: true, min: { value: 0, message: "Value must be non-negative"} },
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                        type: 'number',
                        InputProps: { 
                            inputProps: { min: 0, },
                            endAdornment: <Box component='span' sx={{ ml: 1 }}>px</Box> 
                        }
                    }}
                />
            </ExportConfigurationCard>

            {/* Course code font size */}
            <ExportConfigurationCard
                title="Course code"
                tooltip="The font size of the course code"
            >
                <HookFormNumberField
                    hookFormProps={{
                        name: 'fontSizeCourseCode',
                        rules: { required: true, min: { value: 0, message: "Value must be non-negative"} },
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                        type: 'number',
                        InputProps: { 
                            inputProps: { min: 0, },
                            endAdornment: <Box component='span' sx={{ ml: 1 }}>px</Box> 
                        }
                    }}
                />
            </ExportConfigurationCard>

        </AccordionDetails>
    </Accordion>
    </>
}