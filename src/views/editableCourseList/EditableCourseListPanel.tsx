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
import { enumToOptions } from "../../util/menuUtils";




enum EditableCourseListSortOrder {
    NAME_ASC = 'Name (A-Z)',
    NAME_DESC = 'Name (Z-A)',
    CODE_ASC = 'Code (A-Z)',
    CODE_DESC = 'Code (Z-A)',
}



export default function EditableCourseListPanel({ timetable }: { timetable: ITimetable }) {

    const { alertSuccess } = useAlert();
    const { openDialog } = useDialog();
    const dispatch = useDispatch();

    const [sortOrder, setSortOrder] = useState<EditableCourseListSortOrder>(EditableCourseListSortOrder.NAME_ASC);
    const [search, setSearch] = useState<string>('');
    

    // Search & Filter
    const filteredCourses = Object.values(timetable.editableCourses)
        .filter(course => {
            return course.courseName.toLowerCase().includes( search.toLowerCase() ) ||
                course.courseCode.toLowerCase().includes( search.toLowerCase() );
        })
        .sort((a, b) => {
            if (sortOrder === EditableCourseListSortOrder.NAME_ASC)
                return a.courseName.localeCompare(b.courseName);
            if (sortOrder === EditableCourseListSortOrder.NAME_DESC)
                return b.courseName.localeCompare(a.courseName);
            if (sortOrder === EditableCourseListSortOrder.CODE_ASC)
                return a.courseCode.localeCompare(b.courseCode);
            return b.courseCode.localeCompare(a.courseCode);
        });


    const onAddBlankCourse = ()=> {
        dispatch( addBlankCourse({ timetableId: timetable.id }) );
        alertSuccess('New blank course created');
    }


    const onOpenCourseCatalog = ()=> {
        openDialog(<CourseCatalogDialog timetable={timetable} />);
    }



    return <>

        {/* Controls */}
        <Paper variant="outlined" className='p-3 mb-2 flex flex-wrap gap-3'>
            {/* Button controls */}
            <Box className='flex gap-y-2 gap-x-1 flex-wrap'>
                <Tooltip title='Add a blank editable course'>
                <Button size='small' color='secondary' variant='outlined' onClick={ onAddBlankCourse }>
                    <AiOutlinePlus className='mr-2' /> Blank Course
                </Button>
                </Tooltip>

                <Tooltip title='Browse courses provided by the faculty'>
                <Button size='small' color='secondary' variant='outlined' onClick={ onOpenCourseCatalog }>
                    <AiOutlinePlus className='mr-2' /> Browse
                </Button>
                </Tooltip>

                <Tooltip title='Download registered courses based on your matric number'>
                <Button size='small' color='secondary' variant='outlined' onClick={ ()=> {} }>
                    <AiOutlinePlus className='mr-2' /> My Registered Courses
                </Button>
                </Tooltip>
            </Box>

            <Box className='flex-grow' />

            <Box className='flex gap-2 flex-wrap'>
                {/* Sort Order */}
                <TextField
                    select
                    size='small'
                    label='Sort Order'
                    SelectProps={{ native: true }}
                    value={ sortOrder }
                    onChange={(e)=> setSortOrder(e.target.value as EditableCourseListSortOrder)}
                    className='flex-grow'
                >
                    { enumToOptions(EditableCourseListSortOrder) }
                </TextField>

                {/* Search */}
                <TextField className='flex-grow' label='Search...' size='small' onChange={(e)=> setSearch(e.target.value)} />
            </Box>

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