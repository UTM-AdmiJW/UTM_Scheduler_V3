import { DayOfWeek, TimetableOrientation, TimetableWeekendType } from "../../enums";
import { IGridDimension } from "./IGridDimension";


/**
 * Reports the dimension data of the timetable.
 * 
 * @prop width The width of the whole timetable
 * @prop height The height of the whole timetable
 * @prop gridWidth The width of each individual grid
 * @prop gridHeight The height of each individual grid
 * @prop gridGap The x and y gap between each individual grid
 * @prop noRows The number of rows in the timetable, including the label row
 * @prop noCols The number of columns in the timetable, including the label column
 * 
 * @prop fontSizeCourseName The font size of the course name
 * @prop fontSizeVenue The font size of the venue
 * @prop fontSizeLecturer The font size of the lecturer
 * @prop fontSizeCourseCode The font size of the course code
 * 
 * @prop orientation The orientation of the timetable, vertical or horizontal
 * @prop weekendType The type of weekend, either Saturday or Sunday
 * @prop includeWeekends Whether to include weekends in the timetable
 * 
 * @prop visibleTimeRangeStart The start time of the visible time range, the time representing the leftmost column (not the label column)
 * @prop visibleTimeRangeEnd The end time of the visible time range, the time representing the rightmost column
 * 
 * @prop getGridDimensionFromRowCol function that returns the grid dimension of the grid at the specified row and column. 0 indexed
 * @prop getGridDimensionFromDayTime function that returns the grid dimension of the grid at the specified day and time. 0 indexed
 */
export interface ITimetableDimensionReport {
    width: number;
    height: number;
    gridWidth: number;
    gridHeight: number;
    gridGap: number;
    nRows: number;
    nCols: number;

    orientation: TimetableOrientation;
    weekendType: TimetableWeekendType;
    includeWeekends: boolean;

    visibleTimeRangeStart: number;
    visibleTimeRangeEnd: number;
    
    getGridDimensionFromRowCol: (row: number, col: number)=> IGridDimension;
    getGridDimensionFromDayTime: (dayOfWeek: DayOfWeek, beginTime: number, endTime: number)=> IGridDimension;
    getDayOfWeeks: ()=> readonly DayOfWeek[];
    
}