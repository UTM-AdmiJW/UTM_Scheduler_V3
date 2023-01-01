
import { ITime } from "./ITime";


export interface ISection {
    capacity: number;
    lecturer: string;
    programCode: string;
    sectionNo: number;
    timeList: ITime[];
}