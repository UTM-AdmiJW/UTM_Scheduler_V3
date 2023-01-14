import { Group, Rect } from "react-konva";

import type { ITimetableCourseSlotDimensionReport } from "../../model/types/render/ITimetbaleCourseSlotDimensionReport";
import type { ITimetableThemeReport } from "../../model/types/render/theme/ITimetableThemeReport";


interface IClassesGridLayerProps {
    timetableThemeReport: ITimetableThemeReport;
    timetableCourseDimensionReport: ITimetableCourseSlotDimensionReport;
}


export default function ClassesGridLayer({
    timetableThemeReport,
    timetableCourseDimensionReport
}: IClassesGridLayerProps) {

    const { classesBgColor, injection } = timetableThemeReport.classesGridLayerTheme;
    const { pre = null, post = null } = injection ?? {};

    return <Group>
        { pre }

        {
            Object.entries(timetableCourseDimensionReport)
            .flatMap(([courseCode, courseSlotDimensionReport], i) => {

                const fill = Array.isArray(classesBgColor)?
                    classesBgColor[i % classesBgColor.length]:
                    classesBgColor[courseCode];
                
                return Object.entries(courseSlotDimensionReport.classes)
                .map( ([classId, { grid }]) => {

                    return <Rect
                        key={classId}
                        x={grid.startX}
                        y={grid.startY}
                        width={grid.width}
                        height={grid.height}
                        fill={fill}
                        preventDefault={false}
                    />
                })
            })
        }

        { post }
    </Group>
}