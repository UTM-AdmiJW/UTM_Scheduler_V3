
import { Button, DialogActions, DialogContent, } from "@mui/material";
import RegisteredCoursesSelectSubjectCardContainer from "./RegisteredCoursesSelectSubjectCardContainer";
import { ErrorStatusView, LoadingStatusView } from '../../../components/statuses';

import { useStudentRedux } from "../../../hooks/redux/useStudentRedux";
import { useFetchPelajarSubjek } from "../../../hooks/query/useFetchPelajarSubjek";
import { useDialog } from "../../../hooks/useDialog";




export default function RegisteredCourseSelectSubjectView() {

    const { closeDialog } = useDialog();
    const { studentState } = useStudentRedux();
    let { isLoading, error, data } = useFetchPelajarSubjek( studentState.student.matricNo );

    
    return <>
        <DialogContent className='pt-2'>
            { isLoading && <LoadingStatusView message='Retrieving registered courses...' /> }
            { error && <ErrorStatusView message="Cannot retrieve registered courses." /> }
            { data && <RegisteredCoursesSelectSubjectCardContainer data={data} /> }
        </DialogContent>

        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}