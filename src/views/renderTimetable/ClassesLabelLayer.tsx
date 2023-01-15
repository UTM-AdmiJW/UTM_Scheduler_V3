import { Group } from "react-konva";
import ThemedText from "../../components/konva/ThemedText";
import { ITimetableTextSizingReport } from "../../model/types/render/ITimetableTextSizingReport";

import type { ITimetableCourseSlotDimensionReport } from "../../model/types/render/ITimetbaleCourseSlotDimensionReport";
import type { ITimetableThemeReport } from "../../model/types/render/theme/ITimetableThemeReport";


interface IClassesLabelLayerProps {
    timetableThemeReport: ITimetableThemeReport;
    timetableTextSizingReport: ITimetableTextSizingReport;
    timetableCourseDimensionReport: ITimetableCourseSlotDimensionReport;
}


export default function ClassesLabelLayer({
    timetableThemeReport,
    timetableTextSizingReport,
    timetableCourseDimensionReport
}: IClassesLabelLayerProps) {

    const { classesTextStyle, injection } = timetableThemeReport.classesLabelLayerTheme;
    const { pre = null, post = null } = injection ?? {};

    const { 
        fontSizeCourseCode, fontSizeCourseName, fontSizeLecturer, fontSizeVenue, 
        textPadding 
    } = timetableTextSizingReport;

    return <Group>
        { pre }

        {
            Object.entries(timetableCourseDimensionReport)
            .flatMap(([courseId, courseSlotDimensionReport], i) => {

                const style = Array.isArray(classesTextStyle)?
                    classesTextStyle[i % classesTextStyle.length]:
                    classesTextStyle[courseId];

                const { courseCode, courseName, sectionNo, lecturer } = courseSlotDimensionReport.course;
                const courseCodeSectionNo = 
                    (courseCode.length === 0? '': courseCode + ' ') +
                    (sectionNo === 0? '': 'Sec ' + sectionNo);

                
                return Object.entries(courseSlotDimensionReport.classes)
                .flatMap( ([classId, grid]) => {

                    return [
                        // Course Name
                        <ThemedText
                            key={classId + "courseName"}
                            fontSize={fontSizeCourseName}
                            gridDimension={grid.courseName}
                            style={style.courseName}
                            text={courseName}
                            textPadding={textPadding}
                        />,
                        // Course Code Section No
                        <ThemedText
                            key={classId + "courseCode"}
                            fontSize={fontSizeCourseCode}
                            gridDimension={grid.courseCodeSectionNo}
                            style={style.courseCodeSectionNo}
                            text={courseCodeSectionNo}
                            textPadding={textPadding}
                        />,
                        // Lecturer
                        <ThemedText
                            key={classId + "lecturer"}
                            fontSize={fontSizeLecturer}
                            gridDimension={grid.lecturerName}
                            style={style.lecturer}
                            text={lecturer}
                            textPadding={textPadding}
                        />,
                        // Venue
                        <ThemedText
                            key={classId + "venue"}
                            fontSize={fontSizeVenue}
                            gridDimension={grid.venue}
                            style={style.venue}
                            text={grid.class.venue}
                            textPadding={textPadding}
                        />
                    ];
                })
            })
        }

        { post }
    </Group>
}