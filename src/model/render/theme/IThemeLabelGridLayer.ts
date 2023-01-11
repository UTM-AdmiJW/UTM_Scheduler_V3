import { IThemeLayer } from "./IThemeLayer";


export interface IThemeLabelGridLayer extends IThemeLayer {
    labelIndicatorDayOfWeekBgColor: string;
    labelIndicatorTimeBgColor: string;
    timeLabelColor: string;
    dayOfWeekLabelColor: string;
}