import { DialogTitle, Typography } from "@mui/material";
import { CourseCatalogContextProvider } from "../../context/CourseCatalogContext";
import CourseCatalogStepper from "./CourseCatalogStepper";
import SelectSessionSemesterView from "./selectSessionSemester/SelectSessionSemesterView";
import SelectCourseView from "./selectCourse/SelectCourseView";

import { AiFillDatabase } from "react-icons/ai";

import { useCourseCatalog } from "../../hooks/useCourseCatalog";

import { CourseCatalogProgress } from "../../enums/CourseCatalogProgress";


export default function CourseCatalogDialog() {
    return <>
    <CourseCatalogContextProvider>

        {/* Title */}
        <DialogTitle>
            <Typography className='text-2xl font-light flex items-center'>
                <AiFillDatabase className='mr-2 inline' fontSize='x-large' />
                Course Catalog
            </Typography>
        </DialogTitle>

        {/* Stepper */}
        <CourseCatalogStepper />

        {/* Show different view based on progress */}
        <CourseCatalogProgressView />
        
    </CourseCatalogContextProvider>
    </>
}



// Different views based on progress. Eg: Select Session Semester, Select Subject, Select Section, Confirmation
function CourseCatalogProgressView() {
    const { courseCatalog } = useCourseCatalog();

    return <>
        {
            courseCatalog.progress === CourseCatalogProgress.SELECT_SESSION_SEMESTER?
            <SelectSessionSemesterView />
            :
            courseCatalog.progress === CourseCatalogProgress.SELECT_SUBJECT?
            <SelectCourseView />
            :
            <></>
        }
    </>
}