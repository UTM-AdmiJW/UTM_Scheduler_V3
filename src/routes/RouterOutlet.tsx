import { Routes, Route, Navigate } from 'react-router-dom';


import { NotFoundStatusView } from '../components/statuses';
import TimetableListPage from '../views/timetableList/TimetableListPage';
import TimetablePage from '../views/timetable/TimetablePage';
import EditableCoursePage from '../views/editableCourse/EditableCoursePage';
import AnnouncePage from '../views/announce/AnnouncePage';
import VenuePage from '../views/venue/VenuePage';

export default function RouterOutlet() {
    return <>
        <Routes>
            <Route path="/" element={ <Navigate to='/timetable' replace /> } />
            
            <Route path='/timetable' element={ <TimetableListPage /> } />
            <Route path='/timetable/:id' element={ <TimetablePage /> } />
            <Route path='/timetable/:timetableId/course/:courseId' element={ <EditableCoursePage /> } />

            <Route path='/announcements' element={ <AnnouncePage /> } />
            <Route path='/venue' element={ <VenuePage /> } />

            <Route path="*" element={ <NotFoundStatusView />} />
        </Routes>
    </> 
}