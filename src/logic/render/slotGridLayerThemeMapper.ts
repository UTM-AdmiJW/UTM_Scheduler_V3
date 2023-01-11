import { TimetableTheme } from "../../enums";

import type { ITimetable } from "../../model/domain/ITimetable";
import { IThemeSlotGridLayer } from "../../model/render/theme/IThemeSlotGridLayer";

import { slotGridLayerThemeUTM } from "./themes/slotGridLayer/slotGridLayerThemeUTM";


const map: Record<TimetableTheme, IThemeSlotGridLayer> = {
    [TimetableTheme.UTM] : slotGridLayerThemeUTM
}


export function getSlotGridLayerTheme(
    timetable: ITimetable,
): IThemeSlotGridLayer {

    const { theme } = timetable.exportConfig;
    if (theme in map) return map[theme];
    throw new Error(`Slot grid layer theme not found. Enum: ${theme}`);
}