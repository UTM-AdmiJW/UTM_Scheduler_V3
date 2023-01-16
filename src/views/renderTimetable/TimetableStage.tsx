

import { Layer, Stage } from "react-konva";
import BackgroundLayer from "./BackgroundLayer";
import LabelGridLayer from "./LabelGridLayer";
import SlotGridLayer from "./SlotGridLayer";
import LabelLayer from "./LabelLayer";
import ClassesGridLayer from "./ClassesGridLayer";
import ClassesLabelLayer from "./ClassesLabelLayer";

import type { ITimetable } from "../../model/domain/ITimetable";
import type { LegacyRef } from "react";
import type { Stage as StageType } from "konva/lib/Stage";

import { getTimetableDimensionReport } from "../../logic/render/timetableDimensionAnalyzer";
import { getTimetableGrid } from "../../logic/render/timetableGridReducer";
import { getTimetableTheme } from "../../logic/render/timetableThemeMapper";
import { getTimetableTextSizingReport } from "../../logic/render/timetableTextSizingAnalyzer";
import { getTimetableCourseSlotDimensionReport } from "../../logic/render/timetableCourseSlotDimensionAnalyzer";





interface ITimetableStageProps {
    timetable: ITimetable;
    stageRef: LegacyRef<StageType>;
}


export default function TimetableStage({
    timetable,
    stageRef: ref,
}: ITimetableStageProps) {

    // To generate the timetable, the ITimetable model has to went through a series of steps.
    // ----------------------------------
    // Step 1: Get timetable dimension report
    const timetableDimensionReport = getTimetableDimensionReport(timetable);
    // Step 2: Reduce timetable dimension report into grid dimensions
    const timetableGrid = getTimetableGrid(timetableDimensionReport);
    // Step 3: Get timetable theme
    const timetableThemeReport = getTimetableTheme(timetable);
    // Step 4: Get text sizing report
    const timetableTextSizingReport = getTimetableTextSizingReport(timetable);
    // Step 5: Get dimension for each added courses
    const timetableCourseDimensionReport = getTimetableCourseSlotDimensionReport({ timetable, timetableDimensionReport });




    // Finally: Pass the data to the layer renderers component
    return <>
        <Stage
            width={timetableDimensionReport.width} 
            height={timetableDimensionReport.height}
            ref={ref}
        >
        <Layer>
            <BackgroundLayer 
                timetableDimensionReport={timetableDimensionReport}
                timetableThemeReport={timetableThemeReport}
            />

            <LabelGridLayer
                timetableGrid={timetableGrid}
                timetableThemeReport={timetableThemeReport}
            />

            <SlotGridLayer
                timetableDimensionReport={timetableDimensionReport}
                timetableGrid={timetableGrid}
                timetableThemeReport={timetableThemeReport}
            />

            <LabelLayer
                timetableGrid={timetableGrid}
                timetableThemeReport={timetableThemeReport}
                timetableTextSizingReport={timetableTextSizingReport}
            />

            <ClassesGridLayer
                timetableThemeReport={timetableThemeReport}
                timetableCourseDimensionReport={timetableCourseDimensionReport}
            />

            <ClassesLabelLayer
                timetableThemeReport={timetableThemeReport}
                timetableCourseDimensionReport={timetableCourseDimensionReport}
                timetableTextSizingReport={timetableTextSizingReport}
            />
        </Layer>
        </Stage>
    </>
}