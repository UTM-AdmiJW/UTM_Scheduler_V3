import { TimetableOrientation } from "../enums/TimetableOrientation";
import { TimetableTheme } from "../enums/TimetableTheme";
import { TimetableWeekendType } from "../enums/TimetableWeekendType";


export interface ITimetableExportConfig {
    theme: TimetableTheme;
    orientation: TimetableOrientation;
    weekendType: TimetableWeekendType;
    
    includeWeekends: boolean;
    visibleTimeRangeStart: number;
    visibleTimeRangeEnd: number;
    gridWidth: number;
    gridHeight: number;
    gridGap: number;

    fontSizeCourseName: number;
    fontSizeVenue: number;
    fontSizeLecturer: number;
    fontSizeCourseCode: number;
}