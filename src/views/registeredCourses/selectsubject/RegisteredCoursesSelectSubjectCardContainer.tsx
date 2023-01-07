import { Box, Paper, TextField, Typography } from "@mui/material";
import Empty from "../../../components/statusviews/empty/Empty";
import SearchEmpty from "../../../components/statusviews/searchEmpty/SearchEmpty";
import InfoActionAreaCard from "../../../components/infocard/InfoActionAreaCard";

import { useState } from "react";
import { useAlert } from "../../../hooks/useAlert";
import { useRegisteredCoursesContext } from "../../../hooks/context/useRegisteredCoursesContext";

import { RegisteredCoursesProgress } from "../../../enums/RegisteredCoursesProgress";
import type { IPelajarSubjekDTO } from "../../../model/DTO/PelajarSubjek/IPelajarSubjekDTO";

import { enumToOptions } from "../../../util/menuUtils";



enum RegisteredCoursesSelectSubjectSortOrder {
    NAME_ASCENDING = 'Name (A-Z)',
    NAME_DESCENDING = 'Name (Z-A)',
    CODE_ASCENDING = 'Code (A-Z)',
    CODE_DESCENDING = 'Code (Z-A)',
    SESSIONSEMESTER_ASCENDING = 'Semester Ascending',
    SESSIONSEMESTER_DESCENDING = 'Semester Descending',
}

export default function RegisteredCoursesSelectSubjectCardContainer({ data }: { data: IPelajarSubjekDTO[] }) {
    
    const [ search, setSearch ] = useState<string>('');
    const [ sortOrder, setSortOrder ] = useState<RegisteredCoursesSelectSubjectSortOrder>(RegisteredCoursesSelectSubjectSortOrder.NAME_ASCENDING);

    const { setRegisteredCoursesState } = useRegisteredCoursesContext();
    const { alertSuccess } = useAlert();


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
            if (sortOrder === RegisteredCoursesSelectSubjectSortOrder.NAME_ASCENDING)
                return a.nama_subjek.localeCompare(b.nama_subjek);
            if (sortOrder === RegisteredCoursesSelectSubjectSortOrder.NAME_DESCENDING)
                return b.nama_subjek.localeCompare(a.nama_subjek);
            if (sortOrder === RegisteredCoursesSelectSubjectSortOrder.CODE_ASCENDING)
                return a.kod_subjek.localeCompare(b.kod_subjek);
            if (sortOrder === RegisteredCoursesSelectSubjectSortOrder.CODE_DESCENDING)
                return b.kod_subjek.localeCompare(a.kod_subjek);
            if (sortOrder === RegisteredCoursesSelectSubjectSortOrder.SESSIONSEMESTER_ASCENDING) {
                if (a.sesi === b.sesi) return a.semester - b.semester;
                return a.sesi.localeCompare(b.sesi);
            }
            if (a.sesi === b.sesi) return b.semester - a.semester;
            return b.sesi.localeCompare(a.sesi);
        });


    return <>
        <Typography className='text-2xl font-light mt-2 mb-5'>
            Select Registered Subject
        </Typography>
    
        <Box className='flex flex-wrap justify-end my-2 gap-2'>
            <TextField
                select
                label='Sort Order'
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as RegisteredCoursesSelectSubjectSortOrder)}
                SelectProps={{ native: true }}
                variant='outlined'
                size='small'
            >
                { enumToOptions(RegisteredCoursesSelectSubjectSortOrder) }
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
                filteredSortedData.map((course) => (
                    <InfoActionAreaCard
                        key={course.kod_subjek}
                        title={course.nama_subjek}
                        tableData={[
                            { label: 'Semester: ', value: course.sesi + ' Sem ' + course.semester },
                            { label: 'Code: ', value: course.kod_subjek || 'N/A' },
                            { label: 'Year: ', value: course.tahun_kursus || 'N/A' },
                            { label: 'Section: ', value: course.seksyen || 'N/A' },
                        ]}
                        onClick={()=> {
                            setRegisteredCoursesState(prev => {
                                return {
                                    ...prev,
                                    progress: RegisteredCoursesProgress.CONFIRMATION,
                                    pelajarSubjek: course,
                                };
                            });
                            alertSuccess(`Selected ${course.kod_subjek} - ${course.nama_subjek}`);
                        }}
                    />
                ))
            }
        </Paper>   
    </>
}