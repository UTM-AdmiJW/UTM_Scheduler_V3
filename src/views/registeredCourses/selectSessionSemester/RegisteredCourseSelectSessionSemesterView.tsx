
import { Button, DialogActions, DialogContent, Typography, } from "@mui/material";
import { ErrorStatusView, LoadingStatusView } from '../../../components/statuses';
import CardContainer from "../../../components/card/CardContainer";
import ActionAreaCard from "../../../components/card/ActionAreaCard";

import { useStudentRedux } from "../../../hooks/redux/useStudentRedux";
import { useFetchPelajarSubjek } from "../../../hooks/query/useFetchPelajarSubjek";
import { useDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";
import { useRegisteredCoursesContext } from "../../../hooks/context/useRegisteredCoursesContext";
import { useFetchSesiSemester } from "../../../hooks/query/useFetchSesiSemester";

import { RegisteredCoursesProgress } from "../../../enums";
import type { ISesiSemesterPelajarSubjekComposite } from "../../../model/types/composite/ISesiSemesterPelajarSubjekComposite";
import type { ISesiSemesterDTO } from "../../../model/DTO/SesiSemester/ISesiSemesterDTO";

import { stringEnumToIMenuItems } from "../../../util/menuItemUtils";



enum RegisteredCoursesSelectSessionSemesterSortOrder {
    SESSIONSEMESTER_ASCENDING = 'Semester Ascending',
    SESSIONSEMESTER_DESCENDING = 'Semester Descending',
}


// Filter out empty session semester
const preFilterFn = (data: ISesiSemesterPelajarSubjekComposite)=> Boolean(data.pelajarSubjeks.length);

// Sort by session semester
const sortFn = (
    a: ISesiSemesterPelajarSubjekComposite,
    b: ISesiSemesterPelajarSubjekComposite,
    sortOrder: RegisteredCoursesSelectSessionSemesterSortOrder
)=> {
    if (sortOrder === RegisteredCoursesSelectSessionSemesterSortOrder.SESSIONSEMESTER_ASCENDING)
        return a.sesiSemester.sesi_semester_id.localeCompare(b.sesiSemester.sesi_semester_id);
    return b.sesiSemester.sesi_semester_id.localeCompare(a.sesiSemester.sesi_semester_id);
}








export default function RegisteredCourseSelectSessionSemesterView() {

    const { closeDialog } = useDialog();
    const { alertError } = useAlert();
    const { studentState } = useStudentRedux();
    const { setRegisteredCoursesState } = useRegisteredCoursesContext();

    const { isLoading: isLoadingSesiSem, error: errorSesiSem, data: dataSesiSem } = useFetchSesiSemester();
    let { isLoading: isLoadingSubjek, error: errorSubjek, data: dataSubjek } = useFetchPelajarSubjek( studentState.student.matricNo );

    const isLoading = isLoadingSesiSem || isLoadingSubjek;
    const error = errorSesiSem || errorSubjek;


    if (error) {
        alertError("Error loading course info. Please see console for more details.");
        console.error(error);
    }



    // Build a mapping of sesiSemesterId to ISesiSemesterDTO
    const sesiSemesterMap = dataSesiSem?.reduce((acc, sesiSem)=> {
        acc[sesiSem.sesi + sesiSem.semester] = sesiSem;
        return acc;
    }, {} as Record<string, ISesiSemesterDTO>);
    
    // Build a object of ISesiSemesterPelajarSubjekComposite
    const sesiSemesterPelajarSubjekMap = sesiSemesterMap && dataSubjek?.reduce((acc, d)=> {
        const key = d.sesi + d.semester;

        if (!sesiSemesterMap[key]) {
            alertError("Cannot find session semester for " + key + ".");
            return acc; 
        }

        if (!acc[key]) acc[key] = { sesiSemester: sesiSemesterMap[key], pelajarSubjeks: [] };
        acc[key].pelajarSubjeks.push(d);
        return acc;
    }, {} as Record<string, ISesiSemesterPelajarSubjekComposite>);




    const cardRenderFn = (data: ISesiSemesterPelajarSubjekComposite)=> {
        const { pelajarSubjeks, sesiSemester } = data;

        const onClick = ()=> {
            setRegisteredCoursesState(prev => ({
                ...prev,
                progress: RegisteredCoursesProgress.CONFIRMATION,
                sesiSemesterPelajarSubjekComposite: data,
            }));
        }

        return <ActionAreaCard
            key={sesiSemester.sesi_semester_id}
            title={sesiSemester.sesi + " Sem " + sesiSemester.semester}
            onClick={onClick}
            tableData={
                pelajarSubjeks.map((subjek)=> ({
                    label: subjek.kod_subjek,
                    value: subjek.nama_subjek,
                }))
            }
        />
    }

    
    return <>
        <DialogContent className='pt-2 bg-gray-100'>

            <Typography className='text-2xl font-light mt-2 mb-5'>
                Select Session Semester
            </Typography>

            { isLoading && <LoadingStatusView message='Retrieving registered courses...' /> }
            { error && <ErrorStatusView message="Cannot retrieve registered courses." /> }
            { 
                sesiSemesterPelajarSubjekMap && 
                <CardContainer
                    prefilterFn={preFilterFn}
                    data={ Object.values(sesiSemesterPelajarSubjekMap) }
                    cardRenderFn={cardRenderFn}
                    containerProps={{ sx: { gridTemplateColumns: 'repeat( auto-fit, minmax(200px, 1fr) )' } }}
                    sortOptions={{
                        sortMenuItems: stringEnumToIMenuItems(RegisteredCoursesSelectSessionSemesterSortOrder),
                        initialSortBy: RegisteredCoursesSelectSessionSemesterSortOrder.SESSIONSEMESTER_DESCENDING,
                        sortFn
                    }}
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