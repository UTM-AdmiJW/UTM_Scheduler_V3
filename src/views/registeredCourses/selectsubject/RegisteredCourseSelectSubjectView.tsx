
import { Button, DialogActions, DialogContent, Typography, } from "@mui/material";
import { ErrorStatusView, LoadingStatusView } from '../../../components/statuses';
import CardContainer from "../../../components/card/CardContainer";
import ActionAreaCard from "../../../components/card/ActionAreaCard";

import { useStudentRedux } from "../../../hooks/redux/useStudentRedux";
import { useFetchPelajarSubjek } from "../../../hooks/query/useFetchPelajarSubjek";
import { useDialog } from "../../../hooks/useDialog";
import { useRegisteredCoursesContext } from "../../../hooks/context/useRegisteredCoursesContext";

import { RegisteredCoursesProgress } from "../../../enums/RegisteredCoursesProgress";
import type { IPelajarSubjekDTO } from "../../../model/DTO/PelajarSubjek/IPelajarSubjekDTO";




enum RegisteredCoursesSelectSubjectSortOrder {
    NAME_ASCENDING = 'Name (A-Z)',
    NAME_DESCENDING = 'Name (Z-A)',
    CODE_ASCENDING = 'Code (A-Z)',
    CODE_DESCENDING = 'Code (Z-A)',
    SESSIONSEMESTER_ASCENDING = 'Semester Ascending',
    SESSIONSEMESTER_DESCENDING = 'Semester Descending',
}



export default function RegisteredCourseSelectSubjectView() {

    const { closeDialog } = useDialog();
    const { studentState } = useStudentRedux();
    let { isLoading, error, data } = useFetchPelajarSubjek( studentState.student.matricNo );
    const { setRegisteredCoursesState } = useRegisteredCoursesContext();




    const prefilterFn = (data: IPelajarSubjekDTO)=> Boolean(data && data.kod_subjek);

    const searchFn = (data: IPelajarSubjekDTO, search: string)=> {
        return (
            data.nama_subjek.toLowerCase().includes(search.toLowerCase()) ||
            data.kod_subjek.toLowerCase().includes(search.toLowerCase())
        );
    }

    const sortFn = (a: IPelajarSubjekDTO, b: IPelajarSubjekDTO, sortOrder: RegisteredCoursesSelectSubjectSortOrder)=> {
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
    }


    
    return <>
        <DialogContent className='pt-2 bg-gray-100'>

            <Typography className='text-2xl font-light mt-2 mb-5'>
                Select Registered Subject
            </Typography>

            { isLoading && <LoadingStatusView message='Retrieving registered courses...' /> }
            { error && <ErrorStatusView message="Cannot retrieve registered courses." /> }
            { 
                data && 
                <CardContainer
                    prefilterFn={ prefilterFn }
                    searchOptions={{ searchFn }}
                    data={ data }
                    sortOptions={{
                        sortEnum: RegisteredCoursesSelectSubjectSortOrder,
                        initialSortBy: RegisteredCoursesSelectSubjectSortOrder.SESSIONSEMESTER_DESCENDING,
                        sortFn
                    }}
                    cardRenderFn={(data)=> (
                        <ActionAreaCard
                            key={data.kod_subjek}
                            title={data.nama_subjek}
                            tableData={[
                                { label: 'Semester: ', value: data.sesi + ' Sem ' + data.semester },
                                { label: 'Code: ', value: data.kod_subjek || 'N/A' },
                                { label: 'Year: ', value: data.tahun_kursus || 'N/A' },
                                { label: 'Section: ', value: data.seksyen || 'N/A' },
                            ]}
                            onClick={()=> {
                                setRegisteredCoursesState(prev => ({
                                    ...prev,
                                    progress: RegisteredCoursesProgress.CONFIRMATION,
                                    pelajarSubjek: data,
                                }));
                            }}
                        />
                    )}
                />
            }
        </DialogContent>

        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}