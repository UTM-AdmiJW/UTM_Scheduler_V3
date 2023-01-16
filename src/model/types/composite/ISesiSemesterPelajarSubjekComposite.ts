import { IPelajarSubjekDTO } from "../../DTO/PelajarSubjek/IPelajarSubjekDTO";
import { ISesiSemesterDTO } from "../../DTO/SesiSemester/ISesiSemesterDTO";


export interface ISesiSemesterPelajarSubjekComposite {
    sesiSemester: ISesiSemesterDTO;
    pelajarSubjeks: IPelajarSubjekDTO[];
}