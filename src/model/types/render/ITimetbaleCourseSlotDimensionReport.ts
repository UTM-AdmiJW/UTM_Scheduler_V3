import { IEditableCourse } from "../../domain/IEditableCourse"
import { ITime } from "../../domain/ITime";
import { IGridDimension } from "./IGridDimension"



export interface ITimetableCourseSlotDimensionReport {
    [courseId: string]: {
        course: IEditableCourse,
        classes: {
            [classId: string]: {
                class: ITime,
                grid: IGridDimension,
                courseName: IGridDimension,
                courseCodeSectionNo: IGridDimension,
                lecturerName: IGridDimension,
                venue: IGridDimension,
            }
        };
    }
}