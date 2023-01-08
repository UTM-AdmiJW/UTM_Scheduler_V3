
import { Button, DialogActions, DialogContent } from "@mui/material";
import SelectSessionSemesterCardContainer from "./SelectSessionSemesterCardContainer";
import { ErrorStatusView, LoadingStatusView } from "../../../components/statuses";

import { useDialog } from "../../../hooks/useDialog";
import { useFetchSesiSemester } from "../../../hooks/query/useFetchSesiSemester";




export default function SelectSessionSemesterView() {

    const { closeDialog } = useDialog();
    let { isLoading, error, data } = useFetchSesiSemester();
    
    
    return <>
        <DialogContent className='pt-2'>
            { isLoading && <LoadingStatusView message='Retrieving session/semester...' /> }
            { error && <ErrorStatusView message="Cannot retrieve session/semester." /> }
            { data && <SelectSessionSemesterCardContainer data={data} /> }
        </DialogContent>

        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}


