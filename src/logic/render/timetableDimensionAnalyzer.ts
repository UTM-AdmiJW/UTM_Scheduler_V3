

import { DayOfWeek, TimetableWeekendType } from "../../enums";

import type { ITimetable } from "../../model/domain/ITimetable";
import type { ITimetableDimensionReport } from "../../model/render/ITimetableDimensionReport";

import { 
    getNoRowsAndCols, 
    getTimetableWidth, getTimetableHeight,
    getGridDimensionFromRowCol,
    getGridDimensionFromDayTime,

    weekFriSatExcludeWeekend, weekFriSatIncludeWeekend,
    weekSatSunExcludeWeekend, weekSatSunIncludeWeekend,
} from "../../util/timetableRenderUtils";




export function generateTimetableDimensionReport(
    timetable: ITimetable,
): ITimetableDimensionReport {
    
    const { 
        gridGap, gridHeight, gridWidth,
        orientation, weekendType, includeWeekends,
        visibleTimeRangeEnd, visibleTimeRangeStart,
    } = timetable.exportConfig;

    const { nRows, nCols } = getNoRowsAndCols(visibleTimeRangeStart, visibleTimeRangeEnd, orientation, includeWeekends);
    const width = getTimetableWidth(gridGap, gridWidth, nCols);
    const height = getTimetableHeight(gridGap, gridHeight, nRows);

    return {
        width, height, nRows, nCols,
        gridWidth, gridHeight, gridGap,
        orientation, weekendType, includeWeekends,
        visibleTimeRangeStart, visibleTimeRangeEnd,
        

        getGridDimensionFromRowCol: (nRow, nCol)=> {
            return getGridDimensionFromRowCol(gridGap, gridWidth, gridHeight, nRow, nCol);
        },

        getGridDimensionFromDayTime: (
            dayOfWeek: DayOfWeek, 
            beginTime: number, 
            endTime: number
        )=> (
            getGridDimensionFromDayTime(
                gridGap, gridWidth, gridHeight, 
                orientation, weekendType, 
                visibleTimeRangeStart, 
                dayOfWeek, beginTime, endTime
            )
        ),

        getDayOfWeeks: ()=> {
            if (includeWeekends) {
                return weekendType === TimetableWeekendType.FRISAT?
                    weekFriSatIncludeWeekend : weekSatSunIncludeWeekend;
            }
            else {
                return weekendType === TimetableWeekendType.FRISAT?
                    weekFriSatExcludeWeekend : weekSatSunExcludeWeekend;
            }
        }
    }
};