import { Alert, Box, Button, Container, Paper, Typography } from "@mui/material";
import EditableCourseInfoEdit from "./EditableCourseInfoEdit";
import EditableCourseTimeEdit from "./EditableCourseTimeEdit";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTimetableRedux } from "../../hooks/redux/useTimetableRedux";
import { useForm } from "react-hook-form";
import { useAlert } from "../../hooks/useAlert";

import type { IEditableCourse } from "../../model/domain/IEditableCourse";

import { AiOutlineEdit } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";



export default function EditableCoursePage() {
    const navigate = useNavigate();
    const { timetableId, courseId } = useParams();
    const { alertSuccess, alertInfo } = useAlert();

    const { timetableState, timetableActions } = useTimetableRedux();
    const course = timetableState.timetables[timetableId!].editableCourses[courseId!];

    const { control, handleSubmit, formState: { isDirty }, reset } = useForm<IEditableCourse>({
        defaultValues: course
    });



    // When timetable export config changes, reset the form to the new values
    useEffect(() => {
        reset(course);
    }, [course, reset]);



    const onSubmit = (data: IEditableCourse) => {
        timetableActions.updateCourse({ timetableId: timetableId!, course: data });
        alertSuccess('Course saved successfully.');
    }

    const onReset = () => {
        reset(course);
        alertInfo('Course resetted.');
    }



    return <>
        <Container className='pb-7'>
        <form onSubmit={ handleSubmit(onSubmit) }>

            {/* Back to timetable */}
            <Box className='flex mb-6'>
                <Button variant='contained' className='mt-5' onClick={()=> navigate(`/timetable/${timetableId}?tab=1`)} >
                    <MdArrowBack className='mr-2' />
                    Back to timetable
                </Button>
            </Box>

            <Paper elevation={2} className='p-5'>
                {/* Title */}
                <Typography className='text-2xl font-light flex items-center mb-2'>
                    <AiOutlineEdit className='mr-2' />
                    Edit Course
                </Typography>

                {/* Unsaved change alert */}
                <Alert severity='warning' className={`transition-all ${isDirty? 'mb-5 scale-100': 'p-0 h-0 scale-0'}`}>
                    You have unsaved changes. Click <strong>Save</strong> to save your changes.
                </Alert>

                {/* Course Info Edit */}
                <EditableCourseInfoEdit control={control} />

                {/* Time Sessions Edit */}
                <EditableCourseTimeEdit control={control} />


                {/* Buttons */}
                <Box className='flex justify-end mt-5'>
                    <Button variant='outlined' className='mr-2' disabled={!isDirty} onClick={onReset}>Reset</Button>
                    <Button variant='contained' color='primary' disabled={!isDirty} type='submit'>Save</Button>
                </Box>
            </Paper>

        </form>
        </Container>
    </>
}