
import { Box, Button, DialogActions, DialogContent, Typography } from "@mui/material";
import { ErrorStatusView, LoadingStatusView } from "../../../components/statuses";
import CardContainer from "../../../components/card/CardContainer";
import ActionAreaCard from "../../../components/card/ActionAreaCard";
import TimeInfo from "../../../components/card/TimeInfo";

import { useAlert } from "../../../hooks/useAlert";
import { useDialog } from "../../../hooks/useDialog";
import { useCourseCatalogContext } from "../../../hooks/context/useCourseCatalogContext";
import { useFetchJadualSubjekManyWithSeksyen } from "../../../hooks/query/useFetchJadualSubjekWithSeksyen";

import { CourseCatalogProgress } from "../../../enums/";
import type { IJadualSubjek_SeksyenJadual } from "../../../model/DTO/JadualSubjek/IJadualSubjek_SeksyenJadual";

import { combineIJadualDTO } from "../../../util/timeUtils";
import { stringEnumToIMenuItems } from "../../../util/menuItemUtils";



enum SelectSectionSortOrder {
    SECTION_ASCENDING = 'Section (Ascending)',
    SECTION_DESCENDING = 'Section (Descending)',
}



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



    const searchFn = (data: IJadualSubjek_SeksyenJadual, search: string)=> {
        return (
            data.seksyen.seksyen.toString().includes(search) ||
            data.seksyen.pensyarah?.toLowerCase().includes(search.toLowerCase())
        );
    }


    const sortFn = (a: IJadualSubjek_SeksyenJadual, b: IJadualSubjek_SeksyenJadual, sortOrder: SelectSectionSortOrder)=> {
        if (sortOrder === SelectSectionSortOrder.SECTION_ASCENDING)
            return a.seksyen.seksyen - b.seksyen.seksyen;
        return b.seksyen.seksyen - a.seksyen.seksyen;
    }


    const cardRenderFn = (data: IJadualSubjek_SeksyenJadual)=> {
        const d = { seksyen: data.seksyen, jadual: combineIJadualDTO(data.jadual) };

        return (
            <ActionAreaCard
                key={d.seksyen.seksyen + (d.seksyen.pensyarah || 'NA') }
                title={`Section ${d.seksyen.seksyen}`}
                tableData={[
                    { label: 'Lecturer', value: d.seksyen.pensyarah || 'NA' },
                    { label: 'Capacity', value: d.seksyen.bil_pelajar || 'NA' },
                ]}
                postDataContent={
                    <Box className='mt-5'>
                    {
                        d.jadual.map((t) => (
                            <TimeInfo
                                key={t.id_jws}
                                beginTime={t.masa_mula} 
                                endTime={t.masa_tamat} 
                                dayOfWeek={t.hari} 
                                venue={t.ruang.nama_ruang_singkatan} 
                            />
                        ))
                    }
                    </Box>
                }
                onClick={() => {
                    setCourseCatalog(prev => ({
                        ...prev,
                        seksyen: d.seksyen,
                        jadualSubjek: d.jadual,
                        progress: CourseCatalogProgress.CONFIRMATION
                    }));
                }}
            />
        )
    }



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
        <DialogContent className='pt-2 bg-gray-100'>
            <Typography className='text-2xl font-light mt-2 mb-5'>
                Select Section
            </Typography>

            { isLoading && <LoadingStatusView message='Retrieving sections...' /> }
            { isError && <ErrorStatusView message="Cannot retrieve sections." /> }
            { 
                isSuccess && 
                <CardContainer
                    data={data?.map(d => d!) || []}
                    searchOptions={{ searchFn }}
                    cardRenderFn={cardRenderFn}
                    sortOptions={{ 
                        sortMenuItems: stringEnumToIMenuItems(SelectSectionSortOrder),
                        initialSortBy: SelectSectionSortOrder.SECTION_ASCENDING,
                        sortFn
                    }}
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




