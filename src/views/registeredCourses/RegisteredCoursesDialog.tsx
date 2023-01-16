
import { DialogTitle, Typography } from "@mui/material";
import { RegisteredCoursesContextProvider } from "../../context/RegisteredCoursesContext";
import RegisteredCoursesStepper from "./RegisteredCoursesStepper";
import RegisteredCoursesLoginView from "./login/RegisteredCoursesLoginView";
import RegisteredCourseSelectSessionSemesterView from "./selectSessionSemester/RegisteredCourseSelectSessionSemesterView";
import RegisteredCoursesConfirmView from "./confirmation/RegisteredCoursesConfirmView";

import { BsBookshelf } from "react-icons/bs";

import { useRegisteredCoursesContext } from "../../hooks/context/useRegisteredCoursesContext";

import { RegisteredCoursesProgress } from "../../enums/";
import type { ITimetable } from "../../model/domain/ITimetable";


export default function RegisteredCoursesDialog({ timetable }: { timetable: ITimetable }) {
    return <>
    <RegisteredCoursesContextProvider>

        {/* Title */}
        <DialogTitle>
            <Typography className='text-2xl font-light flex items-center'>
                <BsBookshelf className='mr-2 inline' fontSize='x-large' />
                My Registered Courses
            </Typography>
        </DialogTitle>

        {/* Stepper */}
        <RegisteredCoursesStepper />

        {/* Show different view based on progress */}
        <RegisteredCoursesProgressView timetable={timetable} />
        
    </RegisteredCoursesContextProvider>
    </>
}



// Different views based on progress. Eg: Select Session Semester, Select Subject, Select Section, Confirmation
function RegisteredCoursesProgressView({ timetable }: { timetable: ITimetable }) {
    const { registeredCoursesState } = useRegisteredCoursesContext();

    return <>
        {
            registeredCoursesState.progress === RegisteredCoursesProgress.LOGIN?
            <RegisteredCoursesLoginView />
            :
            registeredCoursesState.progress === RegisteredCoursesProgress.SELECT_SESSIONSEMESTER?
            <RegisteredCourseSelectSessionSemesterView />
            :
            <RegisteredCoursesConfirmView timetable={timetable} />
        }
    </>
}