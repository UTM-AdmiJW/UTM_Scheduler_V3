
import { RegisteredCoursesProgress } from "../../enums/";

import type { IJadualSubjek_Combine } from "../DTO/JadualSubjek/IJadualSubjek_Combine";
import type { ISubjekSeksyen_SeksyenDTO } from "../DTO/SubjekSeksyen/ISubjekSeksyen_SeksyenDTO";
import type { ISesiSemesterPelajarSubjekComposite } from "../types/composite/ISesiSemesterPelajarSubjekComposite";


/**
 * sesiSemesterToPelajarSubjek is populated when the user selects a session semester on step 2: Select Session Semester.
 */
export interface IRegisteredCoursesState {
    progress: RegisteredCoursesProgress;
    sesiSemesterPelajarSubjekComposite?: ISesiSemesterPelajarSubjekComposite;
}