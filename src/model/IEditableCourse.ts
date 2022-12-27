import { ITime } from "./ITime";


export interface IEditableCourse {
    courseCode: string;
    courseName: string;
    sectionNo: number;
    lecturer: string;

    timeList: ITime[];
}