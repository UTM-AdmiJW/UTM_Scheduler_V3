
import { ISection } from "./ISection";


export interface ICourse {
    courseCode: string;
    courseName: string;
    sectionList: ISection[];
}