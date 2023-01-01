import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Container, Paper, TextField, Tooltip, Typography } from "@mui/material";

import { AiOutlinePlus } from 'react-icons/ai';
import { MdTableView } from 'react-icons/md';

import TimetableListCard from "./TimetableListCard";

import { RootState } from "../../redux/store";
import { addBlankTimetable } from "../../redux/timetableSlice";

import { useAlert } from "../../hooks/useAlert";
import TimetableListEmpty from "./TimetableListEmpty";
import TimetableListSearchEmpty from "./TimetableListSearchEmpty";




export default function TimetableListPage() {
    const { alertSuccess } = useAlert();
    const { student } = useSelector((state: RootState) => state.student);
    const { timetables } = useSelector((state: RootState) => state.timetable);
    const dispatch = useDispatch();

    const [ search, setSearch ] = useState<string>('');


    const lowerCaseSearch = search.toLowerCase();
    const filteredTimetables = Object.values(timetables).filter((timetable)=> {
        return timetable.timetableName.toLowerCase().includes(lowerCaseSearch);
    });



    const onAddBlankTimetable = ()=> {
        dispatch( addBlankTimetable(student) );
        alertSuccess('New timetable created');
    }
    
    
    return <>
        <Container className='py-7'>

            {/* Title */}
            <Typography className='mb-5 flex items-center text-2xl sm:text-3xl font-medium'>
                <MdTableView className='mr-2 inline' />
                My Timetables
            </Typography>


            {/* Buttons and Search bar */}
            <Paper variant="outlined" className='p-4 mb-5 flex flex-col justify-between sm:flex-row'>
                <Box className='mb-4 sm:mb-0 flex gap-1 flex-wrap'>
                    <Tooltip title='Create a new timetable'>
                        <Button variant='outlined' onClick={ onAddBlankTimetable }>
                            <AiOutlinePlus className='mr-2' /> New
                        </Button>
                    </Tooltip>
                </Box>

                <TextField label='Search...' size='small' onChange={(e)=> setSearch(e.target.value)} />
            </Paper>


            {/* Timetable Cards */}
            {
                // If no timetable, display empty state
                Object.keys(timetables).length === 0?
                <TimetableListEmpty addBlankTimeTable={ onAddBlankTimetable } />
                :
                // If no timetables match the search, display empty state
                filteredTimetables.length === 0?
                <TimetableListSearchEmpty search={ search } />
                :
                // Otherwise display the timetables
                <Paper 
                    className='p-5 mb-5 grid gap-5' 
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