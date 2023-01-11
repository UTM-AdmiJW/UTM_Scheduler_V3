

/**
 * This interface defines a dimension of a timetable grid.
 * 
 * @prop width The width of the grid
 * @prop height The height of the grid
 * 
 * @prop startX The starting x position of the grid
 * @prop startY The starting y position of the grid
 * @prop endX The ending x position of the grid
 * @prop endY The ending y position of the grid
 */
export interface IGridDimension {
    width: number;
    height: number;

    startX: number;
    startY: number;
    endX: number;
    endY: number;
}