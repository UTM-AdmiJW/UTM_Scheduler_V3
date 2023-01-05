
import { Paper, TextField, Typography, Box } from "@mui/material";
import Empty from "../../../components/empty/Empty";
import SearchEmpty from "../../../components/searchEmpty/SearchEmpty";
import SelectCourseCard from "./SelectCourseCard";

import { useState } from "react";

import type { ISubjekSeksyenDTO } from "../../../model/DTO/SubjekSeksyen/ISubjekSeksyenDTO";

import { enumToOptions } from "../../../util/menuUtils";




enum SelectCourseSortOrder {
    NAME_ASCENDING = 'Name (A-Z)',
    NAME_DESCENDING = 'Name (Z-A)',
    CODE_ASCENDING = 'Code (A-Z)',
    CODE_DESCENDING = 'Code (Z-A)',
}


export default function SelectCourseCardContainer({ data }: { data: ISubjekSeksyenDTO[] }) {

    const [ search, setSearch ] = useState<string>('');
    const [ sortOrder, setSortOrder ] = useState<SelectCourseSortOrder>(SelectCourseSortOrder.NAME_ASCENDING);

    // Filter out null values. Some queries to course can return [null] instead of []
    data = data.filter((course) => course && course.kod_subjek);

    // Sort & Filter
    const filteredSortedData = data
        .filter((course) => {
            return (
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
                filteredSortedData.length === 0?
                <SearchEmpty message={`No course found for "${search}"`} />
                :
                filteredSortedData.map((course) => {
                    return <SelectCourseCard 
                        key={course.kod_subjek} 
                        course={course} 
                    />
                })
            }
        </Paper>   
    </>
}