import { Box, Paper, Typography } from "@mui/material";
import TimetableDescriptionEdit from "./TimetableDescriptionEdit";
import TimetableNameEdit from "./TimetableNameEdit";

import type { ITimetable } from "../../model/domain/ITimetable";

import { MdOutlineStickyNote2, MdTag } from "react-icons/md";


export default function TimetableInfoPanel({ timetable }: { timetable: ITimetable }) {

    return <>
        <Paper variant="outlined" className='p-4 mb-4'>
            <Typography className='mb-6 text-sm font-extralight text-gray-400'>ID: {timetable.id}</Typography>

            <Box className='grid gap-y-5' sx={{ gridTemplateColumns: 'auto 1fr'}}>
                <MdTag className='mr-2 min-w-max text-3xl' />
                <TimetableNameEdit timetable={timetable} />

                <MdOutlineStickyNote2 className='mr-2 min-w-max text-3xl' />
                <TimetableDescriptionEdit timetable={timetable} />
            </Box>
        </Paper>
    </>
}