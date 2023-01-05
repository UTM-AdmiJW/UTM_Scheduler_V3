import { DialogContent, Step, StepLabel, Stepper } from "@mui/material";

import { useRegisteredCourses } from "../../hooks/useRegisteredCourses";

import { RegisteredCoursesProgress } from "../../enums/RegisteredCoursesProgress";



export default function RegisteredCoursesStepper() {
    
    const { registeredCoursesState } = useRegisteredCourses();

    return <>
    <DialogContent 
        className='py-3 bg-gray-100 flex items-center' 
        sx={{ minHeight: '75px', maxHeight: '125px' }}
    >
        <Stepper activeStep={ registeredCoursesState.progress }>
            <Step key={RegisteredCoursesProgress.LOGIN} >
                <StepLabel>Login</StepLabel>
            </Step>

            <Step key={RegisteredCoursesProgress.SELECT_REGISTERED_SUBJECT} >
                <StepLabel>Select Subject</StepLabel>
            </Step>

            <Step key={RegisteredCoursesProgress.CONFIRMATION} >
                <StepLabel>Confirm</StepLabel>
            </Step>
        </Stepper>
    </DialogContent>
    </>
}