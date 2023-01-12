

import type { ITimetable } from "../../model/domain/ITimetable";
import type { ITimetableTextSizingReport } from "../../model/types/render/ITimetableTextSizingReport";



export function getTimetableTextSizingReport(
    timetable: ITimetable,
): ITimetableTextSizingReport {
    
    const { 
        textPadding,

        fontSizeDayOfWeekLabelIndiciator,
        fontSizeTimeLabelIndiciator,
        fontSizeDayOfWeekLabel,
        fontSizeTimeLabel,
        fontSizeCourseName,
        fontSizeVenue,
        fontSizeLecturer,
        fontSizeCourseCode,
    } = timetable.exportConfig;

    return {
        textPadding,

        fontSizeDayOfWeekLabelIndiciator,
        fontSizeTimeLabelIndiciator,
        fontSizeDayOfWeekLabel,
        fontSizeTimeLabel,
        fontSizeCourseName,
        fontSizeVenue,
        fontSizeLecturer,
        fontSizeCourseCode,
    };
};