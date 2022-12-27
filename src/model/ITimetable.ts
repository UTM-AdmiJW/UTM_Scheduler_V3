import { IEditableCourse } from "./IEditableCourse";
import { IStudent } from "./IStudent";


export interface ITimetable {
    id: number;

    timetableName: string;
    createdBy: IStudent;

    editableCourses: IEditableCourse[];
}