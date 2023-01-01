import { Routes, Route } from 'react-router-dom';


import TestPage from '../views/TestPage';
import TimetableListPage from '../views/timetableList/TimetableListPage';
import TimetablePage from '../views/timetable/TimetablePage';



export default function RouterOutlet() {
    return <Routes>
        <Route path="/" element={ <TimetableListPage /> } />
        <Route path='/timetable/:id' element={ <TimetablePage /> } />
        <Route path='test' element={ <TestPage /> } />
        <Route path="*" element={ <div>404</div>} />
    </Routes>
}