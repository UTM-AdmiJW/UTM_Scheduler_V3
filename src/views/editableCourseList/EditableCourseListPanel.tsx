import { Box, Button, Paper, TextField, Tooltip } from "@mui/material";
import EditableCourseListEmpty from "./EditableCourseListEmpty";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from "../../hooks/useAlert";

import type { ITimetable } from "../../model/domain/ITimetable";

import { AiOutlinePlus, AiOutlineCloudServer, AiOutlineCloudDownload } from 'react-icons/ai';
import EditableCourseListSearchEmpty from "./EditableCourseListSearchEmpty";

import { addBlankCourse } from "../../redux/timetableSlice";
import EditableCourseListCard from "./EditableCourseListCard";


export default function EditableCourseListPanel({ timetable }: { timetable: ITimetable }) {

    const { alertSuccess } = useAlert();
    const dispatch = useDispatch();

    const [search, setSearch] = useState<string>('');
    

    // Search & Filter
    const lowerCaseSearch = search.toLowerCase();
    const filteredCourses = Object.values(timetable.editableCourses).filter(course => {
        return course.courseName.toLowerCase().includes(lowerCaseSearch) ||
            course.courseCode.toLowerCase().includes(lowerCaseSearch);
    });


    const onAddBlankCourse = ()=> {
        dispatch( addBlankCourse({ id: timetable.id }) );
        alertSuccess('New blank course created');
    }



    return <>

        {/* Controls and Search bars */}
        <Paper variant="outlined" className='p-4 mb-5 flex flex-col justify-between sm:flex-row'>
            <Box className='mb-4 sm:mb-0 flex gap-1 flex-wrap'>
                <Tooltip title='Add a blank editable course'>
                    <Button color='secondary' variant='outlined' onClick={ onAddBlankCourse }>
                        <AiOutlinePlus className='mr-2' /> Blank Course
                    </Button>
                </Tooltip>

                <Tooltip title='Browse courses provided by the faculty'>
                    <Button color='secondary' variant='outlined' onClick={ ()=> {} }>
                        <AiOutlineCloudServer className='mr-2' /> Course Catalog
                    </Button>
                </Tooltip>

                <Tooltip title='Download registered courses based on your matric number'>
                    <Button color='secondary' variant='outlined' onClick={ ()=> {} }>
                        <AiOutlineCloudDownload className='mr-2' /> Auto Download
                    </Button>
                </Tooltip>
            </Box>

            <TextField label='Search...' size='small' onChange={(e)=> setSearch(e.target.value)} />
        </Paper>


        {/* Editable Course Cards */}
        {
            Object.values(timetable.editableCourses).length === 0?
            <EditableCourseListEmpty 
                addBlankEditableCourse={ onAddBlankCourse } 
                openCourseCatalog={ ()=> {} }
            />
            :
            filteredCourses.length === 0?
            <EditableCourseListSearchEmpty search={ search } />
            :
            <Paper 
                className='p-5 mb-5 grid gap-5' 
                variant='outlined' 
                sx={{ gridTemplateColumns: 'repeat( auto-fit, minmax(175px, 325px) )' }}
            >
                {
                    filteredCourses.map((course)=> {
                        return <EditableCourseListCard 
                            key={ course.id } 
                            course={ course } 
                            timetableId={ timetable.id } 
                        />
                    })
                }
            </Paper>
        }

    </>
}