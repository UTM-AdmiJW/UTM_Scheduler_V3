import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Container, Tabs, Tab,  Paper, Box } from "@mui/material";
import TimetableNotFound from "./TimetableNotFound";
import TimetableNameEdit from "./TimetableNameEdit";
import TimetableDescriptionEdit from "./TimetableDescriptionEdit";
import ExportConfigurationPanel from "../exportConfiguration/ExportConfigurationPanel";
import EditableCourseListPanel from "../editableCourseList/EditableCourseListPanel";

import type { RootState } from "../../redux/store";

import { MdClass, MdSettings } from "react-icons/md";




export default function TimetablePage() {
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

            <TimetableNameEdit timetable={timetable} />
            <div className='mb-5' />
            <TimetableDescriptionEdit timetable={timetable} />
            <div className='my-6' />

            <Paper elevation={2}>
                <Tabs 
                    value={tab} 
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab icon={ <MdClass /> } iconPosition="start" label='Courses' />
                    <Tab icon={ <MdSettings /> } iconPosition="start" label='Export Configuration' />
                </Tabs>

                <Box className='px-4 py-6 bg-gray-100'>
                    {
                        tab === 0?
                        <EditableCourseListPanel timetable={timetable} />
                        :
                        tab === 1?
                        <ExportConfigurationPanel timetable={timetable} />
                        :
                        <div>Tab 3</div>
                    }
                </Box>
                
            </Paper>

        </Container>
    </>
}