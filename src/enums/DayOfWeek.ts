import { IMenuItem } from "../types/IMenuItem";


export enum DayOfWeek {
    SUNDAY = 1,
    MONDAY = 2,
    TUESDAY = 3,
    WEDNESDAY = 4,
    THURSDAY = 5,
    FRIDAY = 6,
    SATURDAY = 7
}


export const DayOfWeekMenuItems: IMenuItem<DayOfWeek>[] = [
    { label: "Sunday", value: DayOfWeek.SUNDAY },
    { label: "Monday", value: DayOfWeek.MONDAY },
    { label: "Tuesday", value: DayOfWeek.TUESDAY },
    { label: "Wednesday", value: DayOfWeek.WEDNESDAY },
    { label: "Thursday", value: DayOfWeek.THURSDAY },
    { label: "Friday", value: DayOfWeek.FRIDAY },
    { label: "Saturday", value: DayOfWeek.SATURDAY }
]