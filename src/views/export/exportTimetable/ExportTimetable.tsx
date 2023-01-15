
import { Box, Button, Tooltip, Typography } from "@mui/material";
import RenderTimetableDialog from "../../renderTimetable/RenderTimetableDialog";

import { useDialog } from "../../../hooks/useDialog";
import { useAlert } from "../../../hooks/useAlert";

import { TbTableExport, TbEye } from "react-icons/tb";

import type { ITimetable } from "../../../model/domain/ITimetable";




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
        <Typography className='font-light text-2xl my-3'>
            <TbTableExport className='inline-block mr-2' />
            Export Timetable
        </Typography>

        <Box className='my-6 flex justify-center'>
            <Tooltip title='Preview timetable and export as image'>
            <Button 
                variant='contained' 
                onClick={handleExportTimetable}
            >
                <TbEye className='mr-2' />
                Export Timetable
            </Button>
            </Tooltip>
        </Box>
    </>
}