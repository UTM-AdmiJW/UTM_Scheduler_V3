
import { Box, Button, Card, CardContent, DialogActions, DialogContent, Typography } from "@mui/material";
import TimeInfo from "../../../components/time/TimeInfo";

import { useCourseCatalogContext } from "../../../hooks/context/useCourseCatalogContext";
import { useAlert } from "../../../hooks/useAlert";
import { useDialog } from "../../../hooks/useDialog";
import { useTimetableRedux } from "../../../hooks/redux/useTimetableRedux";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";


import type { ITimetable } from "../../../model/domain/ITimetable";
import { convertICourseCatalogStateToIEditableCourse } from "../../../util/timetableUtils";




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

            <Card variant="outlined">

                <Box className='bg-blue-500 rounded p-3 text-white flex items-center'>
                    <Typography className='font-extralight'>
                        { course?.nama_subjek }
                    </Typography>
                </Box>
                
                <CardContent>

                    <Typography variant="body2" className='mb-1'>
                        { course?.kod_subjek }
                    </Typography>

                    <Typography variant="body2" className='mb-1'>
                        Section { section?.seksyen }
                    </Typography>

                    <Typography variant="body2" className='mb-3'>
                        { section?.pensyarah || "No lecturer" }
                    </Typography>

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
                </CardContent>
            </Card>
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