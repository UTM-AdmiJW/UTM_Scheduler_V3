import { useState } from "react";
import { DialogContent, DialogTitle, Divider, Step, StepLabel, Stepper, Typography } from "@mui/material";

import { AiFillDatabase } from "react-icons/ai";

import { CourseCatalogProgress } from "../../enums/CourseCatalogProgress";
import type { ICourseCatalogState } from "../../model/domain/ICourseCatalogState";


export default function CourseCatalogDialog() {

    const [catalogState, setCatalogState] = useState<ICourseCatalogState>({
        progress: CourseCatalogProgress.SELECT_SESSION_SEMESTER,
    });


    return <>
        <DialogTitle>
            <Typography className='text-2xl font-light flex items-center'>
                <AiFillDatabase className='mr-2 inline' fontSize='x-large' />
                Course Catalog
            </Typography>
        </DialogTitle>

        <DialogContent className='py-4'>
            <Stepper activeStep={catalogState.progress}>
                <Step key={CourseCatalogProgress.SELECT_SESSION_SEMESTER} >
                    <StepLabel>Select Session & Semester</StepLabel>
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

        {/* <Divider className='m-4' />

        <DialogActions>
            <Button variant="contained" color='primary' type='submit'>
                Login
            </Button>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions> */}
    </>
}