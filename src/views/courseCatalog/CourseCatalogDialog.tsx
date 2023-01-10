import { DialogTitle, Typography } from "@mui/material";
import { CourseCatalogContextProvider } from "../../context/CourseCatalogContext";
import CourseCatalogStepper from "./CourseCatalogStepper";
import SelectSessionSemesterView from "./selectSessionSemester/SelectSessionSemesterView";
import SelectCourseView from "./selectCourse/SelectCourseView";
import SelectSectionView from "./selectSection/SelectSectionView";
import CourseCatalogConfirmView from "./confirmation/CourseCatalogConfirmView";

import { AiFillDatabase } from "react-icons/ai";

import { useCourseCatalogContext } from "../../hooks/context/useCourseCatalogContext";

import { CourseCatalogProgress } from "../../enums/";
import type { ITimetable } from "../../model/domain/ITimetable";


export default function CourseCatalogDialog({ timetable }: { timetable: ITimetable }) {
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
        <CourseCatalogProgressView timetable={timetable} />
        
    </CourseCatalogContextProvider>
    </>
}



// Different views based on progress. Eg: Select Session Semester, Select Subject, Select Section, Confirmation
function CourseCatalogProgressView({ timetable }: { timetable: ITimetable }) {
    const { courseCatalog } = useCourseCatalogContext();

    return <>
        {
            courseCatalog.progress === CourseCatalogProgress.SELECT_SESSION_SEMESTER?
            <SelectSessionSemesterView />
            :
            courseCatalog.progress === CourseCatalogProgress.SELECT_SUBJECT?
            <SelectCourseView />
            :
            courseCatalog.progress === CourseCatalogProgress.SELECT_SECTION?
            <SelectSectionView />
            :
            <CourseCatalogConfirmView timetable={timetable} />
        }
    </>
}