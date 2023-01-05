import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";

import { BsFillTrashFill, BsBookHalf, BsCode, BsDoorOpenFill, BsPersonSquare } from 'react-icons/bs';

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

        openConfirmDialog({
            title: `Delete Course`,
            message: `Are you sure you want to delete '${course.courseName}'?`,
            onConfirm: ()=> {
                dispatch( deleteCourse({ timetableId: timetableId, courseId: course.id }) );
                alertSuccess('Course deleted');
            }
        });
    }



    return <>
        <Card variant='outlined'>
        <CardActionArea className='h-full flex flex-col justify-start items-stretch' onClick={onClick}>

            <Box className='bg-blue-500 rounded p-4 text-white flex items-center'>
                <BsBookHalf className='mr-3 min-w-max text-xl' />
                <Typography className='font-extralight text-xl'>{course.courseName}</Typography>
            </Box>

            {/* Timetable details */}
            <CardContent>

                <Typography className='flex items-center mb-1'>
                    <BsCode className='mr-3' />
                    {course.courseCode || 'No course code' }
                </Typography>

                <Typography className='flex items-center mb-1'>
                    <BsDoorOpenFill className='mr-3' />
                    {course.sectionNo? `Section ${course.sectionNo}` : 'No section'}
                </Typography>

                <Typography className='flex items-center'>
                    <BsPersonSquare className='mr-3' />
                    {course.lecturer || 'No lecturer'}
                </Typography>

            </CardContent>

            {/* Delete Button */}
            <CardActions className="justify-end">
                <Button 
                    variant="outlined" 
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