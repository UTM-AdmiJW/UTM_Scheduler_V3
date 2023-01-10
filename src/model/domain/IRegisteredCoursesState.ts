
import { RegisteredCoursesProgress } from "../../enums/";

import type { IJadualSubjek_Combine } from "../DTO/JadualSubjek/IJadualSubjek_Combine";
import type { ISubjekSeksyen_SeksyenDTO } from "../DTO/SubjekSeksyen/ISubjekSeksyen_SeksyenDTO";
import type { IPelajarSubjekDTO } from "../DTO/PelajarSubjek/IPelajarSubjekDTO";



export interface IRegisteredCoursesState {
    progress: RegisteredCoursesProgress;
    
    pelajarSubjek?: IPelajarSubjekDTO;
    seksyen?: ISubjekSeksyen_SeksyenDTO;
    jadualSubjek?: IJadualSubjek_Combine[];
}