import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';



export default function Router() {
    return <HashRouter>
        <Routes>
            <Route path="/" element={ <div>Testing In Ethan Branch 
                <span>WHATTTTTTTTTTTTTTTTTTTTTTTTTTTTT??</span>
                 </div> } />
            <Route path="*" element={ <div>404</div>} />
        </Routes>
    </HashRouter>
}