import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";

export default function Update() {

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return <>
    
        
        <Paper variant="outlined" elevation={8}>
        <Accordion expanded={expanded === 'Welcome'} onChange={handleChange('Welcome')}>
            <AccordionSummary className='p-0'>
                <div>
            <Box className='bg-red-800 rounded p4 text-white flex items-center pl-4'>
            <Typography className='font-light text-xl'>Welcome</Typography>
                </Box>
                <Typography className='font-extralight text-sm pl-4 pt-2'>
                    2023-12-31
                </Typography>
            <Box className='p-4'>
                <Typography className='font-extralight text-m'>Welcome to the new version of the timetable app. This is a major update and there are a lot of changes. Please read the changelog below.</Typography>
                <Divider />

            </Box>
            </div>
            </AccordionSummary>
            <AccordionDetails className="p-0">
                <Box className='p-4'>
                <Typography className='font-extralight text-m'>
                    Thank you for using the timetable app. This is a major update and there are a lot of changes. Please read the changelog below.
                    If you have any questions or suggestions, please contact me at <b>Github</b>
                </Typography>
                </Box>
            </AccordionDetails>
            </Accordion>
        </Paper>
        
        
    </>
}