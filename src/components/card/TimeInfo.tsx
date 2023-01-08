import { Paper, Typography } from "@mui/material";

import { AiOutlineFieldTime } from "react-icons/ai";

import { DayOfWeek } from "../../enums/DayOfWeek";


import { mapDayCodeToDayOfWeek, mapDayOfWeekToString, mapTimeCodeTo12Hour } from "../../util/timetableUtils";



// A very small card representing ITime/IJadualDTO of a course.
interface ITimeInfoProps {
    beginTime: number;
    endTime: number;
    dayOfWeek: DayOfWeek | number;
    venue?: string;
}


export default function TimeInfo({ beginTime, endTime, dayOfWeek, venue }: ITimeInfoProps) {


    return <>
        <Paper
            variant='outlined'
            className='bg-gray-50 mt-1 p-1 text-xs'
        >
            <AiOutlineFieldTime className='inline mr-1' />
            <Typography className='inline text-xs font-light'>
                <b>{ mapDayOfWeekToString(mapDayCodeToDayOfWeek(dayOfWeek)) }</b>
                ,
                <b> { mapTimeCodeTo12Hour(beginTime) } </b> - 
                <b> { mapTimeCodeTo12Hour(endTime) }</b>
                
                { 
                    venue && 
                    <span> at <b>{ venue }</b></span>
                }
            </Typography>
        </Paper>
    </>
}