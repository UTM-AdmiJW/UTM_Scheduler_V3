import { Box, Button, Paper } from "@mui/material";

import { AiOutlinePlus } from "react-icons/ai";
import { TbMoodEmpty } from "react-icons/tb";



export default function TimetableListEmpty({ addBlankTimeTable }: { addBlankTimeTable: () => void }) {

    return <>
        <Paper variant='outlined' className='py-9 mb-5'>
            <Box className='text-gray-500 text-center'>
                <TbMoodEmpty className='text-5xl m-auto mb-3' />
                <p className='text-xl'>You have no timetables yet</p>

                <Button variant='outlined' onClick={ addBlankTimeTable } className='mt-3'>
                    <AiOutlinePlus className='mr-2' /> Create a new timetable now
                </Button>
            </Box>
        </Paper>
    </>
}