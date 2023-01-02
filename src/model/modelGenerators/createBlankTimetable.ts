import { v4 as uuidv4 } from "uuid";
import type { ITimetable } from "../domain/ITimetable";

import { TimetableTheme } from "../../enums/TimetableTheme";
import { TimetableWeekendType } from "../../enums/TimetableWeekendType";
import { TimetableOrientation } from "../../enums/TimetableOrientation";


// This is the default timetable template that is used when a new timetable is created
// More caution must be practiced:
//
//   - Upon function call, give a new id
//   - createdBy must be externally set
//   - createdDate and lastModifiedDate must be set using the current date
//
const blankTimetableTemplate: ITimetable = {
    id: uuidv4(),
    timetableName: "Untitled Timetable",
    createdDate: new Date().toLocaleString(),
    lastModifiedDate: new Date().toLocaleString(),
    description: "A new timetable",
    editableCourses: {},
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

const createBlankTimetable = (): ITimetable => {
    return {
        ...blankTimetableTemplate,
        id: uuidv4(),
        createdDate: new Date().toLocaleString(),
        lastModifiedDate: new Date().toLocaleString(),
        createdBy: {
            ...blankTimetableTemplate.createdBy,
        },
        exportConfig: {
            ...blankTimetableTemplate.exportConfig,
        }
    };
};


export default createBlankTimetable;