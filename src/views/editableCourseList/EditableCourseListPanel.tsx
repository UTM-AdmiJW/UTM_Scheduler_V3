import { Box, Button, Tooltip } from "@mui/material";
import EditableCourseListCard from "./EditableCourseListCard";
import CourseCatalogDialog from "../courseCatalog/CourseCatalogDialog";
import RegisteredCoursesDialog from "../registeredCourses/RegisteredCoursesDialog";
import { EmptyStatusView } from '../../components/statuses';
import CardContainer from "../../components/card/CardContainer";

import { useAlert } from "../../hooks/useAlert";
import { useDialog } from "../../hooks/useDialog";
import { useTimetableRedux } from "../../hooks/redux/useTimetableRedux";

import type { ITimetable } from "../../model/domain/ITimetable";
import type { IEditableCourse } from "../../model/domain/IEditableCourse";

import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { MdPersonSearch, MdDelete } from 'react-icons/md';

import { stringEnumToIMenuItems } from "../../util/menuItemUtils";





enum EditableCourseListSortOrder {
    NAME_ASC = 'Name (A-Z)',
    NAME_DESC = 'Name (Z-A)',
    CODE_ASC = 'Code (A-Z)',
    CODE_DESC = 'Code (Z-A)',
}



export default function EditableCourseListPanel({ timetable }: { timetable: ITimetable }) {

    const { alertSuccess, alertInfo } = useAlert();
    const { openDialog, openConfirmDialog } = useDialog();
    const { timetableActions: { addBlankCourse, clearCourses } } = useTimetableRedux();


    const searchFn = (course: IEditableCourse, search: string)=> {
        return course.courseName.toLowerCase().includes( search.toLowerCase() ) ||
                course.courseCode.toLowerCase().includes( search.toLowerCase() );
    }

    const sortFn = (a: IEditableCourse, b: IEditableCourse, sortOrder: EditableCourseListSortOrder)=> {
        if (sortOrder === EditableCourseListSortOrder.NAME_ASC)
            return a.courseName.localeCompare(b.courseName);
        if (sortOrder === EditableCourseListSortOrder.NAME_DESC)
            return b.courseName.localeCompare(a.courseName);
        if (sortOrder === EditableCourseListSortOrder.CODE_ASC)
            return a.courseCode.localeCompare(b.courseCode);
        return b.courseCode.localeCompare(a.courseCode);
    }
    


    const onAddBlankCourse = ()=> {
        addBlankCourse({ timetableId: timetable.id });
        alertSuccess('New blank course created');
    }

    const onOpenCourseCatalog = ()=> {
        openDialog(<CourseCatalogDialog timetable={timetable} />);
    }

    const onOpenAddRegisteredCoursesDialog = ()=> {
        openDialog(<RegisteredCoursesDialog timetable={timetable} />);
    }

    const onClearAll = ()=> {
        if ( Object.keys(timetable.editableCourses).length === 0 ) 
            return alertInfo('No courses to clear');

        openConfirmDialog({
            title: 'Clear all courses',
            message: 'Are you sure you want to clear all courses from this timetable? The action is irreversible.',
            onConfirm: ()=> {
                clearCourses({ timetableId: timetable.id });
                alertSuccess('All courses cleared');
            }
        });
    }



    const emptyDisplay = <>
        <EmptyStatusView message='This timetable has no courses yet'>
            <Box className='text-center mt-3'>
                <Button variant='outlined' size='small' onClick={ onAddBlankCourse } className='mt-3'>
                    <AiOutlinePlus className='mr-2' /> Add a blank course now
                </Button>
                <br/>
                <Button variant='outlined' size='small' onClick={ onOpenCourseCatalog } className='mt-3'>
                    <AiOutlineSearch className='mr-2' /> Browse course catalog
                </Button>
                <br/>
                <Button variant='outlined' size='small' onClick={ onOpenAddRegisteredCoursesDialog } className='mt-3'>
                    <MdPersonSearch className='mr-2' /> Add registered courses
                </Button>
            </Box>
        </EmptyStatusView>
    </>;

    const buttons = <>
        <Tooltip title='Add a blank editable course'>
        <Button size='small' variant='outlined' onClick={ onAddBlankCourse }>
            <AiOutlinePlus className='mr-2' /> Blank Course
        </Button>
        </Tooltip>

        <Tooltip title='Browse courses provided by the faculty'>
        <Button size='small' variant='outlined' onClick={ onOpenCourseCatalog }>
            <AiOutlineSearch className='mr-2' /> Browse
        </Button>
        </Tooltip>
        
        <Tooltip title='Download registered courses based on your matric number'>
        <Button size='small' variant='outlined' onClick={ onOpenAddRegisteredCoursesDialog }>
            <MdPersonSearch className='mr-2' /> My Registered Courses
        </Button>
        </Tooltip>

        <Tooltip title='Clear all the added courses'>
        <Button size='small' variant='outlined' color='error' onClick={ onClearAll }>
            <MdDelete className='mr-2' /> Clear
        </Button>
        </Tooltip>
    </>;



    return <>
        <CardContainer
            data={ Object.values(timetable.editableCourses) }
            buttons={ buttons }
            emptyDisplay={ emptyDisplay }
            searchOptions={{ searchFn }}
            containerProps={{ sx: { gridTemplateColumns: 'repeat( auto-fit, minmax(175px, 325px) )' } }}
            sortOptions={{
                sortMenuItems: stringEnumToIMenuItems(EditableCourseListSortOrder),
                initialSortBy: EditableCourseListSortOrder.NAME_ASC,
                sortFn
            }}
            cardRenderFn={(editableCourse)=> (
                <EditableCourseListCard 
                    key={ editableCourse.id } 
                    course={ editableCourse } 
                    timetableId={ timetable.id } 
                />
            )}
        />
    </>
}