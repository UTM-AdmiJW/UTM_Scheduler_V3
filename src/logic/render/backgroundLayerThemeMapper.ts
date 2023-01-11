import { TimetableTheme } from "../../enums";

import type { ITimetable } from "../../model/domain/ITimetable";
import type { IThemeBackgroundLayer } from "../../model/render/theme/IThemeBackgroundLayer";

import { backgroundLayerThemeUTM } from "./themes/backgroundLayer/backgroundLayerThemeUTM";


const map: Record<TimetableTheme, IThemeBackgroundLayer> = {
    [TimetableTheme.UTM] : backgroundLayerThemeUTM
}


export function getBackgroundLayerTheme(
    timetable: ITimetable,
): IThemeBackgroundLayer {

    const { theme } = timetable.exportConfig;
    if (theme in map) return map[theme];
    throw new Error(`Background layer theme not found. Enum: ${theme}`);
}