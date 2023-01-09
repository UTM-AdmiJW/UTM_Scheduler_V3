
import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import CardContainer from "../../components/card/CardContainer";
import TimetableListCard from "./TimetableListCard";

import { AiOutlinePlus } from 'react-icons/ai';
import { MdTableView } from 'react-icons/md';

import { useAlert } from "../../hooks/useAlert";
import { useTimetableRedux } from "../../hooks/redux/useTimetableRedux";
import { useStudentRedux } from "../../hooks/redux/useStudentRedux";

import { EmptyStatusView } from "../../components/statuses";
import { ITimetable } from "../../model/domain/ITimetable";



enum TimetableListSortOrder {
    NAME_ASC = 'Name (A-Z)',
    NAME_DESC = 'Name (Z-A)',
    CREATED_ASC = 'Created (Oldest)',
    CREATED_DESC = 'Created (Newest)',
    MODIFIED_ASC = 'Modified (Oldest)',
    MODIFIED_DESC = 'Modified (Newest)',
}





export default function TimetableListPage() {
    const { alertSuccess } = useAlert();
    const { studentState: { student } } = useStudentRedux();
    const { timetableState: { timetables }, timetableActions: { addBlankTimetable } } = useTimetableRedux();



    const onAddBlankTimetable = ()=> {
        addBlankTimetable(student);
        alertSuccess('New timetable created');
    }


    const buttons = <>
        <Tooltip title='Create a new timetable'>
            <Button variant='outlined' onClick={ onAddBlankTimetable } size='small'>
                <AiOutlinePlus className='mr-2' /> New
            </Button>
        </Tooltip>
    </>;

    const emptyDisplay = <>
        <EmptyStatusView message='You have no timetables yet'>
            <Box className='text-center mt-3'>
                <Button variant='outlined' onClick={ onAddBlankTimetable } className='mt-3'>
                    <AiOutlinePlus className='mr-2' /> Create a new timetable now
                </Button>
            </Box>
        </EmptyStatusView>
    </>;

    const searchFn = (timetable: ITimetable, search: string)=> {
        return timetable.timetableName.toLowerCase().includes(search.toLowerCase());
    }


    const sortFn = (a: ITimetable, b: ITimetable, sortOrder: TimetableListSortOrder)=> {
        if (sortOrder === TimetableListSortOrder.NAME_ASC)
            return a.timetableName.localeCompare(b.timetableName);
        if (sortOrder === TimetableListSortOrder.NAME_DESC)
            return b.timetableName.localeCompare(a.timetableName);
        if (sortOrder === TimetableListSortOrder.CREATED_ASC)
            return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        if (sortOrder === TimetableListSortOrder.CREATED_DESC)
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        if (sortOrder === TimetableListSortOrder.MODIFIED_ASC)
            return new Date(a.lastModifiedDate).getTime() - new Date(b.lastModifiedDate).getTime();
        return new Date(b.lastModifiedDate).getTime() - new Date(a.lastModifiedDate).getTime();
    }
    
    
    return <>
        <Container className='py-7'>

            {/* Title */}
            <Typography className='mb-5 flex items-center text-2xl sm:text-3xl font-light'>
                <MdTableView className='mr-2 inline' />
                My Timetables
            </Typography>

            {/* Card Container */}
            <CardContainer
                data={ Object.values(timetables) }
                buttons={buttons}
                emptyDisplay={emptyDisplay}
                containerProps={{ sx: { gridTemplateColumns: 'repeat( auto-fit, minmax(175px, 325px) )' } }}
                cardRenderFn={(timetable)=> <TimetableListCard key={timetable.id} timetable={timetable} />}
                searchOptions={{ searchFn, }}
                sortOptions={{
                    sortEnum: TimetableListSortOrder,
                    initialSortBy: TimetableListSortOrder.NAME_ASC,
                    sortFn,
                }}
            />
        </Container>
    </>
}