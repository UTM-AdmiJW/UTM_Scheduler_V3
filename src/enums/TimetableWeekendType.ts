import { IMenuItem } from "../model/types/menuItem/IMenuItem";


export enum TimetableWeekendType {
    SATSUN = 0,
    FRISAT = 1
};


export const TimetableWeekendTypeMenuItems: IMenuItem<TimetableWeekendType>[] = [
    { label: "Sat/Sun", value: TimetableWeekendType.SATSUN },
    { label: "Fri/Sat", value: TimetableWeekendType.FRISAT }
]