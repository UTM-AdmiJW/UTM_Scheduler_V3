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

import { AiOutlineCloudServer, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { MdPersonSearch } from 'react-icons/md';

import { stringEnumToIMenuItems } from "../../util/menuItemUtils";





enum EditableCourseListSortOrder {
    NAME_ASC = 'Name (A-Z)',
    NAME_DESC = 'Name (Z-A)',
    CODE_ASC = 'Code (A-Z)',
    CODE_DESC = 'Code (Z-A)',
}



export default function EditableCourseListPanel({ timetable }: { timetable: ITimetable }) {

    const { alertSuccess } = useAlert();
    const { openDialog } = useDialog();
    const { timetableActions: { addBlankCourse } } = useTimetableRedux();


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



    const emptyDisplay = <>
        <EmptyStatusView message='This timetable has no courses yet'>
            <Box className='text-center mt-3'>
                <Button variant='outlined' size='small' onClick={ onAddBlankCourse } className='mt-3'>
                    <AiOutlinePlus className='mr-2' /> Add a blank course now
                </Button>
                <br/>
                <Button variant='outlined' size='small' onClick={ onOpenCourseCatalog } className='mt-3'>
                    <AiOutlineCloudServer className='mr-2' /> Browse course catalog
                </Button>
            </Box>
        </EmptyStatusView>
    </>;

    const buttons = <>
        <Tooltip title='Add a blank editable course'>
        <Button size='small' color='secondary' variant='outlined' onClick={ onAddBlankCourse }>
            <AiOutlinePlus className='mr-2' /> Blank Course
        </Button>
        </Tooltip>

        <Tooltip title='Browse courses provided by the faculty'>
        <Button size='small' color='secondary' variant='outlined' onClick={ onOpenCourseCatalog }>
            <AiOutlineSearch className='mr-2' /> Browse
        </Button>
        </Tooltip>
        
        <Tooltip title='Download registered courses based on your matric number'>
        <Button size='small' color='secondary' variant='outlined' onClick={ onOpenAddRegisteredCoursesDialog }>
            <MdPersonSearch className='mr-2' /> My Registered Courses
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