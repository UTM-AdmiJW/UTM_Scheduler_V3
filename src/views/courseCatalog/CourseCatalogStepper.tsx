import { DialogContent, Step, StepLabel, Stepper } from "@mui/material";

import { useCourseCatalog } from "../../hooks/useCourseCatalog";

import { CourseCatalogProgress } from "../../enums/CourseCatalogProgress";



export default function CourseCatalogStepper() {
    
    const { courseCatalog } = useCourseCatalog();

    return <>
    <DialogContent 
        className='py-3 bg-gray-100 flex items-center' 
        sx={{ minHeight: '75px', maxHeight: '125px' }}
    >
        <Stepper activeStep={ courseCatalog.progress }>

            <Step key={CourseCatalogProgress.SELECT_SESSION_SEMESTER} >
                <StepLabel>Select Session Semester</StepLabel>
            </Step>

            <Step key={CourseCatalogProgress.SELECT_SUBJECT} >
                <StepLabel>Select Course</StepLabel>
            </Step>

            <Step key={CourseCatalogProgress.SELECT_SECTION} >
                <StepLabel>Select Section</StepLabel>
            </Step>

            <Step key={CourseCatalogProgress.CONFIRMATION} >
                <StepLabel>Confirmation</StepLabel>
            </Step>
            
        </Stepper>
    </DialogContent>
    </>
}