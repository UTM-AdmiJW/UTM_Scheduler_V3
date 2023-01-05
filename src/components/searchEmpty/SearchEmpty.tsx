import { Box, Paper, Typography } from "@mui/material";

import { MdSearchOff } from "react-icons/md";


export interface ISearchEmptyProps {
    message: string;
}


export default function SearchEmpty({ message }: ISearchEmptyProps) {

    return <>
        <Paper variant='outlined' className='py-9 mb-5'>
            <Box className='text-gray-500 text-center'>
                <MdSearchOff className='text-5xl m-auto mb-3' />
                <Typography className='text-xl'>{ message }"</Typography>
            </Box>
        </Paper>
    </>
}