import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExportConfigurationCard from "./ExportConfigurationCard";
import HookFormSelect from "../../../components/form/HookFormSelect";

import { TimetableThemeMenuItems, TimetableOrientationMenuItems } from "../../../enums";
import type { Control } from "react-hook-form";
import type { ITimetableExportConfig } from "../../../model/domain/ITimetableExportConfig";

import { MdExpandMore, MdPalette } from "react-icons/md";

import { getMenuItemsfromIMenuItems } from "../../../util/menuItemUtils";



interface IExportConfigurationAppearanceAccordionProps {
    control: Control<ITimetableExportConfig, any>;
}


export default function ExportConfigurationAppearanceAccordion({ 
    control 
}: IExportConfigurationAppearanceAccordionProps) {

    return <>
    <Accordion className="mb-3">
        
        <AccordionSummary expandIcon={ <MdExpandMore className='text-xl' /> }>
            <Typography className='text-lg font-light'>
                <MdPalette className='inline-block mr-3' />
                Appearance
            </Typography>
        </AccordionSummary>

        <AccordionDetails className='grid gap-3' sx={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 300px))' }}>
            {/* Theme */}
            <ExportConfigurationCard
                title="Theme"
                tooltip="Select a preset theme (predefined timetable background, font style...)"
            >
                <HookFormSelect
                    hookFormProps={{
                        name: 'theme',
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                    }}
                    menuItems={ getMenuItemsfromIMenuItems(TimetableThemeMenuItems) }
                />
            </ExportConfigurationCard>


            {/* Timetable Orientation */}
            <ExportConfigurationCard
                title="Orientation"
                tooltip="Select the export orientation (horizontal/vertical)"
            >
                <HookFormSelect
                    hookFormProps={{
                        name: 'orientation',
                        control,
                    }}
                    textFieldProps={{
                        size: 'small',
                        fullWidth: true,
                        required: true,
                    }}
                    menuItems={ getMenuItemsfromIMenuItems(TimetableOrientationMenuItems) }
                />
            </ExportConfigurationCard>
            
        </AccordionDetails>
    </Accordion>
    </>
}