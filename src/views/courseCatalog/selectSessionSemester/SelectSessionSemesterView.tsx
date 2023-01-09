
import { Button, DialogActions, DialogContent, Typography } from "@mui/material";
import { ErrorStatusView, LoadingStatusView } from "../../../components/statuses";
import CardContainer from "../../../components/card/CardContainer";
import ActionAreaCard from "../../../components/card/ActionAreaCard";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";
import type { ISesiSemesterDTO } from "../../../model/DTO/SesiSemester/ISesiSemesterDTO";

import { useDialog } from "../../../hooks/useDialog";
import { useFetchSesiSemester } from "../../../hooks/query/useFetchSesiSemester";
import { useCourseCatalogContext } from "../../../hooks/context/useCourseCatalogContext";

import { AiTwotoneCalendar } from "react-icons/ai";




enum SelectSessionSemesteSortOrder {
    DATE_START_DESCENDING = 'Date Descending',
    DATE_START_ASCENDING = 'Date Ascending',
}


export default function SelectSessionSemesterView() {

    const { closeDialog } = useDialog();
    let { isLoading, error, data } = useFetchSesiSemester();
    const { setCourseCatalog } = useCourseCatalogContext();


    const searchFn = (data: ISesiSemesterDTO, search: string)=> {
        return data.sesi.includes(search);
    }

    const sortFn = (a: ISesiSemesterDTO, b: ISesiSemesterDTO, sortOrder: SelectSessionSemesteSortOrder)=> {
        const dateA = new Date(a.tarikh_mula);
        const dateB = new Date(b.tarikh_mula);
        
        if (sortOrder === SelectSessionSemesteSortOrder.DATE_START_ASCENDING)
            return dateA.getTime() - dateB.getTime();
        else
            return dateB.getTime() - dateA.getTime();
    }
    
    
    return <>
        <DialogContent className='pt-2 bg-gray-100'>
            <Typography className='text-2xl font-light mt-2 mb-5'>
                Select Session + Semester
            </Typography>


            { isLoading && <LoadingStatusView message='Retrieving session/semester...' /> }
            { error && <ErrorStatusView message="Cannot retrieve session/semester." /> }
            { 
                data && 
                <CardContainer 
                    searchOptions={{ searchFn }}
                    data={ data }
                    sortOptions={{
                        sortEnum: SelectSessionSemesteSortOrder,
                        initialSortBy: SelectSessionSemesteSortOrder.DATE_START_DESCENDING,
                        sortFn
                    }}
                    cardRenderFn={(data)=> (
                        <ActionAreaCard
                            key={data.sesi_semester_id}
                            title={data.sesi + ' Sem ' + data.semester}
                            preDataContent={
                                <Typography className='text-gray-500 font-light text-xs flex items-center'>
                                    <AiTwotoneCalendar className='inline mr-2' fontSize='small' />
                                    {data.tarikh_mula} to {data.tarikh_tamat}
                                </Typography>
                            }
                            onClick={() => {
                                setCourseCatalog(prev => ({
                                    ...prev,
                                    sesiSemester: data,
                                    progress: CourseCatalogProgress.SELECT_SUBJECT
                                }));
                            }}
                        />
                    )}
                />
            }
        </DialogContent>

        <DialogActions className='mt-2'>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}


