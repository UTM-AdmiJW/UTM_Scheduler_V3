import { Box, Paper, TextField, Typography } from "@mui/material";
import SelectSessionSemesterCard from "./SelectSessionSemesterCard";

import { useState } from "react";

import type { ISesiSemesterDTO } from "../../../model/DTO/SesiSemester/ISesiSemesterDTO";

import { enumToOptions } from "../../../util/menuUtils";




enum SelectSessionSemesteSortOrder {
    DATE_START_DESCENDING = 'Date Descending',
    DATE_START_ASCENDING = 'Date Ascending',
}

export default function SelectSessionSemesterCardContainer({ data }: { data: ISesiSemesterDTO[] }) {

    const [ sortOrder, setSortOrder ] = useState<SelectSessionSemesteSortOrder>(SelectSessionSemesteSortOrder.DATE_START_DESCENDING);

    data.sort((a, b) => {
        const dateA = new Date(a.tarikh_mula);
        const dateB = new Date(b.tarikh_mula);
        
        if (sortOrder === SelectSessionSemesteSortOrder.DATE_START_ASCENDING) 
            return dateA.getTime() - dateB.getTime();
        else
            return dateB.getTime() - dateA.getTime();
    });



    return <>
        <Typography className='text-2xl font-light mt-2 mb-5'>
            Select Session + Semester
        </Typography>
    
        <Box className='flex justify-end my-2'>
            <TextField
                select
                label='Sort Order'
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SelectSessionSemesteSortOrder)}
                SelectProps={{ native: true }}
                variant='outlined'
                size='small'
            >
                { enumToOptions(SelectSessionSemesteSortOrder) }
            </TextField>
        </Box>

        <Paper
            variant="outlined" 
            className='p-2 grid gap-2 bg-gray-50'
            sx={{ gridTemplateColumns: 'repeat( auto-fit, minmax(175px, 1fr) )' }}
        >
            {
                data.map((sessionSemester) => {
                    return <SelectSessionSemesterCard 
                        key={sessionSemester.sesi_semester_id} 
                        sessionSemester={sessionSemester} 
                    />
                })
            }
        </Paper>   
    </>
}