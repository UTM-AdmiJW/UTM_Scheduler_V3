

/**
 * This interface encapsulates sizing (not theme) properties used to render the 
 * text in the timetable.
 */
export interface ITimetableTextSizingReport {
    textPadding: number;
    
    fontSizeDayOfWeekLabelIndiciator: number;
    fontSizeTimeLabelIndiciator: number;
    fontSizeDayOfWeekLabel: number;
    fontSizeTimeLabel: number;
    fontSizeCourseName: number;
    fontSizeVenue: number;
    fontSizeLecturer: number;
    fontSizeCourseCode: number;
}