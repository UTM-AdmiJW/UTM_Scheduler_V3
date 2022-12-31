import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Paper, TextField, Tooltip, Typography } from "@mui/material";


import { AiOutlinePlus } from 'react-icons/ai';
import { MdTableView } from 'react-icons/md';
import { TbMoodEmpty } from "react-icons/tb";

import TimetableCard from "../../components/timetable/TimetableCard";

import { RootState } from "../../redux/store";
import { addBlankTimetable } from "../../redux/timetableSlice";

import { useAlert } from "../../hooks/useAlert";




export default function TimetablePage() {
    const { alertSuccess } = useAlert();
    const { student } = useSelector((state: RootState) => state.student);
    const { timetables } = useSelector((state: RootState) => state.timetable);
    const dispatch = useDispatch();

    const [ search, setSearch ] = useState<string>('');


    const addBlankTimeTable = ()=> {
        dispatch( addBlankTimetable(student) );
        alertSuccess('New timetable created');
    }


    
    return <>
        <Container className='py-7'>
            <Typography className='mb-8 flex items-center font-medium text-3xl sm:text-4xl'>
                <MdTableView className='mr-2 inline' />
                My Timetables
            </Typography>

            {/* Controls */}
            <Paper className='p-4 mb-5 flex flex-col justify-between sm:flex-row'>
                <div className='mb-4 sm:mb-0'>
                    <Tooltip title='Create a new timetable'>
                        <Button variant='outlined' onClick={ addBlankTimeTable }>
                            <AiOutlinePlus className='mr-2' /> New
                        </Button>
                    </Tooltip>
                </div>

                <TextField label='Search...' size='small' onChange={(e)=> setSearch(e.target.value)} />
            </Paper>



            {
                // If no timetable, display empty state
                false?
                <Paper className='p-5 mb-5'>
                    <div className='text-gray-500 text-center'>
                        <TbMoodEmpty className='text-5xl m-auto' />
                        <p className='text-xl font-medium'>You have no timetables yet</p>
                    </div>
                </Paper>
                :
                // Otherwise display the timetables
                <Paper 
                    className='p-4 mb-5 grid gap-5' 
                    sx={{ gridTemplateColumns: 'repeat( auto-fill, minmax(275px, 1fr) )' }}
                >
                </Paper>
            }
        </Container>
    </>
}