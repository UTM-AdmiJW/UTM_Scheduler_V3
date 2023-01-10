import { useState } from "react";
import { Box, Paper, PaperProps, TextField } from "@mui/material";
import { EmptyStatusView, SearchEmptyStatusView } from "../statuses";

import type { TextFieldProps } from '@mui/material';
import { IMenuItem } from "../../types/IMenuItem";

import { getMenuItemsfromIMenuItems } from "../../util/menuItemUtils";


/**
 * Props for the CardContainer component.
 * 
 * @param IData The type of the data to be displayed.
 * @param ISortEnum The enum type of the sort options.
 * 
 * @param [buttons] An array of buttons to be displayed on the control panel. Omit to have no buttons.
 * @param [prefilterFn] A function to filter the data before sorting and searching. Omit to perform no filter at all
 * @param [sortOptions] The options for sorting the data. Omit to have no sorting.
 * @param [searchOptions] The options for searching the data. Omit to have no searching.
 * 
 * @param cardRenderFn A function to render the data into a card.
 * @param data The data to be displayed.
 * 
 * @param [emptyDisplay] The display to be shown when there is no data to be displayed. Optional.
 * @param [searchEmptyDisplay] The display to be shown when there is no data to be displayed after searching. Optional.
 * 
 * @param [sortTextFieldProps] Props to be passed to the sort TextField. Optional.
 * @param [searchTextFieldProps] Props to be passed to the search TextField. Optional.
 */
interface ICardContainerProps<IData, ISortEnum extends string | number> {

    // Control panel params
    buttons?: React.ReactNode,
    prefilterFn?: (a: IData) => boolean,
    sortOptions?: {
        sortMenuItems: IMenuItem<ISortEnum>[],
        sortFn: (a: IData, b: IData, sortOrder: ISortEnum) => number,
        initialSortBy: ISortEnum,
    },
    searchOptions?: {
        searchFn: (a: IData, search: string) => boolean,
    }

    // Data
    cardRenderFn: (data: IData, index: number, array: IData[]) => React.ReactNode,
    data: IData[],

    // Status display
    emptyDisplay?: React.ReactNode,
    searchEmptyDisplay?: React.ReactNode,
    
    // Optional params
    sortTextFieldProps?: TextFieldProps,
    searchTextFieldProps?: TextFieldProps,
    containerProps?: PaperProps,
}



/**
 * A reusable component that features a control panel to search, sort and place buttons to control the data.
 * Below the control panel is a grid container to display the data rendered by the cardRenderFn.
 */
export default function CardContainer<IData, ISortEnum extends string | number>({ 
    buttons,
    prefilterFn,
    sortOptions,
    searchOptions,

    cardRenderFn,
    data,

    emptyDisplay,
    searchEmptyDisplay,

    sortTextFieldProps,
    searchTextFieldProps,
    containerProps,
}: ICardContainerProps<IData, ISortEnum>) {

    const [ sortOrder, setSortOrder ] = useState<ISortEnum | undefined>(sortOptions?.initialSortBy);
    const [ search, setSearch ] = useState<string>('');

    
    if (prefilterFn) data = data.filter(prefilterFn);
    let processedData = data;
    if (searchOptions) processedData = processedData.filter((a)=> searchOptions.searchFn(a, search));
    if (sortOptions && sortOrder !== undefined) processedData = processedData.sort((a, b)=> sortOptions.sortFn(a, b, sortOrder));


    return <>
        {/* Control Panel - Contains search, sort, and buttons */}
        <Paper variant="outlined" className='p-3 mb-2 flex flex-wrap justify-end gap-3'>

            {/* Buttons */}
            { buttons && <Box className='flex flex-grow flex-wrap gap-2'>{ buttons }</Box> }

            {/* Sort + Search fields */}
            <Box className='flex gap-2 flex-wrap'>
                {/* Sort field */}
                {
                    sortOptions &&
                    <TextField
                        select
                        variant='outlined'
                        size='small'
                        label='Sort by'
                        className='flex-grow'
                        value={ sortOrder }
                        onChange={(e)=> setSortOrder(e.target.value as ISortEnum)}
                        { ...sortTextFieldProps }
                    >
                        { getMenuItemsfromIMenuItems( sortOptions.sortMenuItems ) }
                    </TextField>
                }

                {/* Search Field */}
                {
                    searchOptions &&
                    <TextField 
                        label='Search...' 
                        size='small' 
                        className='flex-grow'
                        value={ search }
                        onChange={(e)=> setSearch(e.target.value)} 
                        { ...searchTextFieldProps }
                    />
                }
            </Box>
        </Paper>

        {/* Cards Container */}
        {
            // No data
            data.length === 0 ?
            ( emptyDisplay || <EmptyStatusView message='No data' /> )
            :
            // Search result is empty
            processedData.length === 0 ?
            ( searchEmptyDisplay || <SearchEmptyStatusView message={`No data matching search "${search}"`} /> )
            :
            // Display cards
            <Paper
                className='p-3 mb-5 grid gap-2' 
                variant='outlined' 
                sx={{ gridTemplateColumns: 'repeat( auto-fit, minmax(175px, 1fr) )' }}
                { ...containerProps }
            >
                { processedData.map(cardRenderFn) }
            </Paper>
        }
    </>
}