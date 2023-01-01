import { Box, Button, Paper } from "@mui/material";

import { AiOutlinePlus, AiOutlineCloudServer } from "react-icons/ai";
import { TbMoodEmpty } from "react-icons/tb";


interface IEditableCourseListEmptyProps {
    addBlankEditableCourse: () => void;
    openCourseCatalog: () => void;
}


export default function EditableCourseListEmpty({ 
    addBlankEditableCourse,
    openCourseCatalog,
}: IEditableCourseListEmptyProps) {

    return <>
        <Paper variant='outlined' className='py-9 mb-5'>
            <Box className='text-gray-500 text-center'>
                <TbMoodEmpty className='text-5xl m-auto mb-3' />
                <p className='text-xl'>This timetable has no courses yet</p>

                <Button variant='outlined' onClick={ addBlankEditableCourse } className='mt-3'>
                    <AiOutlinePlus className='mr-2' /> Add a blank course now
                </Button>
                <br/>
                <Button variant='outlined' onClick={ openCourseCatalog } className='mt-3'>
                    <AiOutlineCloudServer className='mr-2' /> Browse course catalog
                </Button>
            </Box>
        </Paper>
    </>
}
