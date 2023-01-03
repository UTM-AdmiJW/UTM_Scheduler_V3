import { Box, Button, Paper, TextField, Tooltip } from "@mui/material";
import EditableCourseListCard from "./EditableCourseListCard";
import CourseCatalogDialog from "../courseCatalog/CourseCatalogDialog";
import Empty from "../../components/empty/Empty";
import SearchEmpty from "../../components/searchEmpty/SearchEmpty";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from "../../hooks/useAlert";
import { useDialog } from "../../hooks/useDialog";

import type { ITimetable } from "../../model/domain/ITimetable";

import { AiOutlineCloudServer, AiOutlinePlus } from 'react-icons/ai';

import { addBlankCourse } from "../../redux/timetableSlice";


export default function EditableCourseListPanel({ timetable }: { timetable: ITimetable }) {

    const { alertSuccess } = useAlert();
    const { openDialog } = useDialog();
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


    const onOpenCourseCatalog = ()=> {
        openDialog(<CourseCatalogDialog />);
    }



    return <>

        {/* Controls and Search bars */}
        <Paper variant="outlined" className='p-4 mb-2 flex flex-col justify-between sm:flex-row'>
            <Box className='mb-4 sm:mb-0 flex gap-1 flex-wrap'>
                <Tooltip title='Add a blank editable course'>
                    <Button color='secondary' variant='outlined' onClick={ onAddBlankCourse }>
                        <AiOutlinePlus className='mr-2' /> Blank Course
                    </Button>
                </Tooltip>

                <Tooltip title='Browse courses provided by the faculty'>
                    <Button color='secondary' variant='outlined' onClick={ onOpenCourseCatalog }>
                        <AiOutlinePlus className='mr-2' /> Browse
                    </Button>
                </Tooltip>

                <Tooltip title='Download registered courses based on your matric number'>
                    <Button color='secondary' variant='outlined' onClick={ ()=> {} }>
                        <AiOutlinePlus className='mr-2' /> My Registered Courses
                    </Button>
                </Tooltip>
            </Box>

            <TextField label='Search...' size='small' onChange={(e)=> setSearch(e.target.value)} />
        </Paper>


        {/* Editable Course Cards */}
        {
            Object.values(timetable.editableCourses).length === 0?
            <Empty message='This timetable has no courses yet'>
                <Box className='text-center mt-3'>
                    <Button variant='outlined' size='small' onClick={ onAddBlankCourse } className='mt-3'>
                        <AiOutlinePlus className='mr-2' /> Add a blank course now
                    </Button>
                    <br/>
                    <Button variant='outlined' size='small' onClick={ onOpenCourseCatalog } className='mt-3'>
                        <AiOutlineCloudServer className='mr-2' /> Browse course catalog
                    </Button>
                </Box>
            </Empty>
            :
            filteredCourses.length === 0?
            <SearchEmpty message={`No course found matching "${search}"`} />
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