import { ITime } from "./ITime";


export interface IEditableCourse {
    id: string;

    courseCode: string;
    courseName: string;
    sectionNo: number;
    lecturer: string;

    timeList: ITime[];
}