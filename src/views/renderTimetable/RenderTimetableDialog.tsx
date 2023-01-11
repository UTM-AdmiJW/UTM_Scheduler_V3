import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import RenderTimetable from "./RenderTimetable";

import { useDialog } from "../../hooks/useDialog";

import type { ITimetable } from "../../model/domain/ITimetable";

import { MdDraw } from "react-icons/md";





interface IRenderTimetableDialog {
    timetable: ITimetable;
}


export default function RenderTimetableDialog({
    timetable,
}: IRenderTimetableDialog) {

    const { closeDialog } = useDialog();


    return <>
        <DialogTitle>
        <Typography className='text-2xl font-light flex items-center'>
            <MdDraw className='mr-2 inline' fontSize='x-large' /> 
            Render Timetable
        </Typography>
        </DialogTitle>

        <DialogContent className='m-2 p-0'>
            <RenderTimetable timetable={timetable} />
        </DialogContent>

        <DialogActions>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}