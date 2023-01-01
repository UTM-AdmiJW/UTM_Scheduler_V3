import { v4 as uuidv4 } from "uuid";

import type { IEditableCourse } from "../domain/IEditableCourse";


// This is the default timetable template that is used when a new timetable is created
//
// Please note that the below fields are not initialized and would need to be set by external data:
//      1. createdBy
//
const blankEditableCourseTemplate: IEditableCourse = {
    id: uuidv4(),

    courseCode: "",
    courseName: "Untitled Course",
    lecturer: "",
    sectionNo: 0,

    timeList: [],
};


const createBlankEditableCourse = (): IEditableCourse => {
    return { 
        ...blankEditableCourseTemplate, 
        id: uuidv4(),
    };
};


export default createBlankEditableCourse;