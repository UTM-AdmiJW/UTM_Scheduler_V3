import type { IThemeLayer } from "./IThemeLayer";


/**
 * Define the colors used to render the grid of classes in the grid layer.
 * 
 * It can either be an array of colors, which is used alternating for each class,
 * or a map of class ID to color, which can be useful for customized timetables.
 */
export interface IThemeClassesGridLayer extends IThemeLayer {
    classesBgColor: Record<string, string> | string[];
}