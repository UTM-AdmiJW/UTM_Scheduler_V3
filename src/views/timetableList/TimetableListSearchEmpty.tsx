import { Box, Paper } from "@mui/material";

import { MdSearchOff } from "react-icons/md";



export default function TimetableListSearchEmpty({ search }: { search: string }) {

    return <>
        <Paper variant='outlined' className='py-9 mb-5'>
            <Box className='text-gray-500 text-center'>
                <MdSearchOff className='text-5xl m-auto mb-3' />
                <p className='text-xl'>No timetables found matching "{ search }"</p>
            </Box>
        </Paper>
    </>
}