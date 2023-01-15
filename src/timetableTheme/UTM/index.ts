
import type { IThemeBackgroundLayer } from "../../model/types/render/theme/IThemeBackgroundLayer";
import type { IThemeClassesGridLayer } from "../../model/types/render/theme/IThemeClassesGridLayer";
import { IThemeClassesLabelLayer } from "../../model/types/render/theme/IThemeClassesLabelLayer";
import type { IThemeLabelGridLayer } from "../../model/types/render/theme/IThemeLabelGridLayer";
import type { IThemeLabelLayer } from "../../model/types/render/theme/IThemeLabelLayer";
import type { IThemeSlotGridLayer } from "../../model/types/render/theme/IThemeSlotGridLayer";
import type { ITimetableThemeReport } from "../../model/types/render/theme/ITimetableThemeReport";




const POPPINS = 'Poppins, sans-serif';

const WHITE = '#FFFFFF';
const BLUE = '#1D3362';
const GOLD = '#F4AF00';
const MAROON = '#81163F';

const STRIP1 = '#F8F1D8';
const STRIP2 = '#F4EBC5';



const backgroundLayer: IThemeBackgroundLayer = {
    backgroundColor: '#332C2C',
};


const labelGridLayer: IThemeLabelGridLayer = {
    labelIndicatorDayOfWeekBgColor: GOLD,
    labelIndicatorTimeBgColor: GOLD,
    dayOfWeekLabelColor: MAROON,
    timeLabelColor: MAROON,
};


const slotGridLayer: IThemeSlotGridLayer = {
    stripBgColors: [ STRIP1, STRIP2 ]
};


const labelLayer: IThemeLabelLayer = {
    labelIndicatorDayOfWeek: {
        color: MAROON,
        fontFamily: POPPINS,
        fontStyle: 'bold',
    },
    labelIndicatorTime: {
        color: MAROON,
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
    classesBgColor: [ BLUE, ]
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




export const utmTheme: ITimetableThemeReport = {
    backgroundLayerTheme: backgroundLayer,
    labelGridLayerTheme: labelGridLayer,
    slotGridLayerTheme: slotGridLayer,
    labelLayerTheme: labelLayer,
    classesGridLayerTheme: classesGridLayer,
    classesLabelLayerTheme: classesLabelLayer,
}