
import { Box, Button, DialogActions, DialogContent, Paper, Typography } from "@mui/material";
import TimeInfo from "../../../components/card/TimeInfo";
import ActionAreaCard from "../../../components/card/ActionAreaCard";
import { ErrorStatusView, LoadingStatusView } from '../../../components/statuses';

import { useRegisteredCoursesContext } from "../../../hooks/context/useRegisteredCoursesContext";
import { useAlert } from "../../../hooks/useAlert";
import { useDialog } from "../../../hooks/useDialog";
import { useTimetableRedux } from "../../../hooks/redux/useTimetableRedux";
import { useFetchSubjekSeksyen } from "../../../hooks/query/useFetchSubjekSeksyen";
import { useFetchJadualSubjekMany } from "../../../hooks/query/useFetchJadualSubjek";

import { RegisteredCoursesProgress } from "../../../enums/";
import type { ISubjekSeksyen_SeksyenDTO } from "../../../model/DTO/SubjekSeksyen/ISubjekSeksyen_SeksyenDTO";
import type { ITimetable } from "../../../model/domain/ITimetable";
import type { IJadualSubjek_Combine } from "../../../model/DTO/JadualSubjek/IJadualSubjek_Combine";

import { combineIJadualDTO, convertIPelajarSubjekToIEditableCourse } from "../../../util/timeUtils";






export default function CourseCatalogConfirmView({ timetable }: { timetable: ITimetable }) {

    const { registeredCoursesState, setRegisteredCoursesState } = useRegisteredCoursesContext();
    const { sesiSemesterPelajarSubjekComposite } = registeredCoursesState;
    const { pelajarSubjeks, sesiSemester } = sesiSemesterPelajarSubjekComposite!;

    const { alertSuccess, alertError } = useAlert();
    const { closeDialog } = useDialog();
    const { timetableActions: { addCourse } } = useTimetableRedux();

    // Fetch pensyarah info from API (subjek_seksyen)
    const { data: seksyenData, error: seksyenError, isLoading: seksyenLoading } = useFetchSubjekSeksyen({ 
        sesi: sesiSemester.sesi,
        semester: sesiSemester.semester, 
    });

    // To Fetch jadual info from API
    const { data: jadualData, error: jadualError, isLoading: jadualLoading } = useFetchJadualSubjekMany(
        pelajarSubjeks.map(s => ({ 
            kod_subjek: s.kod_subjek,
            seksyen: s.seksyen,
            semester: sesiSemester.semester,
            sesi: sesiSemester.sesi,
        }))
    );

    const isLoading = seksyenLoading || jadualLoading;
    const error = seksyenError || jadualError;


    if (error) {
        alertError("Error loading course info. Please see console for more details.");
        console.error(error);
    }



    // Construct a map of (sesiSemesterSubjectCode) to ISubjekSeksyen_SeksyenDTO, for lecturer's name
    const seksyensMap = seksyenData && pelajarSubjeks?.reduce((acc, d)=> {
        const course = seksyenData.find(s => s.kod_subjek === d.kod_subjek);
        const section = course?.seksyen_list.find(s => s.seksyen === d.seksyen);

        if (!section) {
            alertError(`Error loading course info. Course ${d.kod_subjek} not found.`);
            return acc;
        }

        acc[d.sesi + d.semester + d.kod_subjek] = section;
        return acc;
    }, {} as Record<string, ISubjekSeksyen_SeksyenDTO>);


    // Construct a map of (sesiSemesterSubjectCode) to IJadualDTO[], for time info
    const jadualsMap = jadualData && pelajarSubjeks?.reduce((acc, d)=> {
        const jadual = jadualData.find(j => j && j.length && j[0].kod_subjek === d.kod_subjek);
        
        if (!jadual) {
            alertError(`Error loading course info. Schedule for course ${d.kod_subjek} not found.`);
            return acc;
        }

        acc[d.sesi + d.semester + d.kod_subjek] = combineIJadualDTO(jadual);
        return acc;
    }, {} as Record<string, IJadualSubjek_Combine[]>);



    const handleBack = ()=> {
        setRegisteredCoursesState(prev => {
            return { ...prev, progress: RegisteredCoursesProgress.SELECT_SESSIONSEMESTER };
        });
    }

    const handleConfirm = ()=> {
        if (!jadualsMap || !seksyensMap) return;

        pelajarSubjeks.forEach(s => {
            addCourse({
                timetableId: timetable.id,
                course: convertIPelajarSubjekToIEditableCourse(s, seksyensMap, jadualsMap)
            })
        });
        alertSuccess("Courses added to timetable successfully.");
        closeDialog();
    }

    
    return <>
        <DialogContent className='pt-2'>

            {
                isLoading?
                <LoadingStatusView message='Loading course info...' />
                :
                error?
                <ErrorStatusView message='Error loading course info.' />
                :
                <>
                <Typography className='my-4 font-light'>
                    The following will be added to your timetable:
                </Typography>

                <Paper
                    className='p-3 mb-5 grid gap-2' 
                    variant='outlined' 
                    sx={{ gridTemplateColumns: 'repeat( auto-fit, minmax(200px, 1fr) )' }}
                >
                {
                    pelajarSubjeks.map((s) => (
                        <ActionAreaCard
                            key={sesiSemester.sesi + sesiSemester.semester + s.kod_subjek}
                            title={ s.nama_subjek }
                            tableData={[
                                { label: 'Subject Code', value: s.kod_subjek },
                                { label: 'Section', value: s.seksyen },
                                { label: 'Lecturer', value: seksyensMap![sesiSemester.sesi + sesiSemester.semester + s.kod_subjek]?.pensyarah || "N/A" },
                            ]}
                            postDataContent={
                                <Box className='mt-5'>
                                {
                                    jadualsMap![sesiSemester.sesi + sesiSemester.semester + s.kod_subjek]!
                                    .map((time) => (
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
                    ))
                }
                </Paper>
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