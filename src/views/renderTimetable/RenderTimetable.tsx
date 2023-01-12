

import { Stage } from "react-konva";
import BackgroundLayer from "./BackgroundLayer";
import LabelGridLayer from "./LabelGridLayer";
import SlotGridLayer from "./SlotGridLayer";
import LabelLayer from "./LabelLayer";

import type { ITimetable } from "../../model/domain/ITimetable";

import { getTimetableDimensionReport } from "../../logic/render/timetableDimensionAnalyzer";
import { getTimetableGrid } from "../../logic/render/timetableGridReducer";
import { getTimetableTheme } from "../../logic/render/timetableThemeMapper";
import { getTimetableTextSizingReport } from "../../logic/render/timetableTextSizingAnalyzer";





interface IRenderTimetableProps {
    timetable: ITimetable;
}


export default function RenderTimetable({
    timetable
}: IRenderTimetableProps) {

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



    // Finally: Pass the data to the layer renderers component
    return <>
        <Stage 
            width={timetableDimensionReport.width} 
            height={timetableDimensionReport.height}
        >
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
        </Stage>
    </>
}