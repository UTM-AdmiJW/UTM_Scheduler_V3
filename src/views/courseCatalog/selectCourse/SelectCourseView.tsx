
import { Button, DialogActions, DialogContent, Typography, } from "@mui/material";
import { ErrorStatusView, LoadingStatusView } from "../../../components/statuses";
import CardContainer from "../../../components/card/CardContainer";
import ActionAreaCard from "../../../components/card/ActionAreaCard";

import { useCourseCatalogContext } from "../../../hooks/context/useCourseCatalogContext";
import { useFetchSubjekSeksyen } from "../../../hooks/query/useFetchSubjekSeksyen";
import { useDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";

import { BsCode } from "react-icons/bs";

import { CourseCatalogProgress } from "../../../enums/";
import type { ISubjekSeksyenDTO } from "../../../model/DTO/SubjekSeksyen/ISubjekSeksyenDTO";

import { stringEnumToIMenuItems } from "../../../util/menuItemUtils";




enum SelectCourseSortOrder {
    NAME_ASCENDING = 'Name (A-Z)',
    NAME_DESCENDING = 'Name (Z-A)',
    CODE_ASCENDING = 'Code (A-Z)',
    CODE_DESCENDING = 'Code (Z-A)',
}



const prefilterFn = (data: ISubjekSeksyenDTO)=> {
    return Boolean(data && data.kod_subjek);
}

const searchFn = (data: ISubjekSeksyenDTO, search: string)=> {
    return (
        data.nama_subjek.toLowerCase().includes(search.toLowerCase()) ||
        data.kod_subjek.toLowerCase().includes(search.toLowerCase())
    );
}

const sortFn = (a: ISubjekSeksyenDTO, b: ISubjekSeksyenDTO, sortOrder: SelectCourseSortOrder)=> {
    if (sortOrder === SelectCourseSortOrder.NAME_ASCENDING)
        return a.nama_subjek.localeCompare(b.nama_subjek);
    if (sortOrder === SelectCourseSortOrder.NAME_DESCENDING)
        return b.nama_subjek.localeCompare(a.nama_subjek);
    if (sortOrder === SelectCourseSortOrder.CODE_ASCENDING)
        return a.kod_subjek.localeCompare(b.kod_subjek);
    return b.kod_subjek.localeCompare(a.kod_subjek);
}






export default function SelectSessionSemesterView() {

    const { closeDialog } = useDialog();
    const { alertWarning } = useAlert();
    const { courseCatalog, setCourseCatalog } = useCourseCatalogContext();
    let { isLoading, error, data } = useFetchSubjekSeksyen(courseCatalog.sesiSemester!);



    const handleBack = ()=> {
        setCourseCatalog(prev => {
            return { ...prev, progress: CourseCatalogProgress.SELECT_SESSION_SEMESTER };
        });
    }


    return <>
        <DialogContent className='pt-2'>
            <Typography className='text-2xl font-light mt-2 mb-5'>
                Select Course
            </Typography>

            { isLoading && <LoadingStatusView message='Retrieving session/semester...' /> }
            { error && <ErrorStatusView message="Cannot retrieve session/semester." /> }
            { 
                data && 
                <CardContainer
                    data={data}
                    prefilterFn={prefilterFn}
                    searchOptions={{ searchFn }}
                    sortOptions={{
                        sortMenuItems: stringEnumToIMenuItems(SelectCourseSortOrder),
                        initialSortBy: SelectCourseSortOrder.NAME_ASCENDING,
                        sortFn
                    }}
                    cardRenderFn={(data)=> (
                        <ActionAreaCard
                            key={data.kod_subjek}
                            title={data.nama_subjek}
                            preDataContent={
                                <Typography className='font-medium text-sm mb-3 flex items-center'>
                                    <BsCode className='inline mr-1' />
                                    {data.kod_subjek}
                                </Typography>
                            }
                            tableData={[
                                { label: 'Total sections', value: data.bil_seksyen || 'N/A' },
                                { label: 'Total students', value: data.bil_pelajar || 'N/A' },
                                { label: 'Total lecturers', value: data.bil_pensyarah || 'N/A'}
                            ]}
                            onClick={() => {
                                // If no sections list, alert user and return
                                if ( !(data.seksyen_list) || data.seksyen_list.length === 0 ) {
                                    alertWarning(`No section data found for ${data.kod_subjek} ${data.nama_subjek}`);
                                    return;
                                }

                                setCourseCatalog(prev => ({
                                    ...prev,
                                    subjekSeksyen: data,
                                    progress: CourseCatalogProgress.SELECT_SECTION
                                }));
                            }}
                        />
                    )}
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