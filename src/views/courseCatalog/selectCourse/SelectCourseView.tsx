
import { Button, DialogActions, DialogContent, } from "@mui/material";
import SelectCourseCardContainer from "./SelectCourseCardContainer";
import { ErrorStatusView, LoadingStatusView } from "../../../components/statuses";

import { useCourseCatalogContext } from "../../../hooks/context/useCourseCatalogContext";
import { useFetchSubjekSeksyen } from "../../../hooks/query/useFetchSubjekSeksyen";
import { useDialog } from "../../../hooks/useDialog";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";




export default function SelectSessionSemesterView() {

    const { closeDialog } = useDialog();
    const { courseCatalog, setCourseCatalog } = useCourseCatalogContext();
    let { isLoading, error, data } = useFetchSubjekSeksyen(courseCatalog.sesiSemester!);


    const handleBack = ()=> {
        setCourseCatalog(prev => {
            return { ...prev, progress: CourseCatalogProgress.SELECT_SESSION_SEMESTER };
        });
    }

    
    return <>
        <DialogContent className='pt-2'>
            { isLoading && <LoadingStatusView message='Retrieving session/semester...' /> }
            { error && <ErrorStatusView message="Cannot retrieve session/semester." /> }
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