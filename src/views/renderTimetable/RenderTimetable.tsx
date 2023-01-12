

import { Stage } from "react-konva";
import BackgroundLayer from "./BackgroundLayer";
import LabelGridLayer from "./LabelGridLayer";
import SlotGridLayer from "./SlotGridLayer";

import type { ITimetable } from "../../model/domain/ITimetable";

import { generateTimetableDimensionReport } from "../../logic/render/timetableDimensionAnalyzer";
import { timetableGridReducer } from "../../logic/render/timetableGridReducer";
import { getBackgroundLayerTheme } from "../../logic/render/backgroundLayerThemeMapper";
import { getLabelGridLayerTheme } from "../../logic/render/labelGridLayerThemeMapper";
import { getSlotGridLayerTheme } from "../../logic/render/slotGridLayerThemeMapper";





interface IRenderTimetableProps {
    timetable: ITimetable;
}


export default function RenderTimetable({
    timetable
}: IRenderTimetableProps) {

    // To generate the timetable, the ITimetable model has to went through a series of steps.
    // ----------------------------------
    // Step 1: Get timetable dimension report
    const timetableDimensionReport = generateTimetableDimensionReport(timetable);
    // Step 2: Reduce timetable dimension report into grid dimensions
    const timetableGrid = timetableGridReducer(timetableDimensionReport);
    // Step 3: Get timetable background theme
    const backgroundLayerTheme = getBackgroundLayerTheme(timetable);
    // Step 4: Get label grid layer theme
    const labelGridLayerTheme = getLabelGridLayerTheme(timetable);
    // Step 5: Get slot grid layer theme
    const slotGridLayerTheme = getSlotGridLayerTheme(timetable);
    // Step 6: Get label layer theme.
    


    // Finally: Pass the data to the layer renderers component
    return <>
        <Stage 
            width={timetableDimensionReport.width} 
            height={timetableDimensionReport.height}
        >
            <BackgroundLayer 
                timetableDimensionReport={timetableDimensionReport}
                backgroundLayerTheme={backgroundLayerTheme}
            />

            <LabelGridLayer
                timetableGrid={timetableGrid}
                labelGridLayerTheme={labelGridLayerTheme}
            />

            <SlotGridLayer
                timetableGrid={timetableGrid}
                slotGridLayerTheme={slotGridLayerTheme}
            />
        </Stage>
    </>
}