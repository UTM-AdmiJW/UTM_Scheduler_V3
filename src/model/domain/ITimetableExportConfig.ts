import { TimetableOrientation, TimetableTheme, TimetableWeekendType } from "../../enums/";


export interface ITimetableExportConfig {
    // Appearances
    theme: TimetableTheme;
    orientation: TimetableOrientation;
    
    // Timetable
    weekendType: TimetableWeekendType;
    includeWeekends: boolean;
    visibleTimeRangeStart: number;
    visibleTimeRangeEnd: number;

    // Sizing
    gridWidth: number;
    gridHeight: number;
    gridGap: number;

    // Font sizes
    fontSizeDayOfWeekLabelIndiciator: number;
    fontSizeTimeLabelIndiciator: number;
    fontSizeDayOfWeekLabel: number;
    fontSizeTimeLabel: number;
    fontSizeCourseName: number;
    fontSizeVenue: number;
    fontSizeLecturer: number;
    fontSizeCourseCode: number;
}