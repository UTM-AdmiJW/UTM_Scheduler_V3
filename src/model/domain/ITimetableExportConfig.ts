import { TimetableOrientation, TimetableTheme, TimetableWeekendType } from "../../enums/";


export interface ITimetableExportConfig {
    // Appearances
    theme: TimetableTheme;
    orientation: TimetableOrientation;
    
    // Grid
    weekendType: TimetableWeekendType;
    includeWeekends: boolean;
    visibleTimeRangeStart: number;
    visibleTimeRangeEnd: number;

    // Sizing
    gridWidth: number;
    gridHeight: number;
    gridGap: number;
    fontSizeCourseName: number;
    fontSizeVenue: number;
    fontSizeLecturer: number;
    fontSizeCourseCode: number;
}