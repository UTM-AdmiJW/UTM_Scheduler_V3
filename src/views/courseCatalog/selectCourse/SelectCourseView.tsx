import { useState } from "react";
import { Box, Button, DialogActions, DialogContent, Paper, TextField, Typography } from "@mui/material";
import SelectCourseCard from "./SelectCourseCard";
import ErrorPage from "../../../components/error/ErrorPage";
import Loading from "../../../components/loading/Loading";
import SearchEmpty from "../../../components/searchEmpty/SearchEmpty";

import { useCourseCatalog } from "../../../hooks/useCourseCatalog";
import { useQuery } from "react-query";
import { useAlert } from "../../../hooks/useAlert";
import { useDialog } from "../../../hooks/useDialog";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";
import type { ISubjekDTO } from "../../../model/DTO/ISubjekDTO";

import { enumToOptions } from "../../../util/utils";
import Empty from "../../../components/empty/Empty";




export default function SelectSessionSemesterView() {

    const { courseCatalog, setCourseCatalog } = useCourseCatalog();

    let { isLoading, error, data } = useQuery<ISubjekDTO[], Error>(
        ['courses', courseCatalog.sessionSemester?.sesi, courseCatalog.sessionSemester?.semester], 
        async () => {
            return fetch(
                `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?` +
                `entity=subjek&sesi=${ courseCatalog.sessionSemester?.sesi }` +
                `&semester=${ courseCatalog.sessionSemester?.semester }`
            )
            .then(res => res.json());
        }
    );

    const { alertError } = useAlert();
    const { closeDialog } = useDialog();


    const handleBack = ()=> {
        setCourseCatalog(prev => {
            return { ...prev, progress: CourseCatalogProgress.SELECT_SESSION_SEMESTER };
        });
    }



    // Error handling
    if (error) {
        alertError("Failed to retrieve course data. See console for more details.");
        console.error(error);
    }

    
    return <>
        <DialogContent className='pt-2'>
            { isLoading && <Loading message='Retrieving session/semester...' /> }
            { error && <ErrorPage message="Cannot retrieve session/semester." /> }
            { data && <SelectCourseCardContainer data={data} /> }
        </DialogContent>

        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={handleBack}>
                Back
            </Button>

            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}





enum SelectCourseSortOrder {
    NAME_ASCENDING = 'Name (A-Z)',
    NAME_DESCENDING = 'Name (Z-A)',
    CODE_ASCENDING = 'Code (A-Z)',
    CODE_DESCENDING = 'Code (Z-A)',
}

function SelectCourseCardContainer({ data }: { data: ISubjekDTO[] }) {

    const [ search, setSearch ] = useState<string>('');
    const [ sortOrder, setSortOrder ] = useState<SelectCourseSortOrder>(SelectCourseSortOrder.NAME_ASCENDING);

    // Filter out null values
    data = data.filter((course) => course);

    const filteredData = data
        .filter((course) => {
            return course && (
                course.nama_subjek.toLowerCase().includes(search.toLowerCase()) ||
                course.kod_subjek.toLowerCase().includes(search.toLowerCase())
            );
        })
        .sort((a, b) => {
            if (sortOrder === SelectCourseSortOrder.NAME_ASCENDING)
                return a.nama_subjek.localeCompare(b.nama_subjek);
            if (sortOrder === SelectCourseSortOrder.NAME_DESCENDING)
                return b.nama_subjek.localeCompare(a.nama_subjek);
            if (sortOrder === SelectCourseSortOrder.CODE_ASCENDING)
                return a.kod_subjek.localeCompare(b.kod_subjek);
            return b.kod_subjek.localeCompare(a.kod_subjek);
        });


    return <>
        <Typography className='text-2xl font-light mt-2 mb-5'>
            Select Course
        </Typography>
    
        <Box className='flex flex-wrap justify-end my-2 gap-2'>
            <TextField
                select
                label='Sort Order'
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SelectCourseSortOrder)}
                SelectProps={{ native: true }}
                variant='outlined'
                size='small'
            >
                { enumToOptions(SelectCourseSortOrder) }
            </TextField>

            <TextField
                label='Search by name/code'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant='outlined'
                size='small'
            />
        </Box>

        <Paper 
            variant="outlined" 
            className='p-2 grid gap-2 bg-gray-50'
            sx={{ gridTemplateColumns: 'repeat( auto-fit, minmax(175px, 1fr) )' }}
        >
            {
                data.length === 0?
                <Empty message={`No data`} />
                :
                filteredData.length === 0?
                <SearchEmpty message={`No course found for "${search}"`} />
                :
                filteredData.map((course) => {
                    return <SelectCourseCard 
                        key={course.kod_subjek} 
                        course={course} 
                    />
                })
            }
        </Paper>   
    </>
}