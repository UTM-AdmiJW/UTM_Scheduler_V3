import { Routes, Route } from 'react-router-dom';


import TestPage from '../views/TestPage';
import TimetablePage from '../views/timetable/TimetablePage';



export default function RouterOutlet() {
    return <Routes>
        <Route path="/" element={ <TimetablePage /> } />
        <Route path='user' element={ <div>User</div> } />
        <Route path='test' element={ <TestPage /> } />
        <Route path="*" element={ <div>404</div>} />
    </Routes>
}