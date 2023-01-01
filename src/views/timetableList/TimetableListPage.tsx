import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Paper, TextField, Tooltip, Typography } from "@mui/material";

import { AiOutlinePlus } from 'react-icons/ai';
import { MdTableView, MdSearchOff } from 'react-icons/md';
import { TbMoodEmpty } from "react-icons/tb";

import TimetableCard from "./TimetableCard";

import { RootState } from "../../redux/store";
import { addBlankTimetable } from "../../redux/timetableSlice";

import { useAlert } from "../../hooks/useAlert";




export default function TimetableListPage() {
    const { alertSuccess } = useAlert();
    const { student } = useSelector((state: RootState) => state.student);
    const { timetables } = useSelector((state: RootState) => state.timetable);
    const dispatch = useDispatch();

    const [ search, setSearch ] = useState<string>('');


    const filteredTimetables = Object.values(timetables).filter((timetable)=> {
        return timetable.timetableName.toLowerCase().includes(search.toLowerCase());
    });



    const addBlankTimeTable = ()=> {
        dispatch( addBlankTimetable(student) );
        alertSuccess('New timetable created');
    }
    
    
    return <>
        <Container className='py-7'>

            {/* Title */}
            <Typography className='mb-8 flex items-center font-medium text-3xl sm:text-4xl'>
                <MdTableView className='mr-2 inline' />
                My Timetables
            </Typography>


            {/* Buttons and Search bar */}
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


            {/* Timetable Cards */}
            {
                // If no timetable, display empty state
                Object.keys(timetables).length === 0?
                <Paper className='py-9 mb-5'>
                    <div className='text-gray-500 text-center'>
                        <TbMoodEmpty className='text-5xl m-auto mb-3' />
                        <p className='text-xl'>You have no timetables yet</p>
                    </div>
                </Paper>
                :
                // If no timetables match the search, display empty state
                filteredTimetables.length === 0?
                <Paper className='py-9 mb-5'>
                    <div className='text-gray-500 text-center'>
                        <MdSearchOff className='text-5xl m-auto mb-3' />
                        <p className='text-xl'>No timetables found matching "{ search }"</p>
                    </div>
                </Paper>
                :
                // Otherwise display the timetables
                <Paper 
                    className='p-5 mb-5 grid gap-5' 
                    sx={{ gridTemplateColumns: 'repeat( auto-fill, minmax(275px, 1fr) )' }}
                >
                    {
                        filteredTimetables.map((timetable)=> {
                            return <TimetableCard key={timetable.id} timetable={timetable} />
                        })
                    }
                </Paper>
            }
        </Container>
    </>
}