import { DayOfWeek, TimetableOrientation, TimetableWeekendType } from "../enums";

import type { IGridDimension } from "../model/render/IGridDimension";


/**
 * Utilites that deal with rendering timetables and its grid.
 */




/**
 * Day of week arrays for different weekend types and whether weekend is included or not
 */
export const week: readonly DayOfWeek[] = [
    DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, 
    DayOfWeek.SATURDAY, DayOfWeek.SUNDAY
];
export const weekFriSatIncludeWeekend: readonly DayOfWeek[] = [ DayOfWeek.SUNDAY, ...week.slice(0, 6) ];
export const weekFriSatExcludeWeekend: readonly DayOfWeek[] = [ DayOfWeek.SUNDAY, ...week.slice(0, 4) ];
export const weekSatSunIncludeWeekend: readonly DayOfWeek[] = [ ...week ];
export const weekSatSunExcludeWeekend: readonly DayOfWeek[] = [ ...week.slice(0, 5) ];


/**
 * Returns the total number of rows and columns in a timetable
 * 
 * @param visibleTimeRangeStart The begin time range of a timetable
 * @param visibleTimeRangeEnd The end time range of a timetable
 * @param orientation The orientation of the timetable
 * @param includeWeekends Whether weekends are included in the timetable
 * @returns An object with properties nRowsa and nCols of type number
 */
export function getNoRowsAndCols(
    visibleTimeRangeStart: number,
    visibleTimeRangeEnd: number,
    orientation: TimetableOrientation,
    includeWeekends: boolean,
) {
    const timeSlots = visibleTimeRangeEnd - visibleTimeRangeStart;
    const timeSlotsAndLabel = timeSlots + 1;

    const dayOfWeekSlots = includeWeekends? 7: 5;   
    const dayOfWeekSlotsAndLabel = dayOfWeekSlots + 1;

    if (orientation === TimetableOrientation.HORIZONTAL) 
        return { nRows: dayOfWeekSlotsAndLabel, nCols: timeSlotsAndLabel };
    else
        return { nRows: timeSlotsAndLabel, nCols: dayOfWeekSlotsAndLabel };
}



/**
 * Returns the width of a timetable
 * 
 * @param gridGap The gap between grids
 * @param gridWidth The width of a grid
 * @param nCols The number of columns in the timetable
 * @returns The width of the timetable
 */
export function getTimetableWidth(
    gridGap: number,
    gridWidth: number,
    nCols: number,
) {
    return gridGap * (nCols + 1) + gridWidth * nCols;
}


/**
 * Returns the height of a timetable
 * 
 * @param gridGap The gap between grids
 * @param gridHeight The height of a grid
 * @param nRows The number of rows in the timetable
 * @returns The height of the timetable
 */
export function getTimetableHeight(
    gridGap: number,
    gridHeight: number,
    nRows: number,
) {
    return gridGap * (nRows + 1) + gridHeight * nRows;
}






/**
 * Get the placement (rol no/col no) of a day of week based on TimetableWeekendType
 * 
 * @param dayOfWeek day of week
 * @param weekendType weekend type of the timetable
 * @returns placement (rol number / column number)
 */
export function getPlacementDayOfWeek(
    dayOfWeek: DayOfWeek,
    weekendType: TimetableWeekendType,
) {
    // If weekendType is FRISAT, Sunday will be drawn on first non-label row/col.
    if (weekendType === TimetableWeekendType.FRISAT) return dayOfWeek;
    // If weekendType is SATSUN, Monday will be drawn on first non-label row/col.
    return (dayOfWeek - 1 === 0? 7: dayOfWeek - 1);
}


/**
 * Get the placement (rol no/col no) of a time slot based on visibleTimeRangeStart
 * 
 * @param time time
 * @param visibleTimeRangeStart the start time of the timetable
 * @returns placement (rol number / column number)
 */
export function getPlacementTime(
    time: number,
    visibleTimeRangeStart: number,
) {
    return (time - visibleTimeRangeStart) + 1;
}




export function getGridDimensionFromRowCol(
    gridGap: number,
    gridWidth: number,
    gridHeight: number,
    nRow: number,
    nCol: number,
): IGridDimension {
    const startX = gridGap * (nCol + 1) + gridWidth * nCol;
    const startY = gridGap * (nRow + 1) + gridHeight * nRow;
    const endX = startX + gridWidth;
    const endY = startY + gridHeight;

    return {
        startX, startY, endX, endY,
        height: gridHeight,
        width: gridWidth,
    };
}



export function combineGridDimensions(grids: IGridDimension[]): IGridDimension {
    const startX = Math.min(...grids.map(grid => grid.startX));
    const startY = Math.min(...grids.map(grid => grid.startY));
    const endX = Math.max(...grids.map(grid => grid.endX));
    const endY = Math.max(...grids.map(grid => grid.endY));
    const width = endX - startX;
    const height = endY - startY;

    return { startX, startY, endX, endY, width, height };
}



export function getGridDimensionFromDayTime(
    gridGap: number,
    gridWidth: number,
    gridHeight: number,
    orientation: TimetableOrientation,
    weekendType: TimetableWeekendType,
    visibleTimeRangeStart: number,
    dayOfWeek: DayOfWeek,
    beginTime: number,
    endTime: number,
): IGridDimension {
    if (orientation === TimetableOrientation.HORIZONTAL) {
        const row = getPlacementDayOfWeek(dayOfWeek, weekendType);
        const beginCol = getPlacementTime(beginTime, visibleTimeRangeStart);
        const endCol = getPlacementTime(endTime - 1, visibleTimeRangeStart);

        return combineGridDimensions([
            getGridDimensionFromRowCol(gridGap, gridWidth, gridHeight, row, beginCol),
            getGridDimensionFromRowCol(gridGap, gridWidth, gridHeight, row, endCol),
        ]);
    }
    else {
        const col = getPlacementDayOfWeek(dayOfWeek, weekendType);
        const beginRow = getPlacementTime(beginTime, visibleTimeRangeStart);
        const endRow = getPlacementTime(endTime - 1, visibleTimeRangeStart);

        return combineGridDimensions([
            getGridDimensionFromRowCol(gridGap, gridWidth, gridHeight, beginRow, col),
            getGridDimensionFromRowCol(gridGap, gridWidth, gridHeight, endRow, col),
        ]);
    }
}