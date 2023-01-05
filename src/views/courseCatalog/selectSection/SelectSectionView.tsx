import { useState } from "react";
import { Box, Button, DialogActions, DialogContent, Paper, TextField, Typography } from "@mui/material";
import SelectSectionCard from "./SelectSectionCard";
import ErrorPage from "../../../components/error/ErrorPage";
import Loading from "../../../components/loading/Loading";
import Empty from "../../../components/empty/Empty";
import SearchEmpty from "../../../components/searchEmpty/SearchEmpty";

import { useCourseCatalog } from "../../../hooks/useCourseCatalog";
import { useQueries, UseQueryOptions } from "react-query";
import { useAlert } from "../../../hooks/useAlert";
import { useDialog } from "../../../hooks/useDialog";

import { CourseCatalogProgress } from "../../../enums/CourseCatalogProgress";

import { enumToOptions } from "../../../util/menuUtils";
import type { IJadualDTO } from "../../../model/DTO/IJadualDTO";
import type { ISeksyenJadualDTO } from "../../../model/DTO/ISeksyenJadualDTO";




export default function SelectSectionView() {

    const { courseCatalog: { sessionSemester, course }, setCourseCatalog } = useCourseCatalog();

    const { alertError } = useAlert();
    const { closeDialog } = useDialog();
    
    

    const queries = useQueries(
        course?.seksyen_list?.map<UseQueryOptions<ISeksyenJadualDTO, Error>>((section) => ({
            queryKey: [sessionSemester, course!.kod_subjek, section.seksyen],
            queryFn: async ()=> {
                const url = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?` +
                    `entity=jadual_subjek&` + 
                    `sesi=${sessionSemester!.sesi}&` + 
                    `semester=${sessionSemester!.semester}&` + 
                    `kod_subjek=${course!.kod_subjek}&` + 
                    `seksyen=${section.seksyen}`;

                return fetch(url)
                    .then(res => res.json())
                    .then((data: IJadualDTO[]) => ({
                        seksyen: section,
                        jadual: data
                    }));
            }
        })) || []
    );

    const isLoading = queries.some(q => q.isLoading);
    const isError = queries.some(q => q.isError);
    const isSuccess = queries.every(q => q.isSuccess);



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





enum SelectSectionSortOrder {
    SECTION_ASCENDING = 'Section (Ascending)',
    SECTION_DESCENDING = 'Section (Descending)',
}

function SelectSectionCardContainer({ data }: { data: ISeksyenJadualDTO[] }) {

    const [ search, setSearch ] = useState<string>('');
    const [ sortOrder, setSortOrder ] = useState<SelectSectionSortOrder>(SelectSectionSortOrder.SECTION_ASCENDING);


    // Remove duplicate sections. Data with duplicate sections are possible from backend
    const duplicateContainer: Record<number, boolean> = {};
    const filteredSortedData = data
        .filter((d)=> {
            const isDuplicate = duplicateContainer[d.seksyen.seksyen];
            duplicateContainer[d.seksyen.seksyen] = true;
            if (isDuplicate) console.warn(`Duplicate section ${d.seksyen.seksyen} found`);
            return !isDuplicate;
        })
        .filter((d) => {
            return (
                d.seksyen.seksyen.toString().includes(search) ||
                d.seksyen.pensyarah?.toLowerCase().includes(search.toLowerCase())
            )
        })
        .sort((a, b) => {
            if (sortOrder === SelectSectionSortOrder.SECTION_ASCENDING)
                return a.seksyen.seksyen - b.seksyen.seksyen;
            return b.seksyen.seksyen - a.seksyen.seksyen;
        });


    return <>
        <Typography className='text-2xl font-light mt-2 mb-5'>
            Select Section
        </Typography>
    
        <Box className='flex flex-wrap justify-end my-2 gap-2'>
            <TextField
                select
                label='Sort Order'
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SelectSectionSortOrder)}
                SelectProps={{ native: true }}
                variant='outlined'
                size='small'
            >
                { enumToOptions(SelectSectionSortOrder) }
            </TextField>

            <TextField
                label='Search section/lecturer'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant='outlined'
                size='small'
            />
        </Box>

        <Paper 
            variant="outlined" 
            className='p-2 grid gap-2 bg-gray-50'
            sx={{ gridTemplateColumns: 'repeat( auto-fit, minmax(175px, 1fr) )' }}
        >
            {
                data.length === 0?
                <Empty message={`No data`} />
                :
                filteredSortedData.length === 0?
                <SearchEmpty message={`No course found for "${search}"`} />
                :
                filteredSortedData.map((d) => {
                    return <SelectSectionCard 
                        key={d.seksyen.seksyen + (d.seksyen.pensyarah || 'NA') }
                        seksyen={d.seksyen}
                        jadual={d.jadual}
                    />
                })
            }
        </Paper>   
    </>
}