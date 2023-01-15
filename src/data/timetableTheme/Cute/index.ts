
import type { IThemeBackgroundLayer } from "../../../model/types/render/theme/IThemeBackgroundLayer";
import type { IThemeClassesGridLayer } from "../../../model/types/render/theme/IThemeClassesGridLayer";
import { IThemeClassesLabelLayer } from "../../../model/types/render/theme/IThemeClassesLabelLayer";
import type { IThemeLabelGridLayer } from "../../../model/types/render/theme/IThemeLabelGridLayer";
import type { IThemeLabelLayer } from "../../../model/types/render/theme/IThemeLabelLayer";
import type { IThemeSlotGridLayer } from "../../../model/types/render/theme/IThemeSlotGridLayer";
import type { ITimetableThemeReport } from "../../../model/types/render/theme/ITimetableThemeReport";




const GRANDMASTER = "'Grandstander', cursive";

const BACKGROUND = '#FFFFFF';

const LABELINDICATOR = '#FF7199';
const LABELGRID = '#FF7199';

const STRIPCOLOR1 = '#FFBADA';
const STRIPCOLOR2 = '#FFE2EA';
const CLASSCOLOR = '#FF90C3';

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
        fontFamily: GRANDMASTER,
    },
    labelIndicatorTime: {
        color: FONT,
        fontFamily: GRANDMASTER,
    },
    labelDayOfWeek: {
        color: FONT,
        fontFamily: GRANDMASTER,
    },
    labelTime: {
        color: FONT,
        fontFamily: GRANDMASTER,
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
            fontFamily: GRANDMASTER,
        },
        venue: {
            color: FONT,
            fontFamily: GRANDMASTER,
        },
        lecturer: {
            color: FONT,
            fontFamily: GRANDMASTER,
        },
        courseCodeSectionNo: {
            color: FONT,
            fontFamily: GRANDMASTER,
        },
    }],
};




export const cuteTheme: ITimetableThemeReport = {
    backgroundLayerTheme: backgroundLayer,
    labelGridLayerTheme: labelGridLayer,
    slotGridLayerTheme: slotGridLayer,
    labelLayerTheme: labelLayer,
    classesGridLayerTheme: classesGridLayer,
    classesLabelLayerTheme: classesLabelLayer,
}