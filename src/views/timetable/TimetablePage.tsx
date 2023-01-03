import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Container, Tabs, Tab,  Paper, Box, Button, Typography } from "@mui/material";
import TimetableNotFound from "./TimetableNotFound";
import TimetableInfoPanel from "../timetableInfo/TimetableInfoPanel";
import ExportConfigurationPanel from "../exportConfiguration/ExportConfigurationPanel";
import EditableCourseListPanel from "../editableCourseList/EditableCourseListPanel";

import type { RootState } from "../../redux/store";

import { MdClass, MdArrowBack } from "react-icons/md";
import { FaFileExport, FaInfoCircle } from "react-icons/fa";




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
        <Container className='pb-7'>

            <Box className='flex mb-6'>
                <Button variant='contained' className='mt-5' onClick={()=> navigate('/')} >
                    <MdArrowBack className='mr-2' />
                    Back to timetables
                </Button>
            </Box>

            <Paper elevation={2}>
                <Tabs 
                    value={tab} 
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab icon={ <FaInfoCircle /> } iconPosition="start" label='Info' />
                    <Tab icon={ <MdClass /> } iconPosition="start" label='Courses' />
                    <Tab icon={ <FaFileExport /> } iconPosition="start" label='Export' />
                </Tabs>

                <Box className='p-3 bg-gray-100'>
                    {
                        tab === 0?
                        <TimetableInfoPanel timetable={timetable} />
                        :
                        tab === 1?
                        <EditableCourseListPanel timetable={timetable} />
                        :
                        <ExportConfigurationPanel timetable={timetable} />
                    }
                </Box>
            </Paper>

        </Container>
    </>
}