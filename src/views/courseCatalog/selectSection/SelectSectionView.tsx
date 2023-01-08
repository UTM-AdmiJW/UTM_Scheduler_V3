
import { Button, DialogActions, DialogContent } from "@mui/material";
import SelectSectionCardContainer from "./SelectSectionCardContainer";
import { ErrorStatusView, LoadingStatusView } from "../../../components/statuses";

import { useCourseCatalogContext } from "../../../hooks/context/useCourseCatalogContext";
import { useAlert } from "../../../hooks/useAlert";
import { useDialog } from "../../../hooks/useDialog";
import { useFetchJadualSubjekManyWithSeksyen } from "../../../hooks/query/useFetchJadualSubjekWithSeksyen";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";




export default function SelectSectionView() {

    const { courseCatalog: { sesiSemester, subjekSeksyen }, setCourseCatalog } = useCourseCatalogContext();

    const { alertError } = useAlert();
    const { closeDialog } = useDialog();

    const { isError, isSuccess, isLoading, data, error } = useFetchJadualSubjekManyWithSeksyen(
        subjekSeksyen?.seksyen_list.map(seksyen => ({
            sesi: sesiSemester!.sesi,
            semester: sesiSemester!.semester,
            kod_subjek: subjekSeksyen.kod_subjek,
            seksyen
        })) || []
    );


    // Error handling if one of the queries failed
    if (isError) {
        alertError("Failed to retrieve sections. See console for more details.");
        console.error(error);
    }



    const handleBack = ()=> {
        setCourseCatalog(prev => {
            return { ...prev, progress: CourseCatalogProgress.SELECT_SUBJECT };
        });
    }


    
    return <>
        <DialogContent className='pt-2'>
            { isLoading && <LoadingStatusView message='Retrieving sections...' /> }
            { isError && <ErrorStatusView message="Cannot retrieve sections." /> }
            { 
                isSuccess && 
                <SelectSectionCardContainer 
                    data={ (data || []).map(d => d!) }
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




