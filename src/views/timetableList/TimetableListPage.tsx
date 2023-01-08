import { useState } from "react";
import { Box, Button, Container, Paper, TextField, Tooltip, Typography } from "@mui/material";
import Empty from "../../components/statuses/empty/EmptyStatusView";
import SearchEmpty from "../../components/statuses/searchEmpty/SearchEmptyStatusView";
import TimetableListCard from "./TimetableListCard";

import { AiOutlinePlus } from 'react-icons/ai';
import { MdTableView } from 'react-icons/md';

import { useAlert } from "../../hooks/useAlert";
import { useTimetableRedux } from "../../hooks/redux/useTimetableRedux";
import { useStudentRedux } from "../../hooks/redux/useStudentRedux";

import { enumToOptions } from "../../util/menuUtils";



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

    const [ sortOrder, setSortOrder ] = useState<TimetableListSortOrder>(TimetableListSortOrder.MODIFIED_DESC);
    const [ search, setSearch ] = useState<string>('');


    const filteredTimetables = Object.values(timetables)
        .filter((timetable)=> {
            return timetable.timetableName.toLowerCase().includes(search.toLowerCase());
        })
        .sort((a, b) => {
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
        });



    const onAddBlankTimetable = ()=> {
        addBlankTimetable(student);
        alertSuccess('New timetable created');
    }
    
    
    return <>
        <Container className='py-7'>

            {/* Title */}
            <Typography className='mb-5 flex items-center text-2xl sm:text-3xl font-light'>
                <MdTableView className='mr-2 inline' />
                My Timetables
            </Typography>

            {/* Controls */}
            <Paper variant="outlined" className='p-3 mb-2 flex flex-wrap gap-3'>
                {/* Add new Button */}
                <Tooltip title='Create a new timetable'>
                <Button variant='outlined' onClick={ onAddBlankTimetable } size='small'>
                    <AiOutlinePlus className='mr-2' /> New
                </Button>
                </Tooltip>

                <Box className='flex-grow' />

                <Box className='flex gap-2 flex-wrap'>
                    {/* Sort by */}
                    <TextField
                        select
                        label='Sort by'
                        size='small'
                        variant='outlined'
                        SelectProps={{ native: true }}
                        className='flex-grow'
                        value={ sortOrder }
                        onChange={(e)=> setSortOrder(e.target.value as TimetableListSortOrder)}
                    >
                        { enumToOptions(TimetableListSortOrder) }
                    </TextField>

                    {/* Search */}
                    <TextField label='Search...' size='small' className='flex-grow' onChange={(e)=> setSearch(e.target.value)} />
                </Box>
            </Paper>


            {/* Timetable Cards */}
            {
                // If no timetable, display empty state
                Object.keys(timetables).length === 0?
                <Empty message='You have no timetables yet'>
                    <Box className='text-center mt-3'>
                        <Button variant='outlined' onClick={ onAddBlankTimetable } className='mt-3'>
                            <AiOutlinePlus className='mr-2' /> Create a new timetable now
                        </Button>
                    </Box>
                </Empty>
                :
                // If no timetables match the search, display empty state
                filteredTimetables.length === 0?
                <SearchEmpty message={`No timetable match the search "${ search }"`} />
                :
                // Otherwise display the timetables
                <Paper 
                    className='p-5 mb-5 grid gap-5 ' 
                    variant='outlined' 
                    sx={{ gridTemplateColumns: 'repeat( auto-fit, minmax(200px, 325px) )' }}
                >
                    {
                        filteredTimetables.map((timetable)=> {
                            return <TimetableListCard key={timetable.id} timetable={timetable} />
                        })
                    }
                </Paper>
            }
        </Container>
    </>
}