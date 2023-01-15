
import type { IThemeBackgroundLayer } from "../../../model/types/render/theme/IThemeBackgroundLayer";
import type { IThemeClassesGridLayer } from "../../../model/types/render/theme/IThemeClassesGridLayer";
import { IThemeClassesLabelLayer } from "../../../model/types/render/theme/IThemeClassesLabelLayer";
import type { IThemeLabelGridLayer } from "../../../model/types/render/theme/IThemeLabelGridLayer";
import type { IThemeLabelLayer } from "../../../model/types/render/theme/IThemeLabelLayer";
import type { IThemeSlotGridLayer } from "../../../model/types/render/theme/IThemeSlotGridLayer";
import type { ITimetableThemeReport } from "../../../model/types/render/theme/ITimetableThemeReport";




const MARVEL = "'Marvel', cursive";

const BACKGROUND = '#CCCEE3';

const LABELINDICATOR = '#0861A3';
const LABELGRID = '#0268D7';

const STRIPCOLOR1 = '#CA141D';
const STRIPCOLOR2 = '#B31219';
const CLASSCOLOR = '#8F0505';

const FONT = '#FFFFFF';




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
        color: FONT,
        fontFamily: MARVEL,
    },
    labelIndicatorTime: {
        color: FONT,
        fontFamily: MARVEL,
    },
    labelDayOfWeek: {
        color: FONT,
        fontFamily: MARVEL,
    },
    labelTime: {
        color: FONT,
        fontFamily: MARVEL,
        lineHeight: 1.5,
    }
};


const classesGridLayer: IThemeClassesGridLayer = {
    classesBgColor: [ CLASSCOLOR ]
};


const classesLabelLayer: IThemeClassesLabelLayer = {
    classesTextStyle: [{
        courseName: {
            color: FONT,
            fontFamily: MARVEL,
        },
        venue: {
            color: FONT,
            fontFamily: MARVEL,
        },
        lecturer: {
            color: FONT,
            fontFamily: MARVEL,
        },
        courseCodeSectionNo: {
            color: FONT,
            fontFamily: MARVEL,
        },
    }],
};




export const spideyTheme: ITimetableThemeReport = {
    backgroundLayerTheme: backgroundLayer,
    labelGridLayerTheme: labelGridLayer,
    slotGridLayerTheme: slotGridLayer,
    labelLayerTheme: labelLayer,
    classesGridLayerTheme: classesGridLayer,
    classesLabelLayerTheme: classesLabelLayer,
}