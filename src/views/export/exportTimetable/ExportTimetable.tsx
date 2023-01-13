
import { Button, Tooltip } from "@mui/material";
import RenderTimetableDialog from "../../renderTimetable/RenderTimetableDialog";

import { useDialog } from "../../../hooks/useDialog";

import type { ITimetable } from "../../../model/domain/ITimetable";
import { useAlert } from "../../../hooks/useAlert";




interface IExportTimetableProps {
    timetable: ITimetable;
    isClash: boolean;
}


export default function ExportTimetable({
    timetable,
    isClash
}: IExportTimetableProps) {

    const { openDialog } = useDialog();
    const { alertError } = useAlert();



    const handleExportTimetable = () => {
        if (!isClash) openDialog(<RenderTimetableDialog timetable={timetable} />);
        else alertError('Please fix existing clashes first before exporting your timetable.');
    }

    return <>
        <Tooltip title='Export timetable as image'>
        <Button 
            variant='contained' 
            onClick={handleExportTimetable}
        >
            Export Timetable
        </Button>
        </Tooltip>
    
    </>
}