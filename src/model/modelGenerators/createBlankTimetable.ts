import { v4 as uuidv4 } from "uuid";

import { TimetableTheme, TimetableWeekendType, TimetableOrientation } from "../../enums/";

import type { ITimetableExportConfig } from "../domain/ITimetableExportConfig";
import type { ITimetable } from "../domain/ITimetable";




const blankTimetableExportConfigTemplate: ITimetableExportConfig = {
    theme: TimetableTheme.UTM,
    orientation: TimetableOrientation.HORIZONTAL,

    weekendType: TimetableWeekendType.FRISAT,
    includeWeekends: false,
    visibleTimeRangeStart: 8,
    visibleTimeRangeEnd: 17,

    gridWidth: 125,
    gridHeight: 100,
    gridGap: 3,
    textPadding: 3,

    fontSizeDayOfWeekLabelIndiciator: 11,
    fontSizeTimeLabelIndiciator: 11,
    fontSizeDayOfWeekLabel: 13,
    fontSizeTimeLabel: 13,
    fontSizeCourseName: 13,
    fontSizeVenue: 10,
    fontSizeLecturer: 9,
    fontSizeCourseCode: 8,
}



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
    exportConfig: blankTimetableExportConfigTemplate,
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