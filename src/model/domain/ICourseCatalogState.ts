import { CourseCatalogProgress } from "../../enums/CourseCatalogProgress";
import { ISeksyenDTO } from "../DTO/ISeksyenDTO";

import type { ISesiSemesterDTO } from "../DTO/ISesiSemesterDTO";
import { ISubjekDTO } from "../DTO/ISubjekDTO";


export interface ICourseCatalogState {
    progress: CourseCatalogProgress;
    
    sessionSemester?: ISesiSemesterDTO;
    subject?: ISubjekDTO;
    section?: ISeksyenDTO;
}