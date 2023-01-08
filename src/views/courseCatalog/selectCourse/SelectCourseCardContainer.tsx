
import { Paper, TextField, Typography, Box } from "@mui/material";
import { EmptyStatusView, SearchEmptyStatusView } from "../../../components/statuses";
import ActionAreaCard from "../../../components/card/ActionAreaCard";

import { useState } from "react";
import { useCourseCatalogContext } from "../../../hooks/context/useCourseCatalogContext";
import { useAlert } from "../../../hooks/useAlert";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";
import type { ISubjekSeksyenDTO } from "../../../model/DTO/SubjekSeksyen/ISubjekSeksyenDTO";

import { BsCode } from "react-icons/bs";

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

    const { setCourseCatalog } = useCourseCatalogContext();
    const { alertWarning } = useAlert();



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
                <EmptyStatusView message={`No data`} />
                :
                filteredSortedData.length === 0?
                <SearchEmptyStatusView message={`No course found for "${search}"`} />
                :
                filteredSortedData.map((course) => (
                    <ActionAreaCard
                        key={course.kod_subjek}
                        title={course.nama_subjek}
                        preDataContent={
                            <Typography className='font-medium text-sm mb-3 flex items-center'>
                                <BsCode className='inline mr-1' />
                                {course.kod_subjek}
                            </Typography>
                        }
                        tableData={[
                            { label: 'Total sections', value: course.bil_seksyen || 'N/A' },
                            { label: 'Total students', value: course.bil_pelajar || 'N/A' },
                            { label: 'Total lecturers', value: course.bil_pensyarah || 'N/A'}
                        ]}
                        onClick={() => {
                            // If no sections list, alert user and return
                            if ( !(course.seksyen_list) || course.seksyen_list.length === 0 ) {
                                alertWarning(`No section data found for ${course.kod_subjek} ${course.nama_subjek}`);
                                return;
                            }

                            setCourseCatalog(prev => ({
                                ...prev,
                                subjekSeksyen: course,
                                progress: CourseCatalogProgress.SELECT_SECTION
                            }));
                        }}
                    />
                ))
            }
        </Paper>   
    </>
}