import { IEditableCourse } from "../../domain/IEditableCourse";
import { ITime } from "../../domain/ITime";



/**
 * The result type when a IEditableCourse have its timeList flat mapped into a array
 */
export interface IEditableCourseTimeComposite {
    time: ITime,
    course: IEditableCourse,
}