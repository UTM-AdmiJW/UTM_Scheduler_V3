import { CourseCatalogProgress } from "../../enums/CourseCatalogProgress";

import type { ISeksyenDTO } from "../DTO/ISeksyenDTO";
import type { ICombinedJadualDTO } from "../DTO/ICombinedJadualDTO";
import type { ISesiSemesterDTO } from "../DTO/ISesiSemesterDTO";
import type { ISubjekSeksyenDTO } from "../DTO/ISubjekSeksyenDTO";


export interface ICourseCatalogState {
    progress: CourseCatalogProgress;
    
    sessionSemester?: ISesiSemesterDTO;
    course?: ISubjekSeksyenDTO;
    section?: ISeksyenDTO;
    times?: ICombinedJadualDTO[];
}