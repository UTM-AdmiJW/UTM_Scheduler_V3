import { Box, Paper, Typography } from "@mui/material";

import { MdSearchOff } from "react-icons/md";


export interface ISearchEmptyStatusViewProps {
    message: string;
}


export default function SearchEmptyStatusView({ message }: ISearchEmptyStatusViewProps) {

    return <>
        <Paper variant='outlined' className='py-9 mb-5'>
            <Box className='text-gray-500 text-center'>
                <MdSearchOff className='text-5xl m-auto mb-3' />
                <Typography className='text-xl'>{ message }"</Typography>
            </Box>
        </Paper>
    </>
}