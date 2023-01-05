
import { Button, DialogActions, DialogContent } from "@mui/material";
import SelectSectionCardContainer from "./SelectSectionCardContainer";
import ErrorPage from "../../../components/error/ErrorPage";
import Loading from "../../../components/loading/Loading";

import { useCourseCatalogContext } from "../../../hooks/context/useCourseCatalogContext";
import { useFetchJadualSubjek } from "../../../hooks/query/useFetchJadualSubjek";
import { useAlert } from "../../../hooks/useAlert";
import { useDialog } from "../../../hooks/useDialog";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";




export default function SelectSectionView() {

    const { courseCatalog: { sesiSemester, subjekSeksyen }, setCourseCatalog } = useCourseCatalogContext();

    const { alertError } = useAlert();
    const { closeDialog } = useDialog();
    const { isError, isSuccess, isLoading, queries } = useFetchJadualSubjek(sesiSemester!, subjekSeksyen!);


    // Error handling if one of the queries failed
    if (isError) {
        alertError("Failed to retrieve sections. See console for more details.");
        queries.filter(q => q.isError).forEach(q => console.error(q.error));
    }



    const handleBack = ()=> {
        setCourseCatalog(prev => {
            return { ...prev, progress: CourseCatalogProgress.SELECT_SUBJECT };
        });
    }


    
    return <>
        <DialogContent className='pt-2'>
            { isLoading && <Loading message='Retrieving sections...' /> }
            { isError && <ErrorPage message="Cannot retrieve sections." /> }
            { 
                isSuccess && 
                <SelectSectionCardContainer 
                    data={ queries.map(q => q.data!) }
                />
            }
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




