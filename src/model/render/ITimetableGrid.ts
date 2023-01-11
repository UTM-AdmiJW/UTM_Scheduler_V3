import { DayOfWeek } from "../../enums"
import type { IGridDimension } from "./IGridDimension"



/**
 * This interface describes the grid dimensions for a timetable.
 * 
 * @prop labelIndicator The grid dimensions of the label indicator.
 * @prop timeLabel A map of time label to grid dimensions.
 * @prop dayOfWeekLabel A map of day of week label to grid dimensions.
 * @prop slots A map of timeslots to grid dimensions.
 */
export interface ITimetableGrid {
    labelIndicator: {
        dayOfWeek: IGridDimension,
        time: IGridDimension,
    },
    timeLabel: Record<number, IGridDimension>,
    dayOfWeekLabel: Record<DayOfWeek, IGridDimension>,
    slots:Record<DayOfWeek, Record<number, IGridDimension>>;
}