
import { DayOfWeek } from "../enums/DayOfWeek";


export interface ITime {
    id: number;
    
    beginTime: number;
    endTime: number;
    dayOfWeek: DayOfWeek;
    venue: string;
}