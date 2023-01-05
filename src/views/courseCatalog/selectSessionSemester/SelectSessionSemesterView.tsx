
import { Button, DialogActions, DialogContent } from "@mui/material";
import SelectSessionSemesterCardContainer from "./SelectSessionSemesterCardContainer";
import ErrorPage from "../../../components/error/ErrorPage";
import Loading from "../../../components/loading/Loading";

import { useDialog } from "../../../hooks/useDialog";
import { useFetchSesiSemester } from "../../../hooks/query/useFetchSesiSemester";




export default function SelectSessionSemesterView() {

    const { closeDialog } = useDialog();
    let { isLoading, error, data } = useFetchSesiSemester();
    
    
    return <>
        <DialogContent className='pt-2'>
            { isLoading && <Loading message='Retrieving session/semester...' /> }
            { error && <ErrorPage message="Cannot retrieve session/semester." /> }
            { data && <SelectSessionSemesterCardContainer data={data} /> }
        </DialogContent>

        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}


