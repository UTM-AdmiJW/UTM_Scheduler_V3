import { TimetableTheme } from "../../enums";

import type { ITimetable } from "../../model/domain/ITimetable";
import type { ITimetableThemeReport } from "../../model/types/render/theme/ITimetableThemeReport";

import { utmTheme } from "../../data/timetableTheme/UTM";
import { legacyTheme } from "../../data/timetableTheme/Legacy";
import { purpleGalaxyTheme } from "../../data/timetableTheme/PurpleGalaxy";
import { cuteTheme } from "../../data/timetableTheme/Cute";
import { spideyTheme } from "../../data/timetableTheme/Spidey";
import { forestTheme } from "../../data/timetableTheme/Forest";



const map: Record<TimetableTheme, ITimetableThemeReport> = {
    [TimetableTheme.UTM] : utmTheme,
    [TimetableTheme.LEGACY]: legacyTheme,
    [TimetableTheme.PURPLE_GALAXY]: purpleGalaxyTheme,
    [TimetableTheme.CUTE]: cuteTheme,
    [TimetableTheme.SPIDEY]: spideyTheme,
    [TimetableTheme.FOREST]: forestTheme,
}


export function getTimetableTheme(timetable: ITimetable): ITimetableThemeReport {
    const { theme } = timetable.exportConfig;
    if (theme in map) return map[theme];
    throw new Error(`Theme not found. Enum: ${theme}`);
}