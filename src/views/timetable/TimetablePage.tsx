import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Container, Tabs, Tab,  Paper, Box, Button, Typography } from "@mui/material";
import TimetableNotFound from "./TimetableNotFound";
import TimetableNameEdit from "./TimetableNameEdit";
import TimetableDescriptionEdit from "./TimetableDescriptionEdit";
import ExportConfigurationPanel from "../exportConfiguration/ExportConfigurationPanel";
import EditableCourseListPanel from "../editableCourseList/EditableCourseListPanel";

import type { RootState } from "../../redux/store";

import { MdClass, MdArrowBack } from "react-icons/md";
import { FaFileExport } from "react-icons/fa";




export default function TimetablePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ tab, setTab ] = useState(0);
    const { timetables } = useSelector( (state: RootState) => state.timetable );



    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };



    // If timetable does not exist, show error message and link to timetable list page
    if (!timetables[id!]) return <TimetableNotFound />;
    const timetable = timetables[id!];

    return <>
        <Container className='py-7'>

            <Typography className='mb-3 text-xs text-gray-400'>
                ID: {timetable.id}
            </Typography>
            <TimetableNameEdit timetable={timetable} />
            <Box className='mb-4' />
            <TimetableDescriptionEdit timetable={timetable} />
            <Box className='my-5' />

            <Paper elevation={2}>
                <Tabs 
                    value={tab} 
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab icon={ <MdClass /> } iconPosition="start" label='Courses' />
                    <Tab icon={ <FaFileExport /> } iconPosition="start" label='Export' />
                </Tabs>

                <Box className='p-3 bg-gray-100'>
                    {
                        tab === 0?
                        <EditableCourseListPanel timetable={timetable} />
                        :
                        <ExportConfigurationPanel timetable={timetable} />
                    }
                </Box>
            </Paper>

            <Button variant='contained' className='mt-5' onClick={()=> navigate('/')} >
                <MdArrowBack className='mr-2' />
                Back to timetables
            </Button>

        </Container>
    </>
}