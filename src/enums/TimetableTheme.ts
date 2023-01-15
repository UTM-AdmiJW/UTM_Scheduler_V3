import { IMenuItem } from "../model/types/menuItem/IMenuItem";


export enum TimetableTheme {
    UTM = 0,
    LEGACY = 1,
    PURPLE_GALAXY = 2,
    CUTE = 3,
    SPIDEY = 4,
    FOREST = 5,
}


export const TimetableThemeMenuItems: IMenuItem<TimetableTheme>[] = [
    { label: "UTM", value: TimetableTheme.UTM },
    { label: "Legacy", value: TimetableTheme.LEGACY },
    { label: "Purple Galaxy", value: TimetableTheme.PURPLE_GALAXY },
    { label: "Cute", value: TimetableTheme.CUTE },
    { label: "Spidey", value: TimetableTheme.SPIDEY },
    { label: "Forest", value: TimetableTheme.FOREST },
];
