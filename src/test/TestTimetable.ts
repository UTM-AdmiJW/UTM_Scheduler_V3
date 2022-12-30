
import type { ITimetable } from "../model/ITimetable";


const testTimetable: ITimetable = {
    id: 1,
    timetableName: "Test Timetable",
    createdDate: new Date(),
    lastModifiedDate: new Date(),
    createdBy: {
        name: "Test Student",
        matricNo: "A1234567X"
    },
    description: "This is a test timetable",
    editableCourses: []
};


export default testTimetable;