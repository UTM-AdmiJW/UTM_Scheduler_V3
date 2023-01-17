import { Alert, Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import EditableCourseInfoEdit from "./EditableCourseInfoEdit";
import EditableCourseTimeEdit from "./EditableCourseTimeEdit";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTimetableRedux } from "../../hooks/redux/useTimetableRedux";
import { useForm } from "react-hook-form";
import { useAlert } from "../../hooks/useAlert";
import { useApplicationRedux } from "../../hooks/redux/useApplicationRedux";

import type { IEditableCourse } from "../../model/domain/IEditableCourse";

import { AiOutlineEdit } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import NavigateButton from "../../components/button/NavigateButton";



export default function EditableCoursePage() {
    const { timetableId, courseId } = useParams();
    const { alertSuccess, alertInfo, alertError } = useAlert();

    const { timetableState, timetableActions } = useTimetableRedux();
    const course = timetableState.timetables[timetableId!].editableCourses[courseId!];
    const { applicationActions: { setHasUnsavedData } } = useApplicationRedux();

    const { control, handleSubmit, formState: { isDirty }, reset, getValues } = useForm<IEditableCourse>({
        defaultValues: course
    });



    // When timetable export config changes, reset the form to the new values
    useEffect(() => {
        reset(course);
    }, [course, reset]);

    useEffect(()=> {
        setHasUnsavedData(isDirty);
    }, [isDirty, setHasUnsavedData]);



    const onSubmit = (data: IEditableCourse) => {
        timetableActions.updateCourse({ timetableId: timetableId!, course: data });
        alertSuccess('Course saved successfully.');
    }

    const onInvalid = ()=> {
        alertError("Invalid fields. Please check your inputs.");
    }

    const onReset = () => {
        reset(course);
        alertInfo('Course resetted.');
    }



    return <>
        <Container className='pb-7'>
        <form onSubmit={ handleSubmit(onSubmit, onInvalid) }>

            {/* Back to timetable */}
            <Box className='flex mb-6'>
                <NavigateButton
                    label='Back to Courses'
                    icon={<MdArrowBack className='mr-2' />}
                    navigateTo={`/timetable/${timetableId}?tab=1`}
                />
            </Box>

            <Paper elevation={2} className='p-5 bg-gray-50'>
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

                <Divider className='my-8' />

                {/* Time Sessions Edit */}
                <EditableCourseTimeEdit control={control} getValues={getValues} />


                {/* Buttons */}
                <Box className='flex justify-end mt-5 gap-2'>
                    <Button variant='contained' color='primary' disabled={!isDirty} type='submit'>Save</Button>
                    <Button variant='outlined' disabled={!isDirty} onClick={onReset}>Reset</Button>
                </Box>
            </Paper>

        </form>
        </Container>
    </>
}