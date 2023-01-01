import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActionArea, CardActions, CardContent } from "@mui/material";

import { BsFillTrashFill, BsBookFill } from 'react-icons/bs';

import { useAlert } from "../../hooks/useAlert";
import { useDialog } from "../../hooks/useDialog";

import type { IEditableCourse } from "../../model/domain/IEditableCourse";

import { deleteCourse } from "../../redux/timetableSlice";



interface IEditableCourseListCardProps {
    timetableId: string;
    course: IEditableCourse
};


export default function EditableCourseListCard({ timetableId, course }: IEditableCourseListCardProps) {
    const { alertSuccess } = useAlert();
    const { openConfirmDialog } = useDialog();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onClick = ()=> {
        navigate(`/timetable/${timetableId}/course/${course.id}`);
    }
    

    const onDelete = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> )=> {
        e.stopPropagation();

        openConfirmDialog(
            `Delete Course`,
            `Are you sure you want to delete '${course.courseName}'?`, 
            ()=> {
                dispatch( deleteCourse({ timetableId: timetableId, courseId: course.id }) );
                alertSuccess('Course deleted');
            }
        );
    }



    return <>
        <Card variant='outlined'>
        <CardActionArea className='p-1' onClick={onClick}>

            {/* Timetable details */}
            <CardContent>
                <Box className='flex items-center mb-2'>
                    <BsBookFill className='mr-4 text-2xl min-w-max' />
                    <p className='text-2xl font-medium'>{course.courseName}</p>
                </Box>

                <p className='text-lg text-gray-400 font-medium'>{course.courseCode}</p>
                <p className='text-md text-gray-400'>Section {course.sectionNo}</p>
                <p className='mt-4 text-sm text-gray-400 font-extralight'>{course.lecturer}</p>


            </CardContent>

            {/* Delete Button */}
            <CardActions className="justify-end">
                <Button 
                    variant="contained" 
                    component='span'
                    color='error' 
                    size='small'
                    onClick={ onDelete }
                    onMouseDown={ (e)=> e.stopPropagation() }
                    onTouchStart={ (e)=> e.stopPropagation() }
                >
                    <BsFillTrashFill className='mr-2' />
                    Delete
                </Button>
            </CardActions>  
        </CardActionArea>  
        </Card>
    </>
}