import { CourseCatalogProgress } from "../../enums/CourseCatalogProgress";

import type { ISubjekSeksyen_SeksyenDTO } from "../DTO/SubjekSeksyen/ISubjekSeksyen_SeksyenDTO";
import type { IJadualSubjek_Combine } from "../DTO/JadualSubjek/IJadualSubjek_Combine";
import type { ISesiSemesterDTO } from "../DTO/SesiSemester/ISesiSemesterDTO";
import type { ISubjekSeksyenDTO } from "../DTO/SubjekSeksyen/ISubjekSeksyenDTO";


export interface ICourseCatalogState {
    progress: CourseCatalogProgress;
    
    // Session and semester 
    sesiSemester?: ISesiSemesterDTO;
    // Subject data and its sections
    subjekSeksyen?: ISubjekSeksyenDTO;      
    // The selected section
    seksyen?: ISubjekSeksyen_SeksyenDTO;
    // The combined timeslots of the selected section
    jadualSubjek?: IJadualSubjek_Combine[];
}