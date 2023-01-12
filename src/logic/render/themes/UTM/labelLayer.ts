
import { IThemeLabelLayer } from "../../../../model/types/render/theme/IThemeLabelLayer";


const fontFamily = 'Poppins, sans-serif';
const WHITE = '#FFFFFF';
const MAROON = '#81163F';

export const labelLayer: IThemeLabelLayer = {
    labelIndicatorDayOfWeek: {
        color: MAROON,
        fontFamily,
        fontStyle: 'bold',
    },
    labelIndicatorTime: {
        color: MAROON,
        fontFamily,
        fontStyle: 'bold',
    },
    labelDayOfWeek: {
        color: WHITE,
        fontFamily,
    },
    labelTime: {
        color: WHITE,
        lineHeight: 1.5,
        fontFamily,
    }
};