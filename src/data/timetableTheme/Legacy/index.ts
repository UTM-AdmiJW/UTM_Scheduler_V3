
import type { IThemeBackgroundLayer } from "../../../model/types/render/theme/IThemeBackgroundLayer";
import type { IThemeClassesGridLayer } from "../../../model/types/render/theme/IThemeClassesGridLayer";
import { IThemeClassesLabelLayer } from "../../../model/types/render/theme/IThemeClassesLabelLayer";
import type { IThemeLabelGridLayer } from "../../../model/types/render/theme/IThemeLabelGridLayer";
import type { IThemeLabelLayer } from "../../../model/types/render/theme/IThemeLabelLayer";
import type { IThemeSlotGridLayer } from "../../../model/types/render/theme/IThemeSlotGridLayer";
import type { ITimetableThemeReport } from "../../../model/types/render/theme/ITimetableThemeReport";




const POPPINS = "'Poppins', sans-serif";

const WHITE = '#FFFFFF';
const BACKGROUND = '#FFFFFF';
const LABELINDICATOR = '#7F8082';
const LABELGRID = '#70AD46';
const STRIP1 = '#C6E0B3';
const STRIP2 = '#A9D08F';






const backgroundLayer: IThemeBackgroundLayer = {
    backgroundColor: BACKGROUND,
};


const labelGridLayer: IThemeLabelGridLayer = {
    labelIndicatorDayOfWeekBgColor: LABELINDICATOR,
    labelIndicatorTimeBgColor: LABELINDICATOR,
    dayOfWeekLabelColor: LABELGRID,
    timeLabelColor: LABELGRID,
};


const slotGridLayer: IThemeSlotGridLayer = {
    stripBgColors: [ STRIP1, STRIP2 ]
};


const labelLayer: IThemeLabelLayer = {
    labelIndicatorDayOfWeek: {
        color: WHITE,
        fontFamily: POPPINS,
        fontStyle: 'bold',
    },
    labelIndicatorTime: {
        color: WHITE,
        fontFamily: POPPINS,
        fontStyle: 'bold',
    },
    labelDayOfWeek: {
        color: WHITE,
        fontFamily: POPPINS,
    },
    labelTime: {
        color: WHITE,
        lineHeight: 1.5,
        fontFamily: POPPINS,
    }
};


const classesGridLayer: IThemeClassesGridLayer = {
    classesBgColor: [ 
        '#3498DB',
        '#6AB04C',
        '#E74C3C',
        '#9B59B6',
        '#34495E',
        '#F1C40F',
        '#3A40B6',
        '#2ECC71',
        '#E67E22',
        '#686DE0',
    ]
};


const classesLabelLayer: IThemeClassesLabelLayer = {
    classesTextStyle: [{
        courseName: {
            color: WHITE,
            fontFamily: POPPINS,
        },
        venue: {
            color: WHITE,
            fontFamily: POPPINS,
            fontStyle: 'bold',
        },
        lecturer: {
            color: WHITE,
            fontFamily: POPPINS,
        },
        courseCodeSectionNo: {
            color: WHITE,
            fontFamily: POPPINS,
        },
    }],
};




export const legacyTheme: ITimetableThemeReport = {
    backgroundLayerTheme: backgroundLayer,
    labelGridLayerTheme: labelGridLayer,
    slotGridLayerTheme: slotGridLayer,
    labelLayerTheme: labelLayer,
    classesGridLayerTheme: classesGridLayer,
    classesLabelLayerTheme: classesLabelLayer,
}