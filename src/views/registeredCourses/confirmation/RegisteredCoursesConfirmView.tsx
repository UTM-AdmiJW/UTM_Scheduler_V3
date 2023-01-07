
import { Box, Button, DialogActions, DialogContent, Typography } from "@mui/material";
import TimeInfo from "../../../components/infocard/TimeInfo";
import InfoActionAreaCard from "../../../components/infocard/InfoActionAreaCard";
import Loading from "../../../components/statusviews/loading/Loading";
import ErrorPage from "../../../components/statusviews/error/ErrorPage";

import { useRegisteredCoursesContext } from "../../../hooks/context/useRegisteredCoursesContext";
import { useAlert } from "../../../hooks/useAlert";
import { useDialog } from "../../../hooks/useDialog";
import { useTimetableRedux } from "../../../hooks/redux/useTimetableRedux";
import { useFetchSubjekSeksyen } from "../../../hooks/query/useFetchSubjekSeksyen";
import { useFetchJadualSubjek } from "../../../hooks/query/useFetchJadualSubjek";

import { RegisteredCoursesProgress } from "../../../enums/RegisteredCoursesProgress";

import type { ITimetable } from "../../../model/domain/ITimetable";

import { combineIJadualDTO, convertIRegisteredCourseStateToIEditableCourse } from "../../../util/timetableUtils";






export default function CourseCatalogConfirmView({ timetable }: { timetable: ITimetable }) {

    const { registeredCoursesState, setRegisteredCoursesState } = useRegisteredCoursesContext();
    const { pelajarSubjek } = registeredCoursesState;

    const { alertSuccess, alertError } = useAlert();
    const { closeDialog } = useDialog();
    const { timetableActions: { addCourse } } = useTimetableRedux();

    // To Fetch pensyarah info from API
    const { data: seksyenData, error: seksyenError, isLoading: seksyenLoading } = useFetchSubjekSeksyen({ 
        sesi: pelajarSubjek!.sesi, 
        semester: pelajarSubjek!.semester, 
    });

    // To Fetch jadual info from API
    const { data: jadualData, error: jadualError, isLoading: jadualLoading } = useFetchJadualSubjek({ 
        sesi: pelajarSubjek!.sesi, 
        semester: pelajarSubjek!.semester, 
        kod_subjek: pelajarSubjek!.kod_subjek, 
        seksyen: pelajarSubjek!.seksyen, 
    });

    const isLoading = seksyenLoading || jadualLoading;
    const error = seksyenError || jadualError;
    const course = seksyenData?.find((seksyen) => seksyen.kod_subjek === pelajarSubjek?.kod_subjek);
    const section = course?.seksyen_list.find((seksyen) => seksyen.seksyen === pelajarSubjek?.seksyen);
    const combinedJadual = combineIJadualDTO(jadualData || []);


    if (error) {
        alertError("Error loading course info. Please see console for more details.");
        console.error(error);
    }



    const handleBack = ()=> {
        setRegisteredCoursesState(prev => {
            return { ...prev, progress: RegisteredCoursesProgress.SELECT_REGISTERED_SUBJECT };
        });
    }

    const handleConfirm = ()=> {
        addCourse({ 
            timetableId: timetable.id, 
            course: convertIRegisteredCourseStateToIEditableCourse(registeredCoursesState, section!, combinedJadual)
        });
        alertSuccess("Course added to timetable successfully.");
        closeDialog();
    }

    
    return <>
        <DialogContent className='pt-2'>

            {
                isLoading?
                <Loading message='Loading course info...' />
                :
                error?
                <ErrorPage message='Error loading course info.' />
                :
                <>
                <Typography className='mb-2 font-light'>
                    The following will be added to your timetable:
                </Typography>

                <InfoActionAreaCard
                    title={ course?.nama_subjek }
                    tableData={[
                        { label: 'Subject Code', value: course?.kod_subjek },
                        { label: 'Section', value: section?.seksyen },
                        { label: 'Lecturer', value: section?.pensyarah || "No lecturer" },
                    ]}
                    postDataContent={
                        <Box className='mt-5'>
                        {
                            combinedJadual.map((time) => (
                                <TimeInfo 
                                    key={time.id_jws}
                                    beginTime={time.masa_mula} 
                                    endTime={time.masa_tamat} 
                                    dayOfWeek={time.hari} 
                                    venue={time.ruang.nama_ruang_singkatan} 
                                />
                            ))
                        }
                        </Box>
                    }
                />
                </>
            }
        </DialogContent>


        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={handleBack}>
                Back
            </Button>

            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>

            <Button variant="contained" color='primary' onClick={handleConfirm}>
                Confirm
            </Button>
        </DialogActions>
    </>
}