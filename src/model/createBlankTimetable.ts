import { v4 as uuidv4 } from "uuid";
import type { ITimetable } from "./ITimetable";

import { TimetableTheme } from "../enums/TimetableTheme";
import { TimetableWeekendType } from "../enums/TimetableWeekendType";
import { TimetableOrientation } from "../enums/TimetableOrientation";


// This is the default timetable that is used when a new timetable is created
const blankTimetable: ITimetable = {
    id: uuidv4(),
    timetableName: "Untitled Timetable",
    createdDate: new Date(),
    lastModifiedDate: new Date(),
    description: "",
    editableCourses: [],
    createdBy: {
        name: "",
        matricNo: "",
    },
    exportConfig: {
        theme: TimetableTheme.DEFAULT,
        orientation: TimetableOrientation.HORIZONTAL,
        weekendType: TimetableWeekendType.FRISAT,
        includeWeekends: false,
        visibleTimeRangeStart: 8,
        visibleTimeRangeEnd: 17,
        gridWidth: 30,
        gridHeight: 30,
        gridGap: 5,
        fontSizeCourseName: 20,
        fontSizeVenue: 10,
        fontSizeLecturer: 10,
        fontSizeCourseCode: 10,
    }
};

export default (): ITimetable => {
    return {
        ...blankTimetable,
        id: uuidv4(),
        createdBy: {
            ...blankTimetable.createdBy,
        },
        exportConfig: {
            ...blankTimetable.exportConfig,
        }
    };
};