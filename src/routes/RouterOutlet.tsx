import { Routes, Route } from 'react-router-dom';


import { NotFoundStatusView } from '../components/statuses';
import TimetableListPage from '../views/timetableList/TimetableListPage';
import TimetablePage from '../views/timetable/TimetablePage';
import EditableCoursePage from '../views/editableCourse/EditableCoursePage';
import AnnouncePage from '../views/announce/AnnouncePage';

export default function RouterOutlet() {
    return <Routes>
        <Route path="/" element={ <TimetableListPage /> } />
        <Route path='/timetable/:id' element={ <TimetablePage /> } />
        <Route path='/timetable/:timetableId/course/:courseId' element={ <EditableCoursePage /> } />
        <Route path="*" element={ <NotFoundStatusView />} />
        <Route path='Announcements' element={ <AnnouncePage /> } />
    </Routes>
}