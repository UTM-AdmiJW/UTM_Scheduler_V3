import { IMenuItem } from "../types/IMenuItem";


// Do not change the numbering. The API data is 1-based, where 1 represents Sunday
export enum DayOfWeek {
    SUNDAY = 1,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
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