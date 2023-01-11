import { IMenuItem } from "../types/IMenuItem";


export enum TimetableTheme {
    UTM = 0
}


export const TimetableThemeMenuItems: IMenuItem<TimetableTheme>[] = [
    { label: "UTM", value: TimetableTheme.UTM }
];
