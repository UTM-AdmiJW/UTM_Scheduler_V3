import { IMenuItem } from "../types/IMenuItem";


export enum TimetableTheme {
    DEFAULT = 0
}


export const TimetableThemeMenuItems: IMenuItem<TimetableTheme>[] = [
    { label: "Default", value: TimetableTheme.DEFAULT }
];
