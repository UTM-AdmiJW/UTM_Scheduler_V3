import { DayOfWeek, TimetableOrientation } from "../../enums";

import type { IGridDimension } from "../../model/render/IGridDimension";
import type { ITimetableDimensionReport } from "../../model/render/ITimetableDimensionReport";
import type { ITimetableGridReport } from "../../model/render/ITimetableGridReport";
import { getPlacementTime } from "../../util/timetableRenderUtils";



export function getTimetableGrid(
    timetableDimensionReport: ITimetableDimensionReport,
): ITimetableGridReport {
    return {
        labelIndicator: getLabelIndicatorGridDimensions( timetableDimensionReport ),
        dayOfWeekLabel: getDayOfWeekLabelGridDimensions( timetableDimensionReport ),
        timeLabel: getTimeLabelGridDimensions( timetableDimensionReport ),
        slots: getTimeSlotGridDimensions( timetableDimensionReport ),
    };
}



//=============================
// Modularized helper functions
//=============================

// Get the dimension for label indicator (At row 0 col 0)
function getLabelIndicatorGridDimensions( timetableDimensionReport: ITimetableDimensionReport ) {
    
    const { gridGap, getGridDimensionFromRowCol, orientation } = timetableDimensionReport;

    const fullGridDimension = getGridDimensionFromRowCol(0, 0);
    const height = (fullGridDimension.height - gridGap) / 2;

    const upperHalf: IGridDimension = {
        ...fullGridDimension,
        height: height,
        endY: fullGridDimension.startY + height,
    };
    const lowerHalf: IGridDimension = {
        ...fullGridDimension,
        height: height,
        startY: fullGridDimension.endY - height,
    }

    return {
        dayOfWeek: orientation === TimetableOrientation.HORIZONTAL? lowerHalf: upperHalf,
        time: orientation === TimetableOrientation.HORIZONTAL? upperHalf: lowerHalf,
    };
}




// Get the dimension for day of week labels
function getDayOfWeekLabelGridDimensions( timetableDimensionReport: ITimetableDimensionReport ) {
    
    const {
        visibleTimeRangeStart,
        getGridDimensionFromDayTime,
        getDayOfWeeks,
    } = timetableDimensionReport;

    const res = {} as Record<DayOfWeek, IGridDimension>;

    getDayOfWeeks().forEach((dayOfWeek) => {
        res[dayOfWeek] = getGridDimensionFromDayTime(dayOfWeek, visibleTimeRangeStart-1, visibleTimeRangeStart)
    });

    return res;
}



// Get the dimension for time labels
function getTimeLabelGridDimensions( timetableDimensionReport: ITimetableDimensionReport ) {

    const {
        orientation, getGridDimensionFromRowCol, 
        visibleTimeRangeStart, visibleTimeRangeEnd,
    } = timetableDimensionReport;

    const res = {} as Record<number, IGridDimension>;

    if (orientation === TimetableOrientation.HORIZONTAL) {
        for (let i = visibleTimeRangeStart; i < visibleTimeRangeEnd; ++i)
            res[i] = getGridDimensionFromRowCol(0, getPlacementTime(i, visibleTimeRangeStart));
    } 
    else {
        for (let i = visibleTimeRangeStart; i < visibleTimeRangeEnd; ++i)
            res[i] = getGridDimensionFromRowCol(getPlacementTime(i, visibleTimeRangeStart), 0);
    }

    return res;
}



// Get the dimension for time slots
function getTimeSlotGridDimensions( timetableDimensionReport: ITimetableDimensionReport ) {

    const {
        visibleTimeRangeStart, visibleTimeRangeEnd,
        getDayOfWeeks,
        getGridDimensionFromDayTime
    } = timetableDimensionReport;

    const res = {} as Record<DayOfWeek, Record<number, IGridDimension>>;

    getDayOfWeeks().forEach(dayOfWeek => {
        res[dayOfWeek] = {};

        for (let i = visibleTimeRangeStart; i < visibleTimeRangeEnd; ++i)
            res[dayOfWeek][i] = getGridDimensionFromDayTime(dayOfWeek, i, i+1);
    })

    return res;
}