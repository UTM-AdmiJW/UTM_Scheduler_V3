import { v4 as uuidv4 } from "uuid";

// Utilities for working with timetable data

import type { IJadualDTO } from "../model/DTO/IJadualDTO";
import type { ICombinedJadualDTO } from "../model/DTO/ICombinedJadualDTO";
import type { ITime } from "../model/domain/ITime";
import type { IEditableCourse } from "../model/domain/IEditableCourse";
import type { ICourseCatalogState } from "../model/domain/ICourseCatalogState";

import { DayOfWeek } from "../enums/DayOfWeek";


// Converts 24 hour time to 12 hour time, with AM/PM
export function convert24HourTo12Hour(time: number): string {
    if (time > 23 || time < 0) throw new Error("Time is out of range: " + time);
    return (time % 12 || 12) + `${ time < 12? 'AM': 'PM' }`
}



// UTM represent time slots as 02 = 8:00am, 03 = 9:00am, 04 = 10:00am, etc.
// This function converts UTM time slot to 24-hour time 
export function mapTimeCodeTo24Hour(time: number): number {
    if (time > 17) throw new Error("Time code is out of range");
    return time + 6;
}


// This function converts UTM time slot to 12-hour time with AM/PM
export function mapTimeCodeTo12Hour(time: number): string {
    return convert24HourTo12Hour(mapTimeCodeTo24Hour(time));
}


// This function converts the dayOfWeek numbers into DayOfWeek enum, where 1 = Sunday, 2 = Monday, etc.
export function mapDayCodeToDayOfWeek(day: number): DayOfWeek {
    if (day > 7) throw new Error("Day code is out of range");
    return day;
}


// This function converts the dayOfWeek enum into a string, where 1 = Sunday, 2 = Monday, etc.
export function mapDayOfWeekToString(day: DayOfWeek): string {
    if (day === DayOfWeek.Sunday) return "Sunday";
    if (day === DayOfWeek.Monday) return "Monday";
    if (day === DayOfWeek.Tuesday) return "Tuesday";
    if (day === DayOfWeek.Wednesday) return "Wednesday";
    if (day === DayOfWeek.Thursday) return "Thursday";
    if (day === DayOfWeek.Friday) return "Friday";
    return "Saturday";
}





// The API returns a list of IJadualDTO, each representing time slot even though the time slot is continuous.
// This function combines the time slots into a list of ICombinedJadualDTO, where each ICombinedJadualDTO 
// represents a continuous time slot that can span multiple time slots.
export function combineIJadualDTO(jadual: IJadualDTO[]): ICombinedJadualDTO[] {
    const result: ICombinedJadualDTO[] = [];
    if (jadual.length === 0) return result;

    // Sort jadual first by day, then by start time
    jadual.sort((a, b) => {
        if (a.hari === b.hari) return a.masa - b.masa;
        return a.hari - b.hari;
    });

    // Push the first element to result
    result.push({
        kod_subjek: jadual[0].kod_subjek,
        id_jws: jadual[0].id_jws,
        seksyen: jadual[0].seksyen,
        masa_mula: jadual[0].masa,
        masa_tamat: jadual[0].masa + 1,
        hari: jadual[0].hari,
        ruang: jadual[0].ruang
    });

    // Combine jadual with the same day and time. Note that this assumes:
    //  1. The jadual is sorted by day and time, as done above
    //  2. The jadual is not overlapping
    //  3. The jadual venue is consistent. Venue is not checked
    for (let j of jadual.slice(1)) {
        const last = result[result.length - 1];

        if (last.hari === j.hari && last.masa_tamat === j.masa) {
            last.masa_tamat++;
        } 
        else {
            result.push({
                kod_subjek: j.kod_subjek,
                id_jws: j.id_jws,
                seksyen: j.seksyen,
                masa_mula: j.masa,
                masa_tamat: j.masa + 1,
                hari: j.hari,
                ruang: j.ruang
            });
        }
    }

    return result;
}



// Convert ICombinedJadualDTO to ITime
export function convertICombinedJadualDTOToITime(jadual: ICombinedJadualDTO): ITime {
    return {
        id: jadual.id_jws,
        dayOfWeek: mapDayCodeToDayOfWeek(jadual.hari),
        beginTime: mapTimeCodeTo24Hour(jadual.masa_mula),
        endTime: mapTimeCodeTo24Hour(jadual.masa_tamat),
        venue: jadual.ruang.nama_ruang_singkatan
    }
}


// Convert ICourseCatalogState to IEditableCourse
export function convertICourseCatalogStateToIEditableCourse(catalog: ICourseCatalogState): IEditableCourse {
    return {
        id: uuidv4(),
        courseCode: catalog.course?.kod_subjek || 'N/A',
        courseName: catalog.course?.nama_subjek || 'N/A',
        sectionNo: catalog.section?.seksyen || 0,
        lecturer: catalog.section?.pensyarah || 'N/A',
        timeList: catalog.times?.map(convertICombinedJadualDTOToITime) || [],
    }
}