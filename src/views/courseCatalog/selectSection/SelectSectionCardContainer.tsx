import { Box, Paper, TextField, Typography } from "@mui/material";
import Empty from "../../../components/empty/Empty";
import SearchEmpty from "../../../components/searchEmpty/SearchEmpty";
import SelectSectionCard from "./SelectSectionCard";

import { useState } from "react";

import type { IJadualSubjek_SeksyenJadual } from "../../../model/DTO/JadualSubjek/IJadualSubjek_SeksyenJadual";

import { enumToOptions } from "../../../util/menuUtils";




enum SelectSectionSortOrder {
    SECTION_ASCENDING = 'Section (Ascending)',
    SECTION_DESCENDING = 'Section (Descending)',
}

export default function SelectSectionCardContainer({ data }: { data: IJadualSubjek_SeksyenJadual[] }) {

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