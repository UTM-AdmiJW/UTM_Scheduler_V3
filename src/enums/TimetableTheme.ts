import { IMenuItem } from "../model/types/menuItem/IMenuItem";


export enum TimetableTheme {
    UTM = 0
}


export const TimetableThemeMenuItems: IMenuItem<TimetableTheme>[] = [
    { label: "UTM", value: TimetableTheme.UTM }
];
