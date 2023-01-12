
import type { IEditableCourse } from "../../model/domain/IEditableCourse";
import { ITime } from "../../model/domain/ITime";
import type { IClashReport, IClashInstance } from "../../model/types/clashCheck/IClashReport";


export function clashChecker(courses: IEditableCourse[]): IClashReport {
    type TimeCourseComposite = { time: ITime, course: IEditableCourse };

    const clashes: IClashInstance[] = [];

    // Step 1: Flat map each editableCourses into TimeCourseComposite
    const timeCourseComposites: TimeCourseComposite[] = courses.flatMap(course => {
        return course.timeList.map(time => ({ time, course }));
    });

    // Step 2: Sort by day of week, then by beginTime
    timeCourseComposites.sort((a, b)=> {
        if (a.time.dayOfWeek === b.time.dayOfWeek)
            return a.time.beginTime - b.time.beginTime;
        return a.time.dayOfWeek - b.time.dayOfWeek;
    });

    // Step 3: Check clashing by comparing overlap with previous course
    for (let i = 1; i < timeCourseComposites.length; i++) {
        const current = timeCourseComposites[i];
        const previous = timeCourseComposites[i - 1];
        
        // Impossible to have clash on different day
        if (current.time.dayOfWeek !== previous.time.dayOfWeek) continue;
        // Since the data is sorted, we can assume previous.beginTime <= current.beginTime
        // So, a clash occurs when previous.endTime > current.beginTime
        if (current.time.beginTime >= previous.time.endTime) continue;

        // At here, previous.beginTime <= current.beginTime && current.beginTime < previous.endTime
        clashes.push({
            course1: current.course,
            course2: previous.course,
            overlapStartTime: Math.max(current.time.beginTime, previous.time.beginTime),
            overlapEndTime: Math.min(current.time.endTime, previous.time.endTime),
            dayOfWeek: previous.time.dayOfWeek,
        });
    }


    
    return {
        isClash: clashes.length !== 0,
        clashes,
    };
}