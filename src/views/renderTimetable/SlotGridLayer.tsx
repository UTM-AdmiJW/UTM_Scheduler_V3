import { Group, Rect } from "react-konva";

import type { ITimetableDimensionReport } from "../../model/types/render/ITimetableDimensionReport";
import type { ITimetableGridReport } from "../../model/types/render/ITimetableGridReport";
import type { ITimetableThemeReport } from "../../model/types/render/theme/ITimetableThemeReport";


interface ISlotGridLayerProps {
    timetableDimensionReport: ITimetableDimensionReport,
    timetableGrid: ITimetableGridReport,
    timetableThemeReport: ITimetableThemeReport,
}


export default function SlotGridLayer({
    timetableDimensionReport,
    timetableGrid,
    timetableThemeReport
}: ISlotGridLayerProps) {

    const { slots } = timetableGrid;

    const {
        stripBgColors,
        injection
    } = timetableThemeReport.slotGridLayerTheme;

    const { pre = null, post = null } = injection ?? {};


    
    return <Group>
        { pre }

        {/* Slot grids */}
        {/* 
            The order in which day of week are rendered is important to ensure alternating coloring is correct.
            That's why 
        */}
        {   
            timetableDimensionReport.getDayOfWeeks().map((dayOfWeek, i)=> {
                const strip = slots[dayOfWeek];

                return Object.entries(strip).map( ([time, { startX, startY, width, height }]) => {
                    return <Rect
                        key={dayOfWeek + " " + time}
                        fill={stripBgColors[i % stripBgColors.length]}
                        x={startX}
                        y={startY}
                        width={width}
                        height={height}
                        preventDefault={false}
                    />
                })
            })
        }

        { post }
    </Group>
}