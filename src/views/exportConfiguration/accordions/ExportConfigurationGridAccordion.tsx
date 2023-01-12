import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExportConfigurationCard from "./ExportConfigurationCard";
import HookFormTextField from "../../../components/form/HookFormTextField";

import type { Control } from "react-hook-form";
import type { ITimetableExportConfig } from "../../../model/domain/ITimetableExportConfig";

import { MdExpandMore, MdOutlineGridOn } from "react-icons/md";




interface IExportConfigurationGridAccordionProps {
    control: Control<ITimetableExportConfig, any>;
}


export default function ExportConfigurationGridAccordion({ 
    control 
}: IExportConfigurationGridAccordionProps) {

    return <>
    <Accordion className="mb-3">
        
        <AccordionSummary expandIcon={ <MdExpandMore className='text-2xl' /> }>
            <Typography className='text-xl font-light'>
                <MdOutlineGridOn className='inline-block mr-3' />
                Grid
            </Typography>
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

        </AccordionDetails>
    </Accordion>
    </>
}