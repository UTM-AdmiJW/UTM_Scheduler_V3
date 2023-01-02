import { v4 as uuidv4 } from "uuid";

import type { IEditableCourse } from "../domain/IEditableCourse";


// This is the default blank course template. It is used to create a new blank course.
// More caution must be practiced:
//
//   - Upon function call, give a new id
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