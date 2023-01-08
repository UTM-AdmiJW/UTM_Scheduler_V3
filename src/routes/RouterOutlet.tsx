import { Routes, Route } from 'react-router-dom';


import TimetableListPage from '../views/timetableList/TimetableListPage';
import TimetablePage from '../views/timetable/TimetablePage';
import { NotFoundStatusView } from '../components/statuses';
import EditableCoursePage from '../views/editableCourse/EditableCoursePage';


export default function RouterOutlet() {
    return <Routes>
        <Route path="/" element={ <TimetableListPage /> } />
        <Route path='/timetable/:id' element={ <TimetablePage /> } />
        <Route path='/timetable/:timetableId/course/:courseId' element={ <EditableCoursePage /> } />
        <Route path="*" element={ <NotFoundStatusView />} />
    </Routes>
}