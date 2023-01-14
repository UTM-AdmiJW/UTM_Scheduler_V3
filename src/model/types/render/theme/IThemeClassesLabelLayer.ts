import type { IThemeLayer } from "./IThemeLayer";
import type { IClassesTextStyles } from "./IClassesTextStyles";


/**
 * Define the colors used to render the text of classes
 * 
 * It can either be an array of ITextStyle, which is used alternating for each class,
 * or a map of class ID to ITextStyle, which can be useful for customized timetables.
 */
export interface IThemeClassesLabelLayer extends IThemeLayer {
    classesTextStyle: Record<string, IClassesTextStyles> | IClassesTextStyles[];
}