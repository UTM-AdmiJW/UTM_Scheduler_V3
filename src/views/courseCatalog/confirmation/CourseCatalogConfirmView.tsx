
import { Box, Button, Card, CardContent, DialogActions, DialogContent, Typography } from "@mui/material";
import TimeInfo from "../../../components/infocard/TimeInfo";

import { useCourseCatalogContext } from "../../../hooks/context/useCourseCatalogContext";
import { useAlert } from "../../../hooks/useAlert";
import { useDialog } from "../../../hooks/useDialog";
import { useTimetableRedux } from "../../../hooks/redux/useTimetableRedux";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";


import type { ITimetable } from "../../../model/domain/ITimetable";
import { convertICourseCatalogStateToIEditableCourse } from "../../../util/timetableUtils";
import InfoActionAreaCard from "../../../components/infocard/InfoActionAreaCard";




export default function CourseCatalogConfirmView({ timetable }: { timetable: ITimetable }) {

    const { courseCatalog, setCourseCatalog } = useCourseCatalogContext();
    const { subjekSeksyen: course, seksyen: section, jadualSubjek: times } = courseCatalog;

    const { alertSuccess } = useAlert();
    const { closeDialog } = useDialog();
    const { timetableActions: { addCourse } } = useTimetableRedux();
    

    const handleBack = ()=> {
        setCourseCatalog(prev => {
            return { ...prev, progress: CourseCatalogProgress.SELECT_SECTION };
        });
    }

    const handleConfirm = ()=> {
        addCourse({ 
            timetableId: timetable.id, 
            course: convertICourseCatalogStateToIEditableCourse(courseCatalog) 
        });
        alertSuccess("Course added to timetable successfully.");
        closeDialog();
    }

    
    return <>
        <DialogContent className='pt-2'>
            <Typography className='mb-2 font-light'>
                The following will be added to your timetable:
            </Typography>


            <InfoActionAreaCard
                title={course?.nama_subjek}
                tableData={[
                    { label: 'Subject Code', value: course?.kod_subjek },
                    { label: 'Section', value: section?.seksyen },
                    { label: 'Lecturer', value: section?.pensyarah || "No lecturer" },
                ]}
                postDataContent={
                    <Box className='mt-5'>
                    {
                        times?.map((time) => (
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