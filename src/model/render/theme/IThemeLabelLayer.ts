import { IThemeLayer } from "./IThemeLayer";
import { ITextStyle } from "./ITextStyle";




export interface IThemeLabelLayer extends IThemeLayer {
    labelIndicatorDayOfWeek: ITextStyle;
    labelIndicatorTime: ITextStyle;
    labelDayOfWeek: ITextStyle;
    labelTime: ITextStyle;
}