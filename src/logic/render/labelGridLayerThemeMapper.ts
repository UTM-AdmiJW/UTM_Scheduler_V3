import { TimetableTheme } from "../../enums";

import type { ITimetable } from "../../model/domain/ITimetable";
import type { IThemeLabelGridLayer } from "../../model/render/theme/IThemeLabelGridLayer";

import { labelGridLayerThemeUTM } from "./themes/labelGridLayer/labelGridLayerThemeUTM";


const map: Record<TimetableTheme, IThemeLabelGridLayer> = {
    [TimetableTheme.UTM] : labelGridLayerThemeUTM
}


export function getLabelGridLayerTheme(
    timetable: ITimetable,
): IThemeLabelGridLayer {

    const { theme } = timetable.exportConfig;
    if (theme in map) return map[theme];
    throw new Error(`Label grid layer theme not found. Enum: ${theme}`);
}