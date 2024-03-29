import { DialogContent, Step, StepLabel, Stepper } from "@mui/material";

import { useRegisteredCoursesContext } from "../../hooks/context/useRegisteredCoursesContext";

import { RegisteredCoursesProgress } from "../../enums/";



export default function RegisteredCoursesStepper() {
    
    const { registeredCoursesState } = useRegisteredCoursesContext();

    return <>
    <DialogContent 
        className='py-3 bg-gray-100 flex items-center' 
        sx={{ minHeight: '75px', maxHeight: '125px' }}
    >
        <Stepper activeStep={ registeredCoursesState.progress }>
            <Step key={RegisteredCoursesProgress.LOGIN} >
                <StepLabel>Login</StepLabel>
            </Step>

            <Step key={RegisteredCoursesProgress.SELECT_SESSIONSEMESTER} >
                <StepLabel>Select Session/Semester</StepLabel>
            </Step>

            <Step key={RegisteredCoursesProgress.CONFIRMATION} >
                <StepLabel>Confirm</StepLabel>
            </Step>
        </Stepper>
    </DialogContent>
    </>
}