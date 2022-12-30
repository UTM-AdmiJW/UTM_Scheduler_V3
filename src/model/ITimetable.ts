import { IEditableCourse } from "./IEditableCourse";
import { IStudent } from "./IStudent";


export interface ITimetable {
    id: number;

    timetableName: string;
    createdDate: Date;
    lastModifiedDate: Date;
    createdBy: IStudent;
    description: string;

    editableCourses: IEditableCourse[];
}