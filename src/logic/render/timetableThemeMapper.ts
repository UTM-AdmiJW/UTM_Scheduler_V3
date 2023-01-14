import { TimetableTheme } from "../../enums";

import type { ITimetable } from "../../model/domain/ITimetable";
import type { ITimetableThemeReport } from "../../model/types/render/theme/ITimetableThemeReport";


import { utmTheme } from "../../timetableTheme/UTM";



const map: Record<TimetableTheme, ITimetableThemeReport> = {
    [TimetableTheme.UTM] : utmTheme,
}


export function getTimetableTheme(timetable: ITimetable): ITimetableThemeReport {
    const { theme } = timetable.exportConfig;
    if (theme in map) return map[theme];
    throw new Error(`Theme not found. Enum: ${theme}`);
}