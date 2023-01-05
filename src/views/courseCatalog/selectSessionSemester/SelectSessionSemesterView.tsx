import { useState } from "react";
import { Box, Button, DialogActions, DialogContent, Paper, TextField, Typography } from "@mui/material";
import SelectSessionSemesterCard from "./SelectSessionSemesterCard";
import ErrorPage from "../../../components/error/ErrorPage";
import Loading from "../../../components/loading/Loading";

import { useQuery } from "react-query";
import { useAlert } from "../../../hooks/useAlert";
import { useDialog } from "../../../hooks/useDialog";

import type { ISesiSemesterDTO } from "../../../model/DTO/ISesiSemesterDTO";

import { enumToOptions } from "../../../util/menuUtils";




export default function SelectSessionSemesterView() {

    const { alertError } = useAlert();
    const { closeDialog } = useDialog();
    
    let { isLoading, error, data } = useQuery<ISesiSemesterDTO[], Error>(
        'session/semester', 
        async () => {
            return fetch('http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=sesisemester')
                .then(res => res.json());
        }, {
            onError: (error) => {
                alertError("Failed to retrieve session/semester data. See console for more details.");
                console.error(error);
            }
        }
    );



    
    return <>
        <DialogContent className='pt-2'>
            { isLoading && <Loading message='Retrieving session/semester...' /> }
            { error && <ErrorPage message="Cannot retrieve session/semester." /> }
            { data && <SelectSessionSemesterCardContainer data={data} /> }
        </DialogContent>

        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}





enum SelectSessionSemesteSortOrder {
    DATE_START_DESCENDING = 'Date Descending',
    DATE_START_ASCENDING = 'Date Ascending',
}

function SelectSessionSemesterCardContainer({ data }: { data: ISesiSemesterDTO[] }) {

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