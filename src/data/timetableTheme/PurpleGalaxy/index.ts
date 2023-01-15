
import type { IThemeBackgroundLayer } from "../../../model/types/render/theme/IThemeBackgroundLayer";
import type { IThemeClassesGridLayer } from "../../../model/types/render/theme/IThemeClassesGridLayer";
import { IThemeClassesLabelLayer } from "../../../model/types/render/theme/IThemeClassesLabelLayer";
import type { IThemeLabelGridLayer } from "../../../model/types/render/theme/IThemeLabelGridLayer";
import type { IThemeLabelLayer } from "../../../model/types/render/theme/IThemeLabelLayer";
import type { IThemeSlotGridLayer } from "../../../model/types/render/theme/IThemeSlotGridLayer";
import type { ITimetableThemeReport } from "../../../model/types/render/theme/ITimetableThemeReport";




const RAJDHANI = "'Rajdhani', sans-serif";

const BACKGROUND = '#BB96DC';

const LABELINDICATOR = '#1B1145';
const LABELGRID = '#1B1145';

const STRIPCOLOR = '#100B1F';
const CLASSCOLOR = '#412279';

const FONT = '#BB96DC';




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
    stripBgColors: [ STRIPCOLOR ]
};


const labelLayer: IThemeLabelLayer = {
    labelIndicatorDayOfWeek: {
        color: FONT,
        fontFamily: RAJDHANI,
    },
    labelIndicatorTime: {
        color: FONT,
        fontFamily: RAJDHANI,
    },
    labelDayOfWeek: {
        color: FONT,
        fontFamily: RAJDHANI,
    },
    labelTime: {
        color: FONT,
        fontFamily: RAJDHANI,
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
            fontFamily: RAJDHANI,
        },
        venue: {
            color: FONT,
            fontFamily: RAJDHANI,
        },
        lecturer: {
            color: FONT,
            fontFamily: RAJDHANI,
        },
        courseCodeSectionNo: {
            color: FONT,
            fontFamily: RAJDHANI,
        },
    }],
};




export const purpleGalaxyTheme: ITimetableThemeReport = {
    backgroundLayerTheme: backgroundLayer,
    labelGridLayerTheme: labelGridLayer,
    slotGridLayerTheme: slotGridLayer,
    labelLayerTheme: labelLayer,
    classesGridLayerTheme: classesGridLayer,
    classesLabelLayerTheme: classesLabelLayer,
}