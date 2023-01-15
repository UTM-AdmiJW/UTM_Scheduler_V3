
import type { IThemeBackgroundLayer } from "../../../model/types/render/theme/IThemeBackgroundLayer";
import type { IThemeClassesGridLayer } from "../../../model/types/render/theme/IThemeClassesGridLayer";
import { IThemeClassesLabelLayer } from "../../../model/types/render/theme/IThemeClassesLabelLayer";
import type { IThemeLabelGridLayer } from "../../../model/types/render/theme/IThemeLabelGridLayer";
import type { IThemeLabelLayer } from "../../../model/types/render/theme/IThemeLabelLayer";
import type { IThemeSlotGridLayer } from "../../../model/types/render/theme/IThemeSlotGridLayer";
import type { ITimetableThemeReport } from "../../../model/types/render/theme/ITimetableThemeReport";




const CANTORAONE = "'Cantora One', cursive";

const BACKGROUND = '#392C1D';

const LABELINDICATOR = '#55422B';
const LABELGRID = '#907A48';

const STRIPCOLOR1 = '#4F6336';
const STRIPCOLOR2 = '#4B6B3C';
const CLASSCOLOR = '#D4BF88';

const LABELINDICATORFONT = '#E6DEB9';
const LABELFONT = '#3B2E1E';
const CLASSFONT = '#3B2E1E';




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
    stripBgColors: [ STRIPCOLOR1, STRIPCOLOR2 ]
};


const labelLayer: IThemeLabelLayer = {
    labelIndicatorDayOfWeek: {
        color: LABELINDICATORFONT,
        fontFamily: CANTORAONE,
    },
    labelIndicatorTime: {
        color: LABELINDICATORFONT,
        fontFamily: CANTORAONE,
    },
    labelDayOfWeek: {
        color: LABELFONT,
        fontFamily: CANTORAONE,
    },
    labelTime: {
        color: LABELFONT,
        fontFamily: CANTORAONE,
        lineHeight: 1.5,
    }
};


const classesGridLayer: IThemeClassesGridLayer = {
    classesBgColor: [ CLASSCOLOR ]
};


const classesLabelLayer: IThemeClassesLabelLayer = {
    classesTextStyle: [{
        courseName: {
            color: CLASSFONT,
            fontFamily: CANTORAONE,
        },
        venue: {
            color: CLASSFONT,
            fontFamily: CANTORAONE,
        },
        lecturer: {
            color: CLASSFONT,
            fontFamily: CANTORAONE,
        },
        courseCodeSectionNo: {
            color: CLASSFONT,
            fontFamily: CANTORAONE,
        },
    }],
};




export const forestTheme: ITimetableThemeReport = {
    backgroundLayerTheme: backgroundLayer,
    labelGridLayerTheme: labelGridLayer,
    slotGridLayerTheme: slotGridLayer,
    labelLayerTheme: labelLayer,
    classesGridLayerTheme: classesGridLayer,
    classesLabelLayerTheme: classesLabelLayer,
}