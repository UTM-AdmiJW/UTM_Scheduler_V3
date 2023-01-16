import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import TimetableStage from "./TimetableStage";

import { useCallback, useState } from "react";
import { useDialog } from "../../hooks/useDialog";

import type { ITimetable } from "../../model/domain/ITimetable";
import type { Stage } from "konva/lib/Stage";

import { MdDraw, MdOpenInNew, MdFileDownload } from "react-icons/md";





interface IRenderTimetableDialog {
    timetable: ITimetable;
}


export default function RenderTimetableDialog({
    timetable,
}: IRenderTimetableDialog) {

    const [stage, setStage] = useState<Stage | null>(null);
    const { closeDialog } = useDialog();

    // Since I want to update timetable dimension everytime the ref chanegs, the approach is to useCallback
    const stageRef = useCallback((node: Stage | null) => {
        if (!node) return;
        setStage(node);
    }, []);


    const handleDownloadAsPng = () => {
        if (stage === null) return;

        const link = document.createElement('a');
        link.download = `${timetable.timetableName}.png`;
        link.href = stage.toDataURL();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleOpenInNewTab = () => {
        if (stage === null) return;

        const image = new Image();
        image.src = stage.toDataURL();
        const w = window.open("");
        w?.document.write(image.outerHTML);
        w?.document.close();
    }


    return <>
        <DialogTitle>
            <Typography className='text-2xl font-light flex items-center'>
                <MdDraw className='mr-2 inline' fontSize='x-large' /> 
                Render Timetable
            </Typography>
        
            <Typography className='text-xs font-light text-gray-400 text-center my-1'>
                Timetable size: {stage?.width()} x {stage?.height()}
            </Typography>
        </DialogTitle>

        <DialogContent className='m-2 p-0'>
            <TimetableStage timetable={timetable} stageRef={stageRef} />
        </DialogContent>

        <DialogActions className='my-2 items-stretch'>
            <Button variant="contained" color='primary' onClick={handleOpenInNewTab}>
                <MdOpenInNew className='mr-2 hidden sm:inline' />
                Open in new tab
            </Button>
            <Button variant="contained" color='primary' onClick={handleDownloadAsPng}>
                <MdFileDownload className='mr-2 hidden sm:inline' />
                Download PNG
            </Button>
            <Button variant="outlined" color='primary' onClick={closeDialog}>
                Close
            </Button>
        </DialogActions>
    </>
}