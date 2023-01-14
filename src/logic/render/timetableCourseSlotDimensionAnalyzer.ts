
import type { ITimetable } from "../../model/domain/ITimetable";
import { IGridDimension } from "../../model/types/render/IGridDimension";
import type { ITimetableDimensionReport } from "../../model/types/render/ITimetableDimensionReport";
import type { ITimetableCourseSlotDimensionReport } from "../../model/types/render/ITimetbaleCourseSlotDimensionReport";
import { getClassSlotRatio } from "./timetableClassSlotRatioAnalyzer";




export function getTimetableCourseSlotDimensionReport({
    timetable,
    timetableDimensionReport,
}: {
    timetable: ITimetable,
    timetableDimensionReport: ITimetableDimensionReport,
}): ITimetableCourseSlotDimensionReport {
    
    const res: ITimetableCourseSlotDimensionReport = {};

    Object.entries(timetable.editableCourses).forEach(([courseId, editableCourse]) => {
        const { courseName, courseCode, sectionNo, lecturer, timeList } = editableCourse;
        
        res[courseId] = {
            course: editableCourse,
            classes: {},
        };

        timeList.forEach(time => {
            const { id, dayOfWeek, beginTime, endTime, venue } = time;
            const { getGridDimensionFromDayTime } = timetableDimensionReport;

            const classSlotRatio = getClassSlotRatio({ courseName, courseCode, sectionNo, lecturer, venue });
            const grid = getGridDimensionFromDayTime(dayOfWeek, beginTime, endTime);

            // Derive the height of each component of the class slot
            const courseNameHeight = classSlotRatio.courseName * grid.height;
            const courseCodeSectionNoHeight = classSlotRatio.courseCodeSectionNo * grid.height;
            const lecturerNameHeight = classSlotRatio.lecturer * grid.height;
            const venueHeight = classSlotRatio.venue * grid.height;

            // Derive the dimensions.
            const courseNameDimension: IGridDimension = {
                ...grid,
                height: courseNameHeight,
                endY: grid.startY + courseNameHeight,
            };
            const venueDimension: IGridDimension = {
                ...grid,
                height: venueHeight,
                startY: courseNameDimension.endY,
                endY: courseNameDimension.endY + venueHeight,
            };
            const lecturerNameDimension: IGridDimension = {
                ...grid,
                height: lecturerNameHeight,
                startY: venueDimension.endY,
                endY: venueDimension.endY + lecturerNameHeight,
            };
            const courseCodeSectionNoDimension: IGridDimension = {
                ...grid,
                height: courseCodeSectionNoHeight,
                startY: lecturerNameDimension.endY,
                endY: lecturerNameDimension.endY + courseCodeSectionNoHeight,
            };

            // Assign the dimensions to the result
            res[courseId].classes[id] = {
                class: time,
                grid,
                courseName: courseNameDimension,
                courseCodeSectionNo: courseCodeSectionNoDimension,
                lecturerName: lecturerNameDimension,
                venue: venueDimension,
            }
        });
    });


    return res;
}