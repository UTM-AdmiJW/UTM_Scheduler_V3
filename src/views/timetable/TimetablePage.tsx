import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import { Container, Tabs, Tab,  Paper, Box, Button } from "@mui/material";
import TimetableInfoPanel from "../timetableInfo/TimetableInfoPanel";
import ExportPanel from "../export/ExportPanel";
import EditableCourseListPanel from "../editableCourseList/EditableCourseListPanel";
import { NotFoundStatusView } from "../../components/statuses";

import { useTimetableRedux } from "../../hooks/redux/useTimetableRedux";

import { MdClass, MdArrowBack } from "react-icons/md";
import { FaFileExport, FaInfoCircle } from "react-icons/fa";




enum TimetablePageTabs {
    INFO = 0,
    COURSES = 1,
    EXPORT = 2,
}


export default function TimetablePage() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Using ?tab=0 in the url will set the tab to first tab, and so on
    const [ searchParams, setSearchParams ] = useSearchParams();
    const tabParam = parseInt(searchParams.get('tab') || '0');
    const [ tab, setTab ] = useState<TimetablePageTabs>( tabParam );

    const { timetableState: { timetables } } = useTimetableRedux();



    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
        setSearchParams({ tab: newValue.toString() });
    };



    // If timetable does not exist, show error message and link to timetable list page
    if (!timetables[id!]) return <NotFoundStatusView title='No timetable found' message='The selected timetable cannot be found anymore.' />
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
                        <ExportPanel timetable={timetable} />
                    }
                </Box>
            </Paper>

        </Container>
    </>
}