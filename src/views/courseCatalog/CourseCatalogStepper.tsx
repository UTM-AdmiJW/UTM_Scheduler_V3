import { DialogContent, Step, StepLabel, Stepper } from "@mui/material";

import { useCourseCatalogContext } from "../../hooks/context/useCourseCatalogContext";

import { CourseCatalogProgress } from "../../enums/";



export default function CourseCatalogStepper() {
    
    const { courseCatalog } = useCourseCatalogContext();

    return <>
    <DialogContent 
        className='py-3 bg-gray-100 flex items-center' 
        sx={{ minHeight: '75px', maxHeight: '125px' }}
    >
        <Stepper activeStep={ courseCatalog.progress }>

            <Step key={CourseCatalogProgress.SELECT_SESSION_SEMESTER} >
                <StepLabel>Session Semester</StepLabel>
            </Step>

            <Step key={CourseCatalogProgress.SELECT_SUBJECT} >
                <StepLabel>Course</StepLabel>
            </Step>

            <Step key={CourseCatalogProgress.SELECT_SECTION} >
                <StepLabel>Section</StepLabel>
            </Step>

            <Step key={CourseCatalogProgress.CONFIRMATION} >
                <StepLabel>Confirm</StepLabel>
            </Step>
            
        </Stepper>
    </DialogContent>
    </>
}