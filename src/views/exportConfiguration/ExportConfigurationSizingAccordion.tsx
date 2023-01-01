import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import ExportConfigurationCard from "./ExportConfigurationCard";
import HookFormTextField from "../../components/form/HookFormTextField";

import type { Control } from "react-hook-form";
import type { ITimetableExportConfig } from "../../model/domain/ITimetableExportConfig";

import { MdExpandMore, MdOutlinePhotoSizeSelectSmall } from "react-icons/md";




interface IExportConfigurationSizingAccordionProps {
    control: Control<ITimetableExportConfig, any>;
}


export default function ExportConfigurationSizingAccordion({ 
    control 
}: IExportConfigurationSizingAccordionProps) {

    return <>
    <Accordion className="mb-3">
        
        <AccordionSummary expandIcon={ <MdExpandMore className='text-2xl' /> }>
            <h4 className='text-2xl font-medium'>
                <MdOutlinePhotoSizeSelectSmall className='inline-block mr-2' />
                Sizing
            </h4>
        </AccordionSummary>

        <AccordionDetails className='grid gap-3' sx={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 300px))' }}>
            
            {/* Grid Width */}
            <ExportConfigurationCard
                title="Cell Width"
                tooltip="The width of each cell"
            >
                <HookFormTextField
                    hookFormProps={{
                        name: 'gridWidth',
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

            {/* Grid Height */}
            <ExportConfigurationCard
                title="Cell Height"
                tooltip="The height of each cell"
            >
                <HookFormTextField
                    hookFormProps={{
                        name: 'gridHeight',
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

            {/* Grid Gap */}
            <ExportConfigurationCard
                title="Cell Gap"
                tooltip="The gap between each cell"
            >
                <HookFormTextField
                    hookFormProps={{
                        name: 'gridGap',
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
                title="Font size: Course name"
                tooltip="The font size of the course name"
            >
                <HookFormTextField
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
                title="Font size: Venue"
                tooltip="The font size of the venue"
            >
                <HookFormTextField
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
                title="Font size: Lecturer"
                tooltip="The font size of the lecturer"
            >
                <HookFormTextField
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
                title="Font size: Course code"
                tooltip="The font size of the course code"
            >
                <HookFormTextField
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