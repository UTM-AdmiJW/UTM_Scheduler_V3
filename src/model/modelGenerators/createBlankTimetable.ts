import { v4 as uuidv4 } from "uuid";
import type { ITimetable } from "../domain/ITimetable";

import { TimetableTheme, TimetableWeekendType, TimetableOrientation } from "../../enums/";


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
        theme: TimetableTheme.UTM,
        orientation: TimetableOrientation.HORIZONTAL,
        weekendType: TimetableWeekendType.FRISAT,
        includeWeekends: false,
        visibleTimeRangeStart: 8,
        visibleTimeRangeEnd: 17,
        gridWidth: 250,
        gridHeight: 200,
        gridGap: 5,
        fontSizeCourseName: 25,
        fontSizeVenue: 20,
        fontSizeLecturer: 18,
        fontSizeCourseCode: 16,
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