
import { RegisteredCoursesProgress } from "../../enums/RegisteredCoursesProgress";

import type { IPelajarSubjekDTO } from "../DTO/PelajarSubjek/IPelajarSubjekDTO";


export interface IRegisteredCoursesState {
    progress: RegisteredCoursesProgress;
    
    pelajarSubjek?: IPelajarSubjekDTO;
}