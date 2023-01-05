import { Routes, Route } from 'react-router-dom';


import TestPage from '../views/TestPage';
import TimetableListPage from '../views/timetableList/TimetableListPage';
import TimetablePage from '../views/timetable/TimetablePage';
import NotFoundPage from '../components/NotFound/NotFoundPage';


export default function RouterOutlet() {
    return <Routes>
        <Route path="/" element={ <TimetableListPage /> } />
        <Route path='/timetable/:id' element={ <TimetablePage /> } />
        <Route path='test' element={ <TestPage /> } />
        <Route path="*" element={ <NotFoundPage />} />
    </Routes>
}