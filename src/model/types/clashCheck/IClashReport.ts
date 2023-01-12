import { DayOfWeek } from "../../../enums";
import { IEditableCourse } from "../../domain/IEditableCourse";



/**
 * Represents a report on whether there is a clash of class between multiple editableCourses
 */
export interface IClashReport {
    isClash: boolean;
    clashes: IClashInstance[]; 
}


/**
 * Represents information on a clash between two editableCourses
 */
export interface IClashInstance {
    course1: IEditableCourse;
    course2: IEditableCourse;
    overlapStartTime: number;
    overlapEndTime: number;
    dayOfWeek: DayOfWeek;
}