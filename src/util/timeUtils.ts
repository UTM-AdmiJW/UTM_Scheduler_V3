import { v4 as uuidv4 } from "uuid";

/**
 * This file contains utility functions for working with time in the application,
 * such as Day of Week conversion from number to string,
 * or time code (02) to actual time: 8AM
 */


import type { IJadualSubjekDTO } from "../model/DTO/JadualSubjek/IJadualSubjekDTO";
import type { IJadualSubjek_Combine } from "../model/DTO/JadualSubjek/IJadualSubjek_Combine";
import type { ITime } from "../model/domain/ITime";
import type { IEditableCourse } from "../model/domain/IEditableCourse";
import type { ICourseCatalogState } from "../model/domain/ICourseCatalogState";
import type { IRegisteredCoursesState } from "../model/domain/IRegisteredCoursesState";
import type { ISubjekSeksyen_SeksyenDTO } from "../model/DTO/SubjekSeksyen/ISubjekSeksyen_SeksyenDTO";
import type { IEditableCourseTimeComposite } from "../model/types/domainDerived/IEditableCourseTimeComposite";

import { DayOfWeek } from "../enums";


//============================
// Time conversion
//===========================

// Converts 24 hour time to 12 hour time, with AM/PM suffix
export function convert24HourTo12Hour(time: number): string {
    if (time > 23 || time < 0) throw new Error("Time is out of range: " + time);
    return (time % 12 || 12) + ` ${ time < 12? 'AM': 'PM' }`
}




// UTM represent time slots as 02 = 8:00am, 03 = 9:00am, 04 = 10:00am, etc.
// This function converts UTM time slot to 24-hour time 
export function convertTimeCodeTo24Hour(time: number): number {
    if (time > 17) throw new Error("Time code is out of range");
    return time + 6;
}


// This function converts UTM time slot to 12-hour time with AM/PM
export function convertTimeCodeTo12Hour(time: number): string {
    return convert24HourTo12Hour(convertTimeCodeTo24Hour(time));
}



//============================
// Day of Week 
//===========================

// This function converts the dayOfWeek numbers into DayOfWeek enum, where 1 = Sunday, 2 = Monday, etc.
export function convertDayCodeToDayOfWeek(day: number): DayOfWeek {
    if (day > 7) throw new Error("Day code is out of range");
    return day;
}


// This function converts the dayOfWeek enum into a string, where 1 = Sunday, 2 = Monday, etc.
export function convertDayOfWeekToString(day: DayOfWeek): string {
    if (day === DayOfWeek.SUNDAY) return "Sunday";
    if (day === DayOfWeek.MONDAY) return "Monday";
    if (day === DayOfWeek.TUESDAY) return "Tuesday";
    if (day === DayOfWeek.WEDNESDAY) return "Wednesday";
    if (day === DayOfWeek.THURSDAY) return "Thursday";
    if (day === DayOfWeek.FRIDAY) return "Friday";
    return "Saturday";
}





// The API returns a list of IJadualDTO, each representing time slot even though the time slot is continuous.
// This function combines the time slots into a list of ICombinedJadualDTO, where each ICombinedJadualDTO 
// represents a continuous time slot that can span multiple time slots.
export function combineIJadualDTO(jadual: IJadualSubjekDTO[]): IJadualSubjek_Combine[] {
    const result: IJadualSubjek_Combine[] = [];
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



// Convert ICombinedJadualDTO to ITime. An adapter from DTO to domain model
export function convertICombinedJadualDTOToITime(jadual: IJadualSubjek_Combine): ITime {
    return {
        id: jadual.id_jws,
        dayOfWeek: convertDayCodeToDayOfWeek(jadual.hari),
        beginTime: convertTimeCodeTo24Hour(jadual.masa_mula),
        endTime: convertTimeCodeTo24Hour(jadual.masa_tamat),
        venue: jadual.ruang.nama_ruang_singkatan || '',
    }
}


// Convert ICourseCatalogState to IEditableCourse. Used when adding a new course from Course Catalog
export function convertICourseCatalogStateToIEditableCourse(catalog: ICourseCatalogState): IEditableCourse {
    return {
        id: uuidv4(),
        courseCode: catalog.subjekSeksyen?.kod_subjek || '',
        courseName: catalog.subjekSeksyen?.nama_subjek || '',
        sectionNo: catalog.seksyen?.seksyen || 0,
        lecturer: catalog.seksyen?.pensyarah || '',
        timeList: catalog.jadualSubjek?.map(convertICombinedJadualDTOToITime) || [],
    }
}


// Convert IRegisteredCourseState to IEditableCourse. Used when adding a new course from My Registered Courses
export function convertIRegisteredCourseStateToIEditableCourse(
    course: IRegisteredCoursesState,
    seksyen: ISubjekSeksyen_SeksyenDTO,
    jadual: IJadualSubjek_Combine[],
): IEditableCourse {
    return {
        id: uuidv4(),
        courseCode: course.pelajarSubjek?.kod_subjek || '',
        courseName: course.pelajarSubjek?.nama_subjek || '',
        sectionNo: course.pelajarSubjek?.seksyen || 0,
        lecturer: seksyen?.pensyarah || '',
        timeList: jadual.map(convertICombinedJadualDTOToITime) || [],
    }
}



// Flat map IEditableCourse to IEditableCourseTimeComposite for easy iteration over timeList.
// Primarily used in clash checking between times
export function flatMapIEditableCourseToIEditableCourseTimeComposite(
    course: IEditableCourse
): IEditableCourseTimeComposite[] {
    
    return course.timeList.map(time => ({ time, course }));
}
