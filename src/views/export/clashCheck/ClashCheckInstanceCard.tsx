import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ActionAreaCard from "../../../components/card/ActionAreaCard";

import type { IClashInstance } from "../../../model/types/clashCheck/IClashReport"

import { MdBook } from "react-icons/md";

import { convert24HourTo12Hour, convertDayOfWeekToString } from "../../../util/timeUtils";



interface IClashCheckInstanceCardProps {
    clash: IClashInstance; 
    index: number;
}


export default function ClashCheckInstanceCard({
    clash,
    index,
}: IClashCheckInstanceCardProps) {

    const {
        course1, course2,
        dayOfWeek, overlapStartTime, overlapEndTime
    } = clash;

    const dayOfWeekStr = convertDayOfWeekToString(dayOfWeek);
    const timeStr = `${convert24HourTo12Hour(overlapStartTime)} - ${convert24HourTo12Hour(overlapEndTime)}`;
    
    const course1Code = course1.courseCode? `${course1.courseCode}` : 'No course code';
    const course2Code = course2.courseCode? `${course2.courseCode}` : 'No course code';
    const course1Sec = course1.sectionNo? `Sec ${course1.sectionNo}` : 'No section';
    const course2Sec = course2.sectionNo? `Sec ${course2.sectionNo}` : 'No section';
    const course1Str = `${course1.courseName} (${course1Code}), ${course1Sec}`;
    const course2Str = `${course2.courseName} (${course2Code}), ${course2Sec}`;

    return <>
        <ActionAreaCard
            title={`Clash #${index}`}
            preDataContent={
                <Typography className='font-light mb-2'>
                    {`${dayOfWeekStr}, ${timeStr}`}
                </Typography>
            }
            postDataContent={
                <List>
                    <ListItem disablePadding>
                        <ListItemIcon><MdBook /></ListItemIcon>
                        <ListItemText secondary={course1Str} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemIcon><MdBook /></ListItemIcon>
                        <ListItemText secondary={course2Str} />
                    </ListItem>
                </List>
            }
        />
    </>
}